import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import dataFetch from '@/services/data-service';
import { useAuth } from '@/context/authContext';

interface CartProduct {
  id: string;
  name: string;
  quantity: number;
  price: number; 
}

interface CartSheetProps {
  isOpen: boolean;
  onClose: () => void;
  cartProducts: CartProduct[];
  refreshCart: () => void;  // Added this prop to refresh the cart after deletion
}

const CartSheet: React.FC<CartSheetProps> = ({ isOpen, onClose, cartProducts, refreshCart }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('credit_card');
  const { token, id } = useAuth();
  const [serviceCrew, setServiceCrew] = useState(id); 

  // Function to handle the deletion of individual cart items
  const handleDeleteItem = async (cartId: string) => {
    try {
      if (!token) {
        console.error('User not authenticated');
        return;
      }
      const endPoint = `/api/carts/${cartId}/`; // Deleting cart item by ID
      const method = 'DELETE';
      await dataFetch(endPoint, method, {}, token);
      console.log(`Item with ID ${cartId} deleted`);
      refreshCart(); // Refresh cart after deletion
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  // Handle checkout and clear cart after successful product order creation
  const handleCheckout = async () => {
    setIsProcessing(true);
    try {
      // Step 1: Create the transaction
      const transactionData = {
        total_price: '0',
        payment_method: paymentMethod,
        service_crew: serviceCrew,
      };

      const transactionResponse = await createTransaction(transactionData);
      
      if (!transactionResponse || !transactionResponse.id) {
        throw new Error('Transaction creation failed');
      }

      // Step 2: Create product orders, one at a time with a small delay
      for (const product of cartProducts) {
        const productOrder = {
          quantity: product.quantity,
          transaction: transactionResponse.id,
          product: Number(product.id),
        };

        await createProductOrders(productOrder);
        await delay(500); // Delay between orders
      }

      // Step 3: Delete all items from the cart after successful order creation
      await clearCart();
      console.log('Transaction and Product Orders created successfully');
    } catch (error) {
      console.error('Error during checkout:', error);
    } finally {
      setIsProcessing(false);
      onClose();
    }
  };

  // Helper function to clear the entire cart
  const clearCart = async () => {
    setIsProcessing(true);
    try {
      if (!token) {
        console.error('User not authenticated');
        return;
      }
      // Loop through each cart item and delete individually
      for (const product of cartProducts) {
        await handleDeleteItem(product.id); // Reuse handleDeleteItem to delete individually
        await delay(500); // Delay between each delete operation (to avoid hitting API limits)
      }

      console.log('All items deleted from the cart');
      refreshCart(); // Refresh cart after deletion
    } catch (error) {
      console.error('Error clearing cart:', error);
    } finally {
      setIsProcessing(false);
      onClose(); // Close the cart sheet after clearing
    }
  };

  // Helper function to create a transaction
  const createTransaction = async (transactionData: { total_price: string; payment_method: string; service_crew: number }) => {
    try {
      if (!token) {
        throw new Error('User not authenticated');
      }
      const response = await dataFetch('/api/transactions/', 'POST', transactionData, token);
      return response; 
    } catch (error) {
      console.log(transactionData)
      throw new Error('Failed to create transaction');
    }
  };

  // Helper function to create product orders
  const createProductOrders = async (productOrder: { quantity: number; transaction: number; product: number }) => {
    try {
      if (!token) {
        throw new Error('User not authenticated');
      }
      const response = await dataFetch('/api/product-orders/', 'POST', productOrder, token);
      return response;
    } catch (error) {
      throw new Error('Failed to create product order');
    }
  };

  // Helper function to introduce a delay
  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  return (
    <div className={`fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end ${!isOpen ? 'hidden' : ''}`}>
      <div className="w-1/3 h-full bg-white p-6 overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Your Cart</h2>
          <button className="text-black font-bold" onClick={onClose}>
            <X />
          </button>
        </div>

        {/* Cart Products */}
        <div>
          {cartProducts.length > 0 ? (
            cartProducts.map((product) => (
              <div key={product.id} className="flex justify-between items-center border-b py-4">
                <div>
                  <h3 className="font-semibold">{product.name || 'Unnamed Product'}</h3>
                  <p>Quantity: {product.quantity || 0}</p>
                </div>
                <button onClick={() => handleDeleteItem(product.id)} className="text-red-500">Delete</button>
              </div>
            ))
          ) : (
            <p className="text-gray-500">Your cart is empty.</p>
          )}
        </div>

        {/* Payment and Service Crew */}
        <div className="mt-4">
          <label htmlFor="paymentMethod" className="block text-sm font-medium">Payment Method</label>
          <select
            id="paymentMethod"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="mt-2 p-2 border border-gray-300 rounded w-full"
          >
            <option value="credit_card">Credit Card</option>
            <option value="paypal">PayPal</option>
          </select>
        </div>

        {/* Checkout Button */}
        <div className="mt-4">
          <button
            onClick={handleCheckout}
            className="w-full bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-600 transition"
            disabled={isProcessing || !paymentMethod || !serviceCrew}
          >
            {isProcessing ? 'Processing...' : 'Checkout'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartSheet;
