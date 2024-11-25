import { transactionColumns } from "@/components/columns";
import StockStatus from "@/components/stock/stock-status";
import Deletetransaction from "@/components/transaction/delete-transaction";
import TransactionTable from "@/components/transaction/transactiontable";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/authContext";
import Product from "@/models/product";
import Transaction from "@/models/transaction";
import dataFetch from "@/services/data-service";
import { PackagePlus } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Toaster } from "sonner";

const TransactionPage = () => {
  const { token } = useAuth();
  const [transaction, setTransaction] = useState<Transaction[]>([]);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);

  const fetchTransactions = async () => {
    try {
      const transaction = (await dataFetch(
        "api/transactions/",
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

  const handleDelete = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setIsDeletePopupOpen(true);
  };

  const columns = transactionColumns(handleDelete);

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
