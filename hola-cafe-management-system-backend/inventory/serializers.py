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
    category_id = serializers.PrimaryKeyRelatedField(
        queryset=Category.objects.all(), source="category"
    )
    supplier_id = serializers.PrimaryKeyRelatedField(
        queryset=Supplier.objects.all(), source="supplier"
    )

    class Meta:
        model = Product
        fields = "__all__"

        
    def create(self, validated_data):
        return Product.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.category = validated_data.get("category", instance.category)
        instance.supplier = validated_data.get("supplier", instance.supplier)
        instance.name = validated_data.get("name", instance.name)
        instance.save()
        return instance
