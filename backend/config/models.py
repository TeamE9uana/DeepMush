from . import settings
from django.db import models
from django.contrib.auth.models import User
from djongo import models as mongoModels


# 프로필 테이블
class Profile(models.Model):

    name = models.CharField(max_length=100)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    class Meta:
        db_table = 'profile'
        verbose_name = 'Profile'

    def __str__(self):
        return f"Profile {self.id} {{name: {self.name}, user: {self.user}}}"


class Image(models.Model):
    made_by = models.ForeignKey(Profile, on_delete=models.CASCADE)
    image = models.ImageField(upload_to='DeepMush')
    created_at = models.DateTimeField(auto_now_add=True)
    description = models.TextField()

    def __str__(self):
        return f"Image {self.id} {{made_by: {self.made_by}, created_at: {self.created_at}, description: {self.description}}}"


class ImageLatLng(models.Model):
    image = models.ForeignKey(Image, on_delete=models.CASCADE)
    lat = models.FloatField()
    lng = models.FloatField()

    def __str__(self):
        return f"ImageLatLng {self.id} {{image: {self.image}, lat: {self.lat}, lng: {self.lng}}}"

# Inference는 MongoDB로 이동.


class Inference(models.Model):
    using = 'mongodb'

    image = models.ForeignKey(Image, on_delete=models.CASCADE)
    result = mongoModels.JSONField()
    result_image = models.ImageField(upload_to='DeepMush')

    def __str__(self):
        return f"Inference {self.id} {{image: {self.image}, created_at: {self.created_at}}}"

