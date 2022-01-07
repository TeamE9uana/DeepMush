from django.contrib import admin
from config import models


@admin.register(models.Profile)
class ProfileAdmin(admin.ModelAdmin):
    pass


@admin.register(models.Image)
class ImageAdmin(admin.ModelAdmin):
    pass


@admin.register(models.ImageLatLng)
class ImageLatLngAdmin(admin.ModelAdmin):
    pass


@admin.register(models.Inference)
class InferenceAdmin(admin.ModelAdmin):
    pass
