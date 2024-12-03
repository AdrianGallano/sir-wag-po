from django.db import models
from django.contrib.auth.models import User
from inventory.models import Product


class Cart(models.Model): 
    """  
    stores the items to be transacted
    """
    service_crew = models.ForeignKey(User, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.IntegerField(default=1)
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    updated_at = models.DateTimeField(auto_now=True, null=True)

    class Meta:
        unique_together = ['service_crew', 'product']


class Transaction(models.Model):
    service_crew = models.ForeignKey(User, on_delete=models.CASCADE)
    total_price = models.DecimalField(
        default=0, max_digits=10, decimal_places=2, null=True
    )
    payment_method = models.CharField(max_length=255, null=True)
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    updated_at = models.DateTimeField(auto_now=True, null=True)


class ProductOrder(models.Model): 
    """ 
    connect the product to the transaction so that we can put the 
    products that has been ordered in a single transaction
    """
    transaction = models.ForeignKey(Transaction, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    updated_at = models.DateTimeField(auto_now=True, null=True)


""" 

what are the things that needs to have an excel?
- Profit 
- and other Data analytics things



TODO:
 - Excel, Importing and Exporting
 - Authorizations
 - Data analytics
 """