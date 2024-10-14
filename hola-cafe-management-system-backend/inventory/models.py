from django.db import models
from django.contrib.auth.models import User


class Supplier(models.Model):
    name = models.CharField(max_length=255, null=True)
    description = models.TextField(null=True)
    contact_person = models.CharField(max_length=255, null=True)
    phone_number = models.CharField(max_length=16)
    address = models.CharField(max_length=400)
    email = models.EmailField()
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    updated_at = models.DateTimeField(auto_now=True, null=True)

    def __str__(self):
        return self.name

    class Meta:
        indexes = [models.Index(fields=["name"])]


class Category(models.Model):
    name = models.CharField(max_length=255, null=True)
    description = models.TextField(null=True)
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    updated_at = models.DateTimeField(auto_now=True, null=True)

    def __str__(self):
        return self.name

    class Meta:
        indexes = [models.Index(fields=["name"])]


class Product(models.Model):
    name = models.CharField(max_length=255, null=True)
    description = models.TextField()
    price = models.DecimalField(default=0, max_digits=10, decimal_places=2, null=True)
    quantity = models.DecimalField(
        default=0, max_digits=10, decimal_places=2, null=True
    )
    cost_price = models.DecimalField(
        default=0, max_digits=10, decimal_places=2, null=True
    )
    supplier = models.ForeignKey(Supplier, on_delete=models.CASCADE)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    updated_at = models.DateTimeField(auto_now=True, null=True)

    def __str__(self):
        return self.name

    class Meta:
        indexes = [models.Index(fields=["name"])]
