from django.db import models
from . import settings

User = settings.AUTH_USER_MODEL


# 프로필 테이블
class Profile(models.Model):

    name = models.CharField(max_length=100)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    class Meta:
        db_table = 'profile'
        verbose_name = 'Profile'

    def __str__(self):
        return self.name


class Image(models.Model):
    made_by = models.ForeignKey(Profile, on_delete=models.CASCADE)
    image = models.ImageField(upload_to='DeepMush')
    created_at = models.DateTimeField(auto_now_add=True)
    description = models.TextField()


class ImageLatLng(models.Model):
    image = models.ForeignKey(Image, on_delete=models.CASCADE)
    lat = models.FloatField()
    lng = models.FloatField()

# Inference는 MongoDB로 이동.


class Inference(models.Model):
    using = 'mongodb'

    image = models.ForeignKey(Image, on_delete=models.CASCADE)
    result = models.JSONField()
    result_image = models.ImageField(upload_to='DeepMush')
