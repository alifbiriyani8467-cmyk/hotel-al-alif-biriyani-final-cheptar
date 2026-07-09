import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import QuickInfo from './components/QuickInfo';
import SpecialOffers from './components/SpecialOffers';
import MenuSection from './components/MenuSection';
import GallerySection from './components/GallerySection';
import ReviewsSection from './components/ReviewsSection';
import ContactSection from './components/ContactSection';
import FloatingButtons from './components/FloatingButtons';
import AIChatAssistant from './components/AIChatAssistant';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="relative min-h-screen bg-brand-cream dark:bg-stone-900 text-stone-800 dark:text-stone-100 antialiased selection:bg-brand-maroon selection:text-brand-gold-light transition-colors duration-500">
      {/* Premium Header */}
      <Header />

      {/* Hero Showcase with responsive banners */}
      <Hero />

      {/* Quick Details Section */}
      <QuickInfo />

      {/* Special Luxury Offers Section */}
      <SpecialOffers />

      {/* Interactive Digital Menu Section with WhatsApp Order Builder */}
      <MenuSection />

      {/* Lightboxed Photo Gallery */}
      <GallerySection />

      {/* Customer Reviews Section */}
      <ReviewsSection />

      {/* Location Details & Reservation Form Section */}
      <ContactSection />

      {/* Floating Action buttons for instant Call, WhatsApp or Maps directions */}
      <FloatingButtons />

      {/* Floating AI Chat Concierge Assistant */}
      <AIChatAssistant />

      {/* Elegant Golden Footer */}
      <Footer />
    </div>
  );
}
