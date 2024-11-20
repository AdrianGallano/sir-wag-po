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
import { productColumns, supplierColumns } from "@/components/columns";
import SupplierTable from "@/components/hcims/suppliertable";
import { UserPlus2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import AddSupplierForm from "@/components/hcims/addsupplier";

const SupplierPage = () => {
  const { token } = useAuth();
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);

  const [isSupplierPopupOpen, setIsSupplierPopupOpen] =
    useState<boolean>(false);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);

  // const handlePopup = (
  //   popupType: "product" | "category" | "supplier",
  //   action: "open" | "close"
  // ) => {
  //   if (popupType === "product") {
  //     setIsProductPopupOpen(action === "open");
  //   } else if (popupType === "category") {
  //     setIsCategoryPopupOpen(action === "open");
  //   } else if (popupType === "supplier") {
  //     setIsSupplierPopupOpen(action === "open");
  //   }
  // };

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

  useEffect(() => {
    fetchSuppliers();
  }, []);

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

  const handleEdit = (supplier: Supplier) => {
    console.log("Editing supplier:", supplier);
    // Open a modal or navigate to an edit page
  };

  const handleDelete = (supplier: Supplier) => {
    if (confirm(`Are you sure you want to delete ${supplier.name}?`)) {
      console.log("Deleting product:", supplier);
      // Perform delete operation (e.g., API call)
    }
  };

  const onUpdate = () => {
    fetchSuppliers();
  };

  const columns = supplierColumns(handleEdit, handleDelete);

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
            onClick={() => setIsSupplierPopupOpen(true)}
          >
            <UserPlus2Icon className="text-black" />
          </Button>
        </div>
      </div>
      <div className="w-full min-h-screen">
        <SupplierTable
          columns={columns}
          data={suppliers}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>

      {isSupplierPopupOpen && (
        <AddSupplierForm
          isOpen={isSupplierPopupOpen}
          onClose={() => setIsSupplierPopupOpen(false)}
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

export default SupplierPage;
