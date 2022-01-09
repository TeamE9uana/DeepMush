from django.http.response import JsonResponse
from rest_framework.views import APIView
from config.serializers import ProfileSerializer, SuccessSerializer
from config.models import Profile
from rest_framework import status
from drf_yasg.utils import swagger_auto_schema


class MyProfileView(APIView):
    @swagger_auto_schema(operation_id="자신의 정보 조회",
                         responses={
                             status.HTTP_200_OK: ProfileSerializer,
                             status.HTTP_400_BAD_REQUEST: SuccessSerializer,
                         })
    def get(self, request):
        """
        자신의 Profile 조회
        """
        ### Parsing Data ###
        user = request.user

        ### Checking User Existence ###
        try:
            result = Profile.objects.get(user=user)
            result = ProfileSerializer(result).data

            status_code = status.HTTP_200_OK
        except Profile.DoesNotExist:
            result = {'error': 'no user found'}
            status_code = status.HTTP_404_NOT_FOUND

        return JsonResponse(result, status=status_code)
