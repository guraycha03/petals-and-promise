import React from 'react';



import { useCart } from '../hooks/useCart';

import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity } = useCart();

  const subtotal = cart.reduce((acc, item) => acc + item.price * (item.quantity || 1), 0);

  const formatPHP = (price) => {
    return new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency: 'PHP',
      minimumFractionDigits: 0,
    }).format(price);
  };

  if (cart.length === 0) {
    return (
      <div className="pt-48 pb-24 text-center px-6">
        <ShoppingBag size={48} className="mx-auto text-brand-sage-light mb-6 opacity-20" />
        <h2 className="font-serif text-3xl text-brand-sage-dark mb-6">Your Bag is Empty</h2>
        <Link to="/collections" className="text-[10px] uppercase tracking-widest bg-brand-dark text-white px-8 py-4 inline-block hover:bg-opacity-90 transition-all">
          Explore Collections
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-40 pb-24 px-6 md:px-12 max-w-7xl mx-auto">
      <h1 className="font-serif text-4xl text-brand-sage-dark mb-12">Shopping Bag</h1>
      
      <div className="flex flex-col lg:flex-row gap-16">
        {/* Left Side: Item List */}
        <div className="flex-grow space-y-8">
          {cart.map((item) => (
            <div key={item.id} className="flex gap-6 border-b border-brand-sage-light pb-8">
              <div className="w-24 h-32 md:w-32 md:h-44 bg-brand-cream flex-shrink-0">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              </div>
              
              <div className="flex-grow flex flex-col">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-serif text-lg md:text-xl text-brand-sage-dark">{item.name}</h3>
                    <p className="text-[10px] uppercase tracking-widest text-brand-primary mt-1">{item.collection}</p>
                  </div>
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="text-brand-sage-dark/40 hover:text-red-400 transition-colors"
                  >
                    <Trash2 size={18} strokeWidth={1.5} />
                  </button>
                </div>

                <div className="mt-auto flex justify-between items-end">
                  {/* Quantity Toggles */}
                  <div className="flex items-center border border-brand-sage-light">
                    <button onClick={() => updateQuantity(item.id, -1)} className="p-2 hover:bg-brand-cream transition-colors"><Minus size={14} /></button>
                    <span className="px-4 text-xs font-medium w-10 text-center">{item.quantity || 1}</span>
                    <button onClick={() => updateQuantity(item.id, 1)} className="p-2 hover:bg-brand-cream transition-colors"><Plus size={14} /></button>
                  </div>
                  <p className="font-serif text-brand-sage-dark">{formatPHP(item.price * (item.quantity || 1))}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right Side: Order Summary */}
        <div className="lg:w-[380px]">
          <div className="bg-brand-cream p-8 sticky top-40">
            <h3 className="font-serif text-2xl text-brand-sage-dark mb-8">Order Summary</h3>
            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-sm">
                <span className="text-brand-sage-dark/70">Subtotal</span>
                <span className="text-brand-sage-dark font-medium">{formatPHP(subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-brand-sage-dark/70">Estimated Shipping</span>
                <span className="text-[10px] uppercase tracking-tighter text-brand-primary">Calculated at Checkout</span>
              </div>
            </div>
            
            <div className="border-t border-brand-sage-light pt-6 mb-8 flex justify-between">
              <span className="font-serif text-lg">Total</span>
              <span className="font-serif text-lg text-brand-sage-dark">{formatPHP(subtotal)}</span>
            </div>

            <button className="w-full bg-brand-dark text-white py-5 text-[10px] uppercase tracking-[0.3em] flex items-center justify-center gap-3 hover:bg-opacity-90 transition-all">
              Proceed to Checkout <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;