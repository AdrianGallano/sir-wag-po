import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface Stock {
  id: number;
  quantity: number;
  stock: { name: string; unit_price: number };
  service_crew: { username: string };
}

interface StockTransactionPopupProps {
  open: boolean;
  onClose: () => void;
  onSubmitTransaction: (payload: {
    service_crew: number;
  }) => void;
  totalPrice: number;
  stocks: Stock[];
  serviceCrewId: number;
}

const TransactionPopup: React.FC<StockTransactionPopupProps> = ({
  open,
  onClose,
  onSubmitTransaction,
  stocks,
  serviceCrewId,
}) => {
  const [totalQuantity, setTotalQuantity] = useState<number>(0);

  useEffect(() => {
    const calculatedTotalQuantity = stocks.reduce(
      (acc, stock) => acc + stock.quantity,
      0
    );
    setTotalQuantity(calculatedTotalQuantity);
  }, [stocks]);

  const handleSubmit = () => {
    const payload = {
      service_crew: serviceCrewId,
    };
    onSubmitTransaction(payload);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl w-full h-auto">
        <DialogHeader>
          <DialogTitle>Complete Transaction</DialogTitle>
          <DialogDescription>
            Finalize the transaction
          </DialogDescription>
        </DialogHeader>

        <div className="mb-6 border-b pb-4">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            Transaction Details
          </h3>
          <div className="flex justify-between text-gray-600 text-sm">
            <span>Service Crew:</span>
            <span className="font-medium text-gray-800">
              {stocks[0]?.service_crew?.username || "N/A"}
            </span>
          </div>
          <div className="mt-4 h-48 overflow-y-auto">
            <h4 className="text-md font-semibold text-gray-700 mb-2">
              stocks:
            </h4>
            <ul className="space-y-4">
              {stocks.map((stock) => (
                <li key={stock.id} className="text-gray-600 text-sm">
                  <div className="flex justify-between">
                    <span>{stock?.stock.name}</span>
                    <span>Quantity: x{stock.quantity}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex justify-between text-gray-600 text-sm mt-4">
            <span>Total Quantity:</span>
            <span className="font-medium text-lg text-gray-800">{totalQuantity}</span>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            className="h-10 text-white bg-custom-char"
          >
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TransactionPopup;
