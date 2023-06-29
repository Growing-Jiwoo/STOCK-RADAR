from django.db import models

class StockInfo(models.Model):
    name = models.CharField(max_length=50)
    start_price = models.FloatField()
    yesterday_price = models.FloatField()
    current_price = models.FloatField()
    rate_of_change = models.FloatField()
    percentage_diff = models.FloatField(null=True, blank=True)
    timestamp = models.DateTimeField(auto_now_add=True)

class User(models.Model):
    username = models.CharField(max_length=100)
    password = models.CharField(max_length=100)