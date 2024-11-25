import PosHeader from '@/components/pos/header';
import PosMenus from '@/components/pos/menus';
import PosTransaction from '@/components/pos/transaction';
import CartSheet from '@/components/pos/cart';
import { useAuth } from '@/context/authContext';
import dataFetch from '@/services/data-service';
import React, { useEffect, useState } from 'react';
import TransactionPopup from '@/components/pos/popup';
import { set } from 'date-fns';

const PosPage = () => {
  const [menus, setMenus] = useState([]);
  const [cart, setCart] = useState<any[]>([]);
  const [filteredMenus, setFilteredMenus] = useState([]); 
  const [isTransactionPopupOpen, setIsTransactionPopupOpen] = useState(false); // Popup state
  const { token, id } = useAuth();
  const [service_crew] = useState(id);

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
      setFilteredMenus(response);
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
      const endPoint = `/api/carts/?service_crew=${id}`
      const method = 'GET';

      const response = await dataFetch(endPoint, method, {}, token);
      setCart(response);
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };

  const addToCart = async (productId: number, quantity: number) => {
    try {
      if (!token) {
        console.error('Token not found');
        return;
      }
  
      // Fetch the current cart data
      const endPoint = `/api/carts/?service_crew=${id}`;
      const method = 'GET';
      const response = await dataFetch(endPoint, method, {}, token);
  
      // Find if the product already exists in the cart
      const existingCartItem = response.find((item: any) => item.product === productId);
  
      if (existingCartItem) {
        // If the product exists, update its quantity
        const updatedQuantity = existingCartItem.quantity + quantity;
  
        // Update the cart  
        const updateEndPoint = `/api/carts/${existingCartItem.id}/`;
        const updateMethod = 'PUT';
        const updatePayload = { quantity: updatedQuantity, service_crew: id, product: productId };
        console.log(updateEndPoint, updateMethod, updatePayload);
        
  
        const updatedCartItem = await dataFetch(updateEndPoint, updateMethod, updatePayload, token);
        console.log('Updated cart item:', updatedCartItem);
  
        //update the cart state or UI to reflect the updated item
        setCart(prevCart => 
          prevCart.map(item => 
            item.id === existingCartItem.id ? { ...item, quantity: updatedQuantity } : item
          )
        );
      } else {
        // If the product doesn't exist, add a new item to the cart
        const newCartItem = {
          service_crew: id, 
          product: productId,
          quantity,
        };
  
        // Send a request to add the new cart item
        const createEndPoint = '/api/carts/';
        const createMethod = 'POST';
        const createPayload = newCartItem;
  
        const addedCartItem = await dataFetch(createEndPoint, createMethod, createPayload, token);
  
        // update the cart state or UI to reflect the new item
        setCart(prevCart => [...prevCart, addedCartItem]);
      }
    } catch (error) {
      console.error('Error adding product to cart:', error);
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

  const handleFilterChange = (categoryName: string) => {
    const categoryId = categoryName === 'all' ? 'all' : parseInt(categoryName, 10);
    if (categoryId === 'all') {
      setFilteredMenus(menus); // Show all products
    } else {
      const filtered = menus.filter((menu: any) => menu.category === categoryId);
      setFilteredMenus(filtered);
    }
  };
  


  return (
    <div className="flex">
      {/* Main content */}
      <div className="flex-1 p-6">
        <PosHeader onFilterChange={handleFilterChange} />
        <PosMenus menus={filteredMenus} addToCart={addToCart} />
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