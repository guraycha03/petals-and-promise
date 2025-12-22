import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


import { CartProvider } from './context/CartProvider'; // Note the 'Provider' suffix
import { WishlistProvider } from './context/WishlistProvider';

import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import Collections from './pages/Collections';
import ProductDetail from './pages/ProductDetail';
import About from './pages/About';
import Contact from './pages/Contact';
import Cart from './pages/Cart'; 
import Wishlist from './pages/Wishlist'; // <--- Add this line
import Profile from './pages/Profile'; // <--- Create this file in your pages folder


function App() {
  return (
    <CartProvider>
      <WishlistProvider>
      <Router>
        <ScrollToTop />
        <div className="min-h-screen flex flex-col bg-white selection:bg-brand-primary/20">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/profile" element={<Profile />} /> 
              <Route path="/collections" element={<Collections />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
      </WishlistProvider>
    </CartProvider>
  );
}

export default App;