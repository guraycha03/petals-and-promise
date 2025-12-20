// src/pages/About.jsx
import React from 'react';

const About = () => {
  return (
    <section className="pt-20 min-h-screen">
      <div className="grid md:grid-cols-2 min-h-[90vh]">
        {/* Sage Side */}
        <div className="bg-brand-sage-light flex items-center justify-center p-12 md:p-24 order-2 md:order-1">
          <div className="max-w-md space-y-8">
            <span className="text-xs uppercase tracking-[0.4em] text-brand-sage-dark font-bold">Our Philosophy</span>
            <h2 className="text-4xl md:text-6xl font-serif leading-tight">Grown with care, <br/> vowed in <span className="italic text-brand-primary">beauty.</span></h2>
            <p className="text-sm leading-relaxed text-gray-600 font-light">
              At Petals & Promise, we believe every gown should feel like a second skin—as natural and delicate as a petal, yet as enduring as the promise it represents.
            </p>
            <div className="w-12 h-px bg-brand-sage" />
          </div>
        </div>

        {/* Blush Side (Image Placeholder) */}
        <div className="relative bg-brand-blush overflow-hidden order-1 md:order-2">
           <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1000')] bg-cover bg-center mix-blend-multiply opacity-40"></div>
           <div className="h-full w-full flex items-center justify-center relative">
              <div className="p-8 border border-white/40 backdrop-blur-sm text-white text-center">
                 <p className="font-serif italic text-2xl">Est. 2025</p>
              </div>
           </div>
        </div>
      </div>
    </section>
  );
};

export default About;