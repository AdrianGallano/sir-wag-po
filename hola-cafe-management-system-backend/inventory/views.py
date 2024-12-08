# DRF
from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import ReadOnlyModelViewSet
from rest_framework import viewsets

# DRF EXCEL
from drf_excel.mixins import XLSXFileMixin
from drf_excel.renderers import XLSXRenderer

# CUSTOM
from core.helpers import (
    creationBasedUserLog,
    modificationBasedUserLog,
    deletionBasedUserLog,
)
from core.throttles import GeneralRequestThrottle
from .models import Category, Stock, Supplier, Product
from .serializers import (
    CategorySerializer,
    SupplierSerializer,
    ProductImageSerializer,
    StockImageSerializer,
    ProductSerializer,
    StockSerializer,
    StockSupplierIsStockedByImageSerializer,
    ProductCategoryImageSerializer,
)
from core.excel_style import COLUMN_HEADER, BODY, COLUMN_BODY_STYLES


# |
# | SINGLE OBJECT VIEWSETS
# |


class CategoryViewSet(viewsets.ModelViewSet):
    throttle_classes = [GeneralRequestThrottle]
    permission_classes = [IsAuthenticated]
    filterset_fields = [
        "name",
        "description",
        "created_at",
        "updated_at",
    ]

    search_fields = [
        "name",
        "description",
        "created_at",
        "updated_at",
    ]

    ordering_fields = "__all__"

    queryset = Category.objects.all()
    serializer_class = CategorySerializer

    def create(self, request, *args, **kwargs):
        category_obj = super().create(request, *args, **kwargs)
        creationBasedUserLog(request.user, "category", category_obj.data)

        return category_obj

    def update(self, request, *args, **kwargs):
        category_obj = super().update(request, *args, **kwargs)
        old_category_id = kwargs["pk"]
        old_category_obj = Category.objects.get(id=old_category_id)
        serlialized_old_category_obj = CategorySerializer(old_category_obj)
        modificationBasedUserLog(
            request.user,
            "category",
            serlialized_old_category_obj.data,
            category_obj.data,
        )

        return category_obj

    def destroy(self, request, *args, **kwargs):
        old_category_id = kwargs["pk"]
        old_category_obj = Category.objects.get(id=old_category_id)
        serlialized_old_category_obj = CategorySerializer(old_category_obj)
        deletionBasedUserLog(
            request.user, "category", serlialized_old_category_obj.data
        )

        return super().destroy(request, *args, **kwargs)


class SupplierViewSet(viewsets.ModelViewSet):
    throttle_classes = [GeneralRequestThrottle]
    permission_classes = [IsAuthenticated]

    filterset_fields = [
        "name",
        "description",
        "contact_person",
        "phone_number",
        "address",
        "email",
        "created_at",
        "updated_at",
    ]
    search_fields = [
        "name",
        "description",
        "contact_person",
        "phone_number",
        "address",
        "email",
        "created_at",
        "updated_at",
    ]
    ordering_fields = "__all__"

    queryset = Supplier.objects.all()
    serializer_class = SupplierSerializer

    def create(self, request, *args, **kwargs):
        supplier_obj = super().create(request, *args, **kwargs)
        creationBasedUserLog(request.user, "supplier", supplier_obj.data)

        return supplier_obj

    def update(self, request, *args, **kwargs):
        supplier_obj = super().update(request, *args, **kwargs)
        old_supplier_id = kwargs["pk"]
        old_supplier_obj = Supplier.objects.get(id=old_supplier_id)
        serlialized_old_supplier_obj = SupplierSerializer(old_supplier_obj)
        modificationBasedUserLog(
            request.user,
            "supplier",
            serlialized_old_supplier_obj.data,
            supplier_obj.data,
        )

        return supplier_obj

    def destroy(self, request, *args, **kwargs):
        old_supplier_id = kwargs["pk"]
        old_supplier_obj = Supplier.objects.get(id=old_supplier_id)
        serlialized_old_supplier_obj = SupplierSerializer(old_supplier_obj)
        deletionBasedUserLog(
            request.user, "supplier", serlialized_old_supplier_obj.data
        )

        return super().destroy(request, *args, **kwargs)


class StockViewSet(viewsets.ModelViewSet):
    throttle_classes = [GeneralRequestThrottle]
    permission_classes = [IsAuthenticated]
    queryset = Stock.objects.all()
    serializer_class = StockSerializer

    filterset_fields = [
        "name",
        "description",
        "unit_price",
        "quantity",
        "supplier",
        "date_shelved",
        "is_stocked_by",
        "expiration_date",
        "status",
        "created_at",
        "updated_at",
    ]

    search_fields = [
        "name",
        "description",
        "unit_price",
        "quantity",
        "supplier",
        "date_shelved",
        "is_stocked_by",
        "expiration_date",
        "status",
        "created_at",
        "updated_at",
    ]

    ordering_fields = "__all__"

    def create(self, request, *args, **kwargs):
        stock_obj = super().create(request, *args, **kwargs)
        creationBasedUserLog(request.user, "stock", stock_obj.data)

        return stock_obj

    def update(self, request, *args, **kwargs):
        stock_obj = super().update(request, *args, **kwargs)
        old_stock_id = kwargs["pk"]
        old_stock_obj = Stock.objects.get(id=old_stock_id)
        serlialized_old_stock_obj = StockImageSerializer(old_stock_obj)
        modificationBasedUserLog(
            request.user, "stock", serlialized_old_stock_obj.data, stock_obj.data
        )

        return stock_obj

    def destroy(self, request, *args, **kwargs):
        old_stock_id = kwargs["pk"]
        old_stock_obj = Stock.objects.get(id=old_stock_id)
        serlialized_old_stock_obj = StockImageSerializer(old_stock_obj)
        deletionBasedUserLog(request.user, "stock", serlialized_old_stock_obj.data)

        return super().destroy(request, *args, **kwargs)


class ProductViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    filterset_fields = [
        "name",
        "description",
        "price",
        "category",
        "created_at",
        "updated_at",
    ]

    search_fields = [
        "name",
        "description",
        "price",
        "category",
        "created_at",
        "updated_at",
    ]

    ordering_fields = "__all__"

    def create(self, request, *args, **kwargs):
        product_obj = super().create(request, *args, **kwargs)
        creationBasedUserLog(request.user, "product", product_obj.data)

        return product_obj

    def update(self, request, *args, **kwargs):
        product_obj = super().update(request, *args, **kwargs)
        old_product_id = kwargs["pk"]
        old_product_obj = Product.objects.get(id=old_product_id)
        serlialized_old_product_obj = ProductImageSerializer(old_product_obj)
        modificationBasedUserLog(
            request.user, "product", serlialized_old_product_obj.data, product_obj.data
        )

        return product_obj

    def destroy(self, request, *args, **kwargs):
        old_product_id = kwargs["pk"]
        old_product_obj = Product.objects.get(id=old_product_id)
        serlialized_old_product_obj = ProductImageSerializer(old_product_obj)
        deletionBasedUserLog(request.user, "product", serlialized_old_product_obj.data)

        return super().destroy(request, *args, **kwargs)


# |
# | WITH IMAGE VIEWSETS
# |


class StockImageViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = Stock.objects.all().select_related("image")
    serializer_class = StockImageSerializer


class ProductImageViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = Product.objects.all().select_related("image")
    serializer_class = ProductImageSerializer


# |
# | ALL DIRECT RELATIONSHIP VIEWSETS
# |


class StockSupplierIsStockedByImageViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = Stock.objects.all().select_related("image", "supplier", "is_stocked_by")
    serializer_class = StockSupplierIsStockedByImageSerializer


class ProductCategoryImageViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = Product.objects.all().select_related("image", "category")
    serializer_class = ProductCategoryImageSerializer


# |
# | EXCEL VIEWSETS
# |


class SupplierExcelViewSet(XLSXFileMixin, ReadOnlyModelViewSet):
    queryset = Supplier.objects.all()
    serializer_class = SupplierSerializer
    renderer_classes = (XLSXRenderer,)
    filename = "supplier_data.xlsx"

    column_header = COLUMN_HEADER
    body = BODY
    column_data_styles = COLUMN_BODY_STYLES


class ProductExcelViewSet(XLSXFileMixin, ReadOnlyModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductCategoryImageSerializer
    renderer_classes = (XLSXRenderer,)
    filename = "product_data.xlsx"

    column_header = COLUMN_HEADER
    body = BODY
    column_data_styles = COLUMN_BODY_STYLES


class StockExcelViewSet(XLSXFileMixin, ReadOnlyModelViewSet):
    queryset = Stock.objects.all()
    serializer_class = StockSupplierIsStockedByImageSerializer
    renderer_classes = (XLSXRenderer,)
    filename = "stock_data.xlsx"

    column_header = COLUMN_HEADER
    body = BODY
    column_data_styles = COLUMN_BODY_STYLES
