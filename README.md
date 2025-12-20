# petals-and-promise
Petals and Promise is a responsive, luxury-themed e-commerce web application designed for a high-end bridal gown and wedding dress boutique.
# Petals & Promise — Luxury Bridal Boutique

Petals & Promise is a high-end, responsive e-commerce web application meticulously crafted for a luxury bridal atelier. The platform offers a seamless, high-fidelity shopping experience for premium bridal gowns, sustainable silks, and artisanal wedding pieces.



## 🕊️ Features

* **Premium Brand Experience**: A minimalist, high-fashion aesthetic using a custom-curated "Sage, Cream, and Charcoal" color palette.
* **Persistent Shopping Bag**: A custom React Context-driven cart system that synchronizes with `localStorage`. Your selections remain saved even after closing the browser.
* **Intelligent Navigation**: 
    * **Dual-Layer Header**: A scroll-reactive navigation bar that hides/shows based on user intent.
    * **Misty Side Menu**: A high-end overlay navigation for an immersive mobile and desktop browsing experience.
* **Responsive Collections**: Optimized for discovery, allowing users to browse curated bridal lines with fluid transitions.
* **Performance First**: Built on Vite for near-instant load times and HMR (Hot Module Replacement) optimized code structure.

## 🛠️ Tech Stack

* **Core**: React 18+
* **State Management**: React Context API (Decoupled Architecture)
* **Routing**: React Router DOM v6
* **Styling**: Tailwind CSS
* **Icons**: Lucide React
* **Build Tool**: Vite

## 📂 Project Architecture

To resolve **React Fast Refresh** constraints and ensure a clean separation of concerns, the project utilizes a decoupled Context/Hook pattern:



```text
src/
├── components/        # UI Shell (Header, Footer, ScrollToTop)
├── context/           
│   ├── CartContext.js # Pure Context object (Data Slot)
│   └── CartProvider.jsx# State Logic & LocalStorage Sync (Provider)
├── hooks/             
│   └── useCart.js     # Unified Custom Hook (The Bridge)
├── pages/             # View Layers (Home, Collections, ProductDetail, Cart)
├── data/              # Centralized Product Database
└── App.jsx            # Application Root & Route Definitions