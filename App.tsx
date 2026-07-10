import React from 'react';
import Header from './Header';
import Hero from './Hero';
import QuickInfo from './QuickInfo';
import SpecialOffers from './SpecialOffers';
import MenuSection from './MenuSection';
import GallerySection from './GallerySection';
import ReviewsSection from './ReviewsSection';
import ContactSection from './ContactSection';
import FloatingButtons from './FloatingButtons';
import AIChatAssistant from './AIChatAssistant';
import Footer from './Footer';

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
