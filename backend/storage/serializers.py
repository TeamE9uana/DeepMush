from django.db.models import fields
from rest_framework import serializers
from config.models import Image, ImageLatLng

class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = ['made_by','image','description']
    # validate code

    # saving object code

class ImageLatLngSerializer(serializers.ModelSerializer):
    class Meta:
        model = ImageLatLng
        fields = ['image','lat','lng']
    # validate code

    # saving object code

