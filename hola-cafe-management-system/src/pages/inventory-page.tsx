import { useEffect, useState } from "react";
import { useAuth } from "@/context/authContext";
import { Product } from "@/models/product";
import dataFetch from "@/services/data-service";
import StockStatus from "@/components/hcims/stockstatus";
import CreateProducts from "@/components/inventory/popup/CreateProducts";
import AddEntityDropdown from "@/components/hcims/addentitydropdown ";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import CreateSuppliers from "@/components/inventory/popup/CreateSuppliers";
import CreateCategory from "@/components/inventory/popup/CreateCategories";
import ProductTable from "@/components/hcims/producttable";
import { Category } from "@/models/category";
import { Supplier } from "@/models/supplier";
import { productColumns } from "@/components/columns";
import DeletePopup from "@/components/popups/delete-product";
import EditProducts from "@/components/popups/edit-products";

const InventoryPage = () => {
  const { token } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  const [isProductPopupOpen, setIsProductPopupOpen] = useState<boolean>(false);
  const [isCategoryPopupOpen, setIsCategoryPopupOpen] = useState<boolean>(false);
  const [isSupplierPopupOpen, setIsSupplierPopupOpen] = useState<boolean>(false);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

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

  useEffect(() => {
    fetchProducts();
  }, []);

  // Function to handle product submit
  const handleProductSubmit = async (productData: Product) => {
    try {
      const endpoint = "/api/products/";
      if (!token) throw new Error("Token not found");

      const response = await dataFetch(endpoint, "POST", productData, token);
      console.log("Product saved:", response);

      setIsProductPopupOpen(false);
      toast.success("Product saved successfully");
    } catch (error) {
      console.error("Error saving product:", error);
    }
  };

  const handleEdit = (product: Product) => {
    console.log("Editing product:", product);
    setSelectedProduct(product); 
    setIsEditPopupOpen(true);  
  };
  

  const handleEditConfirmation = async (updatedProduct: Product) => {
    if (selectedProduct) {
      try {
        if (!token) throw new Error("Token not found");
        const apiUrl = `/api/products/${selectedProduct.id}/`;
        const response = await dataFetch(apiUrl, "PUT", updatedProduct, token);
        toast.success("Product updated successfully");
        console.log("Product updated:", response);
        setIsEditPopupOpen(false);  // Close popup after update
        setSelectedProduct(null);  // Clear selected product
        fetchProducts();  // Refetch products to update the UI
      } catch (error) {
        console.error("Error updating product:", error);
        toast.error("Failed to update product");
      }
    }
  };
  

  const handleDelete = (product: Product) => {
    setSelectedProduct(product);
    setIsDeletePopupOpen(true); 
  };

  const handleDeleteConfirmation = async () => {
    if (selectedProduct) {
      try {
        const apiUrl = `/api/products/${selectedProduct.id}/`;
        if (!token) throw new Error("Token not found");
        const response = await dataFetch(apiUrl, "DELETE", {}, token);
        console.log("Product deleted:", response);
        toast.success("Product deleted successfully");
        // Close the popup and reset the selected product
        setIsDeletePopupOpen(false);
        setSelectedProduct(null);
        fetchProducts();  // Refetch products to update the UI
      } catch (error) {
        console.error("Error deleting product:", error);
        toast.error("Failed to delete product");
      }
    }
  };

  const handleDeleteCancel = () => {
    setIsDeletePopupOpen(false); 
    setSelectedProduct(null); 
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
          {/* <AddEntityDropdown
            onOpenSupplierPopup={() => handlePopup("supplier", "open")}
            onOpenCategoryPopup={() => handlePopup("category", "open")}
            onOpenPopup={() => handlePopup("product", "open")}
          /> */}
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

      {/* {isProductPopupOpen && (
        <CreateProducts
          onClose={() => handlePopup("product", "close")}
          onSubmit={handleProductSubmit}
        />
      )} */}

      {isEditPopupOpen && selectedProduct && (
        <EditProducts
          product={selectedProduct}
          onClose={() => setIsEditPopupOpen(false)} 
          onSubmit={handleEditConfirmation} 
        />
      )}


      {isDeletePopupOpen && selectedProduct && (
        <DeletePopup
          message={`Are you sure you want to delete ${selectedProduct.name}?`}
          onConfirm={handleDeleteConfirmation}
          onCancel={handleDeleteCancel}
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
