'use client';

import React, { useState } from 'react';
import LoadingScreen from '@/components/LoadingScreen';
import SmoothScroll from '@/components/SmoothScroll';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import FeaturedCollections from '@/components/FeaturedCollections';
import OurStory from '@/components/OurStory';
import TailoringProcess from '@/components/TailoringProcess';
import PortfolioGallery from '@/components/PortfolioGallery';
import MeetDesigner from '@/components/MeetDesigner';
import MeasurementGuide from '@/components/MeasurementGuide';
import Testimonials from '@/components/Testimonials';
import AppointmentBooking from '@/components/AppointmentBooking';
import Footer from '@/components/Footer';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <SmoothScroll>
      <main className="min-h-screen bg-bg-primary text-text-primary selection:bg-champagne selection:text-onyx">
        {isLoading && (
          <LoadingScreen onComplete={() => setIsLoading(false)} />
        )}
        
        <div className={`transition-opacity duration-1000 ${isLoading ? 'opacity-0 h-screen overflow-hidden' : 'opacity-100'}`}>
          <Navigation />
          
          <Hero />
          
          <FeaturedCollections />
          
          <OurStory />
          
          <TailoringProcess />
          
          <PortfolioGallery />
          
          <MeetDesigner />
          
          <MeasurementGuide />
          
          <Testimonials />
          
          <AppointmentBooking />
          
          <Footer />
        </div>
      </main>
    </SmoothScroll>
  );
}
