from django.urls import path
from .views import *

urlpatterns = [
    path('me/', MyProfileView.as_view(), name='my_profile'),
]
