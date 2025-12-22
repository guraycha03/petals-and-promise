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

      {/* Updated grid from grid-cols-1 to grid-cols-2 on small screens */}
       <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-12 md:gap-12">
  {wishlist.map((item) => (
    /* flex and flex-col ensures we can control vertical spacing */
    <div key={item.id} className="group relative flex flex-col h-full">
      
      {/* Remove Button */}
      <button 
        onClick={() => toggleWishlist(item)}
        className="absolute top-2 right-2 md:top-4 md:right-4 z-10 p-1.5 md:p-2 bg-white/80 rounded-full text-brand-sage-dark hover:text-red-400 transition-colors"
      >
        <X size={14} className="md:w-4 md:h-4" />
      </button>
      
      {/* Product Image & Info Link */}
      <Link to={`/product/${item.id}`} className="block flex-grow flex flex-col">
        {/* Aspect ratio ensures all images are identical sizes */}
        <div className="aspect-[2/3] bg-brand-cream overflow-hidden mb-4">
          <img 
            src={item.image} 
            alt={item.name} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
          />
        </div>

        {/* Text Content wrapper with flex-grow to push price down */}
        <div className="text-center px-1 flex-grow">
          <p className="text-[7px] md:text-[8px] uppercase tracking-widest text-brand-sage mb-1">
            {item.collection}
          </p>
          {/* line-clamp-2 prevents cards from growing if a name is too long */}
          <h3 className="font-serif text-sm md:text-lg text-brand-sage-dark mb-1 line-clamp-2 min-h-[1.5em] md:min-h-[1.2em]">
            {item.name}
          </h3>
          <p className="text-xs md:text-sm font-light text-brand-sage-dark/60 mb-4">
            {formatPHP(item.price)}
          </p>
        </div>
      </Link>

      {/* mt-auto forces the button to the bottom of the card div */}
      <button 
        onClick={() => addToBag(item)}
        className="mt-auto w-full py-3 border border-brand-dark text-[8px] md:text-[9px] uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-brand-dark hover:text-white transition-all"
      >
        <ShoppingBag size={14} /> 
        <span className="xs:inline">Add to Bag</span>
      </button>
    </div>
  ))}
</div>
    </div>
  );
};

export default Wishlist;