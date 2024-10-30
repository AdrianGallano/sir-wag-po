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
    path("products/", views.ProductViewSet.as_view({"get": "list", "post": "create"})),
    path(
        "products/<int:pk>/",
        views.ProductViewSet.as_view(
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
]
