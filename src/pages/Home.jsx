// src/pages/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import useEmblaCarousel from 'embla-carousel-react';
import { GOWNS } from '../data/products';
import ProductCard from '../components/ProductCard';

const Home = () => {
  const [emblaRef] = useEmblaCarousel({ 
    align: 'start', 
    loop: false, // Set to false for a more controlled "boutique" feel
    dragFree: true 
  });

  return (
    <section className="pt-20 overflow-hidden">
      {/* --- HERO SECTION --- */}
      <div className="relative h-[80vh] flex items-center justify-center bg-brand-blush/20">
        <div className="z-10 text-center px-6">
          <span className="text-[10px] uppercase tracking-[0.5em] text-brand-sage-dark font-semibold mb-6 block">
            The 2025 Atelier
          </span>
          <h1 className="text-5xl md:text-8xl font-serif text-brand-dark mb-8 leading-tight">
            Petals <span className="italic font-light">&</span> Promises
          </h1>
          <p className="max-w-md mx-auto text-[10px] md:text-xs text-gray-400 uppercase tracking-[0.2em] mb-10 leading-relaxed">
            Intimate craftsmanship for <br/> the modern romantic.
          </p>
        </div>
      </div>

      {/* --- CAROUSEL SECTION --- */}
      <div className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6 mb-10 flex justify-between items-end">
          <div>
            <h2 className="text-2xl md:text-3xl font-serif">Featured Pieces</h2>
            <p className="text-[9px] uppercase tracking-[0.2em] text-brand-sage mt-1">Selected for the Bloom Collection</p>
          </div>
        </div>

        {/* Carousel Viewport */}
        <div className="overflow-hidden" ref={emblaRef}>
          {/* gap-3 on mobile makes the cards feel closer and smaller */}
          <div className="flex gap-3 md:gap-8 px-4 md:px-6">
            {GOWNS.map((item) => (
              /* flex-[0_0_40%]: Makes them much smaller on mobile (2.5 cards visible)
                 md:flex-[0_0_22%]: Professional 4-card look on desktop
              */
              <div key={item.id} className="flex-[0_0_40%] md:flex-[0_0_22%] min-w-0">
                <ProductCard product={item} />
              </div>
            ))}
          </div>
        </div>

        {/* --- VIEW ALL BUTTON --- */}
        <div className="mt-16 text-center">
          <Link to="/collections" className="btn-luxury scale-90 md:scale-100">
            View All Products
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Home;