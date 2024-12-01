from rest_framework import serializers
from .models import Category, Stock, Supplier, Image, Cart, Product, Transaction, ProductOrder, UserLog
from django.contrib.auth.models import User
from djoser.serializers import UserSerializer


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


class UserLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserLog
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

class StockSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Stock
        fields = "__all__"

class ProductSerializer(serializers.ModelSerializer):
    
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



class ProductServiceCrewCartSerializer(serializers.ModelSerializer):
    service_crew = UserSerializer()
    product = ProductSerializer()

    class Meta:
        model = Cart
        fields = "__all__"

class UserUserLogSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = UserLog
        fields = "__all__"

class ProductTransactionProductOrderSerializer(serializers.ModelSerializer):
    product = ProductSerializer()
    transaction = TransactionSerializer()
    
    class Meta:
        model = ProductOrder
        fields = "__all__"


class ProductOrderProductSerializer(serializers.ModelSerializer):
    product = ProductSerializer()
    
    class Meta:
        model = ProductOrder
        exclude = ["transaction"]

class ProductProductOrderTransactionSerializer(serializers.ModelSerializer):
    product_orders = ProductOrderProductSerializer(source='productorder_set', many=True)
    service_crew = UserSerializer()
    class Meta:
        model = Transaction
        fields = ['id', 'service_crew', 'total_price', 'payment_method', 'created_at', 'updated_at', 'product_orders']
# productorder
# transaction


# create a way for transaction to reverse get all his related objcts

 
        



