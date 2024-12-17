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
        "stocks-used/",
        views.StockUsedViewSet.as_view({"get": "list", "post": "create"}),
    ),
    path(
        "stocks-used/<int:pk>/",
        views.StockUsedViewSet.as_view(
            {"get": "retrieve", "put": "update", "delete": "destroy"}
        ),
    ),
    path(
        "stock-carts/",
        views.StockCartViewSet.as_view({"get": "list", "post": "create"}),
    ),
    path(
        "stock-carts/<int:pk>/",
        views.StockCartViewSet.as_view(
            {"get": "retrieve", "put": "update", "delete": "destroy"}
        ),
    ),
    path(
        "stock-transactions/",
        views.StockTransactionViewSet.as_view({"get": "list", "post": "create"}),
    ),
    path(
        "stock-transactions/<int:pk>/",
        views.StockTransactionViewSet.as_view(
            {"get": "retrieve"}
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
    # Start here
    path(
        "stock-used/stock-transactions/",
        views.StockUsedDepthViewSet.as_view({"get": "list"}),
    ),
    path(
        "stock-used/stock-transactions/<int:pk>/",
        views.StockUsedDepthViewSet.as_view({"get": "retrieve"}),
    ),
    path(
        "stock-transactions/stock-cart/",
        views.StockCartDepthViewSet.as_view({"get": "list"}),
    ),
    path(
        "stock-transactions/stock-cart<int:pk>/",
        views.StockCartDepthViewSet.as_view({"get": "retrieve"}),
    ),
    path(
        "stock-transaction/stock-used/",
        views.StockTransactionDepthViewSet.as_view({"get": "list"}),
    ),
    path(
        "stock-transaction/stock-used/<int:pk>/",
        views.StockTransactionDepthViewSet.as_view({"get": "retrieve"}),
    ),
    # Start here
    path("excel/stock/", views.StockExcelViewSet.as_view({"get": "list"})),
    path("excel/product/", views.ProductExcelViewSet.as_view({"get": "list"})),
    path("excel/supplier/", views.SupplierExcelViewSet.as_view({"get": "list"})),
]
