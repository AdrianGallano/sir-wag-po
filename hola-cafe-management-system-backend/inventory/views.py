from django.http import HttpResponse
from django.views.decorators.http import require_http_methods 
from rest_framework.decorators import api_view
from django.shortcuts import render
from rest_framework import viewsets
from .models import Category, Stock, Supplier, Image, Cart, Product, Transaction, ProductOrder
from .serializers import (
    CategorySerializer,
    StockSerializer,
    SupplierSerializer,
    StockSupplierCategoryImageSerializer,
    ImageSerializer,
    CartSerializer,
    ProductSerializer,
    TransactionSerializer,
    ProductOrderSerializer

)
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from PIL import Image as PilImage
import os
from uuid import uuid4
from .throttles import GeneralRequestThrottle,GeneralImageThrottle,UploadImageThrottle


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


class StockViewSet(viewsets.ModelViewSet):
    throttle_classes = [GeneralRequestThrottle]
    permission_classes = [IsAuthenticated]
    queryset = Stock.objects.all()
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

    def list(self, request):
        queryset = Stock.objects.all().select_related("supplier", "image")
        serializer = StockSupplierCategoryImageSerializer(queryset, many=True)
    
        return Response(serializer.data)



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
        cart_items = Cart.objects.filter(service_crew=request.user)

        for cart_item in cart_items:
            ProductOrder.objects.create(
                transaction=transaction_instance,
                product=cart_item.product,
                quantity=cart_item.quantity
            )

            cart_item.delete()
        
        product_orders = ProductOrder.objects.filter(transaction=transaction_instance)
        serialized_product_order = ProductOrderSerializer(product_orders, many=True)

        return  Response(serialized_product_order.data, status=201)

    
    

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



""" 
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