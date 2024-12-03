from django.contrib import admin
from .models import Category, Stock, Supplier, Image, Product


admin.site.register(Category)
admin.site.register(Stock)
admin.site.register(Supplier)
admin.site.register(Image)
admin.site.register(Product)
