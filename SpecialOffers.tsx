import React from 'react';
import { Gift, ShoppingCart, Sparkles, Flame } from 'lucide-react';
import { motion } from 'motion/react';

export default function SpecialOffers() {
  const openWhatsApp = () => {
    window.open(
      'https://wa.me/917395964901?text=Hello%20Hotel%20Al%20Alif%20Biriyani,%20I%20want%20to%20claim%20the%20Buy%202%20Biryanis%20Get%20Chicken%2065%20Free%20Offer.',
      '_blank'
    );
  };

  const scrollToMenu = () => {
    const element = document.getElementById('menu');
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <section
      id="special-offers"
      className="relative py-16 md:py-24 bg-brand-maroon-dark dark:bg-stone-950 overflow-hidden border-y border-brand-gold/10 transition-colors duration-500"
    >
      {/* Ambient background glow */}
      <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-brand-gold/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-brand-maroon-light/30 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-5 inline-flex items-center space-x-2 px-4 py-1.5 rounded-full border border-brand-gold/40 bg-brand-gold/10 backdrop-blur-sm"
        >
          <Flame className="w-3.5 h-3.5 text-brand-gold animate-pulse" />
          <span className="font-sans text-[10px] sm:text-xs tracking-[0.3em] text-brand-gold uppercase font-bold">
            🔥 Limited Time Offer
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-serif text-3xl sm:text-4xl md:text-5xl text-white font-bold tracking-wide mb-3"
        >
          Special <span className="text-brand-gold">Offer</span>
        </motion.h2>

        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: '96px' }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          className="h-[1px] bg-gradient-to-r from-transparent via-brand-gold to-transparent mb-10"
        />

        {/* Main Offer Card */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
          className="relative w-full max-w-2xl"
        >
          {/* Countdown-style ribbon */}
          <div className="absolute -top-2 right-4 sm:top-7 sm:-right-14 z-20 rotate-[20deg] sm:rotate-45 pointer-events-none">
            <div className="bg-brand-gold text-brand-maroon-dark text-[10px] sm:text-xs font-bold uppercase tracking-widest px-8 sm:px-12 py-1.5 shadow-lg">
              Limited Time
            </div>
          </div>

          {/* Golden decorative border wrapper */}
          <div className="relative p-[3px] rounded-3xl bg-gradient-to-br from-brand-gold via-brand-gold-light to-brand-gold-dark shadow-2xl shadow-black/50">
            <div className="relative bg-gradient-to-br from-brand-maroon to-brand-maroon-deep rounded-[22px] px-6 sm:px-10 py-10 sm:py-14 overflow-hidden">
              {/* Corner accents */}
              <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-brand-gold/50 rounded-tl" />
              <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-brand-gold/50 rounded-br" />

              {/* FREE badge with sparkle animation */}
              <div className="relative inline-flex items-center justify-center mb-6">
                <motion.div
                  animate={{ rotate: 360, opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
                  className="absolute -top-4 -right-5 text-brand-gold-light"
                >
                  <Sparkles className="w-5 h-5" />
                </motion.div>
                <motion.div
                  animate={{ opacity: [0.4, 1, 0.4], scale: [0.85, 1.1, 0.85] }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute -bottom-3 -left-5 text-brand-gold"
                >
                  <Sparkles className="w-4 h-4" />
                </motion.div>
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-brand-gold via-brand-gold-light to-brand-gold-dark flex items-center justify-center border-4 border-brand-maroon-dark shadow-[0_0_25px_rgba(212,175,55,0.6)]">
                  <span className="font-serif text-brand-maroon-dark font-extrabold text-sm sm:text-base tracking-wider">
                    FREE
                  </span>
                </div>
              </div>

              <p className="font-sans text-brand-gold-light/95 text-base sm:text-lg mb-6 leading-relaxed">
                🍛 Craving the perfect meal? We have the ultimate deal for you!
              </p>

              <div className="flex flex-col items-center gap-3 mb-8">
                <div className="inline-flex items-center gap-2 text-white font-serif text-xl sm:text-2xl font-bold tracking-wide">
                  <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6 text-brand-gold shrink-0" />
                  <span>BUY ANY 2 BIRYANIS</span>
                </div>
                <div className="inline-flex items-center gap-2 text-brand-gold font-serif text-xl sm:text-2xl font-bold tracking-wide">
                  <Gift className="w-5 h-5 sm:w-6 sm:h-6 shrink-0" />
                  <span>GET CHICKEN 65 ABSOLUTELY FREE!</span>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  onClick={openWhatsApp}
                  className="w-full sm:w-auto min-w-[200px] flex items-center justify-center space-x-2 px-8 py-4 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-sans text-sm uppercase tracking-widest font-bold transition-all duration-300 shadow-lg shadow-emerald-950/50 cursor-pointer group hover:-translate-y-0.5"
                >
                  <ShoppingCart className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span>Order on WhatsApp</span>
                </button>
                <button
                  onClick={scrollToMenu}
                  className="w-full sm:w-auto min-w-[200px] flex items-center justify-center space-x-2 px-8 py-4 rounded-full bg-brand-maroon hover:bg-brand-maroon-light text-white font-sans text-sm uppercase tracking-widest font-bold border border-brand-gold/40 hover:border-brand-gold transition-all duration-300 shadow-lg shadow-brand-maroon-dark/50 cursor-pointer group hover:-translate-y-0.5"
                >
                  <Flame className="w-4 h-4 text-brand-gold group-hover:rotate-12 transition-transform" />
                  <span>View Menu</span>
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
