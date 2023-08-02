from django.urls import include, path
from .views import StockInfoList, UserSigninAPIView, UserSignupAPIView, RefreshTokenAPIView
from rest_framework import routers

router = routers.DefaultRouter()

urlpatterns = [
    path('', include(router.urls)),
    path('stockinfo', StockInfoList.as_view(), name='stock_info_list'),
    path('signin', UserSigninAPIView.as_view(), name='user-signin'),
    path('signup', UserSignupAPIView.as_view(), name='user-signup'),
    path('refreshToken', RefreshTokenAPIView.as_view(), name='refresh-token'),
]
