from rest_framework import serializers
from .models import Category, Stock, Supplier, Image


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


class ImageSerializer(serializers.ModelSerializer):
    image_url = serializers.URLField( read_only=True)
    
    class Meta:
        model = Image
        fields = "__all__"

class StockSupplierCategoryImageSerializer(serializers.ModelSerializer):
    category = CategorySerializer()
    image = ImageSerializer()
    supplier = SupplierSerializer()

    class Meta:
        model = Stock
        fields = "__all__"
