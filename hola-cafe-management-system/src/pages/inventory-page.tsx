import { useEffect, useState } from "react";
import { useAuth } from "@/context/authContext";
import { Stock } from "@/models/stock";
import dataFetch from "@/services/data-service";
import StockStatus from "@/components/stock/stockstatus";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import ProductTable from "@/components/stock/stocktable";
import { Category } from "@/models/category";
import { Supplier } from "@/models/supplier";
import { productColumns } from "@/components/columns";
import DeletePopup from "@/components/popups/delete-product";
import EditProducts from "@/components/popups/edit-products";
import { PackagePlus, SquarePlus } from "lucide-react";
import CreateProducts from "@/components/inventory/popup/CreateProducts";
import { Button } from "@/components/ui/button";
import AddStockForm from "@/components/stock/addstock";

const InventoryPage = () => {
  const { token } = useAuth();
  const [stock, setStock] = useState<Stock[]>([]);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  const [isProductPopupOpen, setIsProductPopupOpen] = useState<boolean>(false);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Stock | null>(null);

  const fetchProducts = async () => {
    try {
      const stocks = (await dataFetch(
        "api/stocks/",
        "GET",
        {},
        token!
      )) as Stock[];
      console.log("Stocks fetched:", stocks);
      setStock(stocks);
    } catch (error) {
      console.error("Failed to fetch products", error);
    }
  };

  const onUpdate = () => {
    fetchProducts();
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleEdit = (product: Stock) => {
    console.log("Editing product:", product);
    setSelectedProduct(product);
    setIsEditPopupOpen(true);
  };

  const handleDelete = (product: Stock) => {
    setSelectedProduct(product);
    setIsDeletePopupOpen(true);
  };

  // const handleEditConfirmation = async (updatedProduct: Stock) => {
  //   if (selectedProduct) {
  //     try {
  //       if (!token) throw new Error("Token not found");
  //       const apiUrl = `/api/products/${selectedProduct.id}/`;
  //       const response = await dataFetch(apiUrl, "PUT", updatedProduct, token);
  //       toast.success("Stock updated successfully");
  //       console.log("Stock updated:", response);
  //       setIsEditPopupOpen(false); // Close popup after update
  //       setSelectedProduct(null); // Clear selected product
  //       fetchProducts(); // Refetch products to update the UI
  //     } catch (error) {
  //       console.error("Error updating product:", error);
  //       toast.error("Failed to update product");
  //     }
  //   }
  // };

  // const handleDeleteConfirmation = async () => {
  //   if (selectedProduct) {
  //     try {
  //       const apiUrl = `/api/products/${selectedProduct.id}/`;
  //       if (!token) throw new Error("Token not found");
  //       const response = await dataFetch(apiUrl, "DELETE", {}, token);
  //       console.log("Stock deleted:", response);
  //       toast.success("Stock deleted successfully");
  //       // Close the popup and reset the selected product
  //       setIsDeletePopupOpen(false);
  //       setSelectedProduct(null);
  //       fetchProducts(); // Refetch products to update the UI
  //     } catch (error) {
  //       console.error("Error deleting product:", error);
  //       toast.error("Failed to delete product");
  //     }
  //   }
  // };

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
          data={stock}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>

      {isProductPopupOpen && (
        <AddStockForm
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
