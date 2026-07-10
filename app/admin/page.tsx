'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AdminDashboard() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  
  // Placement State
  const [targetSection, setTargetSection] = useState('portfolio');
  
  // Auth State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'mangal1506'){
      setIsAuthenticated(true);
      setAuthError(false);
    } else {
      setAuthError(true);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-bg-secondary text-text-primary flex items-center justify-center p-6 font-poppins selection:bg-champagne selection:text-onyx">
        <div className="bg-bg-primary p-8 md:p-12 shadow-2xl max-w-md w-full">
          <h2 className="font-playfair text-3xl mb-2 text-center">Admin Access</h2>
          <p className="text-text-secondary text-xs text-center mb-8 uppercase tracking-widest">Authorized Personnel Only</p>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="relative w-full">
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder=" " 
                className="peer w-full bg-transparent border-b border-border-subtle py-3 text-sm focus:outline-none focus:border-onyx transition-colors duration-300" 
              />
              <label className="absolute left-0 top-3 text-text-secondary text-sm transition-all duration-300 peer-focus:-top-4 peer-focus:text-xs peer-focus:text-onyx peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-onyx">
                Master Passcode
              </label>
            </div>
            
            {authError && <p className="text-xs text-red-500">Incorrect passcode. Please try again.</p>}
            
            <button 
              type="submit"
              className="w-full bg-onyx text-alabaster px-8 py-4 text-xs uppercase tracking-widest hover:bg-champagne hover:text-onyx transition-colors duration-500"
            >
              Enter Studio
            </button>
          </form>
        </div>
      </div>
    );
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreview(url);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API upload to CMS / Database
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccess(true);
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setSuccess(false);
        setPreview(null);
        (e.target as HTMLFormElement).reset();
      }, 3000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-bg-secondary text-text-primary p-6 md:p-12 font-poppins selection:bg-champagne selection:text-onyx">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <header className="flex justify-between items-end border-b border-border-subtle pb-6 mb-12">
          <div>
            <h1 className="font-playfair text-4xl md:text-5xl">MS Collection <span className="italic font-light">Admin</span></h1>
            <p className="text-text-secondary text-sm mt-2">Manage your digital haute couture collections.</p>
          </div>
          <button 
            onClick={() => { setIsAuthenticated(false); setPassword(''); }}
            className="text-xs uppercase tracking-widest hover:text-champagne transition-colors"
          >
            Logout
          </button>
        </header>

        {/* Upload Form */}
        <div className="bg-bg-primary p-8 md:p-12 shadow-2xl">
          <h2 className="font-playfair text-2xl mb-8">Add New Collection Piece</h2>
          
          <form onSubmit={handleSubmit} className="space-y-8">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Title */}
              <div className="relative w-full">
                <input 
                  type="text" 
                  id="title" 
                  required
                  placeholder=" " 
                  className="peer w-full bg-transparent border-b border-border-subtle py-3 text-sm focus:outline-none focus:border-onyx transition-colors duration-300" 
                />
                <label htmlFor="title" className="absolute left-0 top-3 text-text-secondary text-sm transition-all duration-300 peer-focus:-top-4 peer-focus:text-xs peer-focus:text-onyx peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-onyx">
                  Garment Name / Title
                </label>
              </div>

              {/* Category */}
              <div className="relative w-full">
                <select 
                  id="category" 
                  required
                  defaultValue=""
                  className="peer w-full bg-transparent border-b border-border-subtle py-3 text-sm focus:outline-none focus:border-onyx transition-colors duration-300 appearance-none rounded-none" 
                >
                  <option value="" disabled>Select Category</option>
                  <option value="Bridal">Bridal</option>
                  <option value="Evening Wear">Evening Wear</option>
                  <option value="Traditional">Traditional Wear</option>
                  <option value="Custom">Custom Suiting</option>
                </select>
                <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg suppressHydrationWarning width="10" height="6" viewBox="0 0 12 8" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path suppressHydrationWarning d="M1 1.5L6 6.5L11 1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Target Section */}
              <div className="relative w-full">
                <select 
                  id="targetSection" 
                  required
                  value={targetSection}
                  onChange={(e) => setTargetSection(e.target.value)}
                  className="peer w-full bg-transparent border-b border-border-subtle py-3 text-sm focus:outline-none focus:border-onyx transition-colors duration-300 appearance-none rounded-none" 
                >
                  <option value="portfolio">Portfolio Gallery</option>
                  <option value="featured">Featured Collections (Home)</option>
                  <option value="shop">Shop - Ready to Wear</option>
                </select>
                <label className="absolute left-0 -top-4 text-xs text-onyx transition-all duration-300">
                  Website Placement
                </label>
                <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg suppressHydrationWarning width="10" height="6" viewBox="0 0 12 8" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path suppressHydrationWarning d="M1 1.5L6 6.5L11 1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>

              {/* Price (Conditional) */}
              <AnimatePresence>
                {targetSection === 'shop' && (
                  <motion.div 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="relative w-full"
                  >
                    <input 
                      type="text" 
                      id="price" 
                      required
                      placeholder=" " 
                      className="peer w-full bg-transparent border-b border-border-subtle py-3 text-sm focus:outline-none focus:border-onyx transition-colors duration-300" 
                    />
                    <label htmlFor="price" className="absolute left-0 top-3 text-text-secondary text-sm transition-all duration-300 peer-focus:-top-4 peer-focus:text-xs peer-focus:text-onyx peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-onyx">
                      Garment Price (e.g., $1,200)
                    </label>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Image Upload Area */}
            <div className="w-full">
              <p className="text-xs uppercase tracking-widest text-text-secondary mb-4">High-Resolution Photography</p>
              
              <div className="relative w-full h-64 border-2 border-dashed border-border-subtle flex flex-col items-center justify-center hover:bg-pearl transition-colors group cursor-pointer overflow-hidden">
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={handleImageChange}
                  required
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                />
                
                {preview ? (
                  <img src={preview} alt="Preview" className="absolute inset-0 w-full h-full object-cover z-10" />
                ) : (
                  <div className="text-center z-10">
                    <div className="w-12 h-12 rounded-full bg-champagne/10 flex items-center justify-center mx-auto mb-4 text-champagne group-hover:scale-110 transition-transform">
                      <svg suppressHydrationWarning width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                        <path suppressHydrationWarning d="M12 4v16m8-8H4" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <p className="text-sm">Click or drag image to upload</p>
                    <p className="text-xs text-text-secondary mt-2">JPEG, PNG, WEBP up to 10MB</p>
                  </div>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="relative w-full">
              <textarea 
                id="description"
                rows={3}
                required
                placeholder=" "
                className="peer w-full bg-transparent border-b border-border-subtle py-3 text-sm focus:outline-none focus:border-onyx transition-colors duration-300 resize-none"
              ></textarea>
              <label htmlFor="description" className="absolute left-0 top-3 text-text-secondary text-sm transition-all duration-300 peer-focus:-top-4 peer-focus:text-xs peer-focus:text-onyx peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-onyx">
                Collection Description
              </label>
            </div>

            {/* Submit Button */}
            <div className="pt-4 flex items-center gap-6">
              <button 
                type="submit"
                disabled={isSubmitting || success}
                className="bg-onyx text-alabaster px-10 py-4 text-xs uppercase tracking-widest hover:bg-champagne hover:text-onyx transition-colors duration-500 disabled:opacity-50 min-w-[200px]"
              >
                {isSubmitting ? 'Uploading...' : success ? 'Published' : 'Publish to Website'}
              </button>
              
              {success && (
                <motion.p 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-sm text-champagne flex items-center gap-2"
                >
                  <svg suppressHydrationWarning width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path suppressHydrationWarning d="M20 6L9 17l-5-5"/></svg>
                  Collection successfully updated!
                </motion.p>
              )}
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}
