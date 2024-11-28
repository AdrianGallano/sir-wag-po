from django.http import HttpResponse
from django.views.decorators.http import require_http_methods 
from rest_framework.decorators import api_view
from django.shortcuts import render
from rest_framework import viewsets
from .models import Category, Stock, Supplier, Image, Cart, Product, Transaction, ProductOrder, UserLog
from .serializers import (
    CategorySerializer,
    SupplierSerializer,
    ImageSerializer,
    CartSerializer,
    ProductImageSerializer,
    TransactionSerializer,
    ProductOrderSerializer,
    UserLogSerializer,
    StockImageSerializer,
    ProductSerializer,
    StockSerializer,
    StockSupplierIsStockedByImageSerializer,
    ProductCategoryImageSerializer,
    ProductServiceCrewCartSerializer,
    UserUserLogSerializer,
    ProductTransactionProductOrderSerializer
)
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from PIL import Image as PilImage
import os
from uuid import uuid4
from .throttles import GeneralRequestThrottle,GeneralImageThrottle,UploadImageThrottle
from .helpers import creationBasedUserLog, modificationBasedUserLog, deletionBasedUserLog

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
        modificationBasedUserLog(request.user, "category", serlialized_old_category_obj.data ,category_obj.data)
        
        return category_obj
    
    def destroy(self, request, *args, **kwargs):
        old_category_id = kwargs["pk"]
        old_category_obj = Category.objects.get(id=old_category_id)
        serlialized_old_category_obj = CategorySerializer(old_category_obj)
        deletionBasedUserLog(request.user, "category", serlialized_old_category_obj.data)
        
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
        modificationBasedUserLog(request.user, "supplier", serlialized_old_supplier_obj.data ,supplier_obj.data)
        
        return supplier_obj
    
    def destroy(self, request, *args, **kwargs):
        old_supplier_id = kwargs["pk"]
        old_supplier_obj = Supplier.objects.get(id=old_supplier_id)
        serlialized_old_supplier_obj = SupplierSerializer(old_supplier_obj)
        deletionBasedUserLog(request.user, "supplier", serlialized_old_supplier_obj.data)
        
        return super().destroy(request, *args, **kwargs)



class StockViewSet(viewsets.ModelViewSet):
    throttle_classes = [GeneralRequestThrottle]
    permission_classes = [IsAuthenticated]
    queryset =  Stock.objects.all()
    serializer_class = StockSerializer
    
    filterset_fields = [
        "name",
        "description",
        "cost_price",
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
        "cost_price",
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
        modificationBasedUserLog(request.user, "stock", serlialized_old_stock_obj.data ,stock_obj.data)
        
        return stock_obj
    
    def destroy(self, request, *args, **kwargs):
        old_stock_id = kwargs["pk"]
        old_stock_obj = Stock.objects.get(id=old_stock_id)
        serlialized_old_stock_obj = StockImageSerializer(old_stock_obj)
        deletionBasedUserLog(request.user, "stock", serlialized_old_stock_obj.data)
        
        return super().destroy(request, *args, **kwargs)



class ImageViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = Image.objects.all()
    serializer_class = ImageSerializer
    filterset_fields = [
        "image_url"
    ]

    search_fields = [
        "image_url",
    ]

    ordering_fields = "__all__"
    host_address =  os.getenv("WEB_HOST")


    def get_throttles(self):

        if self.action == "upload":
            self.throttle_classes = [UploadImageThrottle]
        else:
            self.throttle_classes = [GeneralImageThrottle]


        return [throttle() for throttle in self.throttle_classes]
    
    def upload(self, request):
        uploaded_images = []

        request_images = request.FILES.getlist("images")
        image_not_accepted = []

        if('images' not in request.FILES):

            return Response({
                "error":"images field is required."
            }, 400)
        
        if len(request_images) < 1:
            return Response({
                "error":"no (supported) image/s has been found."
            }, 400)
    
        try:
            for image in request.FILES.getlist("images"):
                image_path = os.path.join('media',f"{str(uuid4())}") 

                with PilImage.open(image) as im:

                    if(str(image).endswith("jpg") or str(image).endswith('jpeg')):
                        image_path += ".jpg"
                        im.save(image_path, "JPEG")
                        
                    elif(str(image).endswith("png")):
                        image_path += ".png"
                        im.save(image_path, "PNG")
                    else:
                        image_not_accepted.append(str(image))
                        continue

                uploaded_image = Image.objects.create(image_url=f"{self.host_address}{image_path}")
                uploaded_images.append(uploaded_image)

        except Exception as e:
            return Response({"error":f"uploading of image triggered an error: {e}"},400)
            
            
        serialized_image = ImageSerializer(uploaded_images, many=True)
        return Response({
            "data": serialized_image.data,
            "images_not_accepted": image_not_accepted,
            "info": "we only support png, jpg, and jpeg formats"
        }) 
    
    def destroy(self, request, *args, **kwargs):

        image_object = self.get_object()
        without_host_image_url = image_object.image_url.replace( self.host_address ,"")
        relative_image_url = os.path.join(".", without_host_image_url)
        os.remove(relative_image_url)

        return super().destroy(request, *args, **kwargs)
    

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
        modificationBasedUserLog(request.user, "cart", serlialized_old_cart_obj.data ,cart_obj.data)
        
        return cart_obj
    
    def destroy(self, request, *args, **kwargs):
        old_cart_id = kwargs["pk"]
        old_cart_obj = Cart.objects.get(id=old_cart_id)
        serlialized_old_cart_obj = CartSerializer(old_cart_obj)
        deletionBasedUserLog(request.user, "cart", serlialized_old_cart_obj.data)
        
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
        modificationBasedUserLog(request.user, "product", serlialized_old_product_obj.data ,product_obj.data)
        
        return product_obj
    
    def destroy(self, request, *args, **kwargs):
        old_product_id = kwargs["pk"]
        old_product_obj = Product.objects.get(id=old_product_id)
        serlialized_old_product_obj = ProductImageSerializer(old_product_obj)
        deletionBasedUserLog(request.user, "product", serlialized_old_product_obj.data)
        
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
        cart_items = Cart.objects.filter(service_crew=transaction_instance)

        for cart_item in cart_items:
            ProductOrder.objects.create(
                transaction=transaction_instance,
                product=cart_item.product,
                quantity=cart_item.quantity
            )

            cart_item.delete()
        
        product_orders = ProductOrder.objects.filter(transaction=transaction_instance)
        serialized_product_order = ProductOrderSerializer(product_orders, many=True)

        transaction_obj = {
            "transaction": transaction.data,
            "product_orders": serialized_product_order.data
        }
        
        creationBasedUserLog(request.user, "transaction", transaction_obj)
        
        return  Response(serialized_product_order.data, status=201)

    
    def update(self, request, *args, **kwargs):
        transaction_obj = super().update(request, *args, **kwargs)
        old_transaction_id = kwargs["pk"]
        old_transaction_obj = Transaction.objects.get(id=old_transaction_id)
        serlialized_old_transaction_obj = TransactionSerializer(old_transaction_obj)
        modificationBasedUserLog(request.user, "transaction", serlialized_old_transaction_obj.data ,transaction_obj.data)
        
        return transaction_obj
    
    def destroy(self, request, *args, **kwargs):
        old_transaction_id = kwargs["pk"]
        old_transaction_obj = Transaction.objects.get(id=old_transaction_id)
        serlialized_old_transaction_obj = TransactionSerializer(old_transaction_obj)
        deletionBasedUserLog(request.user, "transaction", serlialized_old_transaction_obj.data)
        
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
        serlialized_old_product_order_obj = ProductOrderSerializer(old_product_order_obj)
        modificationBasedUserLog(request.user, "product order", serlialized_old_product_order_obj.data ,product_order_obj.data)
        
        return product_order_obj
    
    def destroy(self, request, *args, **kwargs):
        old_product_order_id = kwargs["pk"]
        old_product_order_obj = ProductOrder.objects.get(id=old_product_order_id)
        serlialized_old_product_order_obj = ProductOrderSerializer(old_product_order_obj)
        deletionBasedUserLog(request.user, "product order", serlialized_old_product_order_obj.data)
        
        return super().destroy(request, *args, **kwargs)

class UserLogViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = UserLog.objects.all()
    serializer_class = UserLogSerializer 

    ordering_fields = "__all__"

class StockImageViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = Stock.objects.all().select_related("image")
    serializer_class = StockImageSerializer

class ProductImageViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = Product.objects.all().select_related("image")
    serializer_class = ProductImageSerializer   

class StockSupplierIsStockedByImageViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = Stock.objects.all().select_related("image", "supplier", "is_stocked_by")
    serializer_class = StockSupplierIsStockedByImageSerializer


class ProductCategoryImageViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = Product.objects.all().select_related("image", "category")
    serializer_class = ProductCategoryImageSerializer

class ProductServiceCrewCartViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = Cart.objects.all().select_related()
    serializer_class = ProductServiceCrewCartSerializer

class UserUserLogViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = UserLog.objects.all().select_related()
    serializer_class = UserUserLogSerializer

class ProductTransactionProductOrderViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = ProductOrder.objects.all().select_related()
    serializer_class = ProductTransactionProductOrderSerializer





# cart
# userlogs
# productorder
# transaction


# class TransactionProductsOrderCartViewSet(viewsets.ViewSet):
#     permission_classes = [IsAuthenticated]

#     def list(self, request):
#         transactions = Transaction.objects.all()
#         product_orders = ProductOrder.objects.all()
#         carts = Cart.objects.all()

#         serialized_transactions = TransactionSerializer(transactions, many=True)
#         serialized_product_orders = ProductOrderSerializer(product_orders, many=True)
#         serialized_carts = CartSerializer(carts, many=True)

#         return Response({
#             "transactions": serialized_transactions.data,
#             "product_orders": serialized_product_orders.data,
#             "carts": serialized_carts.data
#         })

#     def retrieve(self, request, pk=None):
#         transactions = Transaction.objects.get(pk=pk)
#         product_orders = ProductOrder.objects.filter(transaction=transactions)
#         carts = Cart.objects.filter(service_crew=transactions.service_crew)

#         serialized_transactions = TransactionSerializer(transactions)
#         serialized_product_orders = ProductOrderSerializer(product_orders, many=True)
#         serialized_carts = CartSerializer(carts, many=True)

#         return Response({
#             "transaction": serialized_transactions.data,
#             "product_orders": serialized_product_orders.data,
#             "carts": serialized_carts.data
#         })

#     def create(self, request):
#         pass

#     def update(self, request, pk=None):
#         pass

#     def destroy(self, request, pk=None):
#         pass    



""" {}
TODO:
 - Streamline on checkout 
  - bale yung OrderProduct, Transaction, Cart
  - Get info sa Cart 
  - add a transaction
  - Add sa OrderProduct 
    - Then delete sa Cart
 """


""" 
- Dashboard 
    - Immediate analytics
    - Inventory tables
    - Logs
    - User

 """


