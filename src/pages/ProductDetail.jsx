import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PRODUCTS } from '../data/products';
import { ChevronLeft, ShoppingBag, Check, Plus, Minus, Ruler } from 'lucide-react';
import { useCart } from '../hooks/useCart';

const ProductDetail = () => {
  const { id } = useParams();
  const { addToBag } = useCart();
  const [isAdded, setIsAdded] = useState(false);
  const [selectedSize, setSelectedSize] = useState('');
  const [activeImage, setActiveImage] = useState(0);
  const [openSection, setOpenSection] = useState('details');

  const product = PRODUCTS.find(p => p.id === parseInt(id));
  const allImages = [product?.image, ...(product?.gallery || [])];

  const formatPHP = (price) => {
    return new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency: 'PHP',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  if (!product) return <div className="pt-40 text-center font-serif">Piece Not Found</div>;

  return (
    // pt-40 ensures the back button is visible under your fixed header
    <div className="pt-32 md:pt-40 pb-24 px-6 md:px-12 max-w-7xl mx-auto">
      
      {/* Navigation */}
      <div className="mb-8 md:mb-12">
        <Link to="/collections" className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-brand-sage-dark group">
          <ChevronLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
          Back to Collections
        </Link>
      </div>

      {/* Main Content Grid: Balanced 1/2 and 1/2 split */}
      <div className="flex flex-col lg:flex-row gap-12 xl:gap-24 items-start justify-center">
        
        {/* LEFT: Image Gallery */}
        <div className="w-full lg:w-1/2 space-y-6 lg:sticky lg:top-32">
          <div className="bg-brand-cream overflow-hidden rounded-sm aspect-[3/4] w-full max-h-[70vh] md:max-h-[80vh]">
            <img 
              src={allImages[activeImage]} 
              alt={product.name} 
              className="w-full h-full object-cover transition-all duration-700 hover:scale-105"
            />
          </div>
          
          {/* Thumbnails */}
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide justify-start">
            {allImages.map((img, idx) => (
              <button 
                key={idx}
                onClick={() => setActiveImage(idx)}
                className={`flex-shrink-0 w-16 h-20 md:w-20 md:h-24 border transition-all ${
                  activeImage === idx ? 'border-brand-sage-dark opacity-100' : 'border-transparent opacity-40 hover:opacity-100'
                }`}
              >
                <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* RIGHT: Product Info */}
        <div className="w-full lg:w-1/2 flex flex-col">
          <div className="mb-8">
            <span className="text-[10px] md:text-[11px] uppercase tracking-[0.4em] text-brand-primary font-bold block mb-4">
              {product.collection} / SKU: {product.sku}
            </span>
            <h1 className="font-serif text-3xl md:text-4xl xl:text-5xl text-brand-sage-dark mb-4 leading-tight">
              {product.name}
            </h1>
            <p className="text-xl font-serif text-brand-sage-dark italic">{formatPHP(product.price)}</p>
          </div>

          {/* Size Selection */}
          <div className="mb-10">
            <div className="flex justify-between items-center mb-4">
              <span className="text-[10px] uppercase tracking-widest font-bold">Select Size</span>
              <button className="text-[10px] uppercase tracking-widest flex items-center gap-1 text-brand-sage-dark/60 hover:text-brand-primary transition-colors">
                <Ruler size={12} /> Size Guide
              </button>
            </div>
            <div className="flex flex-wrap gap-2 md:gap-3">
              {product.sizes.map(size => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`min-w-[55px] md:min-w-[65px] py-3 px-4 text-[10px] tracking-tighter border transition-all ${
                    selectedSize === size 
                    ? 'border-brand-sage-dark bg-brand-sage-dark text-white' 
                    : 'border-brand-sage-light hover:border-brand-sage-dark'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 mb-10">
            <button 
              onClick={() => {
                if(!selectedSize) return alert("Please select a size");
                addToBag(product);
                setIsAdded(true);
                setTimeout(() => setIsAdded(false), 2000);
              }}
              className={`w-full flex items-center justify-center gap-3 py-5 tracking-[0.2em] uppercase text-[11px] font-bold transition-all duration-500 ${
                isAdded ? 'bg-green-800 text-white' : 'bg-brand-sage-dark text-white hover:bg-black'
              }`}
            >
              {isAdded ? <><Check size={16} /> Added to Bag</> : <><ShoppingBag size={16} /> Add to Bag</>}
            </button>
            <button className="w-full py-5 border border-brand-sage-dark/20 text-[11px] tracking-[0.2em] uppercase hover:bg-brand-cream transition-colors text-brand-sage-dark font-medium">
              Inquire About Customization
            </button>
          </div>

          {/* Accordions */}
          <div className="border-t border-brand-sage-light/30">
            <DropdownSection 
              title="Design & Craftsmanship" 
              isOpen={openSection === 'details'} 
              toggle={() => toggleSection('details')}
            >
              <p className="mb-4 text-sm leading-relaxed text-brand-sage-dark/80">{product.description}</p>
              <ul className="space-y-2">
                {product.details.map((detail, i) => (
                  <li key={i} className="text-sm flex items-start gap-2 text-brand-sage-dark/80 font-light">
                    <span className="mt-2 w-1 h-1 bg-brand-primary/60 rounded-full shrink-0" />
                    {detail}
                  </li>
                ))}
              </ul>
            </DropdownSection>

            <DropdownSection 
              title="Specifications" 
              isOpen={openSection === 'specs'} 
              toggle={() => toggleSection('specs')}
            >
              <div className="grid grid-cols-2 gap-y-6 text-sm">
                <div>
                  <p className="text-[9px] uppercase font-bold tracking-widest text-brand-primary mb-1">Silhouette</p>
                  <p className="text-brand-sage-dark">{product.silhouette}</p>
                </div>
                <div>
                  <p className="text-[9px] uppercase font-bold tracking-widest text-brand-primary mb-1">Fabric</p>
                  <p className="text-brand-sage-dark">{product.fabric}</p>
                </div>
                <div>
                  <p className="text-[9px] uppercase font-bold tracking-widest text-brand-primary mb-1">Neckline</p>
                  <p className="text-brand-sage-dark">{product.neckline}</p>
                </div>
                <div>
                  <p className="text-[9px] uppercase font-bold tracking-widest text-brand-primary mb-1">Lead Time</p>
                  <p className="text-brand-sage-dark">{product.availability}</p>
                </div>
              </div>
            </DropdownSection>

            <DropdownSection 
              title="Care & Delivery" 
              isOpen={openSection === 'care'} 
              toggle={() => toggleSection('care')}
            >
              <p className="text-sm leading-relaxed text-brand-sage-dark/70 italic mb-4">
                {product.careInstructions}
              </p>
              <p className="text-sm leading-relaxed text-brand-sage-dark/80">
                {product.designerNotes}
              </p>
            </DropdownSection>
          </div>
        </div>
      </div>
    </div>
  );
};

const DropdownSection = ({ title, children, isOpen, toggle }) => (
  <div className="border-b border-brand-sage-light/30">
    <button 
      onClick={toggle}
      className="w-full py-6 flex justify-between items-center text-[11px] uppercase tracking-[0.2em] font-bold text-brand-sage-dark hover:text-brand-primary transition-colors"
    >
      {title}
      {isOpen ? <Minus size={14} className="text-brand-primary" /> : <Plus size={14} />}
    </button>
    <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-[800px] pb-8' : 'max-h-0'}`}>
      {children}
    </div>
  </div>
);

export default ProductDetail;