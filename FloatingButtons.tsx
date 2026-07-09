import React, { useState, useEffect } from 'react';
import { Phone, MessageSquare, MapPin, ArrowUp, ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function FloatingButtons() {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const actions = [
    {
      id: 'call',
      icon: <Phone className="w-5 h-5" />,
      label: 'Call Us (+91 7395964901)',
      color: 'bg-brand-maroon border border-brand-gold/30 hover:bg-brand-maroon-light text-white',
      url: 'tel:+917395964901',
    },
    {
      id: 'whatsapp',
      icon: <MessageSquare className="w-5 h-5" />,
      label: 'WhatsApp Order',
      color: 'bg-emerald-600 hover:bg-emerald-500 text-white',
      url: 'https://wa.me/917395964901?text=Hello%20Hotel%20Al%20Alif%20Biriyani%2C%20I%20would%20like%20to%20place%20an%20order.',
    },
    {
      id: 'maps',
      icon: <MapPin className="w-5 h-5" />,
      label: 'Locate on Maps',
      color: 'bg-brand-gold text-brand-maroon-dark hover:bg-yellow-400 shadow-md',
      url: 'https://maps.app.goo.gl/kfsG9AJSzPgbN84E9',
    },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end space-y-3">
      {/* Back to top button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            onClick={scrollToTop}
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            className="flex items-center justify-center p-3.5 rounded-full bg-brand-maroon-deep border border-brand-gold/40 text-brand-gold shadow-2xl hover:bg-brand-maroon hover:text-white transition-all duration-300 cursor-pointer"
            aria-label="Back to top"
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Primary Floating Action buttons */}
      <AnimatePresence>
        {isOpen && (
          <div className="flex flex-col items-end space-y-3">
            {actions.map((action, index) => (
              <motion.a
                key={action.id}
                href={action.url}
                target={action.url.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0.8, x: 20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.8, x: 20 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className={`flex items-center justify-center p-3.5 rounded-full shadow-2xl transition-all duration-300 group relative ${action.color}`}
                aria-label={action.label}
              >
                {action.icon}
                
                {/* Floating tooltip hover tag */}
                <span className="absolute right-14 bg-brand-maroon-dark text-brand-gold text-[10px] font-sans font-bold uppercase tracking-widest px-3 py-1.5 rounded-lg border border-brand-gold/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap shadow-xl pointer-events-none">
                  {action.label}
                </span>
              </motion.a>
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* Main Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 bg-brand-maroon-dark border border-brand-gold/60 text-brand-gold rounded-full flex items-center justify-center shadow-2xl hover:scale-105 active:scale-95 transition-all cursor-pointer"
        aria-label="Toggle Quick Contact Buttons"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      >
        <motion.div
          animate={{ rotate: isOpen ? 90 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronLeft className="w-5 h-5" />
        </motion.div>
      </motion.button>
    </div>
  );
}
