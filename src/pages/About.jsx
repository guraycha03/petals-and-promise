import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <section className="pt-20 bg-white">
      {/* --- HERO: STORY TELLING --- */}
      <div className="px-6 md:px-12 py-20 md:py-32 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <span className="text-[11px] uppercase tracking-[0.5em] text-brand-primary font-bold block">Our Story</span>
            <h2 className="text-4xl md:text-7xl font-serif text-brand-sage-dark leading-[1.1]">
              Crafted in Manila, <br/> Vowed in <span className="italic">Beauty.</span>
            </h2>
            <div className="w-16 h-[1px] bg-brand-primary"></div>
            <p className="text-brand-sage-dark/90 leading-relaxed max-w-md font-sans text-sm md:text-base">
              Founded in 2025, Petals & Promise began as a small atelier in the heart of Makati. 
              Our mission has always been simple: to create gowns that feel as natural and 
              delicate as a petal, yet as enduring as the promise they represent.
            </p>
          </div>
          <div className="relative group">
            <div className="aspect-[4/5] bg-brand-cream rounded-sm overflow-hidden">
               <img 
                 src="https://images.unsplash.com/photo-1594462250122-b1322b3f278b?auto=format&fit=crop&q=80&w=1000" 
                 alt="The Atelier" 
                 className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
               />
            </div>
            {/* Floating Badge */}
            <div className="absolute -bottom-6 -left-6 bg-white p-8 shadow-xl hidden md:block border border-brand-sage-light/30">
               <p className="font-serif italic text-2xl text-brand-sage-dark">Est. 2025</p>
               <p className="text-[9px] uppercase tracking-widest text-brand-primary font-bold">The Manila House</p>
            </div>
          </div>
        </div>
      </div>

      {/* --- VALUES SECTION --- */}
      <div className="bg-brand-sage-light/20 py-24 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12 text-center">
          <div className="space-y-4">
             <h4 className="font-serif text-xl text-brand-sage-dark">Mindful Design</h4>
             <p className="text-xs text-brand-sage-dark/70 leading-loose uppercase tracking-widest">Slow fashion practices that prioritize the planet.</p>
          </div>
          <div className="space-y-4">
             <h4 className="font-serif text-xl text-brand-sage-dark">Filipino Artistry</h4>
             <p className="text-xs text-brand-sage-dark/70 leading-loose uppercase tracking-widest">Empowering local seamstresses and textile artisans.</p>
          </div>
          <div className="space-y-4">
             <h4 className="font-serif text-xl text-brand-sage-dark">Modern Romantic</h4>
             <p className="text-xs text-brand-sage-dark/70 leading-loose uppercase tracking-widest">Silhouettes designed for the contemporary woman.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;