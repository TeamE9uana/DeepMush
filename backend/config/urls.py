"""config URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include, re_path
from django.views.static import serve
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from rest_framework import permissions
from config import settings
from drf_yasg.generators import OpenAPISchemaGenerator

from django.contrib.staticfiles.urls import staticfiles_urlpatterns

api_info = openapi.Info(
    title="Deepmush API",
    default_version='v2',
    description="Deepmush API 문서입니다.\n토큰 인증을 하실 때는 헤더에 'Token xxx' 형태로 액세스 토큰에 Token 접두사를 붙여주세요.\n로컬에서 개발하실 때에는 하단의 HTTP 스키마를 선택해 주시고, 실제 서버에서는 HTTPS 스키마를 선택해 주세요!",
    contact=openapi.Contact(email="optional.int@kakao.com"),
    license=openapi.License(name="MIT License"),
)


class BothHttpAndHttpsSchemaGenerator(OpenAPISchemaGenerator):
    def get_schema(self, request=None, public=False):
        schema = super().get_schema(request, public)
        schema.schemes = ["https", "http"]
        return schema


schema_view = get_schema_view(
    api_info,
    generator_class=BothHttpAndHttpsSchemaGenerator,
    public=True,
    permission_classes=(permissions.AllowAny,),
)

urlpatterns = [
    path(r'swagger(?P<format>\.json|\.yaml)$',
         schema_view.without_ui(cache_timeout=0), name='schema-json'),
    path('swagger/', schema_view.with_ui('swagger',
                                         cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc',
                                       cache_timeout=0), name='schema-redoc'),
    path('admin/', admin.site.urls),
    path('accounts/', include('accounts.urls')),
    path('images/', include('images.urls')),
    path('users/', include('users.urls')),
    path('images/', include('latlngs.urls'))
]

static_urlpatterns = [
    re_path(r"^static-files/(?P<path>.*)$", serve,
            {"document_root": settings.STATIC_ROOT}),
]

media_urlpatterns = [
    re_path(r"^media/(?P<path>.*)$", serve,
            {"document_root": settings.STATIC_ROOT})
]

urlpatterns += [
    path("", include(static_urlpatterns)),
    path("", include(media_urlpatterns)),
]
