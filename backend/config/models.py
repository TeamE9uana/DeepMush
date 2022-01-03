from django.db import models
from . import settings

Users = settings.AUTH_USER_MODEL


# 프로필 테이블
class Profiles(models.Model):

    name = models.CharField(max_length=100)
    user = models.ForeignKey(Users, on_delete=models.CASCADE)

    class Meta:
        db_table = 'profiles'
        verbose_name = 'Profile'

    def __str__(self):
        return self.name
