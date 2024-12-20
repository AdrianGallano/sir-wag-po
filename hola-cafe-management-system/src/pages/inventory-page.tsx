import { useEffect, useState } from "react";
import { useAuth } from "@/context/authContext";
import { Stock } from "@/models/stock";
import dataFetch from "@/services/data-service";
import StockStatus from "@/components/stock/stock-status";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { Category } from "@/models/category";
import { Supplier } from "@/models/supplier";
import { stocksColumns } from "@/components/columns";
import {
  CircleCheck,
  HousePlugIcon,
  HousePlus,
  PackagePlus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import AddStockForm from "@/components/stock/add-stock";
import StockTable from "@/components/stock/stock-table";
import EditStock from "@/components/stock/edit-stock";
import DeletePopup from "@/components/stock/delete-stock";
import { useNavigate } from "react-router-dom";
import { useStock } from "@/context/stockContext";
import { useStockNotifications } from "@/hooks/useStockNotifications";

const InventoryPage = () => {
  const { token } = useAuth();
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const { stock, fetchStocks, setStock } = useStock();

  const [isStockPopupOpen, setIsStockPopupOpen] = useState<boolean>(false);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [selectedStock, setSelectedStock] = useState<Stock | null>(null);
  const navigate = useNavigate();

  const exportStocks = async () => {
    try {
      const response = await dataFetch(
        "api/excel/stock/",
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

  const fetchSupplier = async () => {
    try {
      const suppliers = (await dataFetch(
        "api/suppliers/",
        "GET",
        {},
        token!
      )) as Supplier[];
      setSuppliers(suppliers);
    } catch (error) {
      console.error("Failed to fetch stocks", error);
    }
  };

  const handleMassDelete = async (stocks: Stock[]) => {
    try {
      console.log("Deleting stocks", stocks);
      console.log(token);
      for (const stock of stocks) {
        await dataFetch(`api/stocks/${stock.id}/`, "DELETE", {}, token!);
      }

      setStock((prev) =>
        prev.filter((stock) => !stocks.some((c) => c.id === stock.id))
      );
      // toast.success("Stocks deleted successfully");
      toast.success("Stock successfully deleted", {
        duration: 2000,
        icon: <CircleCheck className="fill-green-500 text-white" />,
      });
    } catch (error) {
      toast.error("Failed to delete stocks");
    }
  };

  const onUpdate = () => {
    fetchStocks();
  };

  useEffect(() => {
    if (!token) {
      navigate("login");
    }
    fetchSupplier();
    fetchStocks();
  }, [token, navigate]);

  const handleEdit = (stock: Stock) => {
    setSelectedStock(stock);
    setIsEditPopupOpen(true);
  };

  const handleDelete = (stock: Stock) => {
    setSelectedStock(stock);
    setIsDeletePopupOpen(true);
  };

  const columns = stocksColumns(handleEdit, handleDelete, handleMassDelete);

  return (
    <main className="h-screen w-full py-4 px-2.5">
      <div className="flex justify-between w-full items-center">
        <StockStatus />
        <div className="self-start">
          <Button
            size={"icon"}
            className="bg-white text-black hover:bg-custom-char hover:text-white border border-gray-300 rounded-full"
            onClick={() => setIsStockPopupOpen(true)}
          >
            <PackagePlus className=" w-5 h-5" />
          </Button>
        </div>
      </div>
      <div className="w-full">
        <StockTable
          columns={columns}
          data={stock}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onExport={exportStocks}
          oncallback={fetchStocks}
          onMassDeletion={handleMassDelete}
        />
      </div>

      {isStockPopupOpen && (
        <AddStockForm
          isOpen={isStockPopupOpen}
          onClose={() => setIsStockPopupOpen(false)}
          supplier={suppliers}
          onChanges={fetchStocks}
        />
      )}

      {isEditPopupOpen && (
        <EditStock
          isOpen={isEditPopupOpen}
          onClose={() => setIsEditPopupOpen(false)}
          stock={selectedStock!}
          onChanges={onUpdate}
        />
      )}

      {isDeletePopupOpen && (
        <DeletePopup
          stock={selectedStock!}
          isOpen={isDeletePopupOpen}
          onClose={() => setIsDeletePopupOpen(false)}
          onUpdate={onUpdate}
        />
      )}

      <Toaster position="top-right" />
    </main>
  );
};

export default InventoryPage;
