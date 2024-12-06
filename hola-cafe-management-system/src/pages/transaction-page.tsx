import { transactionColumns } from "@/components/columns";
import StockStatus from "@/components/stock/stock-status";
import Deletetransaction from "@/components/transaction/delete-transaction";
import TransactionTable from "@/components/transaction/transactiontable";
import { useAuth } from "@/context/authContext";
import Transaction from "@/models/transaction";
import dataFetch from "@/services/data-service";
import { useEffect, useState } from "react";
import { toast, Toaster } from "sonner";

const TransactionPage = () => {
  const { token } = useAuth();
  const [transaction, setTransaction] = useState<Transaction[]>([]);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);

  const fetchTransactions = async () => {
    try {
      const transaction = (await dataFetch(
        "api/product/product-order/transaction/",
        "GET",
        {},
        token!
      )) as Transaction[];
      setTransaction(transaction);
      console.log(transaction);
    } catch (error) {
      console.error("Failed to fetch transaction", error);
    }
  };

  const exportTransaction = async () => {
    try {
      const response = await dataFetch(
        "api/excel/transaction/",
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

  const handleMassDelete = async (transactions: Transaction[]) => {
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

  const handleDelete = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setIsDeletePopupOpen(true);
  };

  const columns = transactionColumns(handleDelete, handleMassDelete);

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <main className="h-screen w-full p-3.5">
      <div className="flex justify-between w-full items-center">
        <StockStatus
          totalStock={52}
          recentStock="Granola Bar"
          expirationDate="December 2, 2024"
          stockLevel={75}
        />
      </div>
      <div className="w-full">
        <TransactionTable
          columns={columns}
          data={transaction}
          onDelete={handleDelete}
          onExport={exportTransaction}
          onMassDeletion={handleMassDelete}
        />
      </div>

      {isDeletePopupOpen && (
        <Deletetransaction
          isOpen={isDeletePopupOpen}
          onClose={() => setIsDeletePopupOpen(false)}
          transaction={selectedTransaction!}
          onUpdate={fetchTransactions}
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

export default TransactionPage;
