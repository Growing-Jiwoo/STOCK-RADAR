import jwt
from django.conf import settings
from rest_framework import status
from rest_framework.exceptions import AuthenticationFailed
from datetime import datetime, timedelta


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



def generate_refresh_token(user):
    refresh_token_payload = {
        'user_id': user.id,
        'exp': datetime.utcnow() + timedelta(days=30)  # Set the expiration for the refresh token (e.g., 30 days)
    }
    refresh_token = jwt.encode(refresh_token_payload, settings.SECRET_KEY, algorithm='HS256')
    return refresh_token
