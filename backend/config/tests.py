
import json
from django.http.response import JsonResponse
from django.test.testcases import TransactionTestCase
from hypothesis.core import given
from hypothesis.extra.django import TestCase, from_model
from config.models import UserModel, User
from rest_framework import status
from rest_framework.serializers import Serializer
from rest_framework.views import APIView
from rest_framework.authtoken.models import Token
from rest_framework.test import APIRequestFactory, force_authenticate
from django.urls import reverse
from typing import Callable, Optional, Type
import uuid


class MockRequestMixin():
    def mock_request(self: TestCase, user: UserModel, token: Token, *, params: dict = {}, data: dict = {}, view_name: str = 'users_info_view', view: Optional[Type[APIView]] = None, mode: str = 'post'):
        self.assertIsNotNone(view)

        url = reverse(view_name, kwargs=params)
        factory = APIRequestFactory()

        request = factory.__getattribute__(mode)(
            url, data=data, format='json')

        force_authenticate(request, user=user, token=token)

        response = view.as_view()(
            request, **params)

        return response

    def get_token(self, user: UserModel, *, key: Optional[str] = None) -> Token:
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
