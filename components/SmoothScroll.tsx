'use client';

import React, { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // 1. Initialize Lenis with Awwwards-winning settings
    // We use a lerp (linear interpolation) instead of fixed duration for fluid physics
    const lenis = new Lenis({
      duration: 1.2, // Time to scroll
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential Out
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 2, // Multiply touch sensitivity
      wheelMultiplier: 1, // Multiply mouse wheel sensitivity
      infinite: false,
    });

    // 2. Synchronize Lenis with ScrollTrigger
    // This ensures all GSAP animations trigger at the exact right pixel
    lenis.on('scroll', ScrollTrigger.update);

    // 3. Setup GSAP Ticker to handle the animation frame
    // This replaces the native requestAnimationFrame for perfect synchronization
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    // 4. Disable GSAP lag smoothing to prevent jitter
    // When the browser struggles, lag smoothing attempts to fix the timeline, 
    // but this conflicts with Lenis physics. We turn it off for buttery smooth sync.
    gsap.ticker.lagSmoothing(0);

    // 5. Cleanup memory on unmount
    return () => {
      lenis.destroy();
      gsap.ticker.remove((time) => {
        lenis.raf(time * 1000);
      });
    };
  }, []);

  return <>{children}</>;
}
