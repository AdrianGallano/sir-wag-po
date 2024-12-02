import { useEffect, useState } from "react";
import { useAuth } from "@/context/authContext";
import dataFetch from "@/services/data-service";
import StockStatus from "@/components/stock/stock-status";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { Supplier } from "@/models/supplier";
import { supplierColumns } from "@/components/columns";
import SupplierTable from "@/components/supplier/supplier-table";
import { UserPlus2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import AddSupplierForm from "@/components/supplier/add-supplier";
import EditSupplier from "@/components/supplier/edit-supplier";
import DeleteSupplier from "@/components/supplier/delete-supplier";

const SupplierPage = () => {
  const { token } = useAuth();
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);

  const [isSupplierPopupOpen, setIsSupplierPopupOpen] =
    useState<boolean>(false);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(
    null
  );

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

  const exportSupplier = async () => {
    try {
      const response = await dataFetch(
        "api/excel/supplier/",
        "GET",
        {},
        token!,
        "blob"
      );

      const blob = new Blob([response], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const url = window.URL.createObjectURL(blob);

      window.open(url);
    } catch (error) {
      console.error("Failed to fetch Excel file", error);
    }
  };

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const handleEdit = (supplier: Supplier) => {
    setSelectedSupplier(supplier);
    setIsEditPopupOpen(true);
  };

  const handleDelete = (supplier: Supplier) => {
    setSelectedSupplier(supplier);
    setIsDeletePopupOpen(true);
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
          onExport={exportSupplier}
        />
      </div>

      {isSupplierPopupOpen && (
        <AddSupplierForm
          isOpen={isSupplierPopupOpen}
          onClose={() => setIsSupplierPopupOpen(false)}
          onChanges={fetchSuppliers}
        />
      )}

      {isEditPopupOpen && (
        <EditSupplier
          isOpen={isEditPopupOpen}
          onClose={() => setIsEditPopupOpen(false)}
          onChanges={fetchSuppliers}
          supplier={selectedSupplier!}
        />
      )}

      {isDeletePopupOpen && (
        <DeleteSupplier
          isOpen={isDeletePopupOpen}
          onClose={() => setIsDeletePopupOpen(false)}
          supplier={selectedSupplier!}
          onUpdate={fetchSuppliers}
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
