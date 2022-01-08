from typing import List
from hypothesis.extra.django import from_model
from hypothesis import given
from hypothesis.strategies import lists
from config.serializers import ImageSerializer
from config.models import Image, Profile, User
from images.views import ImagesView
from config.tests import MockRequestBaseTestCase
from rest_framework import status
import json

# Create your tests here.


class ValidationTestCase(MockRequestBaseTestCase):
    @given(from_model(Profile, user=from_model(User)), lists(from_model(Image)))
    def test_images_get_api(self, profile: Profile, images: List[Image]):
        profile.save()
        for image in images:
            image.save()

        images.sort(key=lambda x: x.id, reverse=True)

        user = profile.user
        token = self.get_token(user)

        res = self.mock_request(
            user, token, view_name='images_view', view=ImagesView, mode='get')

        response_status = status.HTTP_200_OK

        self.check_match_serializer_type(
            res, ImagesView.get, status=response_status)

        parsed_res: dict = json.loads(res.content)

        self.assertEquals(parsed_res.get('success'), True)

        self.assertEquals(len(parsed_res.get('images')), len(images))

        response_images = parsed_res.get('images')

        for response_image, image in zip(response_images, images):
            serialized_image = ImageSerializer(image).data

            self.assertEquals(response_image, serialized_image)
