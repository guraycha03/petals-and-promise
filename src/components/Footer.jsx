import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 flex flex-col items-center text-center">
        <h2 className="font-serif text-2xl tracking-widest mb-6">PETALS & PROMISE</h2>
        <div className="flex gap-8 text-[10px] uppercase tracking-[0.2em] mb-12">
          <a href="#" className="hover:text-brand-primary">Instagram</a>
          <a href="#" className="hover:text-brand-primary">Pinterest</a>
          <a href="#" className="hover:text-brand-primary">Journal</a>
        </div>
        <p className="text-[10px] text-gray-400 tracking-widest uppercase">
          © 2025 Luxury Bridal Gowns. Built for Elegance.
        </p>
      </div>
    </footer>
  );
};

export default Footer;