'use client';

import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const collections = [
  { id: 1, title: 'Designer Blouses', img: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', colSpan: 'col-span-12 md:col-span-7', aspect: 'aspect-[4/3]' },
  { id: 2, title: 'Party Wear', img: 'https://images.unsplash.com/photo-1566162200445-312269a0a030?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', colSpan: 'col-span-12 md:col-span-5', aspect: 'aspect-[3/4]' },
  { id: 3, title: 'Wedding Dresses', img: 'https://images.unsplash.com/photo-1596450514735-111a2fe02935?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80', colSpan: 'col-span-12', aspect: 'aspect-[21/9]' },
  { id: 4, title: 'Custom Dresses', img: 'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', colSpan: 'col-span-12 md:col-span-6', aspect: 'aspect-square' },
  { id: 5, title: 'Traditional Wear', img: 'https://images.unsplash.com/photo-1603450917637-257a0753d085?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', colSpan: 'col-span-12 md:col-span-6', aspect: 'aspect-[4/5]' },
];

export default function FeaturedCollections() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    let ctx = gsap.context(() => {
      // Reveal images on scroll using GSAP Clip-Path
      gsap.utils.toArray('.collection-item').forEach((item: any) => {
        const img = item.querySelector('.collection-img-wrap');
        const text = item.querySelector('.collection-text');

        gsap.set(img, { clipPath: 'inset(100% 0 0 0)' });
        gsap.set(text, { y: 20, opacity: 0 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: item,
            start: 'top 85%',
          }
        });

        tl.to(img, {
          clipPath: 'inset(0% 0 0 0)',
          duration: 1.5,
          ease: 'power4.inOut',
        }).to(text, {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power2.out'
        }, "-=1");
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="collections" className="py-32 px-6 md:px-12 bg-bg-secondary text-text-primary">
      <div className="max-w-[1440px] mx-auto">
        <div className="mb-20 flex flex-col md:flex-row justify-between items-end gap-8">
          <div>
            <h2 className="font-playfair text-5xl md:text-7xl mb-4">Featured<br/><span className="italic font-light">Collections</span></h2>
            <p className="font-poppins text-sm uppercase tracking-[0.2em] text-text-secondary">Curated for the Modern Silhouette</p>
          </div>
          <button className="group relative font-poppins text-xs uppercase tracking-[0.2em] text-text-primary pb-1 overflow-hidden shrink-0">
            View All Collections
            <span className="absolute bottom-0 left-0 w-full h-[1px] bg-text-primary origin-left scale-x-100 transition-transform duration-500 ease-out group-hover:scale-x-0"></span>
            <span className="absolute bottom-0 left-0 w-full h-[1px] bg-text-primary origin-right scale-x-0 transition-transform duration-500 ease-out group-hover:scale-x-100 delay-75"></span>
          </button>
        </div>

        <div className="grid grid-cols-12 gap-6 md:gap-12">
          {collections.map((item) => (
            <div key={item.id} className={`collection-item group cursor-pointer ${item.colSpan}`}>
              <div className={`collection-img-wrap overflow-hidden relative w-full ${item.aspect} bg-pearl mb-6`}>
                <div 
                  className="absolute inset-0 bg-cover bg-center transform scale-110 transition-transform duration-[1.5s] ease-[0.25,1,0.5,1] group-hover:scale-100"
                  style={{ backgroundImage: `url(${item.img})` }}
                />
                {/* Subtle dark overlay on hover */}
                <div className="absolute inset-0 bg-onyx/0 group-hover:bg-onyx/10 transition-colors duration-700" />
              </div>
              <div className="collection-text">
                <h3 className="font-playfair text-3xl md:text-4xl mb-2">{item.title}</h3>
                <p className="font-poppins text-xs uppercase tracking-widest text-text-secondary">Explore</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
