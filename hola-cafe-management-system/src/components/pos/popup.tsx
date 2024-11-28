import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "../ui/button";

interface TransactionPopupProps {
  onClose: () => void;
  onSubmitTransaction: (payload: {
    total_price: string;
    payment_method: string;
    service_crew: number;
  }) => void;
  totalPrice: number;
  products: { id: number; product: { name: string; price: number }; service_crew: { username: string } }[];
  serviceCrewId: number;
}

const TransactionPopup: React.FC<TransactionPopupProps> = ({
  onClose,
  onSubmitTransaction,
  totalPrice,
  products,
  serviceCrewId
}) => {
  const [paymentMethod, setPaymentMethod] = useState<string | undefined>("");

  useEffect(() => {
    console.log(products)
  }
);

  // const calculateTotalPrice = () => {
  //   return products.reduce(
  //     (acc, product) => acc + product?.price * quantity,
  //     0
  //   )
  // }


  const handleSubmit = () => {
    totalPrice
    if (!paymentMethod) {
      alert("Please select a payment method");
      return;
    }
  
    const payload = {
      total_price: totalPrice.toString(),
      payment_method: paymentMethod,
      service_crew: serviceCrewId,
    };
    console.log(payload)
  
    onSubmitTransaction(payload);
  };
  

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg w-1/2 shadow-xl transition-all">
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
          <div className="flex justify-between text-gray-600 text-sm">
          <span>Service Crew:</span>
            {products.length > 0 && (
              <span className="font-medium text-gray-800">
                {products[0]?.service_crew?.username}
              </span>
            )}


          </div>
          {/* List of Products */}
          <div className="mt-4 h-48 overflow-y-auto">
            <h4 className="text-md font-semibold text-gray-700 mb-2">Products:</h4>
            <ul className="space-y-4">
              {products.map((product: any) => (
                <li key={product.id} className="flex justify-between text-gray-600 text-sm">
                  <span>{product?.product.name}</span>
                  <span className="font-medium text-gray-800">₱{product?.product.price}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex justify-between text-gray-600 text-sm mt-4">
            <span>Total Price:</span>
            <span className="font-normal text-3xl text-gray-800">
              ₱{totalPrice}
            </span>
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
            <SelectTrigger className="w-full border rounded p-3 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all">
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
        <div className="flex justify-between items-center mt-6">
          <Button
            onClick={onClose}
            className="bg-gray-200 rounded-full text-gray-700 py-2 px-6 hover:bg-gray-300 transition"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
           className=" h-10 text-white rounded-full hover:bg-custom-charcoalOlive bg-custom-char"
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TransactionPopup;
