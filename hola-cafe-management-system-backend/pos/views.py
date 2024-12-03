# DRF
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import ReadOnlyModelViewSet
from rest_framework import viewsets

# DJANGO
from django.shortcuts import render

# DRF EXCEL
from drf_excel.renderers import XLSXRenderer
from drf_excel.mixins import XLSXFileMixin

# CUSTOM
from .models import Cart, Transaction, ProductOrder
from .serializers import (
    CartSerializer,
    TransactionSerializer,
    ProductOrderSerializer,
    ProductServiceCrewCartSerializer,
    ProductTransactionProductOrderSerializer,
    ProductProductOrderTransactionSerializer,
)
from core.helpers import (
    creationBasedUserLog,
    modificationBasedUserLog,
    deletionBasedUserLog,
)
from core.excel_style import COLUMN_HEADER, BODY, COLUMN_BODY_STYLES


# |
# | SINGLE OBJECT VIEWSETS
# |


class CartViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = Cart.objects.all()
    serializer_class = CartSerializer
    filterset_fields = [
        "service_crew",
        "product",
        "quantity",
        "created_at",
        "updated_at",
    ]

    search_fields = [
        "service_crew",
        "product",
        "quantity",
        "created_at",
        "updated_at",
    ]

    ordering_fields = "__all__"

    def create(self, request, *args, **kwargs):
        cart_obj = super().create(request, *args, **kwargs)
        creationBasedUserLog(request.user, "cart", cart_obj.data)

        return cart_obj

    def update(self, request, *args, **kwargs):
        cart_obj = super().update(request, *args, **kwargs)
        old_cart_id = kwargs["pk"]
        old_cart_obj = Cart.objects.get(id=old_cart_id)
        serlialized_old_cart_obj = CartSerializer(old_cart_obj)
        modificationBasedUserLog(
            request.user, "cart", serlialized_old_cart_obj.data, cart_obj.data
        )

        return cart_obj

    def destroy(self, request, *args, **kwargs):
        old_cart_id = kwargs["pk"]
        old_cart_obj = Cart.objects.get(id=old_cart_id)
        serlialized_old_cart_obj = CartSerializer(old_cart_obj)
        deletionBasedUserLog(request.user, "cart", serlialized_old_cart_obj.data)

        return super().destroy(request, *args, **kwargs)


class TransactionViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer
    filterset_fields = [
        "service_crew",
        "total_price",
        "payment_method",
        "created_at",
        "updated_at",
    ]

    search_fields = [
        "service_crew",
        "total_price",
        "payment_method",
        "created_at",
        "updated_at",
    ]

    ordering_fields = "__all__"

    def create(self, request, *args, **kwargs):

        transaction = super().create(request, *args, **kwargs)
        transaction_instance = Transaction.objects.get(pk=transaction.data["id"])
        cart_items = Cart.objects.filter(service_crew=transaction_instance.service_crew)

        for cart_item in cart_items:
            ProductOrder.objects.create(
                transaction=transaction_instance,
                product=cart_item.product,
                quantity=cart_item.quantity,
            )

            cart_item.delete()

        product_orders = ProductOrder.objects.filter(transaction=transaction_instance)
        serialized_product_order = ProductOrderSerializer(product_orders, many=True)

        transaction_obj = {
            "transaction": transaction.data,
            "product_orders": serialized_product_order.data,
        }

        creationBasedUserLog(request.user, "transaction", transaction_obj)

        return Response(serialized_product_order.data, status=201)

    def update(self, request, *args, **kwargs):
        transaction_obj = super().update(request, *args, **kwargs)
        old_transaction_id = kwargs["pk"]
        old_transaction_obj = Transaction.objects.get(id=old_transaction_id)
        serlialized_old_transaction_obj = TransactionSerializer(old_transaction_obj)
        modificationBasedUserLog(
            request.user,
            "transaction",
            serlialized_old_transaction_obj.data,
            transaction_obj.data,
        )

        return transaction_obj

    def destroy(self, request, *args, **kwargs):
        old_transaction_id = kwargs["pk"]
        old_transaction_obj = Transaction.objects.get(id=old_transaction_id)
        serlialized_old_transaction_obj = TransactionSerializer(old_transaction_obj)
        deletionBasedUserLog(
            request.user, "transaction", serlialized_old_transaction_obj.data
        )

        return super().destroy(request, *args, **kwargs)


class ProductOrderViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = ProductOrder.objects.all()
    serializer_class = ProductOrderSerializer
    filterset_fields = [
        "transaction",
        "product",
        "quantity",
        "created_at",
        "updated_at",
    ]

    search_fields = [
        "transaction",
        "product",
        "quantity",
        "created_at",
        "updated_at",
    ]

    ordering_fields = "__all__"

    def create(self, request, *args, **kwargs):
        product_order_obj = super().create(request, *args, **kwargs)
        creationBasedUserLog(request.user, "product order", product_order_obj.data)

        return product_order_obj

    def update(self, request, *args, **kwargs):
        product_order_obj = super().update(request, *args, **kwargs)
        old_product_order_id = kwargs["pk"]
        old_product_order_obj = ProductOrder.objects.get(id=old_product_order_id)
        serlialized_old_product_order_obj = ProductOrderSerializer(
            old_product_order_obj
        )
        modificationBasedUserLog(
            request.user,
            "product order",
            serlialized_old_product_order_obj.data,
            product_order_obj.data,
        )

        return product_order_obj

    def destroy(self, request, *args, **kwargs):
        old_product_order_id = kwargs["pk"]
        old_product_order_obj = ProductOrder.objects.get(id=old_product_order_id)
        serlialized_old_product_order_obj = ProductOrderSerializer(
            old_product_order_obj
        )
        deletionBasedUserLog(
            request.user, "product order", serlialized_old_product_order_obj.data
        )

        return super().destroy(request, *args, **kwargs)


# |
# | ALL DIRECT RELATIONSHIP VIEWSETS
# |


class ProductServiceCrewCartViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = Cart.objects.all().select_related()
    serializer_class = ProductServiceCrewCartSerializer


class ProductTransactionProductOrderViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = ProductOrder.objects.all().select_related()
    serializer_class = ProductTransactionProductOrderSerializer


class ProductProductOrderTransactionViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = Transaction.objects.prefetch_related("productorder_set", "service_crew")
    serializer_class = ProductProductOrderTransactionSerializer


# |
# | EXCEL VIEWSETS
# |


class TransactionExcelViewSet(XLSXFileMixin, ReadOnlyModelViewSet):
    queryset = Transaction.objects.prefetch_related("productorder_set", "service_crew")
    serializer_class = ProductProductOrderTransactionSerializer
    renderer_classes = (XLSXRenderer,)
    filename = "transaction_data.xlsx"

    column_header = COLUMN_HEADER
    body = BODY
    column_data_styles = COLUMN_BODY_STYLES
