# DRF
from rest_framework import serializers

# CUSTOM
from djoser.serializers import UserSerializer
from .models import UserLog, Image
from pos.models import Transaction
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
    price_sold = serializers.DecimalField(source='total_price', read_only=True, max_digits=10, decimal_places=2)
    sold_at = serializers.DateTimeField(source="created_at", read_only=True)
    
    class Meta:
        model = Transaction
        fields = ["price_sold", "sold_at", "payment_method"]


class ExpensesAnalyticsSerializer(serializers.ModelSerializer):
    bought_at = serializers.DateTimeField(source="created_at", read_only=True)
    
    class Meta:
        model = Stock
        fields = ["name", "unit_price", "quantity", "bought_at"]
