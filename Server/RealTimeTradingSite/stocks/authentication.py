import jwt
from django.conf import settings
from rest_framework import status
from rest_framework.exceptions import AuthenticationFailed


def authenticate_request(request):
    auth_header = request.headers.get('Authorization')
    if not auth_header:
        raise AuthenticationFailed({'error': '토큰이 없음'}, status.HTTP_401_UNAUTHORIZED)
    try:
        token = auth_header.split()[1]
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256'])
    except jwt.ExpiredSignatureError:
        raise AuthenticationFailed({'error': '토큰 만료'}, status.HTTP_401_UNAUTHORIZED)
    except (jwt.DecodeError, jwt.InvalidTokenError):
        raise AuthenticationFailed({'error': '잘못된 토큰'}, status.HTTP_401_UNAUTHORIZED)

    return payload