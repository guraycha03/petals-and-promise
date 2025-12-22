import React, { useState, useEffect } from 'react';
import { OrderContext } from './OrderContext';

export const OrderProvider = ({ children }) => {
  // Initialize state from localStorage
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('petals-orders-v1');
    return saved ? JSON.parse(saved) : [];
  });

  // Sync state to localStorage whenever orders change
  useEffect(() => {
    localStorage.setItem('petals-orders-v1', JSON.stringify(orders));
  }, [orders]);

  // Function to add a new order to the history
  const addOrder = (newOrder) => {
    setOrders((prev) => [newOrder, ...prev]);
  };

  return (
    <OrderContext.Provider value={{ orders, addOrder }}>
      {children}
    </OrderContext.Provider>
  );
};