from django.urls import path
from . import views

urlpatterns = [
    path("carts/", views.CartViewSet.as_view({"get": "list", "post": "create"})),
    path(
        "carts/<int:pk>/",
        views.CartViewSet.as_view(
            {"get": "retrieve", "put": "update", "delete": "destroy"}
        ),
    ),
    path(
        "transactions/",
        views.TransactionViewSet.as_view({"get": "list", "post": "create"}),
    ),
    path(
        "transactions/<int:pk>/",
        views.TransactionViewSet.as_view(
            {"get": "retrieve", "put": "update", "delete": "destroy"}
        ),
    ),
    path(
        "product-orders/",
        views.ProductOrderViewSet.as_view({"get": "list", "post": "create"}),
    ),
    path(
        "product-orders/<int:pk>/",
        views.ProductOrderViewSet.as_view(
            {"get": "retrieve", "put": "update", "delete": "destroy"}
        ),
    ),
    path(
        "product/service-crew/cart/",
        views.ProductServiceCrewCartViewSet.as_view({"get": "list"}),
    ),
    path(
        "product/service-crew/cart/<int:pk>",
        views.ProductServiceCrewCartViewSet.as_view({"get": "retrieve"}),
    ),
    path(
        "product/transaction/product-order/",
        views.ProductTransactionProductOrderViewSet.as_view({"get": "list"}),
    ),
    path(
        "product/transaction/product-order/<int:pk>",
        views.ProductTransactionProductOrderViewSet.as_view({"get": "retrieve"}),
    ),
    path(
        "product/product-order/transaction/",
        views.ProductProductOrderTransactionViewSet.as_view({"get": "list"}),
    ),
    path(
        "product/product-order/transaction/<int:pk>",
        views.ProductProductOrderTransactionViewSet.as_view({"get": "retrieve"}),
    ),
    path("excel/transaction/", views.TransactionExcelViewSet.as_view({"get": "list"})),
]
