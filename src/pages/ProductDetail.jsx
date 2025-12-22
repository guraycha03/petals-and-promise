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
  const [openSection, setOpenSection] = useState('details'); // Dropdown state

  const product = PRODUCTS.find(p => p.id === parseInt(id));

  // Combine main image with gallery for the slideshow
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
    <div className="pt-32 pb-24 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
      {/* Navigation */}
      <Link to="/collections" className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-brand-sage-dark mb-10 group">
        <ChevronLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
        Back to Collections
      </Link>

      <div className="flex flex-col lg:flex-row gap-16 xl:gap-24">
        {/* LEFT: Image Gallery */}
        <div className="lg:flex-[0_0_55%] space-y-4">
          <div className="bg-brand-cream overflow-hidden rounded-sm aspect-[3/4]">
            <img 
              src={allImages[activeImage]} 
              alt={product.name} 
              className="w-full h-full object-cover transition-all duration-700"
            />
          </div>
          <div className="flex gap-4">
            {allImages.map((img, idx) => (
              <button 
                key={idx}
                onClick={() => setActiveImage(idx)}
                className={`w-20 h-24 border transition-all ${activeImage === idx ? 'border-brand-primary' : 'border-transparent opacity-60'}`}
              >
                <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* RIGHT: Product Info */}
        <div className="lg:flex-[0_0_40%] flex flex-col">
          <div className="mb-8">
            <span className="text-[11px] uppercase tracking-[0.4em] text-brand-primary font-bold block mb-4">
              {product.collection} / SKU: {product.sku}
            </span>
            <h1 className="font-serif text-4xl lg:text-5xl text-brand-sage-dark mb-4 leading-tight">
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
            <div className="flex flex-wrap gap-3">
              {product.sizes.map(size => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`min-w-[60px] py-3 px-4 text-[10px] tracking-tighter border transition-all ${
                    selectedSize === size 
                    ? 'border-brand-dark bg-brand-dark text-white' 
                    : 'border-brand-sage-light hover:border-brand-sage-dark'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4 mb-12">
            <button 
              onClick={() => {
                if(!selectedSize) return alert("Please select a size");
                addToBag(product);
                setIsAdded(true);
                setTimeout(() => setIsAdded(false), 2000);
              }}
              className={`w-full flex items-center justify-center gap-3 py-5 tracking-[0.2em] uppercase text-[11px] transition-all duration-500 ${
                isAdded ? 'bg-green-800 text-white' : 'bg-brand-dark text-white hover:bg-black'
              }`}
            >
              {isAdded ? <><Check size={16} /> Added to Bag</> : <><ShoppingBag size={16} /> Add to Bag</>}
            </button>
            <button className="w-full py-5 border border-brand-sage-dark/30 text-[11px] tracking-[0.2em] uppercase hover:bg-brand-cream transition-colors">
              Inquire About Customization
            </button>
          </div>

          {/* Interactive Dropdowns (Accordions) */}
          <div className="border-t border-brand-sage-light/40">
            {/* Section 1: Details */}
            <DropdownSection 
              title="Design & Craftsmanship" 
              isOpen={openSection === 'details'} 
              toggle={() => toggleSection('details')}
            >
              <p className="mb-4 text-sm leading-relaxed text-brand-sage-dark/80">{product.description}</p>
              <ul className="space-y-2">
                {product.details.map((detail, i) => (
                  <li key={i} className="text-sm flex items-start gap-2 text-brand-sage-dark/80">
                    <span className="mt-1.5 w-1 h-1 bg-brand-primary rounded-full shrink-0" />
                    {detail}
                  </li>
                ))}
              </ul>
            </DropdownSection>

            {/* Section 2: Specifications */}
            <DropdownSection 
              title="Specifications" 
              isOpen={openSection === 'specs'} 
              toggle={() => toggleSection('specs')}
            >
              <div className="grid grid-cols-2 gap-y-4 text-sm">
                <div>
                  <p className="text-[9px] uppercase font-bold tracking-widest text-brand-primary mb-1">Silhouette</p>
                  <p>{product.silhouette}</p>
                </div>
                <div>
                  <p className="text-[9px] uppercase font-bold tracking-widest text-brand-primary mb-1">Fabric</p>
                  <p>{product.fabric}</p>
                </div>
                <div>
                  <p className="text-[9px] uppercase font-bold tracking-widest text-brand-primary mb-1">Neckline</p>
                  <p>{product.neckline}</p>
                </div>
                <div>
                  <p className="text-[9px] uppercase font-bold tracking-widest text-brand-primary mb-1">Lead Time</p>
                  <p>{product.availability}</p>
                </div>
              </div>
            </DropdownSection>

            {/* Section 3: Care */}
            <DropdownSection 
              title="Care & Delivery" 
              isOpen={openSection === 'care'} 
              toggle={() => toggleSection('care')}
            >
              <p className="text-sm leading-relaxed text-brand-sage-dark/80 italic">
                {product.careInstructions}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-brand-sage-dark/80">
                {product.designerNotes}
              </p>
            </DropdownSection>
          </div>
        </div>
      </div>
    </div>
  );
};

// Reusable Dropdown Component
const DropdownSection = ({ title, children, isOpen, toggle }) => (
  <div className="border-b border-brand-sage-light/40">
    <button 
      onClick={toggle}
      className="w-full py-6 flex justify-between items-center text-[11px] uppercase tracking-[0.2em] font-bold text-brand-sage-dark"
    >
      {title}
      {isOpen ? <Minus size={14} /> : <Plus size={14} />}
    </button>
    <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-[500px] pb-8' : 'max-h-0'}`}>
      {children}
    </div>
  </div>
);

export default ProductDetail;