import React, { useState } from "react";
import { Button } from "../ui/button";
import dataFetch from "@/services/data-service";
import { useAuth } from "@/context/authContext";

interface CartProduct {
  id: string;
  name: string;
  quantity: number;
  price: number;
  product: {
    id: number;
    name: string;
    price: number;
  };
}

interface PosTransactionProps {
  cartProducts: CartProduct[];
  openTransactionPopup: () => void;
  refreshCart: () => void;
}

const PosTransaction: React.FC<PosTransactionProps> = ({
  cartProducts,
  openTransactionPopup,
  refreshCart,
}) => {
  const { token, id } = useAuth();

  // Function to handle quantity change
  const handleQuantityChange = async (cartId: string, currentQuantity: number, change: number, productId: number) => {
    const newQuantity = currentQuantity + change;

    // Prevent quantity from being set below 1
    if (newQuantity < 1) return;

    const payload = {
      quantity: newQuantity,
      service_crew: id,
      product: productId, // Single product ID instead of array
    };

    try {
      if (!token) {
        console.error("User not authenticated");
        return;
      }

      const endPoint = `/api/carts/${cartId}/`;
      const method = "PUT";

      await dataFetch(endPoint, method, payload, token);
      console.log(`Updated quantity for cart ID ${cartId} to ${newQuantity}`);
      refreshCart();
    } catch (error) {
      console.error("Error updating quantity:", error);
      console.log("Payload:", payload);
    }
  };

  // Calculate total price
  const totalPrice = cartProducts.reduce(
    (acc, product) => acc + product?.product.price * product.quantity,
    0
  );

  // Function to handle the deletion of individual cart items
  const handleDeleteItem = async (cartId: string) => {
    try {
      if (!token) {
        console.error("User not authenticated");
        return;
      }
      const endPoint = `/api/carts/${cartId}/`; // Deleting cart item by ID
      const method = "DELETE";
      await dataFetch(endPoint, method, {}, token);
      console.log(`Item with ID ${cartId} deleted`);
      refreshCart(); // Refresh cart after deletion
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  return (
    <div className="w-1/4 border-l pt-12 pb-24 pl-4 pr-4 fixed top-0 right-0 h-full bg-white shadow-lg z-10">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl text-gray-700 font-semibold underline">Transaction</h2>
      </div>

      <div className="border rounded-lg p-4 h-full flex flex-col">
        {/* Cart Products */}
        <div className="mb-4 overflow-y-auto max-h-[60vh] flex-grow">
          {cartProducts.length === 0 ? (
            <p className="text-gray-500 text-center">No items in the cart</p>
          ) : (
            <ul className="space-y-2">
              {cartProducts.map((product) => (
                <li
                  key={product.id}
                  className="flex flex-col bg-white p-2 rounded shadow-sm border"
                >
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex-1">
                      <p className="font-medium text-gray-800">{product?.product.name}</p>
                      <p className="text-sm text-gray-500">
                        ₱{Number(product?.product.price).toFixed(2)} each
                      </p>
                    </div>
                    <p className="font-semibold text-gray-700">
                      ₱{Number(product?.product.price * product.quantity).toFixed(2)}
                    </p>
                  </div>
                  {/* Quantity Changer */}
                  <div className="flex items-center justify-between mb-4">
                    <button
                      className="px-2 py-1 text-lg font-bold bg-transparent hover:border-gray-400 rounded border border-gray-300"
                      onClick={() =>
                        handleQuantityChange(product.id, product.quantity, -1, product.product.id)
                      }
                    >
                      -
                    </button>
                    <div className="px-4 py-1 bg-transparent rounded-md border border-gray-300">
                    <input
                      type="text" // Changed to "text" for more control over input behavior
                      className="w-16 text-center text-lg font-semibold border-none outline-none"
                      value={product.quantity}
                      onChange={(e) => {
                        const inputValue = e.target.value;
                        // Allow clearing or editing the input
                        if (inputValue === "" || /^[0-9]+$/.test(inputValue)) {
                          handleQuantityChange(product.id, product.quantity, parseInt(inputValue || '0', 10) - product.quantity, product.product.id);
                        }
                      }}
                      onBlur={(e) => {
                        // Reset to 1 if the input is empty or invalid on blur
                        if (e.target.value === "" || Number(e.target.value) <= 0) {
                          handleQuantityChange(product.id, product.quantity, 1 - product.quantity, product.product.id);
                        }
                      }}
                    />
                    </div>
                    <button
                      className="px-2 py-1 text-lg font-bold bg-transparent hover:border-gray-400 rounded border border-gray-300"
                      onClick={() =>
                        handleQuantityChange(product.id, product.quantity, 1, product.product.id)
                      }
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => handleDeleteItem(product.id)}
                    className="text-red-500 self-end"
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Summary Section */}
        <div className="border-t pt-4">
          <div className="flex justify-between items-center mb-2">
            <p className="text-gray-600">Total Quantity:</p>
            <p className="font-semibold text-gray-800">
              {cartProducts.reduce((acc, product) => acc + product.quantity, 0)}
            </p>
          </div>
          <div className="flex justify-between items-center mb-4">
            <p className="text-gray-600">Total Price:</p>
            <p className="font-bold text-xl text-gray-900">
              ₱{Number(totalPrice.toFixed(2)) || 0}
            </p>
          </div>
        </div>

        {/* Open Transaction Popup Button */}
        {cartProducts.length > 0 && (
          <Button
            onClick={openTransactionPopup}
            className="w-full h-12 text-white rounded-full hover:bg-custom-charcoalOlive bg-custom-char"
          >
            Proceed to Transaction
          </Button>
        )}
      </div>
    </div>
  );
};

export default PosTransaction;
