'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const DUMMY_PRODUCTS = [
  {
    id: 1,
    name: 'Silk Crepe Evening Gown',
    price: '$1,200',
    category: 'Dresses',
    image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 2,
    name: 'Tailored Wool Blazer',
    price: '$850',
    category: 'Outerwear',
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 3,
    name: 'Pleated Chiffon Midi',
    price: '$950',
    category: 'Dresses',
    image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 4,
    name: 'Satin Slip Skirt',
    price: '$450',
    category: 'Bottoms',
    image: 'https://images.unsplash.com/photo-1582142306909-195724d33ffc?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 5,
    name: 'Cashmere Trench Coat',
    price: '$2,100',
    category: 'Outerwear',
    image: 'https://images.unsplash.com/photo-1591369822096-ffd140ec948f?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 6,
    name: 'Structured Organza Blouse',
    price: '$550',
    category: 'Tops',
    image: 'https://images.unsplash.com/photo-1605763240000-7e93b172d754?auto=format&fit=crop&w=800&q=80',
  }
];

const CATEGORIES = ['All', 'Dresses', 'Outerwear', 'Tops', 'Bottoms'];

export default function ShopPage() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredProducts = activeCategory === 'All' 
    ? DUMMY_PRODUCTS 
    : DUMMY_PRODUCTS.filter(p => p.category === activeCategory);

  return (
    <main className="min-h-screen bg-bg-secondary text-text-primary selection:bg-champagne selection:text-onyx">
      <Navigation />
      
      {/* Spacer for fixed nav */}
      <div className="pt-40 pb-16 px-6 md:px-12 max-w-[1440px] mx-auto text-center">
        <h1 className="font-playfair text-5xl md:text-7xl mb-6">Ready to <span className="italic font-light">Wear</span></h1>
        <p className="font-poppins text-sm text-text-secondary max-w-lg mx-auto leading-relaxed">
          Explore our exclusive online boutique featuring handcrafted pieces available for immediate purchase.
        </p>
      </div>

      <div className="max-w-[1440px] mx-auto px-6 md:px-12 pb-32">
        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-8 mb-16 border-b border-border-subtle pb-8">
          {CATEGORIES.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`font-poppins text-xs uppercase tracking-widest transition-colors duration-300 ${
                activeCategory === category ? 'text-onyx border-b-2 border-onyx pb-2' : 'text-text-secondary hover:text-onyx pb-2'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          <AnimatePresence>
            {filteredProducts.map((product) => (
              <motion.div 
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
                key={product.id} 
                className="group cursor-pointer"
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-pearl mb-6">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-onyx/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                    <button className="bg-alabaster text-onyx font-poppins text-xs uppercase tracking-widest px-8 py-4 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 hover:bg-champagne hover:text-onyx">
                      Quick Add
                    </button>
                  </div>
                </div>
                <div className="text-center">
                  <h3 className="font-playfair text-xl mb-2 group-hover:text-champagne transition-colors duration-300">{product.name}</h3>
                  <p className="font-poppins text-sm text-text-secondary">{product.price}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <Footer />
    </main>
  );
}
