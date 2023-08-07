from rest_framework import serializers
from .models import StockInfo, User, UserStocks

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
        fields = ['user', 'stock', 'quantity']  # Remove 'purchase_date' from the fields list
        read_only_fields = ('purchase_price',)
