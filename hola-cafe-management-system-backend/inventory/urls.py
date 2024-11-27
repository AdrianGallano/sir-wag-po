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
    path("images/", views.ImageViewSet.as_view({
        "get":"list",
        "post":"upload"
    })),
    path("images/<int:pk>/",
          views.ImageViewSet.as_view( 
            {"get": "retrieve", 
             "delete": "destroy"})),
    path(
        "suppliers/", views.SupplierViewSet.as_view({
            "get": "list",
             "post": "create"})
    ),
    path(
        "suppliers/<int:pk>/",
        views.SupplierViewSet.as_view(
            {"get": "retrieve", "put": "update", "delete": "destroy"}
        ),
    ),
    path(
        "carts/", views.CartViewSet.as_view({
            "get": "list",
            "post": "create"})
    ),
    path(
        "carts/<int:pk>/",
        views.CartViewSet.as_view(
            {"get": "retrieve", "put": "update", "delete": "destroy"}
        ),
    ),
    path(
        "products/", views.ProductViewSet.as_view({
            "get": "list",
            "post": "create"})
    ),
    path(
        "products/<int:pk>/",
        views.ProductViewSet.as_view(
            {"get": "retrieve", "put": "update", "delete": "destroy"}
        ),
    ),
    path(
        "transactions/", views.TransactionViewSet.as_view({
            "get": "list",
            "post": "create"})
    ),
    path(
        "transactions/<int:pk>/",
        views.TransactionViewSet.as_view(
            {"get": "retrieve", "put": "update", "delete": "destroy"}
        ),
    ),
    path(
        "product-orders/", views.ProductOrderViewSet.as_view({
            "get": "list",
            "post": "create"})
    ),
    path(
        "product-orders/<int:pk>/",
        views.ProductOrderViewSet.as_view(
            {"get": "retrieve", "put": "update", "delete": "destroy"}
        ),
    ),
    path("user-logs/", views.UserLogViewSet.as_view({
        "get": "list",
        "post": "create"})
    ),
    path("user-logs/<int:pk>", views.UserLogViewSet.as_view({"get": "retrieve", "put": "update", "delete": "destroy"})
    ),

]
