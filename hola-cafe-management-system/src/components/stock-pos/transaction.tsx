import React, { useState } from "react";
import { Button } from "../ui/button";
import dataFetch from "@/services/data-service";
import { useAuth } from "@/context/authContext";

interface CartStocks {
  id: string;
  name: string;
  quantity: number;
  unit_price: number;
  stock: {
    id: number;
    name: string;
    unit_price: number;
    quantity: number;
  };
}

interface StockPosTransactionProps {
  cartStocks: CartStocks[];
  openTransactionPopup: () => void;
  refreshCart: () => void;
}

const PosTransaction: React.FC<StockPosTransactionProps> = ({
  cartStocks,
  openTransactionPopup,
  refreshCart,
}) => {
  const { token, id } = useAuth();
  console.log("cartStocksssss", cartStocks);

  // Function to handle quantity change
  const handleQuantityChange = async (cartId: string, currentQuantity: number, change: number, stockId: number) => {
    const newQuantity = currentQuantity + change;

    // Prevent quantity from being set below 1
    if (newQuantity < 1) return;
    const stockItem = cartStocks.find(stock => stock.id === cartId);
    if (stockItem && newQuantity > stockItem.stock.quantity) return;

    const payload = {
      quantity: newQuantity,
      service_crew: id,
      stock: stockId, // Single stock ID instead of array
    };

    try {
      if (!token) {
        console.error("User not authenticated");
        return;
      }

      const endPoint = `/api/stock-carts/${cartId}/`;
      const method = "PUT";

      await dataFetch(endPoint, method, payload, token);
      console.log(`Updated quantity for cart ID ${cartId} to ${newQuantity}`);
      refreshCart();
    } catch (error) {
      console.error("Error updating quantity:", error);
      console.log("Payload:", payload);
    }
  };

  // Calculate total unit_price
  const totalunit_price = cartStocks.reduce(
    (acc, product) => acc + product?.stock.unit_price * product.quantity,
    0
  );

  // Function to handle the deletion of individual cart items
  const handleDeleteItem = async (cartId: string) => {
    try {
      if (!token) {
        console.error("User not authenticated");
        return;
      }
      const endPoint = `/api/stock-carts/${cartId}/`; // Deleting cart item by ID
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
        <h2 className="text-2xl text-gray-700 font-semibold underline">Stock Batch</h2>
      </div>

      <div className="border rounded-lg p-4 h-full flex flex-col">
        {/* Cart Products */}
        <div className="mb-4 overflow-y-auto max-h-[60vh] flex-grow">
          {cartStocks.length === 0 ? (
            <p className="text-gray-500 text-center">No items in the cart</p>
          ) : (
            <ul className="space-y-2">
              {cartStocks.map((stock) => (
                <li
                  key={stock.id}
                  className="flex flex-col bg-white p-2 rounded shadow-sm border"
                >
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex-1">
                      <p className="font-medium text-gray-800">{stock?.stock.name}</p>
                      
                    </div>
                    
                  </div>
                  {/* Quantity Changer */}
                  <div className="flex items-center justify-between mb-4">
                    <button
                      className="px-2 py-1 text-lg font-bold bg-transparent hover:border-gray-400 rounded border border-gray-300"
                      onClick={() =>
                        handleQuantityChange(stock.id, stock.quantity, -1, stock.stock.id)
                      }
                    >
                      -
                    </button>
                    <div className="px-4 py-1 bg-transparent rounded-md border border-gray-300">
                    <input
                      type="text"
                      className="w-16 text-center text-lg font-semibold border-none outline-none"
                      value={stock.quantity}
                      onChange={(e) => handleQuantityChange(stock.id, stock.quantity, parseInt(e.target.value) - stock.quantity, stock.stock.id)}
                      onBlur={(e) => {
                        if (!e.target.value || parseInt(e.target.value, 10) <= 0) {
                          handleQuantityChange(stock.id, stock.quantity, 0 - stock.quantity, stock.stock.id);
                        }
                      }}
                    />
                    </div>
                    <button
                      className="px-2 py-1 text-lg font-bold bg-transparent hover:border-gray-400 rounded border border-gray-300"
                      onClick={() =>
                        handleQuantityChange(stock.id, stock.quantity, 1, stock.stock.id)
                      }
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => handleDeleteItem(stock.id)}
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
              {cartStocks.reduce((acc, stock) => acc + stock.quantity, 0)}
            </p>
          </div>
        </div>

        {/* Open Transaction Popup Button */}
        {cartStocks.length > 0 && (
          <Button
            onClick={openTransactionPopup}
            className="w-full h-12 text-white rounded-full hover:bg-custom-charcoalOlive bg-custom-char"
          >
            Continue expending 
          </Button>
        )}
      </div>
    </div>
  );
};

export default PosTransaction;
