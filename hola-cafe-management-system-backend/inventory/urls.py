from django.urls import path
from . import views

urlpatterns = [
    path(
        "categories/", views.CategoryViewSet.as_view({"get": "list", "post": "create"})
    ),
    path(
        "categories/<int:pk>/",
        views.CategoryViewSet.as_view(
            {"get": "retrieve", "put": "update", "delete": "destroy"}
        ),
    ),
    path("stocks/", views.StockViewSet.as_view({"get": "list", "post": "create"})),
    path(
        "stocks/<int:pk>/",
        views.StockViewSet.as_view(
            {"get": "retrieve", "put": "update", "delete": "destroy"}
        ),
    ),
    path(
        "suppliers/", views.SupplierViewSet.as_view({"get": "list", "post": "create"})
    ),
    path(
        "suppliers/<int:pk>/",
        views.SupplierViewSet.as_view(
            {"get": "retrieve", "put": "update", "delete": "destroy"}
        ),
    ),
    path("products/", views.ProductViewSet.as_view({"get": "list", "post": "create"})),
    path(
        "products/<int:pk>/",
        views.ProductViewSet.as_view(
            {"get": "retrieve", "put": "update", "delete": "destroy"}
        ),
    ),
    path("image/product/", views.ProductImageViewSet.as_view({"get": "list"})),
    path(
        "image/product/<int:pk>/",
        views.ProductImageViewSet.as_view({"get": "retrieve"}),
    ),
    path("image/stock/", views.StockImageViewSet.as_view({"get": "list"})),
    path("image/stock/<int:pk>/", views.StockImageViewSet.as_view({"get": "retrieve"})),
    path(
        "image/is-stocked-by/supplier/stock/",
        views.StockSupplierIsStockedByImageViewSet.as_view({"get": "list"}),
    ),
    path(
        "image/is-stocked-by/supplier/stock/<int:pk>/",
        views.StockSupplierIsStockedByImageViewSet.as_view({"get": "retrieve"}),
    ),
    path(
        "image/category/product/",
        views.ProductCategoryImageViewSet.as_view({"get": "list"}),
    ),
    path(
        "image/category/product/<int:pk>",
        views.ProductCategoryImageViewSet.as_view({"get": "retrieve"}),
    ),
    path("excel/stock/", views.StockExcelViewSet.as_view({"get": "list"})),
    path("excel/product/", views.ProductExcelViewSet.as_view({"get": "list"})),
    path("excel/supplier/", views.SupplierExcelViewSet.as_view({"get": "list"})),
]
