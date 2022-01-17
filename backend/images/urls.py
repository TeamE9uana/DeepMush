from django.urls import path
from .views import ImagesView, ImageView

urlpatterns = [
    path('', ImagesView.as_view(), name='images_view'),
    path('<int:image>/', ImageView.as_view(), name='image_view'),
]
