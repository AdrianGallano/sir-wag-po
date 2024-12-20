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
import { useNavigate } from "react-router-dom";
import { useStockNotifications } from "@/hooks/useStockNotifications";

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
  const navigate = useNavigate();

  const fetchSuppliers = async () => {
    try {
      const suppliers = (await dataFetch(
        "api/suppliers/",
        "GET",
        {},
        token!
      )) as Supplier[];
      setSuppliers(suppliers.reverse());
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

  const handleMassDelete = async (suppliers: Supplier[]) => {
    try {
      for (const supplier of suppliers) {
        await dataFetch(`api/suppliers/${supplier.id}/`, "DELETE", {}, token!);
      }

      setSuppliers((prev) =>
        prev.filter((supplier) => !suppliers.some((c) => c.id === supplier.id))
      );
      toast.success("Suppliers deleted successfully");
    } catch (error) {
      toast.error("Failed to delete suppliers");
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
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

  const columns = supplierColumns(handleEdit, handleDelete, handleMassDelete);

  return (
    <main className="h-screen w-full p-3.5">
      <div className="flex justify-between w-full items-center">
        <StockStatus />
        <div className="self-start">
          <Button
            size={"icon"}
            className="bg-white text-black hover:bg-custom-char hover:text-white border border-gray-300 rounded-full"
            onClick={() => setIsSupplierPopupOpen(true)}
          >
            <UserPlus2Icon className="w-5 h-5" />
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
          onMassDeletion={handleMassDelete}
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

      <Toaster position="top-right" />
    </main>
  );
};

export default SupplierPage;
