from rest_framework_simplejwt.tokens import RefreshToken
from .models import User, UserStocks
from rest_framework.permissions import BasePermission, AllowAny
from rest_framework_jwt.authentication import JSONWebTokenAuthentication
from .authentication import authenticate_request, generate_refresh_token
from .serializers import UserSerializer, UserStocksSerializer, StockPriceHistorySerializer
from rest_framework import status
from django.db.models import Sum
from rest_framework.status import HTTP_404_NOT_FOUND
from django.utils import timezone
from datetime import datetime, timedelta
import pytz
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from .models import StockInfo, StockPriceHistory
import random
from django.core.exceptions import ObjectDoesNotExist

class RefreshTokenAPIView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        try:
            payload = authenticate_request(request)
            user_id = payload['user_id']
            user = User.objects.get(pk=user_id)
        except AuthenticationFailed as e:
            return Response(e.detail, status=e.status_code)
        except User.DoesNotExist:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

        refresh_token = generate_refresh_token(user)
        return Response({'refresh_token': refresh_token})

class IsTokenValid(BasePermission):
    authentication_classes = (JSONWebTokenAuthentication)

    def has_permission(self, request, view):
        try:
            return request.user.is_authenticated
        except AuthenticationFailed:
            return False

class UserSigninAPIView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        user = User.objects.filter(username=username, password=password).first()

        if user is not None:
            refresh = RefreshToken.for_user(user)
            access_token = str(refresh.access_token)
            refresh_token = str(refresh)

            return Response({
                'access_token': access_token,
                'refresh_token': refresh_token,
            })
        else:
            response_data = {
                'success': False,
                'message': '잘못된 ID나 PW를 입력하셨습니다.'
            }
            return Response(response_data, status=status.HTTP_400_BAD_REQUEST)

class UserSignupAPIView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)

        username = request.data.get('username')

        if User.objects.filter(username=username).exists():
            return Response({'code': 401, 'message': '중복되는 ID가 존재합니다.'}, status=status.HTTP_409_CONFLICT)

        if serializer.is_valid():
            serializer.save()
            return Response({'code': 201, 'message': '회원가입에 성공하였습니다.'}, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class StockPriceHistory(APIView):
    def get(self, request, stock_id, days):
        try:
            try:
                payload = authenticate_request(request)
            except AuthenticationFailed as e:
                return Response(e.detail, status=e.status_code)

            current_date = timezone.now().date()

            start_date = current_date - timedelta(days=days)

            if stock_id.isdigit():
                stock_id = int(stock_id)
                try:
                    stock_price_history = StockPriceHistory.objects.filter(
                        stock__id=stock_id,
                        timestamp__date__range=[start_date, current_date]
                    )
                except ObjectDoesNotExist:
                    return Response({'error': 'Stock not found'}, status=status.HTTP_404_NOT_FOUND)
            elif stock_id == 'all':
                stock_price_history = StockPriceHistory.objects.filter(
                    timestamp__date__range=[start_date, current_date]
                )

            serializer = StockPriceHistorySerializer(stock_price_history, many=True)

            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            error_message = f"An error occurred: {str(e)}"
            return Response({'error': error_message}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class StockInfoList(APIView):
    def update_stock_prices(self):
        korean_timezone = pytz.timezone('UTC')
        current_time = timezone.localtime(timezone.now(), timezone=korean_timezone)
        current_time += timedelta(hours=9)
        current_minute = current_time.minute
        current_date = current_time.date()

        if current_minute % 5 == 0:
            for i in range(1, 11):
                name = f"Stock {i}"
                try:
                    stock = StockInfo.objects.filter(name=name).first()
                    stock_data = StockInfo.objects.get(name=name, timestamp__date=current_date)
                    stock_price_history = StockPriceHistory.objects.filter(stock__name=name,
                                                                           timestamp__date=current_date).first()

                    if stock_price_history.timestamp.minute == current_minute:
                        stock_price_history.timestamp = current_time.replace(second=0)
                        stock_price_history.current_price = stock_data.current_price
                        stock_price_history.save()
                    else:
                        stock_price_history = StockPriceHistory.objects.create(
                            stock=stock,
                            timestamp=current_time.replace(second=0),
                            current_price=stock_data.current_price
                        )
                        stock_price_history.save()
                except StockInfo.DoesNotExist:
                    pass

    def get(self, request):
        korean_timezone = pytz.timezone('UTC')
        current_time = timezone.localtime(timezone.now(), timezone=korean_timezone)
        current_time += timedelta(hours=9)
        current_date = current_time.date()
        yesterday_date = current_date - timedelta(days=1)
        stocks = []
        try:
            payload = authenticate_request(request)
        except AuthenticationFailed as e:
            return Response(e.detail, status=e.status_code)
        except StockInfo.DoesNotExist:
            return Response(status=HTTP_404_NOT_FOUND)

        for i in range(10):
            name = f"Stock {i+1}"
            try:
                stock = StockInfo.objects.get(name=name, timestamp__date=current_date)
                volatility = random.uniform(-0.005, 0.005)
                stock.current_price = round(stock.current_price * (1 + volatility), 2)
                stock.rate_of_change = round((stock.current_price - stock.start_price) / stock.start_price * 100, 2)
                stock.save()
            except StockInfo.DoesNotExist:
                if StockInfo.objects.filter(name=name, timestamp__date=yesterday_date).exists():
                    yesterday_stock = StockInfo.objects.get(name=name, timestamp__date=yesterday_date)
                    start_price = yesterday_stock.current_price
                    stock = StockInfo.objects.create(
                        name=name,
                        start_price=start_price,
                        yesterday_price=start_price,
                        current_price=start_price,
                        rate_of_change=0,
                        percentage_diff=0,
                        timestamp=current_time.replace(second=0),
                    )
                    if yesterday_date != current_date:
                        stock.percentage_diff = round((stock.start_price - stock.yesterday_price) / stock.start_price * 100, 2)
                        stock.save()
                else:
                    start_price = round(random.uniform(100, 500), 2)
                    stock = StockInfo.objects.create(
                        name=name,
                        start_price=start_price,
                        yesterday_price=start_price,
                        current_price=start_price,
                        rate_of_change=0,
                        percentage_diff=0,
                        timestamp=current_time.replace(second=0),
                    )

            if yesterday_date != current_date and stock.percentage_diff == 0:
                stock.percentage_diff = round((stock.yesterday_price - stock.start_price) / stock.start_price * 100, 2)
                stock.save()

            stock_data = {
                "id": stock.id,
                'name': stock.name,
                'start_price': stock.start_price,
                'yesterday_price': stock.yesterday_price,
                'current_price': stock.current_price,
                'rate_of_change': stock.rate_of_change,
                'percentage_diff': stock.percentage_diff,
                'timestamp': stock.timestamp.strftime("%Y-%m-%d %H:%M:%S")
            }
            stocks.append(stock_data)


        self.update_stock_prices()

        return Response(stocks)


class StockInfoDetail(APIView):
    def get(self, request, pk):
        try:
            payload = authenticate_request(request)
        except AuthenticationFailed as e:
            return Response(e.detail, status=e.status_code)

        current_date = datetime.now().date()

        try:
            stock = StockInfo.objects.get(pk=pk, timestamp__date=current_date)
        except StockInfo.DoesNotExist:
            return Response({"detail": "Stock information does not exist for the specified ID."}, status=404)

        stock_data = {
            "id": stock.id,
            'name': stock.name,
            'start_price': stock.start_price,
            'yesterday_price': stock.yesterday_price,
            'current_price': stock.current_price,
            'rate_of_change': stock.rate_of_change,
            'percentage_diff': stock.percentage_diff,
            'timestamp': stock.timestamp.strftime("%Y-%m-%d %H:%M:%S")
        }

        return Response(stock_data)

class UserStocksCreate(APIView):
    def get(self, request):
        try:
            payload = authenticate_request(request)
            user_id = payload['user_id']
            user_stocks = UserStocks.objects.filter(user_id=user_id)

            stock_data = []
            total_value = Decimal('0')

            for user_stock in user_stocks:
                total_value += user_stock.purchase_price

                stock_data.append({
                    'user': user_stock.user_id,
                    'stock': user_stock.stock_id,
                    'quantity': user_stock.quantity,
                    'stock_name': user_stock.stock.name,
                    'purchase_price': user_stock.purchase_price
                })

            response_data = {
                'code': 200,
                'data': stock_data,
                'total_value': total_value
            }
            return Response(response_data)
        except AuthenticationFailed as e:
            return Response({'code': 401, 'data': e.detail}, status=e.status_code)
        except UserStocks.DoesNotExist:
            return Response({'code': 404, 'message': 'UserStocks not found.'}, status=status.HTTP_404_NOT_FOUND)

    def post(self, request, format=None):
        serializer = UserStocksSerializer(data=request.data)
        if serializer.is_valid():
            user_id = serializer.validated_data['user'].id
            stock_id = serializer.validated_data['stock'].id
            quantity = serializer.validated_data['quantity']

            try:
                existing_entries = UserStocks.objects.filter(user=user_id, stock=stock_id)
                if existing_entries.exists():
                    total_quantity = existing_entries.aggregate(total_quantity=Sum('quantity'))['total_quantity']
                    total_quantity += quantity
                    first_entry = existing_entries.first()
                    first_entry.quantity = total_quantity
                    first_entry.save()
                    existing_entries.exclude(pk=first_entry.pk).delete()
                    serializer = UserStocksSerializer(first_entry)

                    current_price = Decimal(first_entry.stock.current_price)
                    result = round(first_entry.purchase_price + (quantity * current_price), 2)
                    first_entry.purchase_price = result
                    first_entry.save()

                    data = serializer.data
                    data['result'] = result
                    response_data = {
                        'code': 200,
                        'data': data
                    }
                    return Response(response_data, status=status.HTTP_200_OK)
                else:
                    try:
                        stock_info = StockInfo.objects.get(pk=stock_id)
                        current_purchase_price = stock_info.current_price
                        serializer.validated_data['purchase_price'] = Decimal(current_purchase_price) * quantity
                    except StockInfo.DoesNotExist:
                        return Response({'code': 404, 'message': 'Stock with the provided ID does not exist'},
                                    status=status.HTTP_404_NOT_FOUND)

                    serializer.validated_data['purchase_date'] = datetime.now()
                    serializer.save()

                    current_price = Decimal(stock_info.current_price)
                    result = round((quantity * current_price), 2)
                    serializer.validated_data['purchase_price'] = result
                    serializer.save()

                    data = serializer.data
                    data['result'] = result
                    return Response({
                        'code': 201,
                        'data': data
                    }, status=status.HTTP_201_CREATED)

            except UserStocks.DoesNotExist:
                pass

        return Response({
            'code': 400,
            'data': serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)


from decimal import Decimal, ROUND_HALF_UP

class SellStocksAPIView(APIView):
    def post(self, request, format=None):
        stock_id = request.data.get('stock_id')
        quantity_to_sell = request.data.get('quantity')
        payload = authenticate_request(request)
        user_id = payload['user_id']

        if not stock_id or not quantity_to_sell:
            return Response({
                'code': 400,
                'message': 'stock_id and quantity fields are required'
            }, status=status.HTTP_400_BAD_REQUEST)

        try:
            stock_info = StockInfo.objects.get(pk=stock_id)
        except StockInfo.DoesNotExist:
            return Response({
                'code': 404,
                'message': 'Stock with the provided ID does not exist'
            }, status=status.HTTP_404_NOT_FOUND)

        try:
            user_stock = UserStocks.objects.get(user=user_id, stock=stock_info)
        except UserStocks.DoesNotExist:
            return Response({
                'code': 400,
                'message': 'You do not have any stocks of this type to sell'
            }, status=status.HTTP_400_BAD_REQUEST)

        if user_stock.quantity < quantity_to_sell:
            return Response({
                'code': 400,
                'message': 'You do not have enough stocks to sell this quantity'
            }, status=status.HTTP_400_BAD_REQUEST)

        selling_price = stock_info.current_price
        total_selling_amount = selling_price * quantity_to_sell
        remaining_quantity = user_stock.quantity - quantity_to_sell

        if remaining_quantity > 0:
            user_stock.purchase_price = Decimal(user_stock.purchase_price) - Decimal(total_selling_amount) * quantity_to_sell
        else:
            user_stock.purchase_price = 0

        user_stock.quantity = remaining_quantity
        user_stock.save()

        current_date = datetime.now().date()
        response_data = {
            'code': 200,
            'data': {
                'stock_name': stock_info.name,
                'quantity_sold': quantity_to_sell,
                'current_price': round(selling_price, 2),
                'total_selling_amount': round(total_selling_amount, 2),
                'purchase_price': round(user_stock.purchase_price, 2),
                'date': current_date.strftime('%Y-%m-%d')
            }
        }
        return Response({
                'code': 400,
                'message': 'You do not have any stocks of this type to sell',
                'data' : response_data
            }, status=status.HTTP_200_OK)