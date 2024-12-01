from django.contrib import admin
from .models import Category, Stock, Supplier, Image, Cart, Product, Transaction, ProductOrder, UserLog


admin.site.register(Category)
admin.site.register(Stock)
admin.site.register(Supplier)
admin.site.register(Image)
admin.site.register(Cart)
admin.site.register(Product)
admin.site.register(Transaction)
admin.site.register(ProductOrder)
admin.site.register(UserLog)

