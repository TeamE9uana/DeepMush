from django.http.response import JsonResponse
from rest_framework.views import APIView

from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from inference.tasks import expect_image_task
from config.serializers import ImagesResponseSerializer, SuccessSerializer, SuccessWithInferenceSerializer

from config.models import Image, ImageLatLng, Inference, Profile
from images.serializers import *
from rest_framework.parsers import MultiPartParser
from rest_framework.request import Request
from rest_framework import status
from GPSPhoto import gpsphoto
import tempfile
from django.core.files.base import ContentFile
from uuid import uuid4

# Create your views here.


class ImagesView(APIView):
    parser_classes = (MultiPartParser,)

    @swagger_auto_schema(
        operation_id="자신의 이미지 목록 조회",
        responses={
            status.HTTP_200_OK: ImagesResponseSerializer
        })
    def get(self, request: Request):
        user = request.user
        profile = Profile.objects.get(user=user.id)

        images = Image.objects.filter(made_by=profile).order_by('-id')

        result = ImagesResponseSerializer(
            {'success': True, 'images': images}).data

        return JsonResponse(result, status=status.HTTP_200_OK)

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
            status.HTTP_200_OK: SuccessWithInferenceSerializer,
            status.HTTP_400_BAD_REQUEST: SuccessSerializer,
        })
    def post(self, request: Request):
        """
        'Content-Type': 'multipart/form-data'
        image와 json을 동시에 받아서 Image 모델에 저장하고 추론 결과를 반환한다.
        이때 이미지는 S3 저장소에 바로 저장된다.
        """
        ### Parsing data ###
        user = request.user  # 사용자
        profile = Profile.objects.get(user=user.id)
        description = request.POST.get('description', '')  # 사용자의 코멘트
        image_file = request.FILES.get('mushroom_image', None)  # 버섯 이미지

        if not image_file:
            return JsonResponse({'success': False, 'result': 'image not given'}, status=status.HTTP_400_BAD_REQUEST)

        ### save temp image for using file by path ###

        temp_image_file = tempfile.NamedTemporaryFile()
        temp_image_file.write(image_file.read())

        image_file.seek(0)

        ### Saving data ###
        image: Image = Image.objects.create(
            made_by=profile, image=image_file, description=description)
        image.save()

        ### Saving latlng data using exif(image metadata) ###
        gps_data: dict = gpsphoto.getGPSData(temp_image_file.name)

        found_lat_Lng = False
        if (lat := gps_data.get('Latitude')) and (lng := gps_data.get('Longitude')):
            found_lat_Lng = True
            lat_Lng = ImageLatLng.objects.create(image=image, lat=lat, lng=lng)
            lat_Lng.save()

        not_found_comment = 'not ' if not found_lat_Lng else ''

        inference, path = expect_image_task.delay(image.image.url).get()

        for idx, elem in enumerate(inference):
            x, y, w, h, prob, label, label_name = elem

            inference[idx] = {
                'x': x,
                'y': y,
                'w': w,
                'h': h,
                'prob': prob,
                'label': label,
                'label_name': label_name
            }

        with open(path, 'rb') as inference_img:
            data = inference_img.read()

        inference_obj = Inference()

        inference_obj.image = image
        inference_obj.result = inference

        uid = str(uuid4())

        filename = f"{uid}.png"
        inference_obj.result_image.save(filename, ContentFile(data))

        inference_obj.save()

        result = {'success': True,
                  'comment': f'LatLng {not_found_comment}found',
                  'result': inference,
                  'result_image': inference_obj.result_image.url}

        return JsonResponse(result, status=status.HTTP_200_OK)

class ImageDeleteView(APIView):
    @swagger_auto_schema(
        operation_id="S3 버킷에서 특정 이미지 삭제",
        manual_parameters=[
            openapi.Parameter(
                name="image_id",
                in_=openapi.IN_QUERY,
                type=openapi.TYPE_INTEGER,
                required=True,
            )
        ])
    def get(self,request):
        """
        URL에 포함된 ID값으로 이미지 삭제
        """
        id = request.GET.get("image_id")

        try:
            record_img = Image.objects.get(id=id)
            
            ### 아직 inference table과 latlng table에 데이터가 없기 때문에 주석 처리함 ###
            # record_inf = Inference.objects.get(image=record_img)
            # record_latlng = ImageLatLng.objects.get(image=record_img)
            
            ### 지우는 순서 주의! ###
            # record_inf.delete()
            # record_latlng.delete()
            record_img.delete()

            result = {'success': True,
                      'comment':'image found'}

            return JsonResponse(result, status=status.HTTP_200_OK)

        except:
            result = {'success': False,
                      'comment':'image not found'}

            return JsonResponse(result, status=status.HTTP_404_NOT_FOUND)