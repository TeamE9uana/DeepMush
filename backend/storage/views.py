from django.shortcuts import render
from rest_framework.views import APIView
from config.environments import get_secret
from config.models import Image, ImageLatLng
from storage.serializers import *
import json
from django.core import serializers
from django.http import HttpResponse


# Create your views here.

class UploadToS3(APIView):
    def post(self,request):
        """
        'Content-Type': 'multipart/form-data'
        image와 json을 동시에 받아서 Image 모델에 저장
        이때 이미지는 S3 저장소에 바로 저장된다.
        """
        ### Parsing data ###
        made_by = request.POST.get('user') # 사용자 이름
        description = request.POST.get('description') # 사용자의 코멘트
        image = request.FILES.get('mushroom_image') # 버섯 이미지
        # json_data = json.loads(request.POST)

        ### Saving data ###
        tuple = Image()
        tuple.made_by = made_by
        tuple.image = image
        tuple.description = description
        tuple.save()
        return HttpResponse(status=200)