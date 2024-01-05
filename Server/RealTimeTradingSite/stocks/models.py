from django.db import models
from django.utils import timezone

class StockInfo(models.Model):
    id = models.BigAutoField(primary_key=True)
    name = models.CharField(max_length=50)
    yesterday_price = models.FloatField()
    start_price = models.FloatField()
    current_price = models.FloatField()
    rate_of_change = models.FloatField()
    timestamp = models.DateTimeField()
    percentage_diff = models.FloatField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'stocks_stockinfo'

class User(models.Model):
    id = models.BigAutoField(primary_key=True)
    username = models.CharField(unique=True, max_length=100)
    password = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'stocks_user'

class UserStocks(models.Model):
    portfolio_id = models.BigAutoField(primary_key=True)
    user = models.ForeignKey(User, models.DO_NOTHING)
    stock_name = models.CharField(max_length=100)
    quantity = models.IntegerField()
    purchase_price = models.DecimalField(max_digits=10, decimal_places=2)
    
    class Meta:
        managed = False
        db_table = 'user_stocks'

class StockPriceHistory(models.Model):
    stock = models.ForeignKey(StockInfo, on_delete=models.CASCADE)
    current_price = models.DecimalField(max_digits=10, decimal_places=2)
    timestamp = models.DateTimeField()

    class Meta:
        ordering = ['-timestamp']

class StocksComment(models.Model):
    comment_id = models.BigAutoField(primary_key=True)
    comment_text = models.TextField()
    create_time = models.DateTimeField()
    stock_id = models.CharField(max_length=50)
    user = models.ForeignKey(User, on_delete=models.DO_NOTHING, db_column='user_id', to_field='username')

    class Meta:
        managed = False
        db_table = 'stockscomment'

class StockTradingHistory(models.Model):
    his_id = models.BigAutoField(primary_key=True)
    user = models.ForeignKey(User, models.CASCADE)
    stock_name = models.CharField(max_length=100)
    quantity = models.IntegerField()
    stock_price_per_unit = models.DecimalField(max_digits=10, decimal_places=2)
    purchase_date = models.DateField()
    status = models.IntegerField()

    class Meta:
        managed = True
        db_table = 'stock_trading_history'
