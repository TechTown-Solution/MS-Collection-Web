'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AppointmentBooking() {
  const [formState, setFormState] = useState({ name: '', email: '', phone: '', date: '', interest: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      
      // WhatsApp integration placeholder
      const message = `Hello MS Collection, I am ${formState.name} interested in a bespoke fitting for ${formState.interest}.`;
      console.log(`WhatsApp Link: https://wa.me/1234567890?text=${encodeURIComponent(message)}`);
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" className="py-32 px-6 md:px-12 bg-pearl text-text-primary">
      <div className="max-w-[1000px] mx-auto bg-bg-primary shadow-2xl p-8 md:p-16 relative overflow-hidden">
        
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-champagne/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        
        <div className="text-center mb-16 relative z-10">
          <p className="font-poppins text-xs uppercase tracking-widest text-text-secondary mb-4">Private Consultation</p>
          <h2 className="font-playfair text-4xl md:text-5xl mb-4">Book a <span className="italic font-light">Fitting</span></h2>
          <p className="font-poppins text-sm text-text-secondary">Step into our studio to begin the journey of your bespoke garment.</p>
        </div>

        <div className="relative z-10">
          <AnimatePresence mode="wait">
            {!isSuccess ? (
              <motion.form 
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, y: -20 }}
                onSubmit={handleSubmit} 
                className="space-y-8"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Name Input */}
                  <div className="relative w-full">
                    <input 
                      type="text" 
                      id="name" 
                      name="name"
                      required
                      placeholder=" " 
                      onChange={handleChange}
                      className="peer w-full bg-transparent border-b border-border-subtle py-3 text-lg font-poppins text-text-primary focus:outline-none focus:border-onyx transition-colors duration-300" 
                    />
                    <label htmlFor="name" className="absolute left-0 top-3 text-text-secondary font-poppins text-sm transition-all duration-300 peer-focus:-top-4 peer-focus:text-xs peer-focus:text-onyx peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-onyx cursor-text">
                      Full Name
                    </label>
                  </div>

                  {/* Phone Input */}
                  <div className="relative w-full">
                    <input 
                      type="tel" 
                      id="phone" 
                      name="phone"
                      required
                      placeholder=" " 
                      onChange={handleChange}
                      className="peer w-full bg-transparent border-b border-border-subtle py-3 text-lg font-poppins text-text-primary focus:outline-none focus:border-onyx transition-colors duration-300" 
                    />
                    <label htmlFor="phone" className="absolute left-0 top-3 text-text-secondary font-poppins text-sm transition-all duration-300 peer-focus:-top-4 peer-focus:text-xs peer-focus:text-onyx peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-onyx cursor-text">
                      Phone Number (WhatsApp)
                    </label>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Date Input */}
                  <div className="relative w-full">
                    <input 
                      type="date" 
                      id="date" 
                      name="date"
                      required
                      placeholder=" " 
                      onChange={handleChange}
                      className="peer w-full bg-transparent border-b border-border-subtle py-3 text-lg font-poppins text-text-primary focus:outline-none focus:border-onyx transition-colors duration-300 min-h-[52px]" 
                    />
                    <label htmlFor="date" className="absolute left-0 -top-4 text-xs font-poppins text-onyx transition-all duration-300">
                      Preferred Date
                    </label>
                  </div>

                  {/* Interest Select */}
                  <div className="relative w-full">
                    <select 
                      id="interest" 
                      name="interest"
                      required
                      defaultValue=""
                      onChange={handleChange}
                      className="peer w-full bg-transparent border-b border-border-subtle py-3 text-lg font-poppins text-text-primary focus:outline-none focus:border-onyx transition-colors duration-300 appearance-none rounded-none" 
                    >
                      <option value="" disabled>Select an Interest</option>
                      <option value="Bridal">Bridal & Wedding</option>
                      <option value="Evening Wear">Evening Wear</option>
                      <option value="Custom Suiting">Custom Suiting</option>
                      <option value="Everyday Elegance">Everyday Elegance</option>
                    </select>
                    <label htmlFor="interest" className="absolute left-0 -top-4 text-xs font-poppins text-onyx transition-all duration-300">
                      Garment Interest
                    </label>
                    {/* Custom Dropdown Arrow */}
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none">
                      <svg suppressHydrationWarning width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path suppressHydrationWarning d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="pt-8 flex justify-center">
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="bg-onyx text-alabaster font-poppins text-xs uppercase tracking-widest px-12 py-5 hover:bg-champagne hover:text-onyx transition-colors duration-500 disabled:opacity-50 min-w-[240px]"
                  >
                    {isSubmitting ? 'Processing...' : 'Request Appointment'}
                  </button>
                </div>
              </motion.form>
            ) : (
              <motion.div 
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-16"
              >
                <div className="w-16 h-16 rounded-full bg-champagne/20 flex items-center justify-center mx-auto mb-6 text-champagne">
                  <svg suppressHydrationWarning width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path suppressHydrationWarning d="M20 6L9 17l-5-5"/>
                  </svg>
                </div>
                <h3 className="font-playfair text-3xl mb-4">Request Received</h3>
                <p className="font-poppins text-text-secondary max-w-md mx-auto mb-8">
                  Thank you, {formState.name}. We will contact you shortly via WhatsApp to confirm your bespoke fitting appointment.
                </p>
                <button 
                  onClick={() => setIsSuccess(false)}
                  className="font-poppins text-xs uppercase tracking-widest text-text-primary border-b border-text-primary pb-1"
                >
                  Book Another
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
