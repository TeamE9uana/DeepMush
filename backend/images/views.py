from django.http.response import JsonResponse
from rest_framework.views import APIView

from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from inference.tasks import expect_image_task
from config.serializers import ImageResponseSerializer, ImagesResponseSerializer, SuccessSerializer, SuccessWithInferenceSerializer

from config.models import Image, ImageLatLng, Inference, Profile
from images.serializers import *
from rest_framework.parsers import MultiPartParser, FormParser, FileUploadParser
from rest_framework.request import Request
from rest_framework import status
import tempfile
from django.core.files.base import ContentFile
from uuid import uuid4

# Create your views here.

class Description:
    @staticmethod
    def get(max_label_name):
        description = ''
        if max_label_name == 'youngji':
            description = "여름철 활엽수에서 돋아나는 불로초과 1년생 버섯. 영지초, 지초, 불로초라고 부르기도 한다."
        elif max_label_name == 'noru':
            description = "영미권에서는 Lion's mane (사자갈기) 라고 불리는, 산호침버섯속 노루궁뎅이과에 속하는 버섯으로, 정식 명칭은 노루궁뎅이이다. "
        elif max_label_name == 'neungi':
            description = "사마귀버섯목 능이버섯과 능이버섯속의 식용 버섯."
        elif max_label_name == 'songe':
            description = "균계 담자균문 담자균강 주름버섯목 송이과 송이속의 식용 버섯."
        elif max_label_name == 'woodear':
            description = "담자균강 목이목의 버섯. 해외에선 식용으로 인기가 없었기 때문에 중국을 통해 알려졌다."
        elif max_label_name == 'shitake':
            description = "봄부터 가을에 걸쳐 밤나무, 떡갈나무 등 주로 활엽수의 죽은 나무 줄기에서 자란다."
        elif max_label_name == 'yellowegg':
            description = "달걀버섯과 비슷하지만 색깔이 노란색이다. 자주 독버섯과 헷갈린다. 애초에 보호종이기 때문에 손도 대지 말자."
        elif max_label_name == 'enoki':
            description = 'NOT USE'
        elif max_label_name == 'songi':
            description = 'NOT USE'
        else:
            description = "ERROR"
        return description


class ImagesView(APIView):
    parser_classes = (MultiPartParser, )

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
                name="lat",
                in_=openapi.IN_FORM,
                type=openapi.TYPE_NUMBER,
                required=False,
            ),
            openapi.Parameter(
                name="lng",
                in_=openapi.IN_FORM,
                type=openapi.TYPE_NUMBER,
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
        image_file = request.data.get('mushroom_image', None)  # 버섯 이미지

        if not image_file:
            return JsonResponse({'success': False, 'result': 'image not given'}, status=status.HTTP_400_BAD_REQUEST)

        ### save temp image for using file by path ###

        temp_image_file = tempfile.NamedTemporaryFile()
        temp_image_file.write(image_file.read())

        image_file.seek(0)

        ### Saving data ###
        image: Image = Image.objects.create(
            made_by=profile, image=image_file, description="")
        image.save()

        found_lat_Lng = False
        if (lat := request.data.get('lat')) != None and (lng := request.data.get('lng')) != None:
            try:
                lat = int(lat)
                lng = int(lng)
            except TypeError:
                return JsonResponse({'error': 'lat or lng is not number'}, status=status.HTTP_400_BAD_REQUEST)
            found_lat_Lng = True
            lat_Lng = ImageLatLng.objects.create(image=image, lat=lat, lng=lng)
            lat_Lng.save()

        not_found_comment = 'not ' if not found_lat_Lng else ''

        inference, path = expect_image_task.delay(image.image.url).get()

        max_prob = 0
        max_label_name = ''
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
            if prob > max_prob:
                max_prob = prob
                max_label_name = label_name

        with open(path, 'rb') as inference_img:
            data = inference_img.read()

        inference_obj = Inference()

        inference_obj.image = image
        inference_obj.result = inference

        uid = str(uuid4())

        filename = f"{uid}.png"
        inference_obj.result_image.save(filename, ContentFile(data))

        inference_obj.save()

        image.description = Description.get(max_label_name)
        image.save()

        result = {'success': True,
                  'comment': f'LatLng {not_found_comment}given',
                  'result': inference,
                  'result_image': inference_obj.result_image.url}

        return JsonResponse(result, status=status.HTTP_200_OK)


class ImageView(APIView):
    parser_classes = (MultiPartParser,)

    @swagger_auto_schema(
        operation_id="이미지 조회",
        responses={
            status.HTTP_200_OK: ImagesResponseSerializer,
            status.HTTP_404_NOT_FOUND: SuccessSerializer
        })
    def get(self, request: Request, image: int):
        user = request.user
        profile = Profile.objects.get(user=user.id)

        try:
            image = Image.objects.get(id=image, made_by=profile)
        except Image.DoesNotExist:
            result = SuccessSerializer(
                {'success': False, 'comment': 'not found'}).data
            return JsonResponse(result, status=status.HTTP_404_NOT_FOUND)

        result = ImageResponseSerializer(
            {'success': True, 'image': image}).data

        return JsonResponse(result, status=status.HTTP_200_OK)

    @swagger_auto_schema(
        operation_id="S3 버킷에서 특정 이미지 삭제",
        responses={
            status.HTTP_200_OK: SuccessSerializer,
            status.HTTP_404_NOT_FOUND: SuccessSerializer
        }
    )
    def delete(self, request, image: int):
        """
        URL에 포함된 ID값으로 이미지 삭제
        """
        user = request.user
        profile = Profile.objects.get(user=user.id)

        try:
            image = Image.objects.get(id=image, made_by=profile)
            image_id = image.id
        except Image.DoesNotExist:
            result = {'success': False,
                      'comment': 'image not found'}

            return JsonResponse(result, status=status.HTTP_404_NOT_FOUND)

        # CASCADE FK 제약조건에 의해서 image에 의존하는 테이블의 튜플들은 자동으로 삭제됨.
        image.delete()

        result = {'success': True,
                  'comment': f'deleted image {image_id}'}

        return JsonResponse(result, status=status.HTTP_200_OK)


class ImageDeleteView(APIView):
    @ swagger_auto_schema(
        operation_id="S3 버킷에서 특정 이미지 삭제",
        manual_parameters=[
            openapi.Parameter(
                name="image_id",
                in_=openapi.IN_QUERY,
                type=openapi.TYPE_INTEGER,
                required=True,
            )
        ])
    def delete(self, request):
        """
        URL에 포함된 ID값으로 이미지 삭제
        """
        id = request.GET.get("image_id")

        try:
            record_img = Image.objects.get(id=id)
            record_img.delete()

            result = {'success': True,
                      'comment': 'image found'}

            return JsonResponse(result, status=status.HTTP_200_OK)

        except:
            result = {'success': False,
                      'comment': 'image not found'}

            return JsonResponse(result, status=status.HTTP_404_NOT_FOUND)
