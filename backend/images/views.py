from django.http.response import JsonResponse
from rest_framework.views import APIView

from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from config.serializers import SuccessSerializer

from config.models import Image, ImageLatLng, Profile
from storage.serializers import *
from rest_framework.parsers import MultiPartParser
from rest_framework.request import Request
from rest_framework import status
from GPSPhoto import gpsphoto
import tempfile

# Create your views here.


class UploadToS3(APIView):
    parser_classes = (MultiPartParser,)

    @swagger_auto_schema(
        operation_id="S3 버킷에 이미지 저장",
        manual_parameters=[
            openapi.Parameter(
                name="mushroom_image",
                in_=openapi.IN_FORM,
                type=openapi.TYPE_FILE,
                required=True,
            ),
            openapi.Parameter(
                name="description",
                in_=openapi.IN_FORM,
                type=openapi.TYPE_STRING,
                required=False,
            ),
        ],
        responses={
            status.HTTP_200_OK: SuccessSerializer,
            status.HTTP_400_BAD_REQUEST: SuccessSerializer,
        })
    def post(self, request: Request):
        """
        'Content-Type': 'multipart/form-data'
        image와 json을 동시에 받아서 Image 모델에 저장
        이때 이미지는 S3 저장소에 바로 저장된다.
        """
        ### Parsing data ###
        user = request.user  # 사용자
        profile = Profile.objects.get(user=user.id)
        description = request.POST.get('description', '')  # 사용자의 코멘트
        image_file = request.FILES.get('mushroom_image', None)  # 버섯 이미지

        if not image_file:
            return JsonResponse({'success': False, 'result': 'image not given'}, status=status.HTTP_400_BAD_REQUEST)

        ### Saving data ###
        image = Image.objects.create(
            made_by=profile, image=image_file, description=description)
        image.save()

        ### save temp image for using file by path ###
        image_file.seek(0)

        temp_image_file = tempfile.NamedTemporaryFile()
        temp_image_file.write(image_file.read())

        ### Saving latlng data using exif(image metadata) ###
        gps_data: dict = gpsphoto.getGPSData(temp_image_file.name)

        found_lat_Lng = False
        if (lat := gps_data.get('Latitude')) and (lng := gps_data.get('Longitude')):
            found_lat_Lng = True
            lat_Lng = ImageLatLng.objects.create(image=image, lat=lat, lng=lng)
            lat_Lng.save()

        not_found_comment = 'not ' if not found_lat_Lng else ''

        result = {'success': True,
                  'comment': f'LatLng {not_found_comment}found'}

        return JsonResponse(result, status=status.HTTP_200_OK)
