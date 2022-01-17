from django.http.response import JsonResponse
from rest_framework.views import APIView
from rest_framework.request import Request
from config.models import ImageLatLng, Profile, Image
from django.db.models import Q
from drf_yasg.utils import swagger_auto_schema
from config.serializers import ImagesResponseSerializer, SuccessSerializer
from rest_framework import status
from drf_yasg import openapi

# Create your views here.


class LatlngsView(APIView):
    @swagger_auto_schema(
        operation_id="위치 기준으로 근처에 수집된 이미지 검색",
        manual_parameters=[
            openapi.Parameter('lat', openapi.IN_QUERY, description="current user's latitude",
                              type=openapi.TYPE_NUMBER, required=True),
            openapi.Parameter('lng', openapi.IN_QUERY, description="current user's longitude",
                              type=openapi.TYPE_NUMBER, required=True),
            openapi.Parameter('show_others', openapi.IN_QUERY, description="if true, show others images as well as my ones",
                              type=openapi.TYPE_BOOLEAN, required=False, default=False)
        ],
        responses={
            status.HTTP_200_OK: ImagesResponseSerializer,
            status.HTTP_400_BAD_REQUEST: SuccessSerializer
        })
    def get(self, request: Request):
        user = request.user
        profile = Profile.objects.get(user=user.id)

        lat = request.GET.get('lat', None)
        lng = request.GET.get('lng', None)

        if None in [lat, lng]:
            return JsonResponse({'success': False, 'comment': 'lat or lng not given'})

        show_others = request.GET.get('show_others', False)

        images = Image.objects.filter(imagelatlng__lat__range=(
            lat-0.5, lat+0.5), imagelatlng__lng__range=(lng-0.5, lng+0.5))

        if not show_others:
            images = images.filter(made_by=profile.id)

        result = ImagesResponseSerializer(
            {'success': True, 'images': images}).data

        return JsonResponse(result, status=status.HTTP_200_OK)
