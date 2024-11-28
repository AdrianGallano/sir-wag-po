  import { productColumns } from "@/components/columns";
import AddProductForm from "@/components/products/add-product";
import DeleteProduct from "@/components/products/delete-product";
import EditProduct from "@/components/products/edit-product";
import ProductTable from "@/components/products/product-table";
import StockStatus from "@/components/stock/stock-status";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/authContext";
import { Category } from "@/models/category";
import Product from "@/models/product";
import dataFetch from "@/services/data-service";
import { PackagePlus } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Toaster } from "sonner";

const ProductPage = () => {
  const { token } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const fetchProducts = async () => {
    try {
      const products = (await dataFetch(
        "api/image/category/product/",
        "GET",
        {},
        token!
      )) as Product[];
      setProducts(products);
      console.log(products);
    } catch (error) {
      console.error("Failed to fetch products", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const categories = (await dataFetch(
        "api/categories/",
        "GET",
        {},
        token!
      )) as Category[];
      setCategories(categories);
      console.log("Categories", categories);
    } catch (error) {
      console.error("Failed to fetch stocks", error);
    }
  };

  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
    setIsEditPopupOpen(true);
  };

  const handleDelete = (product: Product) => {
    setSelectedProduct(product);
    setIsDeletePopupOpen(true);
  };

  const columns = productColumns(handleEdit, handleDelete);

  const onUpdate = () => {
    fetchProducts();
  };

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);

  return (
    <main className="h-screen w-full p-3.5">
      <div className="flex justify-between w-full items-center">
        <StockStatus
          totalStock={52}
          recentStock="Granola Bar"
          expirationDate="December 2, 2024"
          stockLevel={75}
        />
        <div className="self-start">
          <Button
            onClick={() => setIsAddProductOpen(true)}
            className="bg-white hover:bg-gray-100 border border-gray-300"
          >
            <PackagePlus className="text-black" />
          </Button>
        </div>
      </div>

      <div className="w-full">
        <ProductTable
          columns={columns}
          data={products}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
      {isAddProductOpen && (
        <AddProductForm
          isOpen={isAddProductOpen}
          onClose={() => setIsAddProductOpen(false)}
          onUpdate={onUpdate}
          categories={categories}
        />
      )}

      {isEditPopupOpen && (
        <EditProduct
          isOpen={isEditPopupOpen}
          onClose={() => setIsEditPopupOpen(false)}
          product={selectedProduct!}
          onChanges={onUpdate}
        />
      )}

      {isDeletePopupOpen && (
        <DeleteProduct
          isOpen={isDeletePopupOpen}
          product={selectedProduct!}
          onClose={() => setIsDeletePopupOpen(false)}
          onUpdate={onUpdate}
        />
      )}

      
    </main>
  );
};

export default ProductPage;
