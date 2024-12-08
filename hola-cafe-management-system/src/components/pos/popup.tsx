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

interface Product {
  id: number;
  quantity: number;
  product: { name: string; price: number };
  service_crew: { username: string };
}

interface TransactionPopupProps {
  open: boolean;
  onClose: () => void;
  onSubmitTransaction: (payload: {
    total_price: string;
    payment_method: string;
    service_crew: number;
  }) => void;
  totalPrice: number;
  products: Product[];
  serviceCrewId: number;
}

const TransactionPopup: React.FC<TransactionPopupProps> = ({
  open,
  onClose,
  onSubmitTransaction,
  totalPrice,
  products,
  serviceCrewId,
}) => {
  const [paymentMethod, setPaymentMethod] = useState<string | undefined>("");
  const [totalQuantity, setTotalQuantity] = useState<number>(0);

  useEffect(() => {
    const calculatedTotalQuantity = products.reduce(
      (acc, product) => acc + product.quantity,
      0
    );
    setTotalQuantity(calculatedTotalQuantity);
  }, [products]);

  const handleSubmit = () => {
    if (!paymentMethod) {
      toast.error("Please select a payment method.");
      return;
    }

    const payload = {
      total_price: totalPrice.toString(),
      payment_method: paymentMethod,
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
            Finalize the transaction by providing payment details.
          </DialogDescription>
        </DialogHeader>

        <div className="mb-6 border-b pb-4">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            Transaction Details
          </h3>
          <div className="flex justify-between text-gray-600 text-sm">
            <span>Service Crew:</span>
            <span className="font-medium text-gray-800">
              {products[0]?.service_crew?.username || "N/A"}
            </span>
          </div>
          <div className="mt-4 h-48 overflow-y-auto">
            <h4 className="text-md font-semibold text-gray-700 mb-2">
              Products:
            </h4>
            <ul className="space-y-4">
              {products.map((product) => (
                <li key={product.id} className="text-gray-600 text-sm">
                  <div className="flex justify-between">
                    <span>{product?.product.name}</span>
                    <span className="font-medium pr-3 text-gray-800">
                      ₱{product?.product.price}
                    </span>
                  </div>
                  <div className="flex justify-between pr-3">
                    <span>Quantity: x{product.quantity}</span>
                    <span>
                      Total: ₱{(product?.product.price * product.quantity)}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex justify-between text-gray-600 text-sm mt-4">
            <span>Total Quantity:</span>
            <span className="font-medium text-lg text-gray-800">{totalQuantity}</span>
          </div>
          <div className="flex justify-between text-gray-600 text-sm mt-4">
            <span>Total Price:</span>
            <span className="font-normal text-3xl text-gray-800">
              ₱{totalPrice}
            </span>
          </div>
        </div>

        <div className="mb-6">
          <label
            htmlFor="payment-method"
            className="block mb-2 text-sm font-medium text-gray-700"
          >
            Payment Method
          </label>
          <Select value={paymentMethod} onValueChange={setPaymentMethod}>
            <SelectTrigger className="w-full border rounded p-3 bg-gray-50">
              <SelectValue placeholder="Select a payment method" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Methods</SelectLabel>
                <SelectItem value="cash">Cash</SelectItem>
                <SelectItem value="credit_card">Credit Card</SelectItem>
                <SelectItem value="online_payment">Online Payment</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
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
