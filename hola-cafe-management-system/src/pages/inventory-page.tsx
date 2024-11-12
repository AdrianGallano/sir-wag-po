import { useEffect, useState } from "react";
import { useAuth } from "@/context/authContext";
import { Product } from "@/models/product";
import dataFetch from "@/services/data-service";
import MainInventory from "@/components/inventory/inventory-main-content/main-inventory";
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

  const handlePopup = (
    popupType: "product" | "category" | "supplier",
    action: "open" | "close"
  ) => {
    if (popupType === "product") {
      setIsProductPopupOpen(action === "open");
    } else if (popupType === "category") {
      setIsCategoryPopupOpen(action === "open");
    } else if (popupType === "supplier") {
      setIsSupplierPopupOpen(action === "open");
    }
  };

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

  useEffect(() => {
    fetchProducts();
    fetchCategories();
    fetchSuppliers();
  }, []);

  // Function to handle product submit
  const handleProductSubmit = async (productData: Product) => {
    try {
      const endpoint = "/api/products/";
      if (!token) throw new Error("Token not found");

      const response = await dataFetch(endpoint, "POST", productData, token);
      console.log("Product saved:", response);

      // Call the onProductCreated to refetch products
      // onProductCreated(); // Refetch products after creating a new one

      setIsProductPopupOpen(false);
      toast.success("Product saved successfully");
    } catch (error) {
      console.error("Error saving product:", error);
    }
  };
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

  return (
    <main className="min-h-screen w-full p-3.5">
      <div className="flex justify-between w-full items-center">
        <StockStatus
          totalStock={52}
          recentStock="Granola Bar"
          expirationDate="December 2, 2024"
          stockLevel={75}
        />
        <div className="self-start">
          <AddEntityDropdown
            onOpenSupplierPopup={() => {
              handlePopup("supplier", "open");
            }}
            onOpenCategoryPopup={() => {
              handlePopup("category", "open");
            }}
            onOpenPopup={() => handlePopup("product", "open")}
          />
        </div>
      </div>
      <div className="w-full">
        <ProductTable
          products={products}
          categories={categories}
          suppliers={suppliers}
          onproductUpdated={fetchProducts} // Pass the callback
          onproductDeleted={fetchProducts} // Pass the callback
          onCategoryUpdated={fetchCategories} // Pass the callback
          onCategoryDeleted={fetchCategories} // Pass the callback
          onSupplierUpdated={fetchSuppliers} // Pass the callback
          onSupplierDeleted={fetchSuppliers} // Pass the callback
        />
      </div>

      {isProductPopupOpen && (
        <CreateProducts
          onClose={() => handlePopup("product", "close")}
          onSubmit={handleProductSubmit}
        />
      )}

      {isCategoryPopupOpen && (
        <CreateCategory
          onClose={() => handlePopup("category", "close")}
          onSubmit={handleCategorySubmit}
        />
      )}

      {isSupplierPopupOpen && (
        <CreateSuppliers
          onClose={() => handlePopup("supplier", "close")}
          onSubmit={handleSupplierSubmit}
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
