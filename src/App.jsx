import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// We will create these components next
import Header from './components/Header';
import Footer from './components/Footer';

import ScrollToTop from './components/ScrollToTop'; // Import here


// We will create these pages next
import Home from './pages/Home';
import Collections from './pages/Collections';
import ProductDetail from './pages/ProductDetail';
import About from './pages/About';
import Contact from './pages/Contact';

function App() {
  return (
    <Router>

      <ScrollToTop />
      
      {/* The Layout Wrapper starts here */}
      <div className="min-h-screen flex flex-col bg-white selection:bg-brand-primary/20">
        
        {/* Consistent Header - Stays at the top left of every page */}
        <Header />

        {/* Main Content Area - Responsive and Dynamic */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/collections" element={<Collections />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>

        {/* Consistent Footer - Matches every page */}
        <Footer />
        
      </div>
    </Router>
  );
}

export default App;