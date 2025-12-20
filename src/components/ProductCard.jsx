import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <Link to={`/product/${product.id}`} className="group block w-full">
      {/* Image Container: Using a consistent fashion ratio */}
      <div className="relative aspect-[2/3] overflow-hidden bg-brand-cream shadow-sm">
        <img 
    src={product.image} 
    className="w-full h-full object-cover" 
    alt={product.name} 
  />
        
        {/* Soft Identity Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {product.category && (
            <span className="bg-white/90 backdrop-blur-md px-3 py-1 text-[8px] uppercase tracking-[0.2em] text-brand-sage-dark font-bold border border-brand-sage/10">
              {product.category}
            </span>
          )}
        </div>

        {/* Desktop Hover State: Subtle Wash of Color */}
        <div className="absolute inset-0 bg-brand-blush/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>


<div className="mt-4 md:mt-6 text-center">
  <p className="text-[7px] md:text-[9px] uppercase tracking-[0.4em] text-brand-sage mb-1 md:mb-2">
    {product.collection}
  </p>
  {/* text-sm on mobile, text-xl on desktop */}
  <h3 className="font-serif text-sm md:text-xl text-brand-dark tracking-wide mb-1 transition-colors group-hover:text-brand-primary">
    {product.name}
  </h3>
  <p className="text-[10px] md:text-sm font-light text-gray-400 tracking-widest">
    {product.price}
  </p>
</div>

    </Link>
  );
};

export default ProductCard;