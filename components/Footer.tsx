import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-onyx text-alabaster pt-32 pb-12 px-6 md:px-12">
      <div className="max-w-[1440px] mx-auto">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-24 mb-24">
          
          {/* Brand Manifesto */}
          <div className="md:col-span-6">
            <h2 className="font-playfair text-5xl md:text-8xl tracking-tight mb-8">MS Collection</h2>
            <p className="font-poppins text-sm leading-relaxed text-text-secondary max-w-sm">
              Digital Haute Couture. Elevating the art of fit through uncompromising craftsmanship, bespoke experiences, and timeless design.
            </p>
          </div>

          {/* Links & Newsletter */}
          <div className="md:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-12">
            
            <div className="flex flex-col space-y-4">
              <h4 className="font-poppins text-xs uppercase tracking-widest text-champagne mb-4">Studio</h4>
              <a href="#" className="font-poppins text-sm hover:text-champagne transition-colors">Collections</a>
              <a href="#" className="font-poppins text-sm hover:text-champagne transition-colors">Our Story</a>
              <a href="#" className="font-poppins text-sm hover:text-champagne transition-colors">The Process</a>
              <a href="#" className="font-poppins text-sm hover:text-champagne transition-colors">Journal</a>
            </div>

            <div className="flex flex-col space-y-4">
              <h4 className="font-poppins text-xs uppercase tracking-widest text-champagne mb-4">Visit Us</h4>
              <p className="font-poppins text-sm text-text-secondary leading-relaxed">
                124 Rue du Faubourg<br />
                Saint-Honoré, 75008<br />
                Paris, France
              </p>
              <a href="mailto:appointments@mscollection.com" className="font-poppins text-sm mt-4 hover:text-champagne transition-colors">
                appointments@mscollection.com
              </a>
            </div>
            
            {/* Newsletter */}
            <div className="sm:col-span-2 mt-8">
              <h4 className="font-poppins text-xs uppercase tracking-widest text-champagne mb-6">The Invite</h4>
              <form className="relative w-full max-w-sm flex items-end">
                <div className="relative w-full">
                  <input 
                    type="email" 
                    id="newsletter" 
                    placeholder=" " 
                    className="peer w-full bg-transparent border-b border-white/20 py-2 text-sm font-poppins text-alabaster focus:outline-none focus:border-champagne transition-colors duration-300" 
                  />
                  <label htmlFor="newsletter" className="absolute left-0 top-2 text-white/50 font-poppins text-sm transition-all duration-300 peer-focus:-top-4 peer-focus:text-xs peer-focus:text-champagne peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-champagne">
                    Email Address
                  </label>
                </div>
                <button type="submit" className="ml-4 font-poppins text-xs uppercase tracking-widest text-alabaster hover:text-champagne transition-colors pb-2">
                  Subscribe
                </button>
              </form>
            </div>

          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="font-poppins text-xs text-white/50">
            &copy; {new Date().getFullYear()} MS Collection Tailoring. All rights reserved.
          </p>
          <div className="flex items-center space-x-8">
            <a href="#" className="font-poppins text-xs text-white/50 hover:text-champagne transition-colors">Instagram</a>
            <a href="#" className="font-poppins text-xs text-white/50 hover:text-champagne transition-colors">Pinterest</a>
            <a href="#" className="font-poppins text-xs text-white/50 hover:text-champagne transition-colors">Privacy Policy</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
