'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const portfolioImages = [
  { id: 1, src: 'https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=800&q=80', aspect: 'aspect-[3/4]', title: 'The Silk Silhouette' },
  { id: 2, src: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=800&q=80', aspect: 'aspect-square', title: 'Crimson Velvet' },
  { id: 3, src: 'https://images.unsplash.com/photo-1518887570146-0612132dd618?auto=format&fit=crop&w=800&q=80', aspect: 'aspect-[4/5]', title: 'Modern Couture' },
  { id: 4, src: 'https://images.unsplash.com/photo-1593032465175-481ac7f401a0?auto=format&fit=crop&w=800&q=80', aspect: 'aspect-[3/4]', title: 'Bespoke Jacket' },
  { id: 5, src: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=80', aspect: 'aspect-[4/3]', title: 'Bridal Embroidery' },
  { id: 6, src: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80', aspect: 'aspect-square', title: 'Tailoring Details' },
];

export default function PortfolioGallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedImage, setSelectedImage] = useState<typeof portfolioImages[0] | null>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.utils.toArray('.gallery-item').forEach((item: any, i) => {
        gsap.fromTo(item, 
          { y: 100, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 90%',
            }
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-32 px-6 md:px-12 bg-bg-secondary text-text-primary">
      <div className="max-w-[1440px] mx-auto">
        <h2 className="font-playfair text-5xl md:text-7xl mb-16 text-center">MS Collection <span className="italic font-light">Archive</span></h2>
        
        {/* CSS Columns Masonry */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {portfolioImages.map((item) => (
            <div 
              key={item.id} 
              className={`gallery-item relative overflow-hidden group cursor-none break-inside-avoid ${item.aspect} bg-pearl`}
              onClick={() => setSelectedImage(item)}
            >
              <img 
                src={item.src} 
                alt={item.title} 
                className="w-full h-full object-cover transform scale-110 group-hover:scale-100 transition-transform duration-[1.5s] ease-[0.25,1,0.5,1]"
              />
              <div className="absolute inset-0 bg-onyx/0 group-hover:bg-onyx/20 transition-colors duration-700" />
              
              <div className="absolute bottom-0 left-0 p-8 translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700 ease-[0.25,1,0.5,1]">
                <p className="font-playfair text-2xl text-alabaster">{item.title}</p>
                <p className="font-poppins text-xs uppercase tracking-widest text-champagne">View</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-[100] bg-onyx/95 backdrop-blur-xl flex items-center justify-center p-6 md:p-12"
            onClick={() => setSelectedImage(null)}
          >
            <button 
              className="absolute top-8 right-8 font-poppins text-xs uppercase tracking-widest text-alabaster hover:text-champagne transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              Close
            </button>
            <motion.img 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
              src={selectedImage.src} 
              alt={selectedImage.title}
              className="max-w-full max-h-full object-contain shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="absolute bottom-12 left-1/2 -translate-x-1/2 text-center"
            >
              <h3 className="font-playfair text-3xl text-alabaster">{selectedImage.title}</h3>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
