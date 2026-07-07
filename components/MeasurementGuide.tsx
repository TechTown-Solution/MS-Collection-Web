'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const points = [
  { id: 'neck', top: '15%', left: '50%', label: 'Neck Base', desc: 'Circumference at the base of the neck.' },
  { id: 'bust', top: '30%', left: '50%', label: 'Full Bust', desc: 'The fullest part of the bust, keeping tape horizontal.' },
  { id: 'waist', top: '45%', left: '50%', label: 'Natural Waist', desc: 'The narrowest part of the waist.' },
  { id: 'hips', top: '60%', left: '50%', label: 'Hips', desc: 'The fullest part of the hips.' },
  { id: 'shoulder', top: '22%', left: '35%', label: 'Shoulder', desc: 'From the base of the neck to the shoulder bone.' },
  { id: 'length', top: '80%', left: '50%', label: 'Total Length', desc: 'From the base of the neck to the desired hem.' },
];

export default function MeasurementGuide() {
  const [activePoint, setActivePoint] = useState<typeof points[0] | null>(null);

  return (
    <section className="py-32 px-6 md:px-12 bg-onyx text-alabaster min-h-screen flex items-center">
      <div className="max-w-[1440px] mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
        
        {/* Left: Interactive Mannequin */}
        <div className="md:col-span-6 flex justify-center relative">
          <div className="relative w-64 h-[600px] border border-white/10 flex items-center justify-center p-8 bg-gradient-to-b from-white/5 to-transparent">
            {/* Minimal SVG Mannequin Shape */}
            <svg viewBox="0 0 100 300" className="w-full h-full stroke-champagne fill-none stroke-1 opacity-50">
              <path d="M 50 20 C 40 20, 40 40, 50 40 C 60 40, 60 20, 50 20 Z" /> {/* Head */}
              <path d="M 50 40 L 50 50" /> {/* Neck */}
              <path d="M 30 60 C 50 50, 50 50, 70 60 L 65 140 C 60 150, 40 150, 35 140 Z" /> {/* Torso */}
              <path d="M 35 140 L 30 250 M 65 140 L 70 250" /> {/* Legs */}
              <path d="M 30 60 L 20 120 M 70 60 L 80 120" /> {/* Arms */}
            </svg>

            {/* Measurement Points */}
            {points.map((point) => (
              <div
                key={point.id}
                className="absolute w-6 h-6 -ml-3 -mt-3 flex items-center justify-center cursor-crosshair group"
                style={{ top: point.top, left: point.left }}
                onMouseEnter={() => setActivePoint(point)}
                onMouseLeave={() => setActivePoint(null)}
              >
                <div className="w-2 h-2 rounded-full bg-champagne group-hover:scale-150 transition-transform duration-300 relative z-10" />
                <div className="absolute inset-0 bg-champagne/30 rounded-full animate-ping" />
              </div>
            ))}
          </div>
        </div>

        {/* Right: Info Display */}
        <div className="md:col-span-5 md:col-start-8 h-64 flex flex-col justify-center">
          <p className="font-poppins text-xs uppercase tracking-widest text-champagne mb-4">Precision is Everything</p>
          <h2 className="font-playfair text-4xl md:text-5xl mb-8">The Measurement <br/><span className="italic font-light">Guide</span></h2>
          
          <div className="min-h-[120px]">
            <AnimatePresence mode="wait">
              {activePoint ? (
                <motion.div
                  key={activePoint.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="font-playfair text-2xl text-champagne mb-2">{activePoint.label}</h3>
                  <p className="font-poppins text-text-secondary">{activePoint.desc}</p>
                </motion.div>
              ) : (
                <motion.div
                  key="default"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="font-poppins text-text-secondary italic">Hover over the points on the silhouette to view measurement details.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

      </div>
    </section>
  );
}
