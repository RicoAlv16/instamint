from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView

class CustomTokenObtainPairView(TokenObtainPairView):
    pass

class CustomTokenRefreshView(TokenRefreshView):
    pass

class CustomTokenBlacklistView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            # On récupère le token à révoquer depuis la requête
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)
            
            # On révoque le token
            token.blacklist()

            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)
