import { useEffect, useState } from "react";
import { useAuth } from "@/context/authContext";
import { Product } from "@/models/product";
import dataFetch from "@/services/data-service";
import StockStatus from "@/components/hcims/stockstatus";
import AddEntityDropdown from "@/components/hcims/addentitydropdown ";
import CreateProducts from "@/components/inventory/popup/CreateProducts";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import CreateSuppliers from "@/components/inventory/popup/CreateSuppliers";
import CreateCategory from "@/components/inventory/popup/CreateCategories";
import ProductTable from "@/components/hcims/producttable";
import { Category } from "@/models/category";
import { Supplier } from "@/models/supplier";
import { productColumns } from "@/components/columns";
import AddProductForm from "@/components/hcims/addproduct";
import { Button } from "@/components/ui/button";
import { PackagePlus } from "lucide-react";

const InventoryPage = () => {
  const { token } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  const [isProductPopupOpen, setIsProductPopupOpen] = useState<boolean>(false);
  const [isCategoryPopupOpen, setIsCategoryPopupOpen] =
    useState<boolean>(false);
  const [isSupplierPopupOpen, setIsSupplierPopupOpen] =
    useState<boolean>(false);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);

  const fetchProducts = async () => {
    try {
      const products = (await dataFetch(
        "api/products/",
        "GET",
        {},
        token!
      )) as Product[];
      setProducts(products);
      console.log("Fetched products:", products);
    } catch (error) {
      console.error("Failed to fetch products", error);
    }
  };

  const fetchSuppliers = async () => {
    try {
      const suppliers = (await dataFetch(
        "api/suppliers/",
        "GET",
        {},
        token!
      )) as Supplier[];
      setSuppliers(suppliers);
      console.log("Suppliers fetched", suppliers);
    } catch (error) {
      console.error("Failed to fetch suppliers", error);
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
      console.log("Categories fetched", categories);
    } catch (error) {
      console.error("Failed to fetch categories", error);
    }
  };

  const onUpdate = () => {
    fetchProducts();
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
    fetchSuppliers();
  }, []);

  // Function to handle category submit
  const handleCategorySubmit = async (categoryData: any) => {
    try {
      const endpoint = "/api/categories/";
      if (!token) throw new Error("Token not found");

      const response = await dataFetch(endpoint, "POST", categoryData, token);
      console.log("Category saved:", response);

      // onCategoryCreated(); // Refetch categories after creating a new one
      setIsCategoryPopupOpen(false);
      toast.success("Category saved successfully");
    } catch (error) {
      console.error("Error saving category:", error);
    }
  };
  // Function to handle supplier submit
  const handleSupplierSubmit = async (supplierData: any) => {
    try {
      const endpoint = "/api/suppliers/";
      if (!token) throw new Error("Token not found");

      const response = await dataFetch(endpoint, "POST", supplierData, token);
      console.log("Supplier saved:", response);

      // onSupplierCreated(); // Refetch suppliers after creating
      setIsSupplierPopupOpen(false);
      toast.success("Supplier saved successfully");
    } catch (error) {
      console.error("Error saving supplier:", error);
    }
  };

  const handleEdit = (product: Product) => {
    console.log("Editing product:", product);
    // Open a modal or navigate to an edit page
  };

  const handleDelete = (product: Product) => {
    if (confirm(`Are you sure you want to delete ${product.name}?`)) {
      console.log("Deleting product:", product);
      // Perform delete operation (e.g., API call)
    }
  };

  const columns = productColumns(handleEdit, handleDelete);

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
            className="bg-white hover:bg-gray-100 border border-gray-300"
            onClick={() => setIsProductPopupOpen(true)}
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

      {isProductPopupOpen && (
        <AddProductForm
          isOpen={isProductPopupOpen}
          onClose={() => setIsProductPopupOpen(false)}
          supplier={suppliers}
          categories={categories}
          onChanges={onUpdate}
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

export default InventoryPage;
