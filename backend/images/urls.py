from django.urls import path
from .views import *

urlpatterns = [
    path('', ImagesView.as_view(), name='images'),
]
