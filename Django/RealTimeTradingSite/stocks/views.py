from rest_framework import status
from datetime import date, timedelta
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import StockInfo
from .serializers import StockInfoSerializer
from datetime import datetime, timedelta


class HiView(APIView):
    def get(self, request, format=None):
        data = {"hi": "Hello World!"}
        return Response(data, status=status.HTTP_200_OK)

import random

class StockInfoList(APIView):

    def get(self, request):
        current_date = datetime.now().date()
        yesterday_date = current_date - timedelta(days=1)
        stocks = []
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

