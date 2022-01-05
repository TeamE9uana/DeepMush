from django.urls import path
from .views import UploadToS3

urlpatterns = [
    path('s3/',UploadToS3.as_view(),name='s3'),
]
