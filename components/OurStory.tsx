'use client';

import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function OurStory() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Split text reveal effect for the main paragraph
      const chars = textRef.current?.innerText.split('') || [];
      if (textRef.current) textRef.current.innerHTML = '';
      
      chars.forEach((char) => {
        const span = document.createElement('span');
        span.innerText = char;
        span.style.opacity = '0.2';
        textRef.current?.appendChild(span);
      });

      gsap.to(textRef.current?.children || [], {
        opacity: 1,
        stagger: 0.05,
        ease: 'none',
        scrollTrigger: {
          trigger: textRef.current,
          start: 'top 80%',
          end: 'bottom 40%',
          scrub: true,
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="our-story" className="py-32 px-6 md:px-12 bg-bg-primary text-text-primary overflow-hidden">
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          
          {/* Left: Images with Parallax */}
          <div className="md:col-span-6 relative h-[80vh] w-full flex items-center justify-center">
            <motion.div 
              style={{ y: y1 }}
              className="absolute left-0 top-10 w-2/3 aspect-[3/4] bg-pearl z-10"
            >
              <img 
                src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80" 
                alt="MS Collection Craftsman" 
                className="w-full h-full object-cover"
              />
            </motion.div>
            
            <motion.div 
              style={{ y: y2 }}
              className="absolute right-0 bottom-10 w-1/2 aspect-square bg-pearl z-20 shadow-2xl"
            >
              <img 
                src="https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?auto=format&fit=crop&w=800&q=80" 
                alt="Tailoring details" 
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>

          {/* Right: Typography */}
          <div className="md:col-span-5 md:col-start-8">
            <p className="font-poppins text-xs uppercase tracking-[0.2em] text-text-secondary mb-8">Our Heritage</p>
            
            <h2 className="font-playfair text-4xl md:text-5xl lg:text-6xl mb-12 leading-tight">
              Where <span className="italic font-light">tradition</span> meets modern elegance.
            </h2>
            
            <p 
              ref={textRef} 
              className="font-poppins text-lg md:text-xl leading-relaxed text-text-primary max-w-lg mb-12"
            >
              Every garment we create is a testament to the art of bespoke tailoring. 
              We believe that true luxury lies in the details—the flawless cut, the hand-finished seams, and the intimate relationship between the tailor and the wearer.
            </p>

            <button className="group relative font-poppins text-xs uppercase tracking-[0.2em] text-text-primary pb-1 overflow-hidden">
              Discover Our Story
              <span className="absolute bottom-0 left-0 w-full h-[1px] bg-text-primary origin-left scale-x-100 transition-transform duration-500 ease-out group-hover:scale-x-0"></span>
              <span className="absolute bottom-0 left-0 w-full h-[1px] bg-text-primary origin-right scale-x-0 transition-transform duration-500 ease-out group-hover:scale-x-100 delay-75"></span>
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
