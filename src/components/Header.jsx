import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Toggle function to handle body scroll lock
  const toggleMenu = () => {
    setIsOpen(!isOpen);
    // Optional: Stop background scrolling when menu is open
    document.body.style.overflow = !isOpen ? 'hidden' : 'unset';
  };

  return (
    <>
      <header className="fixed top-0 left-0 w-full bg-white/90 backdrop-blur-md z-[100] border-b border-gray-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-20 flex justify-between items-center">
          
          {/* LEFT: Burger Menu Toggle */}
          <button 
            onClick={toggleMenu} 
            className="flex items-center gap-3 group z-[110]"
          >
            <div className="flex flex-col gap-1.5 w-5">
              <span className={`h-[1px] bg-brand-dark transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`h-[1px] bg-brand-dark transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`} />
              <span className={`h-[1px] bg-brand-dark transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </div>
            <span className="text-[10px] uppercase tracking-[0.3em] hidden sm:block font-medium">
              {isOpen ? 'Close' : 'Menu'}
            </span>
          </button>

          {/* CENTER: Logo (Absolute centered for professional look) */}
          <Link to="/" className="absolute left-1/2 -translate-x-1/2 text-lg md:text-xl font-serif tracking-[0.4em] text-brand-dark whitespace-nowrap">
            PETALS & PROMISE
          </Link>

          {/* RIGHT: Shopping Bag */}
          <div className="flex items-center gap-4">
            <button className="relative group p-2">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-dark group-hover:text-brand-primary transition-colors">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <path d="M16 10a4 4 0 0 1-8 0"></path>
              </svg>
              {/* Bag Count Badge (Blush color) */}
              <span className="absolute top-1 right-0 w-3.5 h-3.5 bg-brand-blush text-[8px] flex items-center justify-center rounded-full text-brand-sage-dark font-bold">
                0
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* SLIDING MENU PANEL */}
      <div 
        className={`fixed inset-0 bg-brand-dark/20 backdrop-blur-sm z-[90] transition-opacity duration-500 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={toggleMenu}
      />
      
      <aside className={`fixed top-0 left-0 h-full w-[85%] max-w-[400px] bg-white z-[105] shadow-2xl transition-transform duration-500 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-col h-full pt-32 px-12 pb-12 bg-petal-gradient">
          <nav className="flex flex-col gap-8">
            <Link to="/collections" onClick={toggleMenu} className="group flex items-baseline gap-4">
              <span className="text-[10px] text-brand-sage font-serif italic">01</span>
              <span className="text-3xl font-serif tracking-wide group-hover:text-brand-primary transition-colors">Collections</span>
            </Link>
            <Link to="/about" onClick={toggleMenu} className="group flex items-baseline gap-4">
              <span className="text-[10px] text-brand-sage font-serif italic">02</span>
              <span className="text-3xl font-serif tracking-wide group-hover:text-brand-primary transition-colors">About</span>
            </Link>
            <Link to="/contact" onClick={toggleMenu} className="group flex items-baseline gap-4">
              <span className="text-[10px] text-brand-sage font-serif italic">03</span>
              <span className="text-3xl font-serif tracking-wide group-hover:text-brand-primary transition-colors">Contact</span>
            </Link>
          </nav>

          {/* Bottom of Menu (Socials/Address) */}
          <div className="mt-auto pt-10 border-t border-brand-sage/20">
            <p className="text-[9px] uppercase tracking-[0.3em] text-brand-sage-dark mb-4 font-bold">Follow Our Bloom</p>
            <div className="flex gap-6 text-[10px] uppercase tracking-widest text-gray-400">
              <a href="#" className="hover:text-brand-primary">Instagram</a>
              <a href="#" className="hover:text-brand-primary">Pinterest</a>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Header;