from django.urls import path
from .views import ImagesView

urlpatterns = [
    path('', ImagesView.as_view(), name='images_view'),
]
