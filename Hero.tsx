import React from 'react';
import { ChevronDown, MessageSquare, Menu } from 'lucide-react';
import { motion } from 'motion/react';
import { useApp } from './AppContext';

export default function Hero() {
  const { language, t } = useApp();

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

  const openWhatsApp = () => {
    const text = encodeURIComponent("Hello Hotel Al Alif Biriyani, I'd like to check the menu and place a food order.");
    window.open(`https://wa.me/917395964901?text=${text}`, '_blank');
  };

  const heroSubtitle = 
    language === 'ta' 
      ? 'உண்மையான சுவை • புதிய உணவு • குடும்ப உணவகம்' 
      : language === 'hi' 
      ? 'प्रामाणिक स्वाद • ताज़ा भोजन • पारिवारिक भोजनालय' 
      : 'Authentic Taste • Fresh Food • Family Restaurant';

  const orderOnWhatsAppLabel = 
    language === 'ta' 
      ? 'வாட்ஸ்அப்பில் ஆர்டர் செய்க' 
      : language === 'hi' 
      ? 'व्हाट्सएप पर ऑर्डर करें' 
      : 'Order on WhatsApp';

  return (
    <section
      id="home"
      className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-brand-maroon-deep"
    >
      {/* Background Image with Dark Vignette Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=1600&auto=format&fit=crop"
          alt="Premium Indian Biriyani Background"
          className="w-full h-full object-cover object-center scale-105 animate-[pulse_8s_infinite_alternate]"
          referrerPolicy="no-referrer"
        />
        {/* Deep Maroon & Black Gradient overlay for ultra-premium look */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-maroon-deep via-brand-maroon-dark/85 to-black/75 z-10" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent to-black/50 z-10" />
      </div>

      {/* Decorative Golden Borders / Luxury Framing */}
      <div className="absolute inset-4 sm:inset-6 md:inset-8 border border-brand-gold/15 pointer-events-none z-20 rounded-md">
        <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-brand-gold" />
        <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-brand-gold" />
        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-brand-gold" />
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-brand-gold" />
      </div>

      {/* Content Container */}
      <div className="relative z-30 max-w-5xl mx-auto px-4 text-center flex flex-col items-center justify-center h-full">
        {/* Tiny Premium Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="mb-4 inline-flex items-center space-x-2 px-4 py-1.5 rounded-full border border-brand-gold/30 bg-brand-maroon-dark/60 backdrop-blur-sm"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-brand-gold animate-ping" />
          <span className="font-sans text-[10px] sm:text-xs tracking-[0.4em] text-brand-gold uppercase font-bold">
            {t('tasteTradition')}
          </span>
        </motion.div>

        {/* Brand Main Title with Luxury Serif Font */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
          className="font-serif text-4xl sm:text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-brand-gold-light to-brand-gold tracking-[0.05em] leading-[1.1] mb-6 drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)] filter"
        >
          HOTEL AL ALIF
          <span className="block text-3xl sm:text-5xl md:text-7xl mt-1 tracking-[0.1em] text-brand-gold font-normal">
            BIRIYANI
          </span>
        </motion.h1>

        {/* Decorative Divider */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: '120px' }}
          transition={{ duration: 1.2, delay: 0.4 }}
          className="h-[1px] bg-gradient-to-r from-transparent via-brand-gold to-transparent mb-6"
        />

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="font-sans text-sm sm:text-lg md:text-xl text-brand-gold-light/90 font-medium tracking-[0.2em] uppercase max-w-2xl mb-10 leading-relaxed drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
        >
          {heroSubtitle}
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full px-4 sm:px-0"
        >
          {/* View Menu Button */}
          <button
            onClick={() => scrollToSection('menu')}
            className="w-full sm:w-auto min-w-[180px] flex items-center justify-center space-x-2 px-8 py-4 rounded-full bg-brand-maroon hover:bg-brand-maroon-light text-white font-sans text-sm uppercase tracking-widest font-bold border border-brand-gold/40 hover:border-brand-gold transition-all duration-300 shadow-lg shadow-brand-maroon-dark/50 cursor-pointer group"
          >
            <Menu className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300 text-brand-gold" />
            <span>{t('viewMenu')}</span>
          </button>

          {/* WhatsApp Order Button */}
          <button
            onClick={openWhatsApp}
            className="w-full sm:w-auto min-w-[180px] flex items-center justify-center space-x-2 px-8 py-4 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-sans text-sm uppercase tracking-widest font-bold transition-all duration-300 shadow-lg shadow-emerald-950/50 cursor-pointer group"
          >
            <MessageSquare className="w-4 h-4 animate-pulse group-hover:scale-110 transition-transform" />
            <span>{orderOnWhatsAppLabel}</span>
          </button>
        </motion.div>

        {/* Scrolling Indicator */}
        <motion.button
          onClick={() => scrollToSection('quick-info')}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center space-y-1 text-brand-gold hover:text-white transition-colors duration-300 cursor-pointer"
        >
          <span className="font-sans text-[9px] tracking-[0.3em] uppercase">Scroll</span>
          <ChevronDown className="w-5 h-5 animate-bounce" />
        </motion.button>
      </div>
    </section>
  );
}
