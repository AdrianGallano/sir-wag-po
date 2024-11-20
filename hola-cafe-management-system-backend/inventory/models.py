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


class Image(models.Model):
    image_url = models.URLField(max_length=300, null=True)
    
    def __str__(self):
        return self.image_url

    class Meta:
        indexes = [models.Index(fields=["image_url"])]

class Stock(models.Model):
    """ 
    Single unique raw material in the cafe.
     """

    image = models.ForeignKey(Image, on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=255, null=True)
    description = models.TextField()
    quantity = models.DecimalField(
        default=0, max_digits=10, decimal_places=2, null=True
    )
    cost_price = models.DecimalField(
        default=0, max_digits=10, decimal_places=2, null=True
    )
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


class Product(models.Model):
    """ 
    Single unique product in the cafe.
    """
    image = models.ForeignKey(Image, on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=255, null=True)
    description = models.TextField(null=True)
    price = models.DecimalField(
        default=0, max_digits=10, decimal_places=2, null=True
    )
    category = models.ForeignKey(Category, on_delete=models.PROTECT)
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    updated_at = models.DateTimeField(auto_now=True, null=True)

    def __str__(self):
        return self.name

    class Meta:
        indexes = [models.Index(fields=["name"])]
    

# POS PART

class Cart(models.Model): 
    """  
    stores the items to be transacted
    """
    service_crew = models.ForeignKey(User, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.IntegerField()
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

how can we determine what items should go sa transaction
- Create a Cart
- Add items to the cart
- Checkout the cart
    - Create a transaction
    - Create a 

so the problem is
- we cannot add a transaction relationship directly to the prodct 
since we also need to access it on the single table page
- the POS is a diffrent feature than when you just isolate the product information
    - Transactions
    - Order information 
    - Etc.



what are the things that needs to have an excel?
- Transaction
- Product
- Stock
- Supplier

The additional things are
- Profit 
- and other Data analytics things



TODO:
 - Excel, Importing and Exporting
 - Authorizations
 - Data analytics
 - Logs
 """