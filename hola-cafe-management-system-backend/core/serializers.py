# DRF
from rest_framework import serializers

# CUSTOM
from djoser.serializers import UserSerializer
from .models import UserLog, Image
from pos.models import Transaction, ProductOrder
from inventory.models import Stock


class UserLogSerializer(serializers.ModelSerializer):

    class Meta:
        model = UserLog
        fields = "__all__"


class ImageSerializer(serializers.ModelSerializer):
    image_url = serializers.URLField(read_only=True)

    class Meta:
        model = Image
        fields = ["id", "image_url"]


class UserUserLogSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = UserLog
        fields = "__all__"


# ANALYTICS SERIALIZERS


class RevenueAnalyticsSerializer(serializers.ModelSerializer):
    price_sold = serializers.DecimalField(
        source="total_price", read_only=True, max_digits=10, decimal_places=2
    )
    sold_at = serializers.DateTimeField(source="created_at", read_only=True)

    class Meta:
        model = Transaction
        fields = ["price_sold", "sold_at", "payment_method"]


class ExpensesAnalyticsSerializer(serializers.ModelSerializer):
    bought_at = serializers.DateTimeField(source="created_at", read_only=True)
    total_cost_price = serializers.SerializerMethodField()

    class Meta:
        model = Stock
        fields = ["name", "unit_price", "quantity", "bought_at", "total_cost_price"]

    def get_total_cost_price(self, obj):
        unit_price = float(obj.unit_price) if obj.unit_price else 0
        quantity = float(obj.quantity) if obj.quantity else 0
        return unit_price * quantity


class RankingAnalyticsSerializer(serializers.ModelSerializer):

    class Meta:
        model = ProductOrder
        depth = 3
        fields = "__all__"
