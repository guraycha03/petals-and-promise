import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const Contact = () => {
  const [formState, setFormState] = useState('idle');

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormState('loading');
    // Simulate a professional API call
    setTimeout(() => setFormState('success'), 1500);
  };

  return (
    <section className="pt-32 pb-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        <div className="text-center mb-20 space-y-4">
          <h2 className="font-serif text-4xl md:text-6xl text-brand-sage-dark">Visit the Atelier</h2>
          <p className="text-[11px] uppercase tracking-[0.4em] text-brand-primary font-bold italic">Bespoke Bridal in the Heart of Bicol</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-20">
          
          {/* LEFT: Appointment Form */}
          <div className="bg-brand-cream/30 p-8 md:p-12 rounded-sm border border-brand-sage-light/20">
            <h3 className="font-serif text-2xl text-brand-sage-dark mb-8">Book a Consultation</h3>
            
            {formState === 'success' ? (
              <div className="h-64 flex flex-col items-center justify-center text-center space-y-4">
                <div className="w-16 h-16 bg-brand-primary/10 rounded-full flex items-center justify-center text-brand-primary animate-pulse">
                  ✓
                </div>
                <p className="font-serif text-2xl text-brand-sage-dark">Mabalos, Darling.</p>
                <p className="text-[10px] uppercase tracking-widest text-brand-sage-dark/60">We will reach out to schedule your visit.</p>
                <button 
                  onClick={() => setFormState('idle')}
                  className="mt-4 text-[10px] uppercase tracking-widest border-b border-brand-sage-dark pb-1"
                >
                  Send another request
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-brand-sage-dark">Full Name</label>
                    <input required type="text" className="w-full bg-white border border-brand-sage-light p-3 text-sm outline-none focus:border-brand-primary transition-colors" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-brand-sage-dark">Email</label>
                    <input required type="email" className="w-full bg-white border border-brand-sage-light p-3 text-sm outline-none focus:border-brand-primary transition-colors" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-brand-sage-dark">Target Wedding Date</label>
                  <input type="date" className="w-full bg-white border border-brand-sage-light p-3 text-sm outline-none focus:border-brand-primary transition-colors" />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-brand-sage-dark">Message</label>
                  <textarea rows="4" className="w-full bg-white border border-brand-sage-light p-3 text-sm outline-none focus:border-brand-primary transition-colors" placeholder="Tell us about your dream gown..."></textarea>
                </div>

                <button 
                  type="submit" 
                  disabled={formState === 'loading'}
                  className="w-full bg-brand-sage-dark text-white text-[11px] uppercase tracking-[0.3em] py-4 hover:bg-brand-primary transition-all disabled:opacity-50"
                >
                  {formState === 'loading' ? 'Processing...' : 'Request Appointment'}
                </button>
              </form>
            )}
          </div>

          {/* RIGHT: Contact Info & Map */}
          <div className="space-y-12">
            <div className="space-y-8">
              <h3 className="font-serif text-2xl text-brand-sage-dark">Atelier Details</h3>
              <div className="space-y-8 text-brand-sage-dark/80">
                <div className="flex gap-5">
                  <MapPin className="text-brand-primary shrink-0" size={22} strokeWidth={1.5} />
                  <div>
                    <p className="text-[11px] uppercase tracking-widest font-bold mb-1">Our Location</p>
                    <p className="text-sm leading-relaxed font-medium">
                      G/F Rompe Building, Magsaysay St.<br/>
                      Sorsogon City, 4700 Sorsogon<br/>
                      Philippines
                    </p>
                  </div>
                </div>
                <div className="flex gap-5">
                  <Clock className="text-brand-primary shrink-0" size={22} strokeWidth={1.5} />
                  <div>
                    <p className="text-[11px] uppercase tracking-widest font-bold mb-1">Business Hours</p>
                    <p className="text-sm leading-relaxed">
                      Tuesday – Saturday: 9:00 AM – 6:00 PM<br/>
                      Closed on Sundays & Holidays
                    </p>
                  </div>
                </div>
                <div className="flex gap-5">
                  <Phone className="text-brand-primary shrink-0" size={22} strokeWidth={1.5} />
                  <div>
                    <p className="text-[11px] uppercase tracking-widest font-bold mb-1">Direct Line</p>
                    <p className="text-sm font-medium">+63 917 123 4567</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sorsogon Inspired Visual */}
            <div className="aspect-[16/9] bg-brand-sage-light/30 rounded-sm relative overflow-hidden group border border-brand-sage-light/20">
               <img 
                 src="/images/hero-bg.png" 
                 alt="Sorsogon Coastal Vibe" 
                 className="w-full h-full object-cover grayscale opacity-40 group-hover:opacity-60 transition-opacity duration-700"
               />
               <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-white/90 backdrop-blur-sm px-6 py-3 shadow-sm border border-brand-sage-light/50 text-[10px] uppercase tracking-[0.3em] font-bold text-brand-sage-dark">
                    Find us near the City Pier
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;