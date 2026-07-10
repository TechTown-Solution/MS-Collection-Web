'use client';

import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function MeetDesigner() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const yPortrait = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from('.designer-text > *', {
        y: 30,
        opacity: 0,
        stagger: 0.2,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.designer-text',
          start: 'top 80%',
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-32 px-6 md:px-12 bg-bg-primary text-text-primary overflow-hidden relative">
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
        
        {/* Right side for desktop (text) */}
        <div className="md:col-span-6 md:col-start-7 designer-text order-2 md:order-1 flex flex-col justify-center h-full z-10 relative">
          <p className="font-poppins text-xs uppercase tracking-widest text-text-secondary mb-6">Meet the Designer</p>
          <h2 className="font-playfair text-5xl md:text-7xl mb-8">Mangal <span className="italic font-light">Shinde</span></h2>
          <p className="font-poppins text-lg leading-relaxed mb-8 max-w-lg">
            "A garment should not simply fit the body; it should elevate the spirit. My approach to tailoring is rooted in classical French techniques, yet entirely devoted to the modern woman's silhouette."
          </p>
        </div>

        {/* Left side for desktop (image) */}
        <div className="md:col-span-5 md:col-start-1 order-1 md:order-2 h-[70vh] md:h-[90vh] relative z-0">
          <motion.div style={{ y: yPortrait }} className="w-full h-full relative">
            <div className="absolute inset-0 bg-pearl z-0 overflow-hidden">
              <img 
                src="/images/designer.png" 
                alt="Designer Portrait" 
                className="w-full h-full object-cover object-top grayscale hover:grayscale-0 transition-all duration-1000 ease-[0.25,1,0.5,1]"
              />
            </div>
            {/* Minimal border offset frame */}
            <div className="absolute -inset-4 border border-text-primary/10 z-10 pointer-events-none" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}