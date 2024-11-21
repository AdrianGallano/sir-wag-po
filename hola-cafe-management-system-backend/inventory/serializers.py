from rest_framework import serializers
from .models import Category, Stock, Supplier, Image, Cart, Product, Transaction, ProductOrder

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"


class SupplierSerializer(serializers.ModelSerializer):
    class Meta:
        model = Supplier
        fields = "__all__"

class ImageSerializer(serializers.ModelSerializer):
    image_url = serializers.URLField( read_only=True)
    
    class Meta:
        model = Image
        fields = ["id", "image_url"]

class StockSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stock
        fields = "__all__"



class StockSupplierCategoryImageSerializer(serializers.ModelSerializer):
    image = ImageSerializer()
    
    class Meta:
        model = Stock
        fields = "__all__"

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = "__all__"


class CartSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cart
        fields = "__all__"



class ProductOrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductOrder
        fields = "__all__"


class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = "__all__"


# class TransactionProductOrderSerializer(serializers.Serializer):
#     transaction = TransactionSerializer()
#     product_order = ProductOrderSerializer(many=True)


