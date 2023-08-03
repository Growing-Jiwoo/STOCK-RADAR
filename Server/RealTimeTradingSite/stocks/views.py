from .models import StockInfo, User
from datetime import datetime, timedelta
from rest_framework.permissions import BasePermission, AllowAny
from rest_framework.exceptions import AuthenticationFailed
from rest_framework_jwt.authentication import JSONWebTokenAuthentication
import random
from .authentication import authenticate_request, generate_refresh_token
from .serializers import UserSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework_jwt.settings import api_settings

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
        if user:
            jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
            jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER
            payload = jwt_payload_handler(user)
            token = jwt_encode_handler(payload)
            return Response({'token': token})
        else:
            raise AuthenticationFailed({'error': '잘못된 ID나 PW를 입력하셨습니다.', 'code': 400})

class UserSignupAPIView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            username = serializer.validated_data.get('username')
            if User.objects.filter(username=username).exists():
                response_data = {
                    'success': False,
                    'message': '중복되는 ID가 존재합니다. 다른 ID를 입력하십시오.',
                    'code': 409
                }
                return Response(response_data, status=status.HTTP_409_CONFLICT)
            serializer.save()
            response_data = {
                'success': True,
                'message': 'Sign-up successful!'
            }
            return Response(response_data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class StockInfoList(APIView):

    def get(self, request):
        current_date = datetime.now().date()
        yesterday_date = current_date - timedelta(days=1)
        stocks = []
        try:
            payload = authenticate_request(request)
        except AuthenticationFailed as e:
            return Response(e.detail, status=e.status_code)
        except StockInfo.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        for i in range(10):
            name = f"Stock {i+1}"
            try:
                stock = StockInfo.objects.get(name=name, timestamp__date=current_date)
                volatility = random.uniform(-0.05, 0.05)
                stock.current_price = round(stock.current_price * (1 + volatility) + 0.01, 2)
                stock.rate_of_change = round((stock.current_price - stock.start_price) / stock.start_price * 100, 2)
                stock.save()
            except StockInfo.DoesNotExist:
                if StockInfo.objects.filter(name=name, timestamp__date=yesterday_date).exists():
                    yesterday_stock = StockInfo.objects.get(name=name, timestamp__date=yesterday_date)
                    volatility = random.uniform(-0.05, 0.05)
                    start_price = round(yesterday_stock.current_price * (1 + volatility) + 0.01, 2)
                    stock = StockInfo.objects.create(name=name, start_price=start_price, yesterday_price=yesterday_stock.current_price,
                                                     current_price=start_price, rate_of_change=0, percentage_diff=0)
                    if yesterday_date != current_date:
                        stock.percentage_diff = round((stock.yesterday_price - stock.start_price) / stock.start_price * 100, 2)
                        stock.save()
                else:
                    start_price = round(random.uniform(100, 500) + 0.01, 2)
                    stock = StockInfo.objects.create(name=name, start_price=start_price, yesterday_price=start_price,
                                                     current_price=start_price, rate_of_change=0, percentage_diff=0)

            if yesterday_date != current_date and stock.percentage_diff == 0:
                stock.percentage_diff = round((stock.yesterday_price - stock.start_price) / stock.start_price * 100, 2)
                stock.save()

            stock_data = {
                'name': stock.name,
                'start_price': stock.start_price,
                'yesterday_price': stock.yesterday_price,
                'current_price': stock.current_price,
                'rate_of_change': stock.rate_of_change,
                'percentage_diff': stock.percentage_diff,
                'timestamp': stock.timestamp.strftime("%Y-%m-%d %H:%M:%S")
            }
            stocks.append(stock_data)
        return Response(stocks)

