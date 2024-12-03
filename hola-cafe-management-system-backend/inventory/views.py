# DRF 
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import ReadOnlyModelViewSet
from rest_framework import viewsets

# DJANGO
from uuid import uuid4

# DRF EXCEL
from drf_excel.mixins import XLSXFileMixin
from drf_excel.renderers import XLSXRenderer

# PILLOW
from PIL import Image as PilImage

# OS
import os

# CUSTOM
from core.helpers import creationBasedUserLog, modificationBasedUserLog, deletionBasedUserLog
from .throttles import GeneralRequestThrottle,GeneralImageThrottle,UploadImageThrottle
from .models import Category, Stock, Supplier, Image,Product
from .serializers import (
    CategorySerializer,
    SupplierSerializer,
    ImageSerializer,
    ProductImageSerializer,
    StockImageSerializer,
    ProductSerializer,
    StockSerializer,
    StockSupplierIsStockedByImageSerializer,
    ProductCategoryImageSerializer,
)
from core.excel_style import COLUMN_HEADER, BODY, COLUMN_BODY_STYLES




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



""" 
- Dashboard (staka to)
    - Immediate analytics (to nalang kulang)
    - Inventory tables
    - Logs
    - User
- Import Export (staka to)
- Analytics
"""
