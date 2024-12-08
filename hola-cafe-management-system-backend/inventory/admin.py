from django.contrib import admin
from .models import Category, Stock, Supplier, Image, Product


admin.site.register(Category)
admin.site.register(Stock)
admin.site.register(Supplier)
admin.site.register(Image)



class ProductAdmin(admin.ModelAdmin):
    list_display = ["name", "created_at", "updated_at"]

admin.site.register(Product, ProductAdmin)