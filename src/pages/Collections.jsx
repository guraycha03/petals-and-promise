import React from 'react';
import { PRODUCTS } from '../data/products';
import ProductCard from '../components/ProductCard';

const Collections = () => {
  return (
    <main className="pt-24 md:pt-32 pb-24 bg-brand-cream/30">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <header className="max-w-2xl mb-12 md:mb-20">
          <span className="text-brand-sage text-[9px] uppercase tracking-[0.4em] font-bold block mb-4">
            Full Archive
          </span>
          <h1 className="text-4xl md:text-7xl font-serif text-brand-dark mb-4 md:mb-6">
            The Complete Collection
          </h1>
        </header>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-3 md:gap-x-8 gap-y-10 md:gap-y-16">
          {PRODUCTS.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      </div>
    </main>
  );
};

export default Collections;
