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
    stock = models.ForeignKey(StockInfo, models.DO_NOTHING)
    quantity = models.IntegerField()
    purchase_price = models.DecimalField(max_digits=10, decimal_places=2)
    purchase_date = models.DateField()

    class Meta:
        managed = False
        db_table = 'user_stocks'

class StockPriceHistory(models.Model):
    stock = models.ForeignKey(StockInfo, on_delete=models.CASCADE)
    current_price = models.DecimalField(max_digits=10, decimal_places=2)
    timestamp = models.DateTimeField()

    class Meta:
        ordering = ['-timestamp']

