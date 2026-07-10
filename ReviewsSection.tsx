import React, { useState, useEffect, useRef } from 'react';
import { TESTIMONIALS } from './data';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function ReviewsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const autoSlideTimer = useRef<NodeJS.Timeout | null>(null);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
  };

  // Auto sliding logic
  useEffect(() => {
    const startAutoSlide = () => {
      autoSlideTimer.current = setInterval(() => {
        handleNext();
      }, 5000);
    };

    startAutoSlide();

    return () => {
      if (autoSlideTimer.current) {
        clearInterval(autoSlideTimer.current);
      }
    };
  }, []);

  // Reset timer on manual navigation
  const navigateWithReset = (direction: 'prev' | 'next' | number) => {
    if (autoSlideTimer.current) {
      clearInterval(autoSlideTimer.current);
    }
    
    if (direction === 'prev') {
      handlePrev();
    } else if (direction === 'next') {
      handleNext();
    } else if (typeof direction === 'number') {
      setCurrentIndex(direction);
    }

    // restart timer
    autoSlideTimer.current = setInterval(() => {
      handleNext();
    }, 5000);
  };

  const activeReview = TESTIMONIALS[currentIndex];

  return (
    <section
      id="reviews"
      className="py-16 md:py-24 bg-brand-cream relative border-t border-b border-brand-gold/10 overflow-hidden"
    >
      {/* Decorative luxury vector patterns */}
      <div className="absolute top-0 left-0 w-32 h-32 border-t border-l border-brand-gold/10 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-32 h-32 border-b border-r border-brand-gold/10 pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="font-serif text-brand-maroon text-xs sm:text-sm tracking-[0.25em] uppercase font-bold block mb-2">
            Patron Voices
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-brand-maroon-dark font-black">
            Reviews & Testimonials
          </h2>
          <div className="flex items-center justify-center space-x-2 my-3">
            <span className="h-[1px] w-6 bg-brand-gold" />
            <Star className="w-3.5 h-3.5 text-brand-gold fill-current" />
            <span className="h-[1px] w-6 bg-brand-gold" />
          </div>
        </div>

        {/* Carousel Shell */}
        <div className="relative bg-white rounded-3xl p-8 sm:p-12 shadow-2xl border border-brand-gold/15">
          {/* Giant Quote Icon */}
          <div className="absolute top-6 left-6 text-brand-maroon/5">
            <Quote className="w-24 h-24 rotate-180 transform" />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeReview.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="relative z-10 flex flex-col items-center text-center"
            >
              {/* Star Rating */}
              <div className="flex items-center space-x-1.5 mb-6">
                {Array.from({ length: activeReview.rating }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-brand-gold fill-current" />
                ))}
              </div>

              {/* Review Text */}
              <p className="font-sans text-stone-700 italic text-base sm:text-lg md:text-xl leading-relaxed mb-8 max-w-2xl font-medium">
                "{activeReview.text}"
              </p>

              {/* Author Info */}
              <h4 className="font-serif text-brand-maroon text-lg font-bold">
                {activeReview.name}
              </h4>
              <p className="font-sans text-xs uppercase tracking-wider text-stone-400 mt-1">
                Verified Dining Customer • {activeReview.date}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Carousel Arrows */}
          <div className="flex items-center justify-center space-x-6 mt-10">
            <button
              onClick={() => navigateWithReset('prev')}
              className="p-2.5 rounded-full border border-stone-200 hover:border-brand-maroon text-stone-400 hover:text-brand-maroon transition-all duration-300 cursor-pointer"
              aria-label="Previous review"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="flex space-x-2">
              {TESTIMONIALS.map((review, idx) => (
                <button
                  key={review.id}
                  onClick={() => navigateWithReset(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    idx === currentIndex ? 'w-6 bg-brand-maroon' : 'w-2 bg-stone-200'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={() => navigateWithReset('next')}
              className="p-2.5 rounded-full border border-stone-200 hover:border-brand-maroon text-stone-400 hover:text-brand-maroon transition-all duration-300 cursor-pointer"
              aria-label="Next review"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
