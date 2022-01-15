from typing import Optional
from config.models import Image, ImageLatLng, Inference, Profile, User
from rest_framework import serializers
from drf_yasg.utils import swagger_serializer_method


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ['id', 'name', 'email']

    email = serializers.SerializerMethodField()

    @swagger_serializer_method(serializer_or_field=serializers.CharField())
    def get_email(self, obj):
        return obj.user.email


class SuccessSerializer(serializers.Serializer):
    success = serializers.BooleanField()
    comment = serializers.CharField()


class InferenceSuccessSerializer(SuccessSerializer):
    inference = serializers.CharField()


class SuccessWithoutCommentSerializer(serializers.Serializer):
    success = serializers.BooleanField()


class BoundingBoxSerializer(serializers.ListSerializer):
    class BoundingBoxElementSerializer(serializers.Serializer):
        x = serializers.FloatField()
        y = serializers.FloatField()
        w = serializers.FloatField()
        h = serializers.FloatField()
        prob = serializers.FloatField()
        label = serializers.IntegerField()
        label_name = serializers.CharField()
    child = BoundingBoxElementSerializer()


class InferenceSerializer(serializers.ModelSerializer):

    class Meta:
        model = Inference
        fields = ['id', 'result', 'result_image']

    result = serializers.SerializerMethodField()

    # string으로 출력되는 것 방지
    @swagger_serializer_method(serializer_or_field=BoundingBoxSerializer())
    def get_result(self, obj):
        return obj.result


class SuccessWithInferenceSerializer(SuccessSerializer):
    result = BoundingBoxSerializer()
    result_image = serializers.CharField()


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
        inferences = Inference.objects.filter(image=obj).order_by('id')

        inference = inferences.first()

        if not inference:
            return None

        return InferenceSerializer(inference).data


class ImagesSerializer(serializers.ListSerializer):
    child = ImageSerializer()


class ImagesResponseSerializer(serializers.Serializer):
    success = serializers.BooleanField()
    images = ImagesSerializer()


class ImageResponseSerializer(serializers.Serializer):
    success = serializers.BooleanField()
    image = ImageSerializer()
