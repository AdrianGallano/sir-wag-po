import { Product } from "@/models/product";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { toTitleCase } from "@/utils/formatter";
import { useContext, useState } from "react";
import { Button } from "../ui/button";
import { useAuth } from "@/context/authContext";
import dataFetch from "@/services/data-service";
import EditProducts from "../inventory/popup/EditProducts"; 
import { Category } from "@/models/category";
import { Supplier } from "@/models/supplier";

interface ProductPreviewProps {
  product: Product | null;
  categories: Category[]; 
  suppliers: Supplier[];  
}

const ProductPreview = ({ product, categories, suppliers }: ProductPreviewProps) => {
  const [selectedImageId, setSelectedImageId] = useState<string | undefined>(product?.image || undefined);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const { token } = useAuth();

  // For editing products 
  const updateProduct = async (data: Product) => {
    try {
      const endpoint = `/api/products/${data.id}/`;
      if (!token) throw new Error('Token not found in response');

      const response = await dataFetch(endpoint, 'PUT', data, token);
      console.log('Product updated:', response);
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const handleEditProductSubmit = (data: Product) => {
    console.log("Edited Product Data:", data);
    updateProduct(data); 
    setIsEditPopupOpen(false);
  };

  if (!product) return null;

  return (
    <div className="w-full">
      <SheetHeader>
        <SheetTitle>{toTitleCase(product.name)}</SheetTitle>
        <Button onClick={() => setIsEditPopupOpen(true)}>Edit Product</Button>
        <SheetDescription>{product.description}</SheetDescription>
        <SheetDescription>Category: {product.category.name}</SheetDescription>
        <SheetDescription>Supplier: {product.supplier.name}</SheetDescription>
        <SheetDescription>Price: ${product.price}</SheetDescription>
      </SheetHeader>

      {isEditPopupOpen && (
        <EditProducts
          product={product}
          onClose={() => setIsEditPopupOpen(false)}
          onSubmit={handleEditProductSubmit}
          categories={categories} 
          suppliers={suppliers} 
          onOpenImageManager={() => setSelectedImageId(undefined)} 
        />
      )}
    </div>
  );
};

export default ProductPreview;