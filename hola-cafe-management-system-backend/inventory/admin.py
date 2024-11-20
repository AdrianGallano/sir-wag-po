from django.contrib import admin
from .models import Category, Stock, Supplier, Image


admin.site.register(Category)
admin.site.register(Stock)
admin.site.register(Supplier)
admin.site.register(Image)
