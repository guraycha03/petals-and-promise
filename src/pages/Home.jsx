import React from 'react';
import { Link } from 'react-router-dom';
import useEmblaCarousel from 'embla-carousel-react';
import { PRODUCTS } from '../data/products';
import ProductCard from '../components/ProductCard';

const Home = () => {
  const [emblaRef] = useEmblaCarousel({ 
    align: 'start', 
    loop: false, 
    dragFree: true 
  });

  return (
    <section className="pt-20 overflow-hidden bg-white">
      {/* --- HERO SECTION --- */}
      <div className="relative h-[85vh] flex items-center justify-center bg-brand-cream">
        <div className="z-10 text-center px-6 max-w-4xl">
          <span className="text-[11px] uppercase tracking-[0.6em] text-brand-sage-dark font-bold mb-8 block animate-fade-in">
            The 2025 Atelier
          </span>
          
          <h1 className="text-5xl md:text-8xl font-serif text-brand-sage-dark mb-10 leading-[1.1] tracking-tight">
            Petals & Promise
          </h1>
          
          <p className="max-w-md mx-auto text-[11px] md:text-xs text-brand-sage-dark/90 uppercase tracking-[0.3em] mb-12 leading-relaxed font-medium">
            Handcrafted silhouettes <br className="hidden md:block" /> 
            for the modern romantic.
          </p>

          <Link 
            to="/collections" 
            className="inline-block text-sm md:text-base font-medium uppercase tracking-wide text-white bg-brand-sage-dark px-6 py-3 md:px-8 md:py-4 rounded-lg hover:bg-brand-primary transition-all"
          >
            Explore the Collection
          </Link>
        </div>
      </div>

      {/* --- CAROUSEL SECTION --- */}
      <div className="py-20 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12 mb-16 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-serif text-brand-sage-dark tracking-wide">
              Featured Pieces
            </h2>
            <p className="text-[10px] uppercase tracking-[0.3em] text-brand-primary font-bold mt-3">
              Curated for the Bloom Collection
            </p>
          </div>
          <Link to="/collections" className="text-[10px] uppercase tracking-[0.2em] text-brand-sage-dark border-b border-brand-sage-dark pb-1 hover:text-brand-primary hover:border-brand-primary transition-all">
            Shop All
          </Link>
        </div>

        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-4 md:gap-10 px-6 md:px-12">
            {PRODUCTS.map((item) => (
              <div key={item.id} className="flex-[0_0_65%] md:flex-[0_0_25%] min-w-0">
                <ProductCard product={item} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* --- BRAND PHILOSOPHY --- */}
      <div className="py-24 bg-brand-blush/5 border-t border-brand-sage-light/20">
        <div className="max-w-3xl mx-auto text-center px-6">
          <h3 className="text-2xl font-serif text-brand-sage-dark mb-6">The Art of Slow Fashion</h3>
          <p className="font-sans text-sm text-brand-sage-dark/80 leading-loose tracking-wide">
            Every Petals & Promise piece is born from a commitment to mindful creation. 
            We embrace natural aesthetics and intentional consumption, ensuring each gown 
            is as kind to the earth as it is beautiful on the bride.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Home;
