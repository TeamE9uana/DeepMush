import random
from tempfile import NamedTemporaryFile, TemporaryFile
from typing import List
from hypothesis.extra.django import from_model
from hypothesis import given, settings
from hypothesis.strategies import lists
from config.serializers import ImageSerializer
from config.models import Image, Profile, User
from images.views import ImagesView
from config.tests import ImageStrategy, MockRequestBaseTransactionTestCase
from django.db.models import QuerySet
from django.core.files.uploadedfile import SimpleUploadedFile
from rest_framework import status
import json
# Create your tests here.


class ImagesTestCase(MockRequestBaseTransactionTestCase):
    @given(from_model(Profile, user=from_model(User)), lists(from_model(Image, made_by=from_model(Profile, user=from_model(User)), image=ImageStrategy())))
    @settings(max_examples=10)
    def test_images_get_api(self, profile: Profile, images: List[Image]):
        profile.save()
        for image in images:
            image.made_by = profile
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

        self.assertEquals(parsed_res.get('success'), True, parsed_res)

        self.assertIsNotNone(parsed_res.get('images'), parsed_res)

        self.assertEquals(len(parsed_res.get('images')),
                          len(images), parsed_res)

        response_images = parsed_res.get('images')

        for response_image, image in zip(response_images, images):
            serialized_image = ImageSerializer(image).data

            self.assertEquals(response_image, serialized_image,
                              f"response_image {response_image} != serialized_image {serialized_image}")

    @given(from_model(Profile, user=from_model(User)), lists(ImageStrategy()))
    @settings(max_examples=10)
    def test_images_post_api(self, profile: Profile, images: List[NamedTemporaryFile]):
        profile.save()

        for image in images:
            with open(image.name, 'rb') as f:
                content = f.read()
            image = SimpleUploadedFile(name="mushroom.jpg", content=content, content_type="image/jpg")
        
        user = profile.user
        token = self.get_token(user)

        for image in images:
            lat = random.randrange(0, 10000, 1) / 100
            lng = random.randrange(0, 10000, 1) / 100

            res = self.mock_request(
                user, token, data={'mushroom_image': image, 'lat': lat, 'lng': lng}, content_type="multipart/form-data", view_name='images_view', view=ImagesView, mode='post')

            response_status = status.HTTP_200_OK

            self.check_match_serializer_type(
                res, ImagesView.post, status=response_status)

            parsed_res: dict = json.loads(res.content)

            self.assertEquals(parsed_res.get('success'), True, res.content.decode('utf-8'))
        
        image_columns: QuerySet[Image] = Image.objects.all()

        self.assertEquals(len(images), image_columns.count(),
                            f"images {images} != image_columns {image_columns}")
