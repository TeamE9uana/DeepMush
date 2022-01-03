from django.urls import path
from . import views

urlpatterns = [
    path('google/login/', views.GoogleLoginView.as_view(), name='google_login'),
    path('google/callback/', views.GoogleCallbackView.as_view(),
         name='google_callback'),
    path('google/login/finish/', views.GoogleLogin.as_view(),
         name='google_login_to_django'),

    path('kakao/login/', views.KakaoLoginView.as_view(), name='kakao_login'),
    path('kakao/callback/', views.KakaoCallbackView.as_view(), name='kakao_callback'),
    path('kakao/login/finish/', views.KakaoLoginToDjango.as_view(),
         name='kakao_login_to_django'),
]
