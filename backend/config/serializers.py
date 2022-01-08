from typing import Optional
from config.models import Image, ImageLatLng, Inference, Profile
from rest_framework import serializers
from drf_yasg.utils import swagger_serializer_method


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = '__all__'


class SuccessSerializer(serializers.Serializer):
    success = serializers.BooleanField()
    comment = serializers.CharField()


class SuccessWithoutCommentSerializer(serializers.Serializer):
    success = serializers.BooleanField()


class InferenceSerializer(serializers.ModelSerializer):

    class Meta:
        model = Inference
        fields = ['result', 'result_image']


class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = '__all__'

    lat = serializers.SerializerMethodField()
    lng = serializers.SerializerMethodField()
    inference = serializers.SerializerMethodField()

    # N+1 문제 추후에 수정 필요

    @ swagger_serializer_method(serializer_or_field=serializers.FloatField(allow_null=True))
    def get_lat(self, obj: Image):
        image_lat_lng: Optional[ImageLatLng] = None

        try:
            image_lat_lng = ImageLatLng.objects.get(image=obj)
        except ImageLatLng.DoesNotExist:
            return None

        return image_lat_lng.lat

    @ swagger_serializer_method(serializer_or_field=serializers.FloatField(allow_null=True))
    def get_lng(self, obj: Image):
        image_lat_lng: Optional[ImageLatLng] = None

        try:
            image_lat_lng = ImageLatLng.objects.get(image=obj)
        except ImageLatLng.DoesNotExist:
            return None

        return image_lat_lng.lng

    @ swagger_serializer_method(serializer_or_field=InferenceSerializer(allow_null=True))
    def get_inference(self, obj: Image):
        inference: Optional[ImageLatLng] = None

        try:
            inference = Inference.objects.get(image=obj)
        except Inference.DoesNotExist:
            return None

        return InferenceSerializer(inference).data


class ImagesSerializer(serializers.ListSerializer):
    child = ImageSerializer()


class ImagesResponseSerializer(serializers.Serializer):
    success = serializers.BooleanField()
    images = ImagesSerializer()
