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

interface TransactionPreviewProps {
  isOpen: boolean;
  onClose: () => void;
  transaction: Transaction;
}

const TransactionPreview = ({
  isOpen,
  onClose,
  transaction,
}: TransactionPreviewProps) => {
  console.log(transaction);
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-xl max-h-[650px]  overflow-y-auto ">
        <DialogHeader>
          <DialogTitle> Transaction Details</DialogTitle>
          <div className="flex justify-between text-gray-600 text-sm text-muted-foreground">
            <p>Trasaction ID: {transaction.id}</p>
            <span>{dateFormatter(transaction.created_at)}</span>
          </div>
        </DialogHeader>

        <div className="w-full">
          <div className="text-gray-600 text-sm">
            <p>
              Service Crew: {""}
              <span className="font-medium text-gray-800">
                {toTitleCase(transaction.service_crew?.username || "N/A")}
              </span>
            </p>
            <p>
              Payment Method: {""}
              <span className="font-medium text-gray-800">
                {transaction.payment_method === "cash" && "Cash"}
                {transaction.payment_method === "credit_card" && "Credit Card"}
                {transaction.payment_method === "online_payment" &&
                  "Online Payment"}
              </span>
            </p>
          </div>

          <div className="mt-4 ">
            <h4 className="text-md font-semibold text-gray-700 mb-2">
              Products:
            </h4>
            <ul className="space-y-2 border-b-2 pb-2">
              {transaction.product_orders.map((product) => (
                <li
                  key={product.id}
                  className="text-gray-600 text-sm flex justify-between w-full"
                >
                  <div className="flex gap-2.5 items-center justify-start">
                    <span>{product.quantity}x</span>
                    <p className="font-medium">{product.product.name}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-800">
                      ₱ {Number(product?.product.price) * product.quantity}
                    </span>
                  </div>
                </li>
              ))}
            </ul>

            <div className="flex justify-end my-2.5 text-gray-600 text-sm">
              <p>
                Total: {""}
                <span className="text-gray-800 font-medium">
                  ₱ {transaction.total_price}
                </span>
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TransactionPreview;
