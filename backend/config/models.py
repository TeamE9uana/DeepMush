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
