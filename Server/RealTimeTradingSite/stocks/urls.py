from django.urls import include, path
from .views import *
from rest_framework import routers

router = routers.DefaultRouter()

urlpatterns = [
    path('', include(router.urls)),
    path('stockinfo', StockInfoList.as_view(), name='stock_info_list'),
    path('stockinfo/<int:pk>', StockInfoDetail.as_view(), name='stock-detail'),
    path('stock_price_history/<str:stock_id>/<int:days>/', StockPriceHistoryDays.as_view(), name='stock_price_history'),
    path('user_stocks/<str:stock_name>', UserStocksList.as_view(), name='user-stocks-list'),
    path('purchase_stock', UserStocksCreate.as_view(), name='user-stocks-create'),
    path('sell_stock', SellStocksAPIView.as_view(), name='user-stocks-create'),
    path('signin', UserSigninAPIView.as_view(), name='user-signin'),
    path('signup', UserSignupAPIView.as_view(), name='user-signup'),
    path('refreshToken', RefreshTokenAPIView.as_view(), name='refresh-token'),
    path('stocks_comments', StocksCommentInfo.as_view(), name='stocks-comments-info'),
    path('stocks_comments/<str:stock_id>', StocksCommentInfo.as_view(), name='stocks-comments-info-stock'),
    path('stocks_comments/delete/<int:comment_id>', StocksCommentInfo.as_view(), name='stocks-comments-info-comment'),
    path('stocks_comments/update/<int:comment_id>', StocksCommentInfo.as_view(), name='stocks-comments-info-update-comment'),
    path('stock_trading_history/<str:stock_name>', StockTradingHistoryListView.as_view(), name='stock-trading-history-list'),
]

