from config.models import Profiles
from rest_framework import serializers


class ProfilesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profiles
        fields = '__all__'
