'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Parallax effects
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacityText = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section 
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden bg-onyx flex items-center justify-center pt-20"
    >
      {/* Background Image with Parallax */}
      <motion.div 
        style={{ y: yBg }}
        className="absolute inset-0 w-full h-[120%] -top-[10%] z-0"
      >
        <div className="absolute inset-0 bg-onyx/40 z-10" /> {/* Dark overlay */}
        {/* We use a placeholder div that feels like an image for now, ideally an actual image */}
        <div className="w-full h-full bg-[linear-gradient(to_bottom,rgba(18,18,18,0.2),rgba(18,18,18,0.8)),url('https://images.unsplash.com/photo-1584286595398-a59f21d313f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center" />
      </motion.div>

      {/* Content Container */}
      <motion.div 
        style={{ y: yText, opacity: opacityText }}
        className="relative z-10 text-center px-6 max-w-4xl mx-auto flex flex-col items-center"
      >
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          className="font-poppins text-xs md:text-sm uppercase tracking-[0.3em] text-champagne mb-6"
        >
          Bespoke Tailoring Studio
        </motion.p>
        
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.25, 1, 0.5, 1] }}
          className="font-playfair text-5xl md:text-7xl lg:text-[7rem] leading-[1.1] text-alabaster tracking-tight mb-8"
        >
          Elevating the <br className="hidden md:block"/> 
          <span className="italic font-light">Art of Fit</span>
        </motion.h1>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center gap-6 mt-4"
        >
          {/* Shop CTA */}
          <Link 
            href="/shop"
            className="bg-alabaster text-onyx font-poppins text-xs uppercase tracking-[0.15em] px-10 py-5 hover:bg-champagne hover:text-alabaster transition-colors duration-500 w-full sm:w-auto text-center inline-block"
          >
            Shop Boutique
          </Link>

          {/* Primary CTA */}
          <Link 
            href="/#contact" 
            className="border border-alabaster text-alabaster font-poppins text-xs uppercase tracking-[0.15em] px-10 py-5 hover:bg-alabaster hover:text-onyx transition-colors duration-500 w-full sm:w-auto text-center inline-block"
          >
            Book a Fitting
          </Link>
          
          {/* Secondary CTA */}
          <button className="group relative font-poppins text-xs uppercase tracking-[0.15em] text-alabaster py-2 overflow-hidden w-full sm:w-auto hidden md:block">
            View Collections
            <span className="absolute bottom-0 left-0 w-full h-[1px] bg-alabaster origin-left scale-x-100 transition-transform duration-500 ease-out group-hover:scale-x-0"></span>
            <span className="absolute bottom-0 left-0 w-full h-[1px] bg-alabaster origin-right scale-x-0 transition-transform duration-500 ease-out group-hover:scale-x-100 delay-75"></span>
          </button>
        </motion.div>
      </motion.div>

      {/* Floating Fabric Element Simulation */}
      <motion.div
        animate={{ 
          y: [0, -20, 0],
          rotate: [0, 5, 0]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -right-20 top-1/4 w-64 h-96 border border-white/5 bg-gradient-to-tr from-transparent to-white/5 backdrop-blur-[2px] rounded-full blur-2xl z-0"
      />
      
      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
      >
        <div className="w-[1px] h-16 bg-white/20 overflow-hidden relative">
          <motion.div 
            animate={{ y: ['-100%', '100%'] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-full h-1/2 bg-champagne absolute top-0 left-0"
          />
        </div>
      </motion.div>
    </section>
  );
}
