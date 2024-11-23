import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface TransactionPopupProps {
  onClose: () => void;
  onSubmitTransaction: (payload: {
    total_price: string;
    payment_method: string;
    service_crew: number;
  }) => void;
  totalPrice: number;
  serviceCrew: number;
}

const TransactionPopup: React.FC<TransactionPopupProps> = ({
  onClose,
  onSubmitTransaction,
  totalPrice,
  serviceCrew,
}) => {
  const [paymentMethod, setPaymentMethod] = useState<string | undefined>("");

  const handleSubmit = () => {
    if (!paymentMethod) {
      alert("Please select a payment method");
      return;
    }

    const payload = {
      total_price: totalPrice.toString(),
      payment_method: paymentMethod,
      service_crew: serviceCrew,
    };

    onSubmitTransaction(payload);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg w-1/2 shadow-lg">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Complete Transaction</h2>
          <p className="text-sm text-gray-600">
            Finalize the transaction by providing payment details.
          </p>
        </div>

        {/* Transaction Summary */}
        <div className="mb-6 border-b pb-4">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            Transaction Details
          </h3>
          <div className="flex justify-between text-gray-600 text-sm mb-1">
            <span>Total Price:</span>
            <span className="font-medium text-gray-800">
              ${totalPrice || 1000}
            </span>
          </div>
          <div className="flex justify-between text-gray-600 text-sm">
            <span>Service Crew:</span>
            <span className="font-medium text-gray-800">Name of the crew</span>
          </div>
        </div>

        {/* Payment Method Selection */}
        <div className="mb-6">
          <label
            htmlFor="payment-method"
            className="block mb-2 text-sm font-medium text-gray-700"
          >
            Payment Method
          </label>
          <Select
            value={paymentMethod}
            onValueChange={(value) => setPaymentMethod(value)}
          >
            <SelectTrigger className="w-full border rounded p-2">
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

        {/* Buttons */}
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="bg-gray-100 text-gray-700 py-2 px-4 rounded-md mr-4 hover:bg-gray-300 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="bg-yellow-500 text-black py-2 px-6 rounded-md hover:bg-yellow-600 transition "
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransactionPopup;
