from django.shortcuts import render
from rest_framework import viewsets
from .models import Category, Product, Supplier
from .serializers import (
    CategorySerializer,
    ProductSerializer,
    SupplierSerializer,
    ProductSupplierCategorySerializer,
)
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated


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
        queryset = Product.objects.all().select_related("category", "supplier")
        serializer = ProductSupplierCategorySerializer(queryset, many=True)

        return Response(serializer.data)
