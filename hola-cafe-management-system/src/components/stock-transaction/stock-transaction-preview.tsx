import Transaction from "@/models/transaction";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { dateFormatter, toTitleCase } from "@/utils/formatter";
import { StockTransaction } from "@/models/stock-transaction";

interface TransactionPreviewProps {
  isOpen: boolean;
  onClose: () => void;
  transaction: StockTransaction;
}

const StockTransactionPreview = ({
  isOpen,
  onClose,
  transaction,
}: TransactionPreviewProps) => {
  console.log(transaction);
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-xl max-h-[650px] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Transaction Details</DialogTitle>
          <div className="flex justify-between text-gray-600 text-sm text-muted-foreground">
            <p>Transaction ID: {transaction.id}</p>
            <span>{dateFormatter(transaction.created_at)}</span>
          </div>
        </DialogHeader>

        <div className="w-full">
          <div className="text-gray-600 text-sm">
            <p>
              Service Crew:{" "}
              <span className="font-medium text-gray-800">
                {toTitleCase(transaction.service_crew?.username || "N/A")}
              </span>
            </p>
          </div>

          <div className="mt-4">
            <h4 className="text-md font-semibold text-gray-700 mb-2">
              Stock Used:
            </h4>
            <ul className="space-y-2 border-b-2 pb-2">
              {transaction.stock_used.length > 0 ? (
                transaction.stock_used.map((stock, index) => (
                  <li
                    key={stock.id}
                    className="text-gray-600 text-sm flex justify-between w-full"
                  >
                    <div className="flex gap-2.5 items-center justify-start">
                      <span>{stock.quantity}x</span>
                      <p className="font-medium">{stock.stock.name}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-800">
                        ₱ {Number(stock.stock.unit_price) * stock.quantity}
                      </span>
                    </div>
                  </li>
                ))
              ) : (
                <p>No stock used.</p>
              )}
            </ul>

            <div className="flex justify-end my-2.5 text-gray-600 text-sm">
              <p>
                Total:{" "}
                <span className="text-gray-800 font-medium">
                  ₱{" "}
                  {transaction.stock_used.reduce((total, stock) => {
                    return (
                      total + stock.quantity * Number(stock.stock.unit_price)
                    );
                  }, 0)}
                </span>
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default StockTransactionPreview;
