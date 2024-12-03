from django.contrib import admin
from .models import  Cart, Transaction, ProductOrder


admin.site.register(Cart)
admin.site.register(Transaction)
admin.site.register(ProductOrder)
