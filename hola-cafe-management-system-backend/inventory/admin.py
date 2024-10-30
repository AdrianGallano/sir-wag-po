from django.contrib import admin
from .models import Category, Product, Supplier, Image


admin.site.register(Category)
admin.site.register(Product)
admin.site.register(Supplier)
admin.site.register(Image)
