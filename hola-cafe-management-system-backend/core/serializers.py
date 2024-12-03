# DRF
from rest_framework import serializers

# CUSTOM
from djoser.serializers import UserSerializer
from .models import UserLog, Image


class UserLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserLog
        fields = "__all__"


class ImageSerializer(serializers.ModelSerializer):
    image_url = serializers.URLField(read_only=True)

    class Meta:
        model = Image
        fields = ["id", "image_url"]


class UserUserLogSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = UserLog
        fields = "__all__"
