import React, { useEffect, useState } from "react";
import { Category } from "@/models/category";
import PopupBase from "./Popup-Base";
import { Product } from "@/models/product";
import { Supplier } from "@/models/supplier";
import dataFetch from "@/services/data-service";
import { useAuth } from "@/context/authContext";

interface EditProductsProps {
  product: Product;
  onClose: () => void;
  onSubmit: (data: Product) => void;
  onOpenImageManager: () => void;
  categories: Category[];
  suppliers: Supplier[];
}

const EditProducts: React.FC<EditProductsProps> = ({
  product,
  onClose,
  onSubmit,
}) => {
  const { token } = useAuth();
  const [categories, setCategories] = useState<{ id: number; label: string }[]>(
    []
  );
  const [suppliers, setSuppliers] = useState<{ id: number; label: string }[]>(
    []
  );
  const [imageId, setImageId] = useState<number | undefined>(undefined);

  // Fetch Categories
  const getCategories = async () => {
    const endpoint = "/api/categories/";
    if (!token) {
      console.error("Token not found");
      return;
    }
    try {
      const response = await dataFetch(endpoint, "GET", {}, token);
      const categoriesData = response.map((cat: any) => ({
        id: cat.id,
        label: cat.name,
      }));
      setCategories(categoriesData);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  // Fetch Suppliers
  const getSuppliers = async () => {
    const endpoint = "/api/suppliers/";
    if (!token) {
      console.error("Token not found");
      return;
    }
    try {
      const response = await dataFetch(endpoint, "GET", {}, token);
      const suppliersData = response.map((sup: any) => ({
        id: sup.id,
        label: sup.name,
      }));
      setSuppliers(suppliersData);
    } catch (error) {
      console.error("Error fetching suppliers:", error);
    }
  };

  useEffect(() => {
    getCategories();
    getSuppliers();
  }, []);
  // Fetch Categories and Suppliers on component mount
  const initialData = {
    ...product,
    category: product.category ? product.category.id : "",
    supplier: product.supplier ? product.supplier.id : "",
  };
  console.log("Initial Data:", initialData);
  // Define the fields for the form
  const fields = [
    { label: "Product Name", key: "name", type: "text" },
    { label: "Description", key: "description", type: "textarea" },
    { label: "Price", key: "price", type: "number" },
    { label: "Quantity", key: "quantity", type: "number" },
    { label: "Cost Price", key: "cost_price", type: "number" },
    { label: "Expiration Date", key: "expiration_date", type: "date" },
    {
      label: "Category",
      key: "category",
      type: "select",
      options: categories,
    },
    {
      label: "Supplier",
      key: "supplier",
      type: "select",
      options: suppliers,
    },
  ];
  // Handle form submission
  const handleSubmit = (data: any) => {
    const updatedProduct = {
      ...product,
      ...data,
      category: Number(data.category),
      supplier: Number(data.supplier),
    };

    // Log the updated product for debugging
    console.log("Updated Product:", updatedProduct);

    // Call the onSubmit function with the updated product
    onSubmit(updatedProduct);
  };

  return (
    <PopupBase
      title="Edit Product"
      initialData={initialData}
      fields={fields}
      popupType="product"
      onClose={onClose}
      onSubmit={handleSubmit}
      categories={categories}
      suppliers={suppliers}
      isNeededToOpen={true}
    ></PopupBase>
  );
};

export default EditProducts;
