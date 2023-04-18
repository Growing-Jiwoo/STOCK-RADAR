from django.urls import path
from .views import HiView, StockInfoList

urlpatterns = [
    path('hi/', HiView.as_view(), name='hi'),
    path('stockinfo/', StockInfoList.as_view(), name='stock_info_list'),
]
