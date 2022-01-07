from config.models import Profile
from rest_framework import serializers


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = '__all__'


class SuccessSerializer(serializers.Serializer):
    success = serializers.BooleanField()
    comment = serializers.CharField()


class InferenceSuccessSerializer(SuccessSerializer):
    inference = serializers.CharField()


class SuccessWithoutCommentSerializer(serializers.Serializer):
    success = serializers.BooleanField()
