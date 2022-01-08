
import json
import tempfile
from django.http.response import JsonResponse
from hypothesis.core import given
from hypothesis.extra.django import TestCase, TransactionTestCase
from hypothesis.strategies._internal.strategies import SearchStrategy
from config.models import User
from rest_framework import status
from rest_framework.serializers import Serializer
from rest_framework.views import APIView
from rest_framework.authtoken.models import Token
from rest_framework.test import APIRequestFactory, force_authenticate
from django.urls import reverse
from typing import Callable, Optional, Type
import uuid


class MockRequestMixin():
    def mock_request(self: TestCase, user: User, token: Token, *, params: dict = {}, data: dict = {}, view_name: str = 'images_view', view: Optional[Type[APIView]] = None, mode: str = 'post'):
        self.assertIsNotNone(view)

        url = reverse(view_name, kwargs=params)
        factory = APIRequestFactory()

        request = factory.__getattribute__(mode)(
            url, data=data, format='json')

        force_authenticate(request, user=user, token=token)

        response = view.as_view()(
            request, **params)

        return response

    def get_token(self, user: User, *, key: Optional[str] = None) -> Token:
        if not key:
            key = str(uuid.uuid4())

        existing_token = Token.objects.filter(user=user)

        if existing_token.exists():
            return existing_token.get()

        key = key[:40]

        return Token.objects.get_or_create(key=key, user=user)[0]

    def check_match_serializer_type(self: TestCase, res: JsonResponse, method: Callable, *, status=status.HTTP_200_OK):
        self.assertEquals(res.status_code, status, res.content)

        parsed_res = json.loads(res.content)

        schema: dict = method._swagger_auto_schema
        srl: Optional[Type[Serializer]] = schema.get(
            'responses', {}).get(status, None)

        self.assertNotEquals(srl, None)

        serialized_res = srl(data=parsed_res)
        self.assertTrue(serialized_res.is_valid(), serialized_res.errors)


class MockRequestBaseTestCase(TestCase, MockRequestMixin):
    pass


class MockRequestBaseTransactionTestCase(TransactionTestCase, MockRequestMixin):
    pass


class ImageStrategy(SearchStrategy):
    def __init__(self, url="images/example/mushroom.jpg"):
        super().__init__()
        self.url = url

    def __code__(self):
        return super().__code__()

    @staticmethod
    def generate_image(url=""):
        temp_image_file = tempfile.NamedTemporaryFile()

        with open(url, 'rb') as image_file:
            temp_image_file.write(image_file.read())

        temp_image_file.seek(0)

        return temp_image_file

    def do_draw(self, data):
        return self.generate_image(self.url)
