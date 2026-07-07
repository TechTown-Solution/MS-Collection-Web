'use client';

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const processSteps = [
  { id: '01', title: 'The Sketch', desc: 'Capturing your vision onto paper.' },
  { id: '02', title: 'Measurement', desc: 'Over 30 unique data points taken.' },
  { id: '03', title: 'Fabric Selection', desc: 'Sourcing the finest global textiles.' },
  { id: '04', title: 'Cutting', desc: 'Precision laser and hand-shear techniques.' },
  { id: '05', title: 'Stitching', desc: 'Masterful construction of the silhouette.' },
  { id: '06', title: 'Embroidery', desc: 'Hand-sewn detailing and beadwork.' },
  { id: '07', title: 'The Trial', desc: 'Perfecting the drape and fit on your body.' },
  { id: '08', title: 'Delivery', desc: 'The final presentation of your bespoke garment.' },
];

export default function TailoringProcess() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const scrollWidth = scrollContainerRef.current?.scrollWidth || 0;
      const windowWidth = window.innerWidth;

      // Pin the section and scroll the content horizontally
      gsap.to(scrollContainerRef.current, {
        x: () => -(scrollWidth - windowWidth + 100), // 100px buffer
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: () => `+=${scrollWidth}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        }
      });

      // Animate the needle/thread line drawing
      gsap.to('.process-line', {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: () => `+=${scrollWidth}`,
          scrub: 1,
        }
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="process" className="h-screen w-full bg-onyx text-alabaster overflow-hidden relative flex flex-col justify-center">
      
      <div className="absolute top-20 left-6 md:left-12">
        <h2 className="font-playfair text-4xl md:text-5xl">The Process</h2>
      </div>

      {/* Horizontal Scroll Container */}
      <div ref={scrollContainerRef} className="flex flex-nowrap items-center h-full pt-32 px-12 gap-32 md:gap-64 w-max relative">
        
        {/* Background Thread Line */}
        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/10 -translate-y-1/2 z-0" />
        
        {/* Animated Thread Line */}
        <div className="process-line absolute top-1/2 left-0 w-full h-[1px] bg-champagne -translate-y-1/2 origin-left scale-x-0 z-10 shadow-[0_0_10px_rgba(212,175,55,0.5)]" />

        {processSteps.map((step, index) => (
          <div key={index} className="process-step relative z-20 flex flex-col items-center text-center w-64">
            
            {/* Step Node */}
            <div className="w-4 h-4 rounded-full bg-onyx border-2 border-champagne mb-8 relative">
              {/* Needle/Dot effect */}
              <div className="absolute inset-0 m-auto w-1 h-1 bg-champagne rounded-full" />
            </div>

            <p className="font-poppins text-xs uppercase tracking-widest text-champagne mb-4">{step.id}</p>
            <h3 className="font-playfair text-3xl mb-4">{step.title}</h3>
            <p className="font-poppins text-sm text-text-secondary leading-relaxed">{step.desc}</p>
          </div>
        ))}
        
        {/* Extra padding at end */}
        <div className="w-32 h-1 shrink-0" />
      </div>

    </section>
  );
}
