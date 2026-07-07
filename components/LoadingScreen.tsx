'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [stage, setStage] = useState<'drawing' | 'logo' | 'opening'>('drawing');
  const containerRef = useRef<HTMLDivElement>(null);
  const leftFabricRef = useRef<HTMLDivElement>(null);
  const rightFabricRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Stage 1: Drawing the thread (0-2s)
    const timer1 = setTimeout(() => {
      setStage('logo');
    }, 2500);

    // Stage 2: Logo Reveal (2.5-4s)
    const timer2 = setTimeout(() => {
      setStage('opening');
    }, 4500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  useEffect(() => {
    if (stage === 'opening') {
      // Stage 3: Fabric Opening with GSAP
      const ctx = gsap.context(() => {
        const tl = gsap.timeline({
          onComplete: onComplete,
        });

        tl.to(leftFabricRef.current, {
          xPercent: -100,
          duration: 1.5,
          ease: 'power4.inOut',
        }, 0)
        .to(rightFabricRef.current, {
          xPercent: 100,
          duration: 1.5,
          ease: 'power4.inOut',
        }, 0)
        .to(containerRef.current, {
          opacity: 0,
          duration: 0.5,
          ease: 'power2.in',
        }, 1.2);
      }, containerRef);

      return () => ctx.revert();
    }
  }, [stage, onComplete]);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-bg-primary"
    >
      {/* Left Fabric Panel */}
      <div 
        ref={leftFabricRef}
        className="absolute left-0 top-0 h-full w-1/2 bg-onyx origin-left shadow-[20px_0_50px_rgba(0,0,0,0.5)] z-10"
      />
      
      {/* Right Fabric Panel */}
      <div 
        ref={rightFabricRef}
        className="absolute right-0 top-0 h-full w-1/2 bg-onyx origin-right shadow-[-20px_0_50px_rgba(0,0,0,0.5)] z-10"
      />

      {/* Content Container (Above Fabric) */}
      <div className="relative z-20 flex flex-col items-center justify-center w-full max-w-lg">
        <AnimatePresence mode="wait">
          {stage === 'drawing' && (
            <motion.div
              key="thread"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
              transition={{ duration: 0.8, ease: 'easeInOut' }}
              className="flex items-center justify-center w-64 h-64 relative"
            >
              {/* Needle and Thread SVG Animation */}
              <svg suppressHydrationWarning viewBox="0 0 200 200" className="w-full h-full absolute inset-0">
                <motion.path
                  suppressHydrationWarning
                  d="M 20 180 C 20 180, 50 120, 100 120 C 150 120, 180 60, 180 20"
                  fill="transparent"
                  strokeWidth="2"
                  stroke="var(--color-champagne)"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1.5, ease: "easeInOut", delay: 0.2 }}
                />
                {/* Subtle needle following path */}
                <motion.g
                  initial={{ x: 20, y: 180, opacity: 0 }}
                  animate={{ 
                    x: [20, 100, 180], 
                    y: [180, 120, 20],
                    rotate: [45, 0, -45],
                    opacity: [0, 1, 0]
                  }}
                  transition={{ duration: 1.5, ease: "easeInOut", delay: 0.2 }}
                >
                  <path suppressHydrationWarning d="M -5 5 L 15 -15 L 20 -20 L 15 -10 Z" fill="var(--color-alabaster)" />
                  <circle suppressHydrationWarning cx="-2" cy="2" r="1.5" fill="var(--color-bg-primary)" />
                </motion.g>
              </svg>
            </motion.div>
          )}

          {stage === 'logo' && (
            <motion.div
              key="logo"
              initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 1.05, filter: 'blur(5px)' }}
              transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1] }} // Luxury easing
              className="flex flex-col items-center justify-center text-center text-alabaster"
            >
              <h1 className="font-playfair text-4xl md:text-6xl tracking-tight mb-2">MS Collection</h1>
              <p className="font-poppins text-xs uppercase tracking-[0.3em] text-champagne">Digital Haute Couture</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Subtle Noise Overlay inside Loading Screen to maintain texture */}
      <div className="absolute inset-0 z-50 pointer-events-none opacity-5 mix-blend-overlay bg-[url('/noise.png')]" />
    </div>
  );
}
