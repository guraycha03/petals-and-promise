import React from 'react';

import { useCart } from '../hooks/useCart';

import { useWishlist } from '../hooks/useWishlist';


import { Heart, ShoppingBag, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const Wishlist = () => {
  const { wishlist, toggleWishlist } = useWishlist();
  const { addToBag } = useCart();

  const formatPHP = (price) => {
    return new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency: 'PHP',
      minimumFractionDigits: 0,
    }).format(price);
  };

  if (wishlist.length === 0) {
    return (
      <div className="pt-48 pb-24 text-center px-6">
        <Heart size={48} className="mx-auto text-brand-sage-light mb-6 opacity-20" />
        <h2 className="font-serif text-3xl text-brand-sage-dark mb-6">Your Wishlist is Empty</h2>
        <p className="text-sm text-brand-sage-dark/60 mb-10">Save your favorite pieces for later.</p>
        <Link to="/collections" className="text-[10px] uppercase tracking-widest bg-brand-dark text-white px-8 py-4 inline-block hover:bg-opacity-90">
          Explore Collections
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-40 pb-24 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h1 className="font-serif text-4xl text-brand-sage-dark mb-2">My Wishlist</h1>
        <p className="text-[10px] uppercase tracking-[0.3em] text-brand-primary font-bold">{wishlist.length} Items</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {wishlist.map((item) => (
          <div key={item.id} className="group relative">
            <button 
              onClick={() => toggleWishlist(item)}
              className="absolute top-4 right-4 z-10 p-2 bg-white/80 rounded-full text-brand-sage-dark hover:text-red-400"
            >
              <X size={16} />
            </button>
            
            <Link to={`/product/${item.id}`} className="block">
              <div className="aspect-[2/3] bg-brand-cream overflow-hidden mb-4">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="text-center">
                <p className="text-[8px] uppercase tracking-widest text-brand-sage mb-1">{item.collection}</p>
                <h3 className="font-serif text-lg text-brand-sage-dark mb-1">{item.name}</h3>
                <p className="text-sm font-light text-brand-sage-dark/60 mb-4">{formatPHP(item.price)}</p>
              </div>
            </Link>

            <button 
              onClick={() => addToBag(item)}
              className="w-full py-3 border border-brand-dark text-[9px] uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-brand-dark hover:text-white transition-all"
            >
              <ShoppingBag size={14} /> Add to Bag
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;