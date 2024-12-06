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
import { HousePlugIcon, HousePlus, PackagePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import AddStockForm from "@/components/stock/add-stock";
import StockTable from "@/components/stock/stock-table";
import EditStock from "@/components/stock/edit-stock";
import DeletePopup from "@/components/stock/delete-stock";
import ServiceCrew from "@/models/service_crew";

const InventoryPage = () => {
  const { token } = useAuth();
  const [stock, setStock] = useState<Stock[]>([]);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);

  const [isStockPopupOpen, setIsStockPopupOpen] = useState<boolean>(false);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [selectedStock, setSelectedStock] = useState<Stock | null>(null);

  const fetchStocks = async () => {
    try {
      const stocks = (await dataFetch(
        "api/image/is-stocked-by/supplier/stock/",
        "GET",
        {},
        token!
      )) as Stock[];
      setStock(stocks);
      console.log("Stock:", stocks);
    } catch (error) {
      console.error("Failed to fetch stocks", error);
    }
  };

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
      toast.success("Stocks deleted successfully");
    } catch (error) {
      toast.error("Failed to delete stocks");
    }
  };

  const onUpdate = () => {
    fetchStocks();
  };

  useEffect(() => {
    fetchSupplier();
    fetchStocks();
  }, []);

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
            onClick={() => setIsStockPopupOpen(true)}
          >
            <HousePlus className="text-black" />
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
