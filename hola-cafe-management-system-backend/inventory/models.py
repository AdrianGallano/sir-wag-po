from django.db import models
from django.contrib.auth.models import User
from core.models import Image


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


class Stock(models.Model):
    """
    Single unique raw material in the cafe.
    """

    image = models.ForeignKey(Image, on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=255)
    description = models.TextField(null=True)
    quantity = models.DecimalField(default=0, max_digits=10, decimal_places=2)
    unit_price = models.DecimalField(default=0, max_digits=10, decimal_places=2)
    supplier = models.ForeignKey(Supplier, on_delete=models.PROTECT)
    date_shelved = models.DateTimeField(null=True)
    expiration_date = models.DateTimeField(null=True)
    is_stocked_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    updated_at = models.DateTimeField(auto_now=True, null=True)
    status = models.CharField(max_length=255, null=True)

    def __str__(self):
        return self.name

    class Meta:
        indexes = [models.Index(fields=["name"])]


class StockCart(models.Model):
    service_crew = models.ForeignKey(User, on_delete=models.CASCADE)
    stock = models.ForeignKey(Stock, on_delete=models.CASCADE)
    quantity = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    updated_at = models.DateTimeField(auto_now=True, null=True)
    
    def __str__(self):
        return self.stock.name


class StockTransaction(models.Model):
    service_crew = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True,null=True)
    updated_at = models.DateTimeField(auto_now=True,null=True)


class StockUsed(models.Model):
    stock_transaction = models.ForeignKey(StockTransaction, on_delete=models.CASCADE)
    stock = models.ForeignKey(Stock, on_delete=models.CASCADE)
    quantity = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    updated_at = models.DateTimeField(auto_now=True, null=True)
    
    def __str__(self):
        return self.stock.name


class Product(models.Model):
    """
    Single unique product in the cafe.
    """

    image = models.ForeignKey(Image, on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=255, null=True)
    description = models.TextField(null=True)
    price = models.DecimalField(default=0, max_digits=10, decimal_places=2, null=True)
    category = models.ForeignKey(Category, on_delete=models.PROTECT)
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    updated_at = models.DateTimeField(auto_now=True, null=True)

    def __str__(self):
        return self.name

    class Meta:
        indexes = [models.Index(fields=["name"])]
