from rest_framework import serializers
from .models import (
    Category,
    Stock,
    Supplier,
    Product,
    StockCart,
    StockUsed,
    StockTransaction,
)
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


class StockCartSerializer(serializers.ModelSerializer):
    class Meta:
        model = StockCart
        fields = "__all__"


class StockUsedSerializer(serializers.ModelSerializer):
    class Meta:
        model = StockUsed
        fields = "__all__"


class StockTransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = StockTransaction
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


class StockCartDepthSerializer(serializers.ModelSerializer):
    class Meta:
        model = StockCart
        fields = "__all__"
        depth = 2

class StockUsedDepthSerializer(serializers.ModelSerializer):
    class Meta:
        model = StockUsed
        fields = "__all__"
        depth = 2


class StockUsedOneDepthSerializer(serializers.ModelSerializer):
    class Meta:
        model = StockUsed
        fields = "__all__"
        depth = 1


class StockTransactionDepthSerializer(serializers.ModelSerializer):
    
    stock_used = StockUsedOneDepthSerializer(source="stockused_set", many=True)
    service_crew = UserSerializer() 
    
    class Meta:
        model = StockTransaction
        fields = [
            "id",
            "service_crew",
            "created_at",
            "updated_at",
            "stock_used",
        ]
        depth = 2