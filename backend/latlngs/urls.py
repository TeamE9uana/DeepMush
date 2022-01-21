from django.urls import path
from .views import LatlngsView

urlpatterns = [
    path('nearby/', LatlngsView.as_view(), name='latlngs_view')
]
