import React from 'react';
import { Utensils, Phone, Clock, MapPin, ArrowUp, Facebook, Instagram, Map, Youtube } from 'lucide-react';

export default function Footer() {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <footer className="bg-brand-maroon-deep text-white border-t border-brand-gold/15 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 md:gap-12">
          
          {/* Column 1: Brand Info */}
          <div className="lg:col-span-4 space-y-5">
            <div className="flex items-center space-x-2">
              <div className="relative flex items-center justify-center w-8 h-8 rounded-full border border-brand-gold bg-brand-maroon-light/20">
                <Utensils className="w-4 h-4 text-brand-gold" />
              </div>
              <span className="font-serif text-base tracking-[0.2em] text-brand-gold font-bold">
                AL ALIF BIRIYANI
              </span>
            </div>
            <p className="font-sans text-stone-400 text-xs sm:text-sm leading-relaxed max-w-sm">
              Authentic Indian multi-cuisine restaurant serving traditional wood-fired biriyani, juicy starters, fresh tandoor breads, and refreshing drinks. Experience the taste of royalty.
            </p>
            {/* Social Media Icons */}
            <div className="flex items-center space-x-4 pt-2">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full border border-stone-800 hover:border-brand-gold text-stone-400 hover:text-brand-gold transition-all duration-300" aria-label="Facebook">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full border border-stone-800 hover:border-brand-gold text-stone-400 hover:text-brand-gold transition-all duration-300" aria-label="Instagram">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="https://maps.app.goo.gl/kfsG9AJSzPgbN84E9" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full border border-stone-800 hover:border-brand-gold text-stone-400 hover:text-brand-gold transition-all duration-300" aria-label="Google Business">
                <Map className="w-4 h-4" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full border border-stone-800 hover:border-brand-gold text-stone-400 hover:text-brand-gold transition-all duration-300" aria-label="Youtube">
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-serif text-brand-gold text-xs tracking-[0.2em] uppercase font-bold">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm font-sans text-stone-300">
              <li>
                <button
                  onClick={() => scrollToSection('home')}
                  className="hover:text-brand-gold transition-colors duration-300 cursor-pointer"
                >
                  Home Main
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('menu')}
                  className="hover:text-brand-gold transition-colors duration-300 cursor-pointer"
                >
                  Our Menu Selection
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('gallery')}
                  className="hover:text-brand-gold transition-colors duration-300 cursor-pointer"
                >
                  Photo Gallery
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('reviews')}
                  className="hover:text-brand-gold transition-colors duration-300 cursor-pointer"
                >
                  Customer Reviews
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('contact')}
                  className="hover:text-brand-gold transition-colors duration-300 cursor-pointer"
                >
                  Location & Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Specs */}
          <div className="lg:col-span-5 space-y-4">
            <h4 className="font-serif text-brand-gold text-xs tracking-[0.2em] uppercase font-bold">
              Contact Details
            </h4>
            
            <div className="space-y-3 text-xs sm:text-sm font-sans text-stone-300">
              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
                <span className="leading-relaxed font-mono">
                  Q242+GWF, NH Service Road, Singaperumal Koil, Vinjiambakkam, Tamil Nadu 603204
                </span>
              </div>

              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-brand-gold shrink-0" />
                <span className="font-mono">+91 7395964901, +91 7904918467</span>
              </div>

              <div className="flex items-center space-x-3">
                <Clock className="w-4 h-4 text-brand-gold shrink-0" />
                <span>12:00 PM – 11:00 PM</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-brand-gold/10 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center">
          <p className="font-sans text-[10px] sm:text-xs text-stone-500 uppercase tracking-widest">
            © {new Date().getFullYear()} Hotel Al Alif Biriyani. All Rights Reserved.
          </p>

          <button
            onClick={handleScrollToTop}
            className="p-3 rounded-full bg-brand-maroon border border-brand-gold/20 hover:border-brand-gold text-brand-gold hover:text-white transition-all duration-300 cursor-pointer"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}
