import {
  stockTransactionColumns,
  transactionColumns,
} from "@/components/columns";
import DeleteStockTransaction from "@/components/stock-transaction/delete-stock-transaction";
import StockTransactionTable from "@/components/stock-transaction/stock-transaction-table";
import StockStatus from "@/components/stock/stock-status";
import { useAuth } from "@/context/authContext";
import { StockTransaction } from "@/models/stock-transaction";
import dataFetch from "@/services/data-service";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "sonner";

const StockTransactionPage = () => {
  const { token } = useAuth();
  const [transaction, setTransaction] = useState<StockTransaction[]>([]);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] =
    useState<StockTransaction | null>(null);
  const navigate = useNavigate();

  const fetchTransactions = async () => {
    try {
      const transaction = (await dataFetch(
        "api/stock-transaction/stock-used/",
        "GET",
        {},
        token!
      )) as StockTransaction[];
      setTransaction(transaction.reverse());
      console.log(transaction);
    } catch (error) {
      console.error("Failed to fetch transaction", error);
    }
  };

  const exportTransaction = async () => {
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

  const handleMassDelete = async (transactions: StockTransaction[]) => {
    try {
      for (const transaction of transactions) {
        await dataFetch(
          `api/transactions/${transaction.id}/`,
          "DELETE",
          {},
          token!
        );
      }

      setTransaction((prev) =>
        prev.filter(
          (transaction) => !transactions.some((c) => c.id === transaction.id)
        )
      );
      toast.success("Transactions deleted successfully");
    } catch (error) {
      toast.error("Failed to delete transactions");
    }
  };

  const handleDelete = (transaction: StockTransaction) => {
    setSelectedTransaction(transaction);
    setIsDeletePopupOpen(true);
  };

  const columns = stockTransactionColumns(handleDelete, handleMassDelete);

  useEffect(() => {
    if (!token) {
      navigate("login");
    }
    fetchTransactions();
  }, []);

  return (
    <main className="h-screen w-full p-3.5">
      <div className="flex justify-between w-full items-center">
        <StockStatus />
      </div>
      <div className="w-full">
        <StockTransactionTable
          columns={columns}
          data={transaction}
          onDelete={handleDelete}
          onExport={exportTransaction}
          onMassDeletion={handleMassDelete}
        />
      </div>

      {isDeletePopupOpen && (
        <DeleteStockTransaction
          isOpen={isDeletePopupOpen}
          onClose={() => setIsDeletePopupOpen(false)}
          transaction={selectedTransaction!}
          onUpdate={fetchTransactions}
        />
      )}
    </main>
  );
};

export default StockTransactionPage;
