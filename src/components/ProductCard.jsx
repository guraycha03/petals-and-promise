import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Heart, Check } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { useWishlist } from '../hooks/useWishlist';

const ProductCard = ({ product }) => {
  const { addToBag } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const isWishlisted = isInWishlist(product.id);
  const [isAdded, setIsAdded] = useState(false);

  const handleQuickAdd = (e) => {
    e.preventDefault();
    addToBag(product);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleToggleWishlist = (e) => {
    e.preventDefault();
    toggleWishlist(product);
  };

  const formatPHP = (price) => {
    return new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency: 'PHP',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="group block w-full relative">
      <Link to={`/product/${product.id}`}>
        <div className="relative aspect-[2/3] overflow-hidden bg-brand-cream rounded-sm shadow-sm">
          
          <img 
            src={product.image} 
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
            alt={product.name} 
          />
          
          {/* Top UI */}
          <div className="absolute top-3 left-3 right-3 flex justify-between items-start z-30">
            {product.category && (
              <span className="bg-white/90 backdrop-blur-md px-2.5 py-1 text-[7px] md:text-[9px] uppercase tracking-[0.2em] text-brand-sage-dark font-bold border border-white/20 rounded-sm">
                {product.category}
              </span>
            )}
            
            <button 
              onClick={handleToggleWishlist}
              className={`p-2 rounded-full bg-white/50 backdrop-blur-md transition-all duration-300 hover:bg-white ${
                isWishlisted ? 'text-red-400' : 'text-brand-sage-dark'
              }`}
            >
              <Heart size={16} fill={isWishlisted ? "currentColor" : "none"} strokeWidth={1.5} />
            </button>
          </div>

          {/* Detail Bar */}
          <div 
            className="absolute bottom-0 left-0 w-full z-20 pt-16"
            style={{
              background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.6))',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              maskImage: 'linear-gradient(to top, black 65%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to top, black 65%, transparent 100%)'
            }}
          >
            <div className="px-4 py-4 md:px-5 md:py-5 flex justify-between items-end">
              
              <div className="flex-1 min-w-0 pr-2">
                {/* Collection Tag with Background */}
                {/* Collection Tag with White Background */}
                <div className="inline-block bg-white/90 px-2.5 py-0.5 rounded-full mb-1.5 border border-brand-primary/10 shadow-sm">
                  <p className="text-[6px] md:text-[8px] uppercase tracking-[0.2em] text-brand-primary font-bold">
                    {product.collection}
                  </p>
                </div>

                <h3 className="font-serif text-[12px] md:text-lg text-brand-sage-dark leading-tight truncate">
                  {product.name}
                </h3>
                <p className="text-[10px] md:text-sm font-medium text-brand-sage-dark/90 mt-1">
                  {formatPHP(product.price)}
                </p>
              </div>

              <button 
                onClick={handleQuickAdd}
                className={`flex-shrink-0 p-2.5 md:p-3 rounded-full transition-all duration-500 border ${
                  isAdded 
                    ? 'bg-brand-primary border-brand-primary text-white' 
                    : 'bg-white/80 border-white/40 text-brand-sage-dark hover:bg-brand-dark hover:text-white'
                }`}
              >
                {isAdded ? <Check size={18} /> : <ShoppingBag size={18} strokeWidth={1.2} />}
              </button>
            </div>
          </div>

          {/* Base Gradient for text safety */}
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/[0.08] via-transparent to-transparent pointer-events-none z-10" />
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;