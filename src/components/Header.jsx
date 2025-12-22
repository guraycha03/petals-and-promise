import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, ShoppingBag, Search, Heart } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { useWishlist } from '../hooks/useWishlist';
import SideMenu from './SideMenu'; // Import the new component

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showSubHeader, setShowSubHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const { cart } = useCart();
  const { wishlist } = useWishlist();
  const totalItems = cart.reduce((acc, item) => acc + (item.quantity || 1), 0);

  useEffect(() => {
    const controlNavbar = () => {
      if (typeof window !== 'undefined') {
        setShowSubHeader(window.scrollY <= lastScrollY || window.scrollY <= 50);
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
      <div className="fixed top-0 left-0 w-full z-[110] flex flex-col pointer-events-none">
        <header className="w-full bg-white border-b border-brand-sage-light h-20 flex items-center z-[120] pointer-events-auto">
          <div className="max-w-7xl mx-auto px-4 md:px-10 w-full flex justify-between items-center relative">
            <div className="flex items-center gap-4 min-w-[100px]">
              <button onClick={toggleMenu} className="flex items-center gap-2 md:gap-4 outline-none group">
                <Menu size={22} strokeWidth={1.5} className="text-brand-sage-dark" />
                <span className="text-xs uppercase tracking-[0.2em] hidden lg:block text-brand-sage-dark group-hover:text-brand-primary transition-colors font-medium">Menu</span>
              </button>
              <Link to="/" className="md:hidden block">
                <img src="/logo-icon.jpg" alt="Logo" className="h-10 w-auto object-contain" />
              </Link>
            </div>

            <Link to="/" className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center justify-center px-4">
              <span className="text-lg font-serif text-brand-sage-dark uppercase tracking-[0.5em] flex items-center">
                <span className="text-[#889C62]">⚘</span>
                <span className="px-5">Petals & Promise</span>
                <span className="text-[#889C62]">⚘</span>
              </span>
            </Link>

            {/* --- Updated Search Icon for All Screens --- */}
            <div className="flex items-center justify-end gap-1 md:gap-4 min-w-[100px]">
              <Link 
                to="/search" 
                className="p-2 text-brand-sage-dark hover:text-brand-primary transition-colors"
              >
                <Search size={20} strokeWidth={1.5} />
              </Link>
              
              <Link to="/wishlist" className="relative p-2 text-brand-sage-dark hover:text-brand-primary transition-colors">
                <Heart size={20} strokeWidth={1.5} />
                {wishlist.length > 0 && (
                  <span className="absolute top-1 right-0 w-4 h-4 bg-brand-primary text-[9px] flex items-center justify-center rounded-full text-white font-bold">
                    {wishlist.length}
                  </span>
                )}
              </Link>

              <Link to="/cart" className="relative p-2 text-brand-sage-dark hover:text-brand-primary transition-colors">
                <ShoppingBag size={20} strokeWidth={1.5} />
                {totalItems > 0 && (
                  <span className="absolute top-1 right-0 w-4 h-4 bg-brand-primary text-[9px] flex items-center justify-center rounded-full text-white font-bold">
                    {totalItems}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </header>

        <nav className={`w-full bg-white border-b border-brand-sage-light transition-all duration-500 hidden md:block pointer-events-auto overflow-hidden ${showSubHeader ? 'max-h-14 opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="max-w-7xl mx-auto px-10 h-14 flex justify-center items-center gap-12 text-xs uppercase tracking-[0.15em] text-brand-sage-dark font-medium">
            <Link to="/collections" className="hover:text-brand-primary">New Arrivals</Link>
            <Link to="/collections" className="hover:text-brand-primary">Bridal Gowns</Link>
            <Link to="/collections" className="hover:text-brand-primary">Sustainable Silk</Link>
            <Link to="/contact" className="hover:text-brand-primary">Book a Viewing</Link>
          </div>
        </nav>
      </div>

      <div className={`fixed inset-0 bg-brand-sage-dark/20 backdrop-blur-[2px] z-[90] transition-opacity duration-700 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`} onClick={toggleMenu} />
      
      {/* USE THE SEPARATE SIDE MENU COMPONENT HERE */}
      <SideMenu isOpen={isOpen} toggleMenu={toggleMenu} />
    </>
  );
};

export default Header;