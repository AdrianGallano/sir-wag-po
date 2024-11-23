import PosHeader from '@/components/pos/header';
import PosMenus from '@/components/pos/menus';
import PosTransaction from '@/components/pos/transaction';
import CartSheet from '@/components/pos/cart';
import { useAuth } from '@/context/authContext';
import dataFetch from '@/services/data-service';
import React, { useEffect, useState } from 'react';
import TransactionPopup from '@/components/pos/popup';

const PosPage = () => {
  const [menus, setMenus] = useState([]);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isTransactionPopupOpen, setIsTransactionPopupOpen] = useState(false); // Popup state
  const { token, id } = useAuth();
  const [service_crew, setServiceCrew] = useState(id);

  useEffect(() => {
    fetchMenus();
    fetchCart();
  }, []);

  const fetchMenus = async () => {
    try {
      if (!token) {
        console.error('Token not found');
        return;
      }
      const endPoint = '/api/products/';
      const method = 'GET';

      const response = await dataFetch(endPoint, method, {}, token);
      setMenus(response);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchCart = async () => {
    try {
      if (!token) {
        console.error('Token not found');
        return;
      }
      const endPoint = '/api/carts/';
      const method = 'GET';

      const response = await dataFetch(endPoint, method, {}, token);
      setCart(response);
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };

  const addToCart = async (productId: any, quantity: any) => {
    try {
      if (!token) {
        console.error('Token not found');
        return;
      }
      const endPoint = '/api/carts/';
      const method = 'POST';
      const body = {
        service_crew: service_crew,
        product: productId,
        quantity,
      };

      await dataFetch(endPoint, method, body, token);
      fetchCart();
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const createTransaction = async (payload: {
    total_price: string;
    payment_method: string;
    service_crew: number;
  }) => {
    try {
      if (!token) {
        console.error('Token not found');
        return;
      }
      const endPoint = '/api/transactions/';
      const response = await dataFetch(endPoint, 'POST', payload, token);
      console.log('Transaction created successfully', response);
      alert('Transaction successfully created!');
      setIsTransactionPopupOpen(false);
      fetchCart(); // Refresh cart after transaction
    } catch (error) {
      console.error('Error creating transaction:', error);
    }
  };

  const openTransactionPopup = () => {
    setIsTransactionPopupOpen(true);
  };

  const closeTransactionPopup = () => {
    setIsTransactionPopupOpen(false);
  };

  const calculateTotalPrice = () => {
    return 100;
  };


  return (
    <div className="flex">
      {/* Main content */}
      <div className="flex-1 p-6">
        <PosHeader />
        <PosMenus menus={menus} addToCart={addToCart} />
      </div>

      {/* Transaction Panel */}
      <PosTransaction
        cartProducts={cart}
        openTransactionPopup={openTransactionPopup}
      />

      {/* Transaction Popup */}
      {isTransactionPopupOpen && (
        <TransactionPopup 
          onClose={closeTransactionPopup}
          onSubmitTransaction={createTransaction}
          totalPrice={calculateTotalPrice()}
          serviceCrew={service_crew}
         />
      )}
    </div>
  );
};

export default PosPage