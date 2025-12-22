import React from 'react';
import { Link } from 'react-router-dom';
import { X, Instagram, PinIcon as Pinterest, User } from 'lucide-react';

const SideMenu = ({ isOpen, toggleMenu }) => {
  const linkStyle = "relative w-fit inline-block after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-brand-primary after:transform after:scale-x-0 after:origin-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-left hover:text-brand-primary transition-colors duration-300";

  return (
    <aside className={`fixed top-0 left-0 h-full w-full max-w-[420px] bg-white z-[130] shadow-2xl transition-transform duration-700 ease-[cubic-bezier(0.7,0,0.2,1)] ${
      isOpen ? 'translate-x-0' : '-translate-x-full'
    }`}>
      
      {/* Content Container (Scrollable) */}
      <div className="relative flex flex-col h-full pt-20 px-10 md:px-16 pb-12 overflow-y-auto scrollbar-hide">
        
        {/* --- CLOSE BUTTON (Inside the scroll flow) --- */}
        <button 
          onClick={toggleMenu} 
          className="absolute top-8 right-8 md:right-12 p-2 text-brand-sage-dark hover:text-brand-primary transition-all duration-300 hover:rotate-90"
          aria-label="Close menu"
        >
          <X size={28} strokeWidth={1.5} />
        </button>

        {/* --- SECTION 1: PROFILE CARD --- */}
        <div className="mb-12">
          <Link 
            to="/profile" 
            onClick={toggleMenu}
            className="group flex items-center gap-5 p-4 bg-brand-sage-light/10 rounded-2xl border border-brand-sage-light/20 transition-colors duration-300 hover:bg-brand-sage-light/20"
          >
            {/* Profile Image Container */}
            <div className="w-16 h-16 rounded-full border-2 border-white overflow-hidden bg-white flex items-center justify-center text-brand-sage-dark shrink-0 shadow-sm relative">
              <img 
                src="../images/profile-img.png" 
                alt="Profile" 
                className="w-full h-full object-cover z-10 relative"
                onError={(e) => { e.target.style.display = 'none'; }}
              />
              <User size={28} strokeWidth={1.2} className="absolute z-0" />
            </div>

            <div className="flex flex-col overflow-hidden">
              {/* Account Label (Now on top) */}
              <span className="text-[10px] uppercase tracking-[0.2em] text-brand-primary font-bold mb-1">
                Account Settings
              </span>
              <span className="text-xl font-serif text-brand-sage-dark font-semibold truncate leading-tight">
                Eleanor Rigby
              </span>
              <span className="text-sm text-brand-sage-dark/70 truncate">
                eleanor@gmail.com
              </span>
            </div>
          </Link>
        </div>

        <nav className="flex flex-col space-y-12">
          {/* --- SECTION 2: NAVIGATION --- */}
          <div className="space-y-6">
            <span className="block text-sm uppercase tracking-[0.3em] text-brand-primary font-medium border-b border-brand-sage-light pb-2">Navigation</span>
            <div className="flex flex-col space-y-5">
              <Link to="/" onClick={toggleMenu} className={`text-2xl font-serif text-brand-sage-dark ${linkStyle}`}>Home</Link>
              <Link to="/collections" onClick={toggleMenu} className={`text-2xl font-serif text-brand-sage-dark ${linkStyle}`}>New Arrivals</Link>
              <Link to="/collections" onClick={toggleMenu} className={`text-2xl font-serif text-brand-sage-dark ${linkStyle}`}>Bridal Gowns</Link>
              <Link to="/collections" onClick={toggleMenu} className={`text-2xl font-serif text-brand-sage-dark ${linkStyle}`}>Sustainable Silk</Link>
            </div>
          </div>

          {/* --- SECTION 3: EXPERIENCE --- */}
          <div className="space-y-6">
            <span className="block text-sm uppercase tracking-[0.3em] text-brand-sage-dark font-medium border-b border-brand-sage-light pb-2">Experience</span>
            <div className="flex flex-col space-y-5">
              <Link to="/contact" onClick={toggleMenu} className={`text-2xl font-serif text-brand-sage-dark ${linkStyle}`}>Book Appointment</Link>
              <Link to="/contact" onClick={toggleMenu} className={`text-2xl font-serif text-brand-sage-dark ${linkStyle}`}>Custom Couture</Link>
            </div>
          </div>

          {/* --- SECTION 4: THE HOUSE --- */}
          <div className="space-y-6 pb-8">
            <span className="block text-sm uppercase tracking-[0.3em] text-brand-sage-dark font-medium border-b border-brand-sage-light pb-2">The House</span>
            <div className="flex flex-col space-y-4">
              <Link to="/about" onClick={toggleMenu} className={`text-lg font-serif text-brand-sage-dark/80 ${linkStyle}`}>Our Story</Link>
              <Link to="/contact" onClick={toggleMenu} className={`text-lg font-serif text-brand-sage-dark/80 ${linkStyle}`}>Sustainability</Link>
              <Link to="/contact" onClick={toggleMenu} className={`text-lg font-serif text-brand-sage-dark/80 ${linkStyle}`}>Client FAQ</Link>
            </div>
          </div>
        </nav>

        {/* Footer Socials */}
        <div className="mt-auto pt-10 border-t border-brand-sage-light">
          <div className="flex gap-8 text-brand-sage-dark mb-6">
            <a href="#" className="hover:text-brand-primary transition-transform hover:-translate-y-1"><Instagram size={24} strokeWidth={1} /></a>
            <a href="#" className="hover:text-brand-primary transition-transform hover:-translate-y-1"><Pinterest size={24} strokeWidth={1} /></a>
          </div>
          <p className="text-[10px] uppercase tracking-[0.2em] text-brand-sage-dark/60">Crafting dreams since 2025 • Sorsogon City</p>
        </div>
      </div>
    </aside>
  );
};

export default SideMenu;