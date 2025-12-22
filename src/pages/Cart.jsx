import React, { useState, useRef } from 'react';
import { useCart } from '../hooks/useCart';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, CheckCircle2, Circle } from 'lucide-react';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const [selectedItems, setSelectedItems] = useState(new Set());
  const timerRef = useRef(null);
  const isLongPress = useRef(false);

  const toggleSelection = (id) => {
    const newSelection = new Set(selectedItems);
    if (newSelection.has(id)) {
      newSelection.delete(id);
    } else {
      newSelection.add(id);
    }
    setSelectedItems(newSelection);
  };

  // --- REFINED GESTURE LOGIC ---
  // --- REFINED GESTURE LOGIC ---
const handleStart = (id) => {
  isLongPress.current = false;
  timerRef.current = setTimeout(() => {
    isLongPress.current = true;
    toggleSelection(id); 
  }, 500);
};

// REMOVED 'id' HERE because clearTimeout doesn't need it
const handleEnd = () => {
  clearTimeout(timerRef.current);
};

const handleTap = (id) => {
  if (!isLongPress.current) {
    toggleSelection(id);
  }
};

  const selectedCartItems = cart.filter(item => selectedItems.has(item.id));
  const subtotal = selectedCartItems.reduce((acc, item) => 
    acc + item.price * (item.quantity || 1), 0
  );

  const formatPHP = (price) => {
    return new Intl.NumberFormat('en-PH', {
      style: 'currency', currency: 'PHP', minimumFractionDigits: 0,
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
      <div className="flex justify-between items-end mb-12">
        <div>
          <h1 className="font-serif text-4xl text-brand-sage-dark">Shopping Bag</h1>
          <p className="text-[10px] uppercase tracking-[0.2em] text-brand-primary mt-2 font-bold">
            {selectedItems.size > 0 ? `${selectedItems.size} items ready for checkout` : "Tap a card to select"}
          </p>
        </div>
        {selectedItems.size > 0 && (
          <button 
            onClick={() => setSelectedItems(new Set())}
            className="text-[10px] uppercase tracking-widest text-red-400 hover:text-red-500 border-b border-red-400/30 pb-1 transition-all"
          >
            Deselect All
          </button>
        )}
      </div>
      
      <div className="flex flex-col lg:flex-row gap-16">
        <div className="flex-grow space-y-8">
          {cart.map((item) => {
            const isSelected = selectedItems.has(item.id);
            
            // ... inside cart.map
return (
  <div 
    key={item.id} 
    onMouseDown={() => handleStart(item.id)}
    onMouseUp={() => handleEnd(item.id)}
    onTouchStart={() => handleStart(item.id)}
    onTouchEnd={() => handleEnd(item.id)}
    onClick={() => handleTap(item.id)} 
    className={`group flex gap-6 border-b border-brand-sage-light pb-8 transition-all duration-500 cursor-pointer ${
      isSelected 
        ? 'opacity-100 translate-x-2' // Selected: Full pop and slight shift
        : selectedItems.size > 0 
          ? 'opacity-70 scale-[0.98]' // Unselected: Slightly dimmed but clearly visible
          : 'opacity-100' // Default: No selection mode active
    }`}
  >
    {/* Visual Checkbox Indicator */}
    <div className={`flex items-center transition-all duration-300 ${selectedItems.size > 0 ? 'w-10 opacity-100' : 'w-0 opacity-0 overflow-hidden'}`}>
      {isSelected ? 
        <CheckCircle2 className="text-brand-primary" size={24} /> : 
        <Circle className="text-brand-sage-light/50" size={24} />
      }
    </div>

    {/* Product Image */}
    <div className="w-24 h-32 md:w-32 md:h-44 bg-brand-cream flex-shrink-0 relative overflow-hidden rounded-sm">
      <img 
        src={item.image} 
        alt={item.name} 
        className={`w-full h-full object-cover transition-transform duration-700 ${isSelected ? 'scale-110' : 'scale-100'}`} 
      />
      {isSelected && (
        <div className="absolute inset-0 bg-brand-primary/5 ring-2 ring-inset ring-brand-primary/20" />
      )}
    </div>
    
    {/* ... rest of your item info code ... */}
                
                <div className="flex-grow flex flex-col">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className={`font-serif text-lg md:text-xl transition-colors ${isSelected ? 'text-brand-primary' : 'text-brand-sage-dark'}`}>{item.name}</h3>
                      <p className="text-[10px] uppercase tracking-widest text-brand-primary/60 mt-1">{item.collection}</p>
                    </div>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        removeFromCart(item.id);
                      }}
                      className="text-brand-sage-dark/20 hover:text-red-400 transition-colors p-2"
                    >
                      <Trash2 size={18} strokeWidth={1.5} />
                    </button>
                  </div>

                  <div className="mt-auto flex justify-between items-end">
                    <div className="flex items-center border border-brand-sage-light bg-white" onClick={(e) => e.stopPropagation()}>
                      <button onClick={() => updateQuantity(item.id, -1)} className="p-2 hover:bg-brand-cream transition-colors"><Minus size={12} /></button>
                      <span className="px-4 text-xs font-medium w-10 text-center">{item.quantity || 1}</span>
                      <button onClick={() => updateQuantity(item.id, 1)} className="p-2 hover:bg-brand-cream transition-colors"><Plus size={12} /></button>
                    </div>
                    <div className="text-right">
                       {item.quantity > 1 && <p className="text-[9px] text-brand-sage-dark/40 line-through mb-1">{formatPHP(item.price)} ea</p>}
                       <p className="font-serif text-brand-sage-dark text-lg">{formatPHP(item.price * (item.quantity || 1))}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Side: Order Summary */}
        <div className="lg:w-[380px]">
          <div className={`p-8 sticky top-40 transition-all duration-500 rounded-2xl ${selectedItems.size > 0 ? 'bg-brand-sage-light/10 shadow-xl ring-1 ring-brand-primary/20' : 'bg-brand-cream'}`}>
            <h3 className="font-serif text-2xl text-brand-sage-dark mb-8">Checkout Summary</h3>
            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-sm">
                <span className="text-brand-sage-dark/70 italic">Selected Subtotal ({selectedItems.size})</span>
                <span className="text-brand-sage-dark font-bold">{formatPHP(subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-brand-sage-dark/70 italic">Shipping</span>
                <span className="text-[10px] uppercase tracking-widest text-brand-primary">
                  {selectedItems.size > 0 ? "₱250.00 Fixed Rate" : "Select items"}
                </span>
              </div>
            </div>
            
            <div className="border-t border-brand-sage-light pt-6 mb-8 flex justify-between items-baseline">
              <span className="font-serif text-xl">Total Due</span>
              <span className="font-serif text-2xl text-brand-primary">{formatPHP(selectedItems.size > 0 ? subtotal + 250 : 0)}</span>
            </div>

            <Link 
              to={selectedItems.size > 0 ? "/checkout" : "#"} 
              state={{ checkoutItems: selectedCartItems }} 
              className={`w-full py-5 text-[10px] uppercase tracking-[0.4em] font-bold flex items-center justify-center gap-3 transition-all duration-500 shadow-lg ${
                selectedItems.size > 0 
                ? "bg-brand-dark text-white hover:bg-brand-primary hover:-translate-y-1" 
                : "bg-brand-sage-light/30 text-brand-sage-dark/40 cursor-not-allowed"
              }`}
            >
              {selectedItems.size > 0 ? "Proceed to Checkout" : "Select Items"} <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;