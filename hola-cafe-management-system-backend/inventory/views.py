from django.http import HttpResponse
from django.views.decorators.http import require_http_methods 
from rest_framework.decorators import api_view
from django.shortcuts import render
from rest_framework import viewsets
from .models import Category, Product, Supplier, Image
from .serializers import (
    CategorySerializer,
    ProductSerializer,
    SupplierSerializer,
    ProductSupplierCategoryImageSerializer,
    ImageSerializer
)
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from PIL import Image as PilImage
import os
from uuid import uuid4

class CategoryViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    filterset_fields = [
        "name",
        "description",
        "created_at",
        "updated_at",
    ]

    search_fields = [
        "name",
        "description",
        "created_at",
        "updated_at",
    ]

    ordering_fields = "__all__"

    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class SupplierViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]

    filterset_fields = [
        "name",
        "description",
        "contact_person",
        "phone_number",
        "address",
        "email",
        "created_at",
        "updated_at",
    ]
    search_fields = [
        "name",
        "description",
        "contact_person",
        "phone_number",
        "address",
        "email",
        "created_at",
        "updated_at",
    ]
    ordering_fields = "__all__"

    queryset = Supplier.objects.all()
    serializer_class = SupplierSerializer


class ProductViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    filterset_fields = [
        "name",
        "description",
        "price",
        "quantity",
        "cost_price",
        "supplier",
        "category",
        "user",
        "created_at",
        "updated_at",
    ]

    search_fields = [
        "name",
        "description",
        "price",
        "quantity",
        "cost_price",
        "supplier",
        "category",
        "user",
        "created_at",
        "updated_at",
        
    ]

    ordering_fields = "__all__"

    def list(self, request):
        queryset = Product.objects.all().select_related("category", "supplier", "image")
        serializer = ProductSupplierCategoryImageSerializer(queryset, many=True)

        return Response(serializer.data)



class ImageViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = Image.objects.all()
    serializer_class = ImageSerializer
    filterset_fields = [
        "image_url"
    ]

    search_fields = [
        "image_url",
    ]

    ordering_fields = "__all__"


    def upload(self, request):
        host_address =  os.getenv("WEB_HOST")
        uploaded_images = []

        request_images = request.FILES.getlist("images")
        image_not_accepted = []

        if('images' not in request.FILES):

            return Response({
                "error":"images field is required."
            }, 400)
        
        if len(request_images) < 1:
            return Response({
                "error":"no (supported) image/s has been found."
            }, 400)
    
        try:
            for image in request.FILES.getlist("images"):
                image_path = os.path.join('media',f"{str(uuid4())}") 

                with PilImage.open(image) as im:

                    if(str(image).endswith("jpg") or str(image).endswith('jpeg')):
                        image_path += ".jpg"
                        im.save(image_path, "JPEG")
                        
                    elif(str(image).endswith("png")):
                        image_path += ".png"
                        im.save(image_path, "PNG")
                    else:
                        image_not_accepted.append(str(image))
                        continue

                uploaded_image = Image.objects.create(image_url=f"{host_address}{image_path}")
                uploaded_images.append(uploaded_image)

        except Exception as e:
            return Response({"error":f"uploading of image triggered an error: {e}"},400)
            
            
        serialized_image = ImageSerializer(uploaded_images, many=True)
        return Response({
            "data": serialized_image.data,
            "images_not_accepted": image_not_accepted,
            "info": "we only support png, jpg, and jpeg formats"
        }) 