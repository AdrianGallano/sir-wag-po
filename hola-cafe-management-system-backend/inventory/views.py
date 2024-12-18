# DRF
from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import ReadOnlyModelViewSet
from rest_framework import viewsets
from rest_framework.response import Response

# DRF EXCEL
from drf_excel.mixins import XLSXFileMixin
from drf_excel.renderers import XLSXRenderer

# CUSTOM
from core.helpers import (
    creationBasedUserLog,
    modificationBasedUserLog,
    deletionBasedUserLog,
    transactionBasedUserLog
)
from .helpers import check_expired

# from core.throttles import GeneralRequestThrottle
from .models import (
    Category,
    Stock,
    Supplier,
    Product,
    StockCart,
    StockUsed,
    StockTransaction,
)
from .serializers import (
    CategorySerializer,
    SupplierSerializer,
    ProductImageSerializer,
    StockImageSerializer,
    ProductSerializer,
    StockSerializer,
    StockSupplierIsStockedByImageSerializer,
    ProductCategoryImageSerializer,
    StockCartSerializer,
    StockUsedSerializer,
    StockTransactionSerializer,
    StockCartDepthSerializer,
    StockTransactionDepthSerializer,
    StockUsedDepthSerializer
)
from core.excel_style import COLUMN_HEADER, BODY, COLUMN_BODY_STYLES


# |
# | SINGLE OBJECT VIEWSETS
# |


class CategoryViewSet(viewsets.ModelViewSet):
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

    def get_queryset(self):
        check_expired()
        queryset = Stock.objects.all()
        return queryset
    
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


class StockCartViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = StockCart.objects.all()
    serializer_class = StockCartSerializer
    filterset_fields = [
        "service_crew",
        "stock",
        "quantity",
        "created_at",
        "updated_at",
    ]
    search_fields = [
        "service_crew",
        "stock",
        "quantity",
        "created_at",
        "updated_at",
    ]

    ordering_fields = "__all__"

    def create(self, request, *args, **kwargs):
        stock_obj = super().create(request, *args, **kwargs)
        creationBasedUserLog(request.user, "stock cart", stock_obj.data)

        return stock_obj

    def update(self, request, *args, **kwargs):
        stock_obj = super().update(request, *args, **kwargs)
        old_stock_id = kwargs["pk"]
        old_stock_obj = StockCart.objects.get(id=old_stock_id)
        serlialized_old_stock_obj = StockCartSerializer(old_stock_obj)
        modificationBasedUserLog(
            request.user, "stock cart", serlialized_old_stock_obj.data, stock_obj.data
        )

        return stock_obj

    def destroy(self, request, *args, **kwargs):
        old_stock_id = kwargs["pk"]
        old_stock_obj = StockCart.objects.get(id=old_stock_id)
        serlialized_old_stock_obj = StockCartSerializer(old_stock_obj)
        deletionBasedUserLog(request.user, "stock cart", serlialized_old_stock_obj.data)

        return super().destroy(request, *args, **kwargs)


class StockUsedViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = StockUsed.objects.all()
    serializer_class = StockUsedSerializer
    filterset_fields = [
        "stock_transaction",
        "stock",
        "quantity",
        "created_at",
        "updated_at",
    ]
    search_fields = [
        "stock_transaction",
        "stock",
        "quantity",
        "created_at",
        "updated_at",
    ]

    ordering_fields = "__all__"

    def create(self, request, *args, **kwargs):
        stock_obj = super().create(request, *args, **kwargs)
        creationBasedUserLog(request.user, "stock used", stock_obj.data)

        return stock_obj

    def update(self, request, *args, **kwargs):
        stock_obj = super().update(request, *args, **kwargs)
        old_stock_id = kwargs["pk"]
        old_stock_obj = StockUsed.objects.get(id=old_stock_id)
        serlialized_old_stock_obj = StockUsedSerializer(old_stock_obj)
        modificationBasedUserLog(
            request.user, "stock used", serlialized_old_stock_obj.data, stock_obj.data
        )

        return stock_obj

    def destroy(self, request, *args, **kwargs):
        old_stock_id = kwargs["pk"]
        old_stock_obj = StockUsed.objects.get(id=old_stock_id)
        serlialized_old_stock_obj = StockUsedSerializer(old_stock_obj)
        deletionBasedUserLog(request.user, "stock used", serlialized_old_stock_obj.data)

        return super().destroy(request, *args, **kwargs)


class StockTransactionViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = StockTransaction.objects.all()
    serializer_class = StockTransactionSerializer
    filterset_fields = [
        "service_crew",
        "created_at",
        "updated_at",
    ]
    search_fields = [
        "service_crew",
        "created_at",
        "updated_at",
    ]

    ordering_fields = "__all__"

    def create(self, request, *args, **kwargs):

        stock_transaction = super().create(request, *args, **kwargs)
        stock_transaction_instance = StockTransaction.objects.get(pk=stock_transaction.data["id"])
        cart_items = StockCart.objects.filter(service_crew=stock_transaction_instance.service_crew)

        for cart_item in cart_items:
            try:
                stock = Stock.objects.get(id=cart_item.stock.id)

                if stock.quantity < cart_item.quantity:
                    return Response(
                        {"error": f"stock with id {cart_item.stock.id} does not have enough quantity"},
                        400,
                    )
                
                stock.quantity -= cart_item.quantity
                stock.save()
                
            except Stock.DoesNotExist:
                return Response(
                    {"error": f"stock with id {cart_item.stock.id} does not exist"}, 400
                )
            except Exception as e:
                return Response({"error": f"an error occured: {e}"}, 400)
            
            StockUsed.objects.create(
                stock_transaction=stock_transaction_instance,
                stock=cart_item.stock,
                quantity=cart_item.quantity,
            )

            
            cart_item.delete()

        stocks_used = StockUsed.objects.filter(stock_transaction=stock_transaction_instance)
        serialized_stocks_used = StockUsedSerializer(stocks_used, many=True)

        stock_transaction_obj = {
            "stock_transaction": stock_transaction.data,
            "stocks_used": serialized_stocks_used.data,
        }

        transactionBasedUserLog(request.user, "stock", stock_transaction_obj)

        return Response(serialized_stocks_used.data, status=201)

    
    # DONT EVEN THINK ABOUT USING THIS
    def update(self, request, *args, **kwargs):
        stock_transaction = super().update(request, *args, **kwargs)
        old_stock_transaction_id = kwargs["pk"]
        old_stock_transaction_obj = StockUsed.objects.get(id=old_stock_transaction_id)
        serlialized_old_stock_transaction_obj = StockTransactionSerializer(old_stock_transaction_obj)
        modificationBasedUserLog(
            request.user,
            "stock transaction",
            serlialized_old_stock_transaction_obj.data,
            stock_transaction.data,
        )

        return stock_transaction

    # DONT EVEN THINK ABOUT USING THIS
    def destroy(self, request, *args, **kwargs):
        old_stock_transaction_id = kwargs["pk"]
        old_stock_transaction_obj = StockTransaction.objects.get(id=old_stock_transaction_id)
        serlialized_old_stock_transaction_obj = StockTransactionSerializer(old_stock_transaction_obj)
        deletionBasedUserLog(
            request.user, "stock transaction", serlialized_old_stock_transaction_obj.data
        )

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

class StockCartDepthViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = StockCart.objects.all()
    serializer_class = StockCartDepthSerializer

class StockUsedDepthViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = StockUsed.objects.all()
    serializer_class = StockUsedDepthSerializer

class StockTransactionDepthViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = StockTransaction.objects.all().prefetch_related("service_crew", "stockused_set")
    serializer_class = StockTransactionDepthSerializer

# |
# | EXCEL VIEWSETS
# |


class SupplierExcelViewSet(XLSXFileMixin, ReadOnlyModelViewSet):
    queryset = Supplier.objects.all()
    serializer_class = SupplierSerializer
    renderer_classes = (XLSXRenderer,)
    filename = "supplier_data.xlsx"
    permission_classes = [IsAuthenticated]
    
    column_header = COLUMN_HEADER
    body = BODY
    column_data_styles = COLUMN_BODY_STYLES


class ProductExcelViewSet(XLSXFileMixin, ReadOnlyModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductCategoryImageSerializer
    renderer_classes = (XLSXRenderer,)
    filename = "product_data.xlsx"
    permission_classes = [IsAuthenticated]
    
    column_header = COLUMN_HEADER
    body = BODY
    column_data_styles = COLUMN_BODY_STYLES


class StockExcelViewSet(XLSXFileMixin, ReadOnlyModelViewSet):
    queryset = Stock.objects.all()
    serializer_class = StockSupplierIsStockedByImageSerializer
    renderer_classes = (XLSXRenderer,)
    filename = "stock_data.xlsx"
    permission_classes = [IsAuthenticated]
    
    column_header = COLUMN_HEADER
    body = BODY
    column_data_styles = COLUMN_BODY_STYLES

