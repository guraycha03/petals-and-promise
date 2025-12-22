import React, { useState } from 'react';
import { Search as SearchIcon, X } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import ProductCard from '../components/ProductCard';

const Search = () => {
  const [query, setQuery] = useState("");

  // Logic to filter products based on name or category
  const filteredProducts = PRODUCTS.filter(product =>
    product.name.toLowerCase().includes(query.toLowerCase()) ||
    product.category.toLowerCase().includes(query.toLowerCase()) ||
    product.collection.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="min-h-screen pt-40 pb-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        
        {/* Search Input Area */}
        <div className="max-w-3xl mx-auto">
          <div className="relative flex items-center border-b border-brand-sage-light pb-4 group">
            <SearchIcon size={24} className="text-brand-sage-dark/30 group-focus-within:text-brand-primary transition-colors" />
            <input 
              autoFocus
              type="text"
              placeholder="Search by gown name, silhouette, or collection..."
              className="w-full bg-transparent text-xl md:text-3xl font-serif outline-none px-6 placeholder:text-brand-sage-light text-brand-sage-dark"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            {query && (
              <button onClick={() => setQuery("")} className="text-brand-sage-dark/40 hover:text-brand-sage-dark">
                <X size={20} />
              </button>
            )}
          </div>

          {/* Trending / Quick Links - Shown only when query is empty */}
          {!query && (
            <div className="mt-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <p className="text-[10px] uppercase tracking-[0.3em] text-brand-primary font-bold mb-6">Trending Searches</p>
              <div className="flex flex-wrap gap-3">
                {['Bridal Gowns', 'Spring Bloom 2025', 'Minimalist', 'Silk'].map((tag) => (
                  <button 
                    key={tag}
                    onClick={() => setQuery(tag)}
                    className="px-5 py-2 rounded-full border border-brand-sage-light text-[11px] uppercase tracking-widest text-brand-sage-dark hover:bg-brand-sage-dark hover:text-white transition-all"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Results Grid */}
        <div className="mt-24">
          {query && (
            <div className="mb-12 flex justify-between items-end border-b border-brand-sage-light/30 pb-4">
              <p className="text-[10px] uppercase tracking-[0.2em] text-brand-sage-dark/60 font-medium">
                Results for: <span className="italic text-brand-sage-dark">"{query}"</span>
              </p>
              <p className="text-[10px] uppercase tracking-[0.2em] text-brand-sage-dark/40">
                {filteredProducts.length} Items found
              </p>
            </div>
          )}

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="font-serif text-xl text-brand-sage-dark/40 italic">No pieces match your search.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;