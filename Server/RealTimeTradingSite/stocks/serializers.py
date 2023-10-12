from rest_framework import serializers
from .models import StockInfo, User, UserStocks, StockPriceHistory

class StockInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = StockInfo
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'password')

class UserStocksSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserStocks
        fields = ['user', 'stock', 'quantity']
        read_only_fields = ('purchase_price',)

class StockPriceHistorySerializer(serializers.ModelSerializer):
    timestamp = serializers.DateTimeField(format='%Y-%m-%d %H:%M:%S')
    current_price = serializers.FloatField()

    class Meta:
        model = StockPriceHistory
        fields = '__all__'