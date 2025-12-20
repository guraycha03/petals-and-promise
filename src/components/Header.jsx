import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Menu, 
  X, 
  ShoppingBag, 
  Instagram, 
  PinIcon as Pinterest, 
  Search,
  Calendar
} from 'lucide-react';

// Ensure this points to hooks
import { useCart } from '../hooks/useCart';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showSubHeader, setShowSubHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const { cart } = useCart();
  const totalItems = cart.reduce((acc, item) => acc + (item.quantity || 1), 0);

  useEffect(() => {
    const controlNavbar = () => {
      if (typeof window !== 'undefined') {
        if (window.scrollY > lastScrollY && window.scrollY > 50) {
          setShowSubHeader(false);
        } else {
          setShowSubHeader(true);
        }
        setLastScrollY(window.scrollY);
      }
    };

    window.addEventListener('scroll', controlNavbar);
    return () => window.removeEventListener('scroll', controlNavbar);
  }, [lastScrollY]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    document.body.style.overflow = !isOpen ? 'hidden' : 'unset';
  };

  return (
    <>
      {/* --- FIXED WRAPPER --- */}
      <div className="fixed top-0 left-0 w-full z-[110] flex flex-col pointer-events-none">
        
        {/* --- MAIN HEADER BAR --- */}
        <header className="w-full bg-white border-b border-brand-sage-light h-20 flex items-center z-[120] pointer-events-auto">
          <div className="max-w-7xl mx-auto px-4 md:px-10 w-full flex justify-between items-center relative">
            
            {/* LEFT: Menu Toggle */}
            <button 
              onClick={toggleMenu} 
              className="flex items-center gap-2 md:gap-4 outline-none group min-w-[100px]"
            >
              <div className="relative w-6 h-6 flex items-center justify-center text-brand-sage-dark">
                {isOpen ? <X size={22} strokeWidth={1.5} /> : <Menu size={22} strokeWidth={1.5} />}
              </div>
              <span className="text-xs uppercase tracking-[0.2em] hidden lg:block text-brand-sage-dark group-hover:text-brand-primary transition-colors font-medium">
                Menu
              </span>
            </button>

            {/* CENTER: BRAND LOGO */}
            <Link 
              to="/" 
              className="absolute left-1/2 -translate-x-1/2 text-sm md:text-lg font-serif tracking-[0.5em] text-brand-sage-dark uppercase whitespace-nowrap px-4"
            >
              Petals & Promise
            </Link>

            {/* RIGHT: Actions */}
            <div className="flex items-center justify-end gap-1 md:gap-4 min-w-[100px]">
              <button className="p-2 text-brand-sage-dark hover:text-brand-primary transition-colors hidden md:block">
                <Search size={20} strokeWidth={1.5} />
              </button>
              
              <Link to="/cart" className="relative p-2 text-brand-sage-dark hover:text-brand-primary transition-colors">
                <ShoppingBag size={20} strokeWidth={1.5} />
                {totalItems > 0 && (
                  <span className="absolute top-1 right-0 w-4 h-4 bg-brand-primary text-[9px] flex items-center justify-center rounded-full text-white font-bold animate-in fade-in zoom-in duration-300">
                    {totalItems}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </header>

        {/* --- QUICK LINKS SUB-HEADER --- */}
        <nav 
          className={`w-full bg-white border-b border-brand-sage-light transition-all duration-500 ease-in-out hidden md:block pointer-events-auto overflow-hidden ${
            showSubHeader ? 'max-h-14 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="max-w-7xl mx-auto px-10 h-14 flex justify-center items-center gap-12">
            <Link to="/collections" className="text-xs uppercase tracking-[0.15em] text-brand-sage-dark hover:text-brand-primary transition-colors font-medium">New Arrivals</Link>
            <Link to="/collections" className="text-xs uppercase tracking-[0.15em] text-brand-sage-dark hover:text-brand-primary transition-colors font-medium">Bridal Gowns</Link>
            <Link to="/collections" className="text-xs uppercase tracking-[0.15em] text-brand-sage-dark hover:text-brand-primary transition-colors font-medium">Sustainable Silk</Link>
            <Link to="/contact" className="text-xs uppercase tracking-[0.15em] text-brand-sage-dark hover:text-brand-primary transition-colors font-medium">Book a Viewing</Link>
          </div>
        </nav>
      </div>

      {/* --- MISTY OVERLAY --- */}
      <div 
        className={`fixed inset-0 bg-brand-sage-dark/20 backdrop-blur-[2px] z-[90] transition-opacity duration-700 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={toggleMenu}
      />
      
      {/* --- SIDE MENU PANEL --- */}
      <aside className={`fixed top-0 left-0 h-full w-full max-w-[420px] bg-white z-[130] shadow-2xl transition-transform duration-700 ease-[cubic-bezier(0.7,0,0.2,1)] ${
  isOpen ? 'translate-x-0' : '-translate-x-full'
}`}>
  
  <button 
    onClick={toggleMenu}
    className="absolute top-8 right-8 p-2 text-brand-sage-dark hover:text-brand-primary transition-colors lg:hidden"
    aria-label="Close menu"
  >
    <X size={28} strokeWidth={1} />
  </button>

  {/* UPDATED LINE BELOW: Added scrollbar-hide */}
  <div className="flex flex-col h-full pt-32 px-10 md:px-16 pb-12 overflow-y-auto scrollbar-hide">
    <nav className="flex flex-col space-y-10">

        
            {/* Atelier Section */}
            <div className="space-y-6">
              <span className="block text-sm uppercase tracking-[0.3em] text-brand-primary font-medium border-b border-brand-sage-light pb-2">The Atelier</span>
              <div className="flex flex-col space-y-4">
                <Link to="/collections" onClick={toggleMenu} className="text-2xl font-serif text-brand-sage-dark hover:text-brand-primary transition-all duration-300 hover:translate-x-2">Bridal Gowns</Link>
                <Link to="/collections" onClick={toggleMenu} className="text-2xl font-serif text-brand-sage-dark hover:text-brand-primary transition-all duration-300 hover:translate-x-2">Sustainable Silk</Link>
                <Link to="/collections" onClick={toggleMenu} className="text-2xl font-serif text-brand-sage-dark hover:text-brand-primary transition-all duration-300 hover:translate-x-2">New Arrivals</Link>
              </div>
            </div>

            {/* Experience Section */}
            <div className="space-y-6">
              <span className="block text-sm uppercase tracking-[0.3em] text-brand-sage-dark font-medium border-b border-brand-sage-light pb-2">Experience</span>
              <div className="flex flex-col space-y-4">
                <Link to="/contact" onClick={toggleMenu} className="flex items-center gap-3 text-2xl font-serif text-brand-sage-dark hover:text-brand-primary transition-all duration-300 hover:translate-x-2">
                  <Calendar size={22} strokeWidth={1} />
                  Book Appointment
                </Link>
                <Link to="/contact" onClick={toggleMenu} className="text-2xl font-serif text-brand-sage-dark hover:text-brand-primary transition-all duration-300 hover:translate-x-2">Petal & Promise Studio</Link>
              </div>
            </div>

            {/* The House Section */}
            <div className="space-y-6">
              <span className="block text-sm uppercase tracking-[0.3em] text-brand-sage-dark font-medium border-b border-brand-sage-light pb-2">The House</span>
              <div className="flex flex-col space-y-4">
                <Link to="/about" onClick={toggleMenu} className="text-2xl font-serif text-brand-sage-dark hover:text-brand-primary transition-all duration-300 hover:translate-x-2">Our Story</Link>
                <Link to="/contact" onClick={toggleMenu} className="text-2xl font-serif text-brand-sage-dark hover:text-brand-primary transition-all duration-300 hover:translate-x-2">Sustainability</Link>
                <Link to="/contact" onClick={toggleMenu} className="text-2xl font-serif text-brand-sage-dark hover:text-brand-primary transition-all duration-300 hover:translate-x-2">Client FAQ</Link>
              </div>
            </div>
          </nav>

          <div className="mt-16 pt-10 border-t border-brand-sage-light">
            <div className="flex gap-8 text-brand-sage-dark mb-6">
              <a href="#" className="hover:text-brand-primary transition-transform hover:-translate-y-1"><Instagram size={24} strokeWidth={1} /></a>
              <a href="#" className="hover:text-brand-primary transition-transform hover:-translate-y-1"><Pinterest size={24} strokeWidth={1} /></a>
            </div>
            <p className="text-xs uppercase tracking-[0.2em] text-brand-sage-dark/80">Crafting dreams since 2025 • Sorsogon City</p>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Header;