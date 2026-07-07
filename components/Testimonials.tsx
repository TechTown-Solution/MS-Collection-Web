'use client';

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  { id: 1, name: 'Eleanor Vance', text: 'The attention to detail is unparalleled. My bespoke evening gown felt less like a piece of clothing and more like a second skin.', location: 'New York' },
  { id: 2, name: 'Sophia Sterling', text: 'From the initial sketch to the final fitting, the process was intimate, professional, and entirely focused on my vision.', location: 'Paris' },
  { id: 3, name: 'Isabella Thorne', text: 'True digital haute couture. The craftsmanship extends beyond the physical garment into the entire experience of the studio.', location: 'London' },
];

export default function Testimonials() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from('.testimonial-card', {
        y: 50,
        opacity: 0,
        stagger: 0.2,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-32 px-6 md:px-12 bg-bg-primary text-text-primary">
      <div className="max-w-[1440px] mx-auto">
        
        <div className="text-center mb-20">
          <p className="font-poppins text-xs uppercase tracking-widest text-text-secondary mb-4">Client Expressions</p>
          <h2 className="font-playfair text-4xl md:text-6xl">Words of <span className="italic font-light">Elegance</span></h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {testimonials.map((t) => (
            <div key={t.id} className="testimonial-card flex flex-col p-8 border border-border-subtle bg-pearl relative group">
              {/* Decorative Quote Mark */}
              <div className="absolute top-4 left-6 text-6xl font-playfair text-text-primary/10 select-none">"</div>
              
              <div className="flex-1 relative z-10 pt-4">
                <p className="font-poppins text-sm leading-loose text-text-primary mb-8 italic">
                  "{t.text}"
                </p>
              </div>
              
              <div className="relative z-10 mt-auto border-t border-border-subtle pt-6">
                <h4 className="font-playfair text-xl mb-1">{t.name}</h4>
                <p className="font-poppins text-xs uppercase tracking-widest text-text-secondary">{t.location}</p>
              </div>

              {/* Hover effect bar */}
              <div className="absolute bottom-0 left-0 w-full h-[2px] bg-champagne transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
