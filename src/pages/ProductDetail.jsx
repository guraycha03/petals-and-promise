import React, { useState } from 'react';


import { useParams, Link } from 'react-router-dom';
import { PRODUCTS } from '../data/products';
import { ChevronLeft, ShoppingBag, Check } from 'lucide-react';

import { useCart } from '../hooks/useCart';

const ProductDetail = () => {
  const { id } = useParams();
  const { addToBag } = useCart();
  const [isAdded, setIsAdded] = useState(false);
  const product = PRODUCTS.find(p => p.id === parseInt(id));

  const formatPHP = (price) => {
    return new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency: 'PHP',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleAddToBag = () => {
    addToBag(product);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000); // Feedback state
  };

  if (!product) return <div className="pt-40 text-center">Product Not Found</div>;

  return (
    <div className="pt-32 pb-24 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
      <Link to="/collections" className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-brand-sage-dark mb-10 group">
        <ChevronLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
        Back to Collections
      </Link>

      <div className="flex flex-col lg:flex-row gap-16 xl:gap-24">
        <div className="lg:flex-[0_0_55%] flex-shrink-0">
          <div className="bg-brand-cream overflow-hidden rounded-sm">
            <img src={product.image} alt={product.name} className="w-full h-auto object-cover hover:scale-105 transition-transform duration-1000" />
          </div>
        </div>

        <div className="lg:flex-[0_0_40%] flex flex-col justify-start">
          <span className="text-[11px] uppercase tracking-[0.4em] text-brand-primary font-bold mb-4">{product.collection}</span>
          <h2 className="font-serif text-4xl lg:text-5xl text-brand-sage-dark mb-4 leading-tight">{product.name}</h2>
          <p className="text-xl lg:text-2xl font-serif text-brand-sage-dark mb-8">{formatPHP(product.price)}</p>

          <div className="space-y-8">
            <p className="text-sm lg:text-base text-brand-sage-dark/90 leading-relaxed font-sans">{product.description}</p>
            
            {/* Action Buttons */}
            <div className="flex flex-col gap-4 pt-4">
              <button 
                onClick={handleAddToBag}
                className={`w-full flex items-center justify-center gap-3 py-4 px-8 tracking-widest uppercase text-xs transition-all duration-300 border ${
                  isAdded ? 'bg-brand-sage-dark text-white' : 'bg-brand-dark text-white hover:bg-opacity-90'
                }`}
              >
                {isAdded ? <><Check size={16} /> Added to Bag</> : <><ShoppingBag size={16} /> Add to Bag</>}
              </button>
              
              <button className="w-full py-4 px-8 border border-brand-sage-dark/30 text-xs tracking-widest uppercase hover:bg-brand-cream transition-colors">
                Inquire About This Piece
              </button>
            </div>

            {/* Product Details Grid */}
            <div className="grid grid-cols-2 gap-y-6 pt-8 border-t border-brand-sage-light/40">
                {/* ... existing specs grid ... */}
                <div>
                  <p className="text-[9px] uppercase tracking-widest text-brand-sage-dark font-bold mb-1">Fabric</p>
                  <p className="text-sm text-brand-sage-dark/80">{product.fabric}</p>
                </div>
                {/* Add other specs as needed */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;