from rest_framework import serializers
from .models import Category, Stock, Supplier, Product
from djoser.serializers import UserSerializer
from core.serializers import ImageSerializer


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"


class SupplierSerializer(serializers.ModelSerializer):
    class Meta:
        model = Supplier
        fields = "__all__"


class StockSerializer(serializers.ModelSerializer):

    class Meta:
        model = Stock
        fields = "__all__"


class ProductSerializer(serializers.ModelSerializer):

    class Meta:
        model = Product
        fields = "__all__"


class StockImageSerializer(serializers.ModelSerializer):
    image = ImageSerializer()

    class Meta:
        model = Stock
        fields = "__all__"


class ProductImageSerializer(serializers.ModelSerializer):
    image = ImageSerializer()

    class Meta:
        model = Product
        fields = "__all__"


class StockSupplierIsStockedByImageSerializer(serializers.ModelSerializer):
    image = ImageSerializer()
    supplier = SupplierSerializer()
    is_stocked_by = UserSerializer()

    class Meta:
        model = Stock
        fields = "__all__"


class ProductCategoryImageSerializer(serializers.ModelSerializer):
    image = ImageSerializer()
    category = CategorySerializer()

    class Meta:
        model = Product
        fields = "__all__"
