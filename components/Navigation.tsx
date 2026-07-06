'use client';

import React, { useState, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';

export default function Navigation() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() || 0;
    
    // Set scrolled state for glassmorphism
    if (latest > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }

    // Hide on scroll down, show on scroll up
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  return (
    <>
      <motion.nav
        variants={{
          visible: { y: 0, opacity: 1 },
          hidden: { y: "-100%", opacity: 0 },
        }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }} // Luxury easing
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 ease-in-out px-6 md:px-12 py-6 flex items-center justify-between
          ${isScrolled 
            ? 'bg-bg-primary/70 backdrop-blur-md border-b border-white/10 shadow-[0_20px_60px_-15px_rgba(18,18,18,0.12)]' 
            : 'bg-transparent'
          }
        `}
      >
        {/* Left CTA */}
        <div className="flex-1 hidden md:flex">
          <button className="group relative font-poppins text-xs uppercase tracking-[0.2em] text-text-primary pb-1 overflow-hidden">
            Book Appointment
            <span className="absolute bottom-0 left-0 w-full h-[1px] bg-text-primary origin-left scale-x-100 transition-transform duration-500 ease-out group-hover:scale-x-0"></span>
            <span className="absolute bottom-0 left-0 w-full h-[1px] bg-text-primary origin-right scale-x-0 transition-transform duration-500 ease-out group-hover:scale-x-100 delay-75"></span>
          </button>
        </div>

        {/* Center Logo */}
        <div className="flex-1 flex justify-center">
          <a href="#" className="font-playfair text-2xl md:text-3xl tracking-tight text-text-primary">
            Atelier
          </a>
        </div>

        {/* Right Menu Toggle */}
        <div className="flex-1 flex justify-end">
          <button 
            onClick={() => setIsMenuOpen(true)}
            className="font-poppins text-xs uppercase tracking-[0.2em] text-text-primary hover:text-accent transition-colors duration-300"
          >
            Menu
          </button>
        </div>
      </motion.nav>

      {/* Full Screen Menu Overlay */}
      <motion.div 
        className="fixed inset-0 z-50 bg-onyx flex flex-col justify-center items-center px-6"
        initial={{ y: "-100%" }}
        animate={{ y: isMenuOpen ? "0%" : "-100%" }}
        transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
      >
        {/* Close Button */}
        <button 
          onClick={() => setIsMenuOpen(false)}
          className="absolute top-8 right-6 md:right-12 font-poppins text-xs uppercase tracking-[0.2em] text-alabaster hover:text-accent transition-colors duration-300"
        >
          Close
        </button>

        <nav className="flex flex-col space-y-8 text-center">
          {['Collections', 'Our Story', 'The Process', 'Journal', 'Contact'].map((item, idx) => (
            <a 
              key={idx}
              href={`#${item.toLowerCase().replace(' ', '-')}`}
              onClick={() => setIsMenuOpen(false)}
              className="font-playfair text-4xl md:text-6xl text-alabaster hover:text-champagne transition-colors duration-500 italic font-light"
            >
              {item}
            </a>
          ))}
        </nav>
      </motion.div>
    </>
  );
}
