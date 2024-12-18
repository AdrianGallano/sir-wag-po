# DRF
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from djoser.serializers import UserSerializer
from .pagination import UserLogPagination

#
import json

# YASG
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

# PILLOW
from PIL import Image as PilImage

# DJANGO
from uuid import uuid4
from django.contrib.auth.models import User

# OS
import os

# CUSTOM
from .models import UserLog, Image
from .serializers import (
    UserLogSerializer,
    UserUserLogSerializer,
    ImageSerializer,
    ManagerCreateSerializer,
)
from django.contrib.auth.models import Group

# |
# | SINGLE OBJECT VIEWSETS
# |


class ManagerViewSet(viewsets.ViewSet):
    permission_classes = [IsAuthenticated, IsAdminUser]

    @swagger_auto_schema(
        request_body=ManagerCreateSerializer,
        responses={
            200: openapi.Response(
                "Success",
                examples={
                    "application/json": {"info": "user has been added as a manager"}
                },
            ),
            400: "Bad Request",
        },
    )
    def create(self, request):
        user_id = request.data.get("user_id")
        user = User.objects.get(id=user_id)
        user.groups.add(Group.objects.get(name="manager"))

        return Response({"info": "user has been added as a manager"})

    def destroy(self, request, pk):
        user = User.objects.get(id=pk)
        user.groups.remove(Group.objects.get(name="manager"))

        return Response({"info": "user has been removed as a manager"})

    def list(self, request):
        managers = Group.objects.get(name="manager").user_set.all()

        serialized_managers = UserSerializer(managers, many=True)

        return Response(serialized_managers.data)

    def me(self, request):
        user = request.user

        if user.groups.filter(name="manager").exists():
            return Response({"is_manager": True})

        return Response({"is_manager": False})


class UserLogViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = UserLog.objects.all()
    serializer_class = UserLogSerializer

    ordering_fields = "__all__"


class ImageViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = Image.objects.all()
    serializer_class = ImageSerializer
    filterset_fields = ["image_url"]

    search_fields = [
        "image_url",
    ]

    ordering_fields = "__all__"
    host_address = os.getenv("WEB_HOST")

    def upload(self, request):
        uploaded_images = []

        request_images = request.FILES.getlist("images")
        image_not_accepted = []

        if "images" not in request.FILES:

            return Response({"error": "images field is required."}, 400)

        if len(request_images) < 1:
            return Response({"error": "no (supported) image/s has been found."}, 400)

        try:
            for image in request.FILES.getlist("images"):
                image_path = os.path.join("media", f"{str(uuid4())}")

                with PilImage.open(image) as im:

                    if str(image).endswith("jpg") or str(image).endswith("jpeg"):
                        image_path += ".jpg"
                        im.save(image_path, "JPEG")

                    elif str(image).endswith("png"):
                        image_path += ".png"
                        im.save(image_path, "PNG")
                    else:
                        image_not_accepted.append(str(image))
                        continue

                uploaded_image = Image.objects.create(
                    image_url=f"{self.host_address}{image_path}"
                )
                uploaded_images.append(uploaded_image)

        except Exception as e:
            return Response(
                {"error": f"uploading of image triggered an error: {e}"}, 400
            )

        serialized_image = ImageSerializer(uploaded_images, many=True)
        return Response(
            {
                "data": serialized_image.data,
                "images_not_accepted": image_not_accepted,
                "info": "we only support png, jpg, and jpeg formats",
            }
        )

    def destroy(self, request, *args, **kwargs):

        image_object = self.get_object()
        without_host_image_url = image_object.image_url.replace(self.host_address, "")
        relative_image_url = os.path.join(".", without_host_image_url)
        os.remove(relative_image_url)

        return super().destroy(request, *args, **kwargs)


# |
# | ALL DIRECT RELATIONSHIP VIEWSETS
# |


class UserUserLogViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = UserLog.objects.all().select_related()
    serializer_class = UserUserLogSerializer
    pagination_class = UserLogPagination
    ordering_fields = "__all__"
