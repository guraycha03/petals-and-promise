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

  // Helper to shuffle array
  const shuffle = (array) => [...array].sort(() => Math.random() - 0.5);

  // Randomize Carousel Items
  const carouselProducts = React.useMemo(() => shuffle(PRODUCTS), []);

  // Randomize New Arrival Items
  const newArrivalProducts = React.useMemo(() => shuffle(PRODUCTS).slice(0, 4), []);



  return (
    <section className="pt-24 overflow-hidden bg-white">
      
      {/* --- HERO SECTION --- */}
      <div className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background Image Container */}
        <div className="absolute inset-0">
          <img 
            src="/images/hero-bg.png" 
            alt="Hero Background" 
            className="w-full h-full object-cover scale-105 animate-slow-zoom" 
          />
          <div className="absolute inset-0 bg-black/30 bg-gradient-to-b from-black/20 via-transparent to-black/40" />
        </div>

        <div className="relative z-10 text-center px-6 max-w-5xl"> {/* Slightly increased max-w for better balance */}
          <span className="text-[11px] md:text-[12px] uppercase tracking-[0.8em] text-white font-bold mb-8 block drop-shadow-sm">
            The 2025 Atelier
          </span>
          
          {/* Updated text size classes below */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-white mb-10 leading-[1.1] tracking-tight drop-shadow-md">
            Petals & Promise
          </h1>
          
          <p className="max-w-md mx-auto text-[11px] md:text-xs text-white/90 uppercase tracking-[0.4em] mb-12 leading-relaxed font-medium drop-shadow-sm">
            Handcrafted silhouettes <br className="hidden md:block" /> 
            for the modern romantic.
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <Link 
              to="/collections" 
              className="w-full md:w-auto inline-block text-[11px] font-bold uppercase tracking-[0.2em] text-brand-sage-dark bg-white px-10 py-5 hover:bg-brand-blush hover:text-brand-sage-dark transition-all duration-500 shadow-xl"
            >
              Explore Collection
            </Link>
            <Link 
              to="/contact" 
              className="w-full md:w-auto inline-block text-[11px] font-bold uppercase tracking-[0.2em] text-white border border-white/40 backdrop-blur-sm px-10 py-5 hover:bg-white hover:text-brand-sage-dark transition-all duration-500"
            >
              Book a Viewing
            </Link>
          </div>
        </div>
      </div>

      {/* --- CATEGORY GRID --- */}
      <div className="py-20 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { name: 'The Minimalist', image: '/images/collections/lumière-shimmer-mini-dress.png', link: '/collections?cat=Sheath' },
            { name: 'The Romantic', image: '/images/collections/petal-gown.png', link: '/collections?cat=A-Line' },
            { name: 'The Grand Entrance', image: '/images/collections/cathedral-gown.png', link: '/collections?cat=Ballgown' },
          ].map((cat) => (
            <Link key={cat.name} to={cat.link} className="group relative h-[500px] overflow-hidden rounded-2xl bg-brand-cream">
              <img 
                src={cat.image} 
                alt={cat.name} 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-90" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/60 via-transparent to-transparent" />
              <div className="absolute bottom-10 left-0 right-0 text-center">
                <h3 className="text-white font-serif text-2xl tracking-wide mb-2">{cat.name}</h3>
                <span className="text-[10px] text-white/80 uppercase tracking-[0.3em] border-b border-white/40 pb-1 group-hover:border-white transition-all">
                  Discover
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* --- CAROUSEL SECTION --- */}
      <div className="py-20 md:py-32 bg-slate-50"> {/* Light greyish bg to let beige cards pop */}
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
          <div className="flex gap-2 md:gap-10 px-6 md:px-12">
            {carouselProducts.map((item) => ( // Changed from PRODUCTS to carouselProducts
              <div key={item.id} className="flex-[0_0_46%] md:flex-[0_0_25%] min-w-0">
                <ProductCard product={item} />
              </div>
            ))}
          </div>
        </div>
      </div>



      {/* --- NEW ARRIVALS GRID --- */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <span className="text-[10px] uppercase tracking-[0.4em] text-brand-primary font-bold block mb-4">
              The Latest Additions
            </span>
            <h2 className="text-3xl md:text-5xl font-serif text-brand-sage-dark tracking-wide">
              New Arrivals
            </h2>
            <div className="w-12 h-[1px] bg-brand-sage-light mx-auto mt-6" />
          </div>

          {/* Using a static grid for a high-end gallery feel */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-12 md:gap-x-8 md:gap-y-16">
            {newArrivalProducts.map((item) => ( // Changed from PRODUCTS.slice to newArrivalProducts
              <div key={item.id} className="group">
                <ProductCard product={item} />
                <div className="mt-4 overflow-hidden">
                  <p className="text-[9px] uppercase tracking-widest text-brand-sage-dark/40">
                    Limited Edition
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-20 text-center">
            <Link 
              to="/collections" 
              className="inline-block border border-brand-sage-dark/20 px-12 py-4 text-[11px] uppercase tracking-[0.2em] text-brand-sage-dark hover:bg-brand-sage-dark hover:text-white transition-all duration-700"
            >
              View Full Collection
            </Link>
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


      {/* --- THE CRAFT --- */}
      <div className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 items-center gap-20">
          <div className="relative">
            <div className="aspect-[4/5] bg-brand-cream rounded-3xl overflow-hidden shadow-2xl">
              <img 
                src="/images/bg.jpg" 
                alt="Detailing" 
                className="w-full h-full object-cover mix-blend-multiply" 
              />
            </div>
            {/* Decorative floating card */}
            <div className="absolute -bottom-10 -right-10 bg-brand-sage-dark text-white p-8 rounded-2xl hidden md:block max-w-[240px]">
              <p className="font-serif text-xl mb-2">120+ Hours</p>
              <p className="text-[9px] uppercase tracking-widest text-white/60 leading-relaxed">
                The average time spent hand-beading a single Petals & Promise bodice.
              </p>
            </div>
          </div>
          
          <div className="space-y-8">
            <span className="text-[10px] uppercase tracking-[0.4em] text-brand-primary font-bold">The Process</span>
            <h2 className="text-4xl md:text-5xl font-serif text-brand-sage-dark leading-tight">
              A symphony of <br/>silk and stone.
            </h2>
            <div className="space-y-6 text-brand-sage-dark/70 text-sm leading-loose max-w-md">
              <p>
                From the initial charcoal sketch to the final fitting, our atelier operates on the principles of 
                French haute couture. Every seam is finished by hand, and every fabric is ethically sourced 
                from heritage mills in Italy and France.
              </p>
              <ul className="space-y-4 pt-4">
                {['Ethically Sourced Silks', 'Hand-stitched Embellishments', 'Tailored to your Silhouette'].map((item) => (
                  <li key={item} className="flex items-center gap-4 text-[11px] uppercase tracking-widest font-bold">
                    <span className="w-1.5 h-1.5 bg-brand-primary rounded-full" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
};

export default Home;
