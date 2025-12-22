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
          
          {/* Top UI - Utility Column (Right Side) */}
          <div className="absolute top-3 right-3 flex flex-col gap-2 z-30">
            <button 
              onClick={handleToggleWishlist}
              className={`p-2 rounded-full bg-white/80 backdrop-blur-sm transition-all duration-300 hover:bg-white shadow-sm ${
                isWishlisted ? 'text-red-400' : 'text-brand-sage-dark'
              }`}
            >
              <Heart size={15} fill={isWishlisted ? "currentColor" : "none"} strokeWidth={1.5} />
            </button>

            <button 
              onClick={handleQuickAdd}
              className={`p-2 rounded-full transition-all duration-500 border shadow-sm ${
                isAdded 
                  ? 'bg-brand-primary border-brand-primary text-white' 
                  : 'bg-white/80 backdrop-blur-sm border-white/40 text-brand-sage-dark hover:bg-brand-sage-dark hover:text-white'
              }`}
            >
              {isAdded ? <Check size={15} /> : <ShoppingBag size={15} strokeWidth={1.5} />}
            </button>
          </div>

          {/* Top Left - Category Tag */}
          <div className="absolute top-3 left-3 z-30">
            {product.category && (
              <span className="bg-brand-sage-dark text-white px-2 py-1 text-[7px] md:text-[8px] uppercase tracking-[0.2em] font-bold rounded-sm shadow-sm">
                {product.category}
              </span>
            )}
          </div>

          {/* Beige/Brownish Detail Bar */}
          <div 
            className="absolute bottom-0 left-0 w-full z-20 pt-20"
            style={{
              // Using a warm beige/cream gradient (brand-cream is roughly #F5F5F0)
              background: 'linear-gradient(to bottom, transparent, rgba(245, 245, 240, 0.95))',
              maskImage: 'linear-gradient(to top, black 40%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to top, black 40%, transparent 100%)'
            }}
          >
            <div className="px-4 py-5 md:px-5">
              {/* Collection Tag - Styled to match beige theme */}
              <div className="inline-block bg-brand-sage-dark/5 px-2 py-0.5 rounded-full mb-1.5 border border-brand-sage-dark/10">
                <p className="text-[6px] md:text-[8px] uppercase tracking-[0.2em] text-brand-sage-dark font-bold">
                  {product.collection}
                </p>
              </div>

              <h3 className="font-serif text-[13px] md:text-lg text-brand-sage-dark leading-tight truncate">
                {product.name}
              </h3>
              <p className="text-[10px] md:text-sm font-medium text-brand-primary mt-1 tracking-wide">
                {formatPHP(product.price)}
              </p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;