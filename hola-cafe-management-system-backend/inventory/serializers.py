from rest_framework import serializers
from .models import Category, Product, Supplier


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"


class SupplierSerializer(serializers.ModelSerializer):
    class Meta:
        model = Supplier
        fields = "__all__"


class ProductSerializer(serializers.ModelSerializer):

    class Meta:
        model = Product
        fields = "__all__"



class ProductSupplierCategorySerializer(serializers.ModelSerializer):
    category = CategorySerializer()
    supplier = SupplierSerializer()

    class Meta:
        model = Product
        fields = "__all__"
