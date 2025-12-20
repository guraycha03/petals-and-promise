// src/pages/Collections.jsx
import React from 'react';
import { GOWNS } from '../data/products';
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
            The Complete <br /> <span className="italic text-brand-primary">Collection</span>
          </h1>
        </header>

        {/* grid-cols-2: Smaller on mobile
            md:grid-cols-4: 4 small cards per row on desktop for a premium feel
        */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-3 md:gap-x-8 gap-y-10 md:gap-y-16">
          {GOWNS.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      </div>
    </main>
  );
};

export default Collections;