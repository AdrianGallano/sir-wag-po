import { categoryColumns, productColumns } from "@/components/columns";
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
import { PackagePlus, Plus, Tag } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Toaster } from "sonner";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import CategoryTable from "@/components/category/category-table";
import AddCategoryForm from "@/components/category/add-category";
import EditCategory from "@/components/category/edit-category";
import DeleteCategory from "@/components/category/delete-category";

const CategoryPage = () => {
  const { token } = useAuth();
  const [categories, setCategories] = useState<Category[]>([]);
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );

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

  const handleEdit = (categories: Category) => {
    setSelectedCategory(categories);
    setIsEditPopupOpen(true);
  };

  const handleDelete = (categories: Category) => {
    setSelectedCategory(categories);
    setIsDeletePopupOpen(true);
  };

  const columns = categoryColumns(handleEdit, handleDelete);

  useEffect(() => {
    fetchCategories();
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
            <Plus className="text-black" />
          </Button>
        </div>
      </div>

      <div className="w-full">
        <CategoryTable
          columns={columns}
          data={categories}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>

      {isAddProductOpen && (
        <AddCategoryForm
          isOpen={isAddProductOpen}
          onClose={() => setIsAddProductOpen(false)}
          onChanges={fetchCategories}
        />
      )}

      {isEditPopupOpen && (
        <EditCategory
          isOpen={isEditPopupOpen}
          onClose={() => setIsEditPopupOpen(false)}
          category={selectedCategory!}
          onChanges={fetchCategories}
        />
      )}

      {isDeletePopupOpen && (
        <DeleteCategory
          isOpen={isDeletePopupOpen}
          category={selectedCategory!}
          onClose={() => setIsDeletePopupOpen(false)}
          onUpdate={fetchCategories}
        />
      )}

      <Toaster
        position="top-right"
        toastOptions={{
          classNames: {
            error: "bg-red-400 bg-white border-none",
            success: "text-green-400 bg-white border-none",
            warning: "text-yellow-400 bg-white border-none",
            info: "bg-blue-400 bg-white border-none",
          },
        }}
      />
    </main>
  );
};

export default CategoryPage;