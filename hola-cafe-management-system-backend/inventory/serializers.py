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
        category = validated_data.pop("category")
        supplier = validated_data.pop("supplier")

        product = Product.objects.create(
            category_id=category.id, supplier_id=supplier.id, **validated_data
        )
        return product

    def update(self, instance, validated_data):
        category = validated_data.pop("category", None)
        supplier = validated_data.pop("supplier", None)

        if category:
            instance.category = category
        if supplier:
            instance.supplier = supplier

        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        instance.save()
        return instance


class ProductSupplierCategorySerializer(serializers.ModelSerializer):
    category = CategorySerializer()
    supplier = SupplierSerializer()

    class Meta:
        model = Product
        fields = "__all__"
