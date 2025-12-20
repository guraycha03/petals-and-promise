import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Instagram as InstagramIcon, 
  Facebook as FacebookIcon, 
  Mail, 
  MapPin, 
  Phone 
} from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-brand-sage-light pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* --- TOP SECTION: NEWSLETTER & SOCIAL --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
          <div className="max-w-md space-y-6">
            <h2 className="font-serif text-4xl tracking-[0.3em] text-brand-sage-dark">
              PETALS & PROMISE
            </h2>
            {/* Larger font size (text-base) and removed bold for a cleaner look */}
            <p className="text-base uppercase tracking-widest text-brand-sage-dark leading-relaxed">
              Join the Petals Society. Be the first to hear about our new bridal collections and private viewings in Sorsogon City.
            </p>
            <form className="flex border-b border-brand-sage-dark pb-3 group focus-within:border-brand-primary transition-colors">
              <input 
                type="email" 
                placeholder="YOUR EMAIL ADDRESS" 
                className="bg-transparent w-full text-base uppercase tracking-widest outline-none placeholder:text-brand-sage-dark/60 text-brand-sage-dark"
              />
              <button className="text-sm uppercase tracking-[0.2em] text-brand-sage-dark hover:text-brand-primary transition-all">
                SUBSCRIBE
              </button>
            </form>
          </div>
          
          <div className="flex flex-col lg:items-end justify-center">
             <div className="flex gap-10 text-brand-sage-dark">
                <a href="#" className="hover:text-brand-primary transition-transform hover:-translate-y-1 duration-300">
                  <InstagramIcon size={28} strokeWidth={1} />
                </a>
                <a href="#" className="hover:text-brand-primary transition-transform hover:-translate-y-1 duration-300">
                  <FacebookIcon size={28} strokeWidth={1} />
                </a>
                <a href="#" className="hover:text-brand-primary transition-transform hover:-translate-y-1 duration-300">
                  <Mail size={28} strokeWidth={1} />
                </a>
             </div>
          </div>
        </div>

        {/* --- MAIN NAVIGATION COLUMNS --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 border-t border-brand-sage-light pt-16 mb-16">
          
          {/* Column 1: Sorsogon Location */}
          <div className="space-y-6">
            <h3 className="text-sm uppercase tracking-[0.3em] text-brand-primary font-medium">The Sorsogon Atelier</h3>
            <div className="text-base text-brand-sage-dark space-y-4 leading-relaxed">
              <p className="flex items-start gap-4">
                <MapPin size={20} className="shrink-0 text-brand-primary" />
                <span>Magsaysay Street, Sorsogon City<br/>4700 Sorsogon, Philippines</span>
              </p>
              <p className="flex items-center gap-4">
                <Phone size={20} className="text-brand-primary" />
                <span>+63 917 123 4567</span>
              </p>
            </div>
          </div>

          {/* Column 2: The House */}
          <div className="space-y-6">
            <h3 className="text-sm uppercase tracking-[0.3em] text-brand-sage-dark font-medium">The House</h3>
            <ul className="text-base uppercase tracking-widest space-y-4 text-brand-sage-dark">
              <li><Link to="/collections" className="hover:text-brand-primary transition-colors block">Bridal Collection</Link></li>
              <li><Link to="/about" className="hover:text-brand-primary transition-colors block">Our Story</Link></li>
              <li><Link to="/about" className="hover:text-brand-primary transition-colors block">Sustainability</Link></li>
            </ul>
          </div>

          {/* Column 3: Concierge */}
          <div className="space-y-6">
            <h3 className="text-sm uppercase tracking-[0.3em] text-brand-sage-dark font-medium">Concierge</h3>
            <ul className="text-base uppercase tracking-widest space-y-4 text-brand-sage-dark">
              <li><Link to="/contact" className="hover:text-brand-primary transition-colors block">Book Consultation</Link></li>
              <li><Link to="/contact" className="hover:text-brand-primary transition-colors block">Shipping & Delivery</Link></li>
              <li><Link to="/contact" className="hover:text-brand-primary transition-colors block">Client FAQ</Link></li>
            </ul>
          </div>

          {/* Column 4: Payment */}
          <div className="space-y-6">
            <h3 className="text-sm uppercase tracking-[0.3em] text-brand-sage-dark font-medium">Payment</h3>
            <p className="text-base text-brand-sage-dark leading-relaxed mb-4">
              Secure payments via GCash, Maya, or BDO bank transfer.
            </p>
            <div className="flex flex-wrap gap-4">
              <span className="px-5 py-2 border border-brand-sage-dark text-xs text-brand-sage-dark bg-white">GCASH</span>
              <span className="px-5 py-2 border border-brand-sage-dark text-xs text-brand-sage-dark bg-white">MAYA</span>
              <span className="px-5 py-2 border border-brand-sage-dark text-xs text-brand-sage-dark bg-white">BDO</span>
            </div>
          </div>
        </div>

        {/* --- BOTTOM LEGAL SECTION --- */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-10 border-t border-brand-sage-light gap-8">
          <p className="text-sm uppercase tracking-[0.2em] text-brand-sage-dark">
            © 2025 Petals & Promise • Proudly Bicolano.
          </p>
          <div className="flex gap-10 text-sm uppercase tracking-[0.2em] text-brand-sage-dark">
            <a href="#" className="hover:text-brand-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-brand-primary transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;