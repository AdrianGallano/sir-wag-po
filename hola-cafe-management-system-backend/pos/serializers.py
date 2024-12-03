from rest_framework import serializers
from djoser.serializers import UserSerializer
from .models import Cart, ProductOrder, Transaction
from inventory.serializers import ProductSerializer


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


class ProductServiceCrewCartSerializer(serializers.ModelSerializer):
    service_crew = UserSerializer()
    product = ProductSerializer()

    class Meta:
        model = Cart
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
    product_orders = ProductOrderProductSerializer(source="productorder_set", many=True)
    service_crew = UserSerializer()

    class Meta:
        model = Transaction
        fields = [
            "id",
            "service_crew",
            "total_price",
            "payment_method",
            "created_at",
            "updated_at",
            "product_orders",
        ]
