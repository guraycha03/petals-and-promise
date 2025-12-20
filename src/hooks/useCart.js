import { useContext } from 'react';
import { CartContext } from '../context/CartContext'; // Must point to file above

// This MUST be a named export so ProductDetail can find it
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};