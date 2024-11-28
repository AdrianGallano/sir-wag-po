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
    path("user-log/", views.UserLogViewSet.as_view({
        "get": "list",
        "post": "create"})
    ),
    path("user-log/<int:pk>/", views.UserLogViewSet.as_view({
        "get": "retrieve", 
        "put": "update", 
        "delete": "destroy"})
    ),
    path("image/product/", views.ProductImageViewSet.as_view({
        "get": "list"})
    ),
    path("image/product/<int:pk>/", views.ProductImageViewSet.as_view({
        "get": "retrieve"})
    ),
    path("image/stock/", views.StockImageViewSet.as_view({
        "get": "list"})
    ),
    path("image/stock/<int:pk>/", views.StockImageViewSet.as_view({
        "get": "retrieve"})
    ), # from here
    path("image/is-stocked-by/supplier/stock/", views.StockSupplierIsStockedByImageViewSet.as_view({
        "get": "list"})
    ),
    path("image/is-stocked-by/supplier/stock/<int:pk>/", views.StockSupplierIsStockedByImageViewSet.as_view({
        "get": "retrieve"})
    ),
    path("image/category/product/", views.ProductCategoryImageViewSet.as_view({
        "get": "list"})
    ),
    path("image/category/product/<int:pk>", views.ProductCategoryImageViewSet.as_view({
        "get": "retrieve"})
    ),# start here
    path("product/service-crew/cart/", views.ProductServiceCrewCartViewSet.as_view({
        "get": "list"})
    ),
    path("product/service-crew/cart/<int:pk>", views.ProductServiceCrewCartViewSet.as_view({
        "get": "retrieve"})
    ),
    path("user/user-log/", views.UserUserLogViewSet.as_view({
        "get": "list"})
    ),
    path("user/user-log/<int:pk>", views.UserUserLogViewSet.as_view({
        "get": "retrieve"})
    ),
    path("product/transaction/product-order/", views.ProductTransactionProductOrderViewSet.as_view({
        "get": "list"})
    ),
    path("product/transaction/product-order/<int:pk>", views.ProductTransactionProductOrderViewSet.as_view({
        "get": "retrieve"})
    ),
    



]


