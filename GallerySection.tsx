import React, { useState } from 'react';
import { GALLERY_ITEMS } from '../data';
import { Maximize2, X, ChevronLeft, ChevronRight, Image } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function GallerySection() {
  const [filter, setFilter] = useState<'all' | 'dishes' | 'ambience'>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Filter items
  const filteredGallery = GALLERY_ITEMS.filter(
    (item) => filter === 'all' || item.category === filter
  );

  const handlePrev = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) => (prev === 0 ? filteredGallery.length - 1 : (prev ?? 0) - 1));
    }
  };

  const handleNext = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) => (prev === filteredGallery.length - 1 ? 0 : (prev ?? 0) + 1));
    }
  };

  return (
    <section
      id="gallery"
      className="py-16 md:py-24 bg-brand-maroon-dark text-white relative overflow-hidden"
    >
      {/* Decorative Golden Corner Accents */}
      <div className="absolute top-0 left-0 w-32 h-32 border-t border-l border-brand-gold/15 pointer-events-none z-10" />
      <div className="absolute bottom-0 right-0 w-32 h-32 border-b border-r border-brand-gold/15 pointer-events-none z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <span className="font-serif text-brand-gold text-xs sm:text-sm tracking-[0.25em] uppercase font-bold block mb-3">
            Visual Feast
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-white font-black mb-4">
            Our Gallery
          </h2>
          <div className="flex items-center justify-center space-x-2 my-4">
            <span className="h-[1px] w-8 bg-brand-gold" />
            <span className="text-xs text-brand-gold-light font-serif uppercase tracking-widest">
              Al Alif Ambience
            </span>
            <span className="h-[1px] w-8 bg-brand-gold" />
          </div>
          <p className="font-sans text-brand-gold-light/70 text-sm sm:text-base">
            Take a visual tour of our culinary creations, elegant dining environment, and traditional clay-pot biriyani preparation methods.
          </p>
        </div>

        {/* Filters */}
        <div className="flex justify-center space-x-3 mb-10">
          {(['all', 'dishes', 'ambience'] as const).map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-5 py-2.5 rounded-full font-sans text-xs uppercase tracking-widest font-semibold transition-all duration-300 border cursor-pointer ${
                filter === category
                  ? 'bg-brand-gold text-brand-maroon-dark border-brand-gold shadow-lg'
                  : 'bg-transparent text-white/80 border-white/20 hover:border-brand-gold hover:text-brand-gold'
              }`}
            >
              {category === 'all' ? 'Show All' : category}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filteredGallery.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="relative rounded-2xl overflow-hidden shadow-2xl border border-brand-gold/10 group cursor-pointer aspect-4/3"
              onClick={() => setLightboxIndex(index)}
            >
              {/* Image */}
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-brand-maroon-deep/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-6 text-center">
                <div className="p-3 bg-brand-gold/20 rounded-full border border-brand-gold/40 text-brand-gold mb-3 scale-75 group-hover:scale-100 transition-transform duration-500">
                  <Maximize2 className="w-5 h-5" />
                </div>
                <h4 className="font-serif text-lg text-brand-gold font-bold tracking-wide">
                  {item.title}
                </h4>
                <p className="font-sans text-xs uppercase tracking-widest text-brand-gold-light/70 mt-1">
                  {item.category === 'dishes' ? 'Signature Dish' : 'Dining Ambience'}
                </p>
              </div>

              {/* Classic Gold Frame Accents on Cards */}
              <div className="absolute inset-3 border border-brand-gold/0 group-hover:border-brand-gold/30 pointer-events-none transition-all duration-300 rounded-lg" />
            </motion.div>
          ))}
        </div>

        {/* Lightbox / Modal */}
        <AnimatePresence>
          {lightboxIndex !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/95 flex flex-col items-center justify-center px-4"
              onKeyDown={(e) => {
                if (e.key === 'ArrowLeft') handlePrev();
                if (e.key === 'ArrowRight') handleNext();
                if (e.key === 'Escape') setLightboxIndex(null);
              }}
              tabIndex={0}
            >
              {/* Close Button */}
              <button
                onClick={() => setLightboxIndex(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-white/10 text-white hover:bg-brand-maroon hover:text-brand-gold transition-colors duration-300"
                aria-label="Close Lightbox"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Navigation Controls */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrev();
                }}
                className="absolute left-4 md:left-8 p-3 rounded-full bg-white/10 text-white hover:bg-brand-maroon hover:text-brand-gold transition-colors duration-300"
                aria-label="Previous Image"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
                className="absolute right-4 md:right-8 p-3 rounded-full bg-white/10 text-white hover:bg-brand-maroon hover:text-brand-gold transition-colors duration-300"
                aria-label="Next Image"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Image Frame */}
              <div className="max-w-4xl max-h-[75vh] relative flex flex-col items-center">
                <motion.img
                  key={lightboxIndex}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  src={filteredGallery[lightboxIndex].image}
                  alt={filteredGallery[lightboxIndex].title}
                  className="max-w-full max-h-[70vh] object-contain rounded-lg border border-brand-gold/30 shadow-2xl"
                  referrerPolicy="no-referrer"
                />

                {/* Subtitle / Caption */}
                <div className="text-center mt-6">
                  <h3 className="font-serif text-xl text-brand-gold font-bold tracking-wide">
                    {filteredGallery[lightboxIndex].title}
                  </h3>
                  <p className="font-sans text-xs uppercase tracking-widest text-white/60 mt-1">
                    {filteredGallery[lightboxIndex].category === 'dishes' ? 'Our Cuisine' : 'Dining Room'}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
