from django.urls import path
from .views import *

urlpatterns = [
    path('', ImageUploadView.as_view(), name='image_upload'),
]
