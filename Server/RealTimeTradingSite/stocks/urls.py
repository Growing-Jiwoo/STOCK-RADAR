from django.urls import include, path
from .views import StockInfoList, UserSigninAPIView, UserSignupAPIView, RefreshTokenAPIView, UserStocksCreate, \
    SellStocksAPIView, StockInfoDetail, AllStockPriceHistory
from rest_framework import routers

router = routers.DefaultRouter()

urlpatterns = [
    path('', include(router.urls)),
    path('stockinfo', StockInfoList.as_view(), name='stock_info_list'),
    path('stockinfo/<int:pk>/', StockInfoDetail.as_view(), name='stock-detail'),
    path('stock_price_history/', AllStockPriceHistory.as_view(), name='all_stock_price_history'),
    path('purchase_stock', UserStocksCreate.as_view(), name='user-stocks-create'),
    path('sell_stock', SellStocksAPIView.as_view(), name='user-stocks-create'),
    path('signin', UserSigninAPIView.as_view(), name='user-signin'),
    path('signup', UserSignupAPIView.as_view(), name='user-signup'),
    path('refreshToken', RefreshTokenAPIView.as_view(), name='refresh-token'),
]
