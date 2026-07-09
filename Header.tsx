import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, Utensils, Award, Sun, Moon, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../context/AppContext';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const { language, setLanguage, theme, toggleTheme, t } = useApp();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // height of fixed header
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

  const menuItems = [
    { label: t('home'), id: 'home', action: () => scrollToSection('home') },
    { label: t('menu'), id: 'menu', action: () => scrollToSection('menu') },
    { label: t('gallery'), id: 'gallery', action: () => scrollToSection('gallery') },
    { label: t('reviews'), id: 'reviews', action: () => scrollToSection('reviews') },
    { label: t('contact'), id: 'contact', action: () => scrollToSection('contact') },
  ];

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'ta', name: 'தமிழ்' },
    { code: 'hi', name: 'हिन्दी' },
  ] as const;

  return (
    <>
      <header
        id="main-header"
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-brand-maroon-dark/95 dark:bg-stone-950/95 shadow-xl border-b border-brand-gold/20 py-3 backdrop-blur-md'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div
              className="flex items-center space-x-2 cursor-pointer group"
              onClick={() => scrollToSection('home')}
            >
              <div className="relative flex items-center justify-center w-10 h-10 rounded-full border border-brand-gold bg-brand-maroon-light/35 group-hover:scale-105 transition-all duration-300">
                <Utensils className="w-5 h-5 text-brand-gold" />
                <Award className="absolute -top-1 -right-1 w-4 h-4 text-brand-gold animate-pulse" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-sm tracking-[0.25em] text-brand-gold leading-none font-bold">
                  AL ALIF
                </span>
                <span className="font-sans text-[10px] tracking-[0.15em] text-white/80 leading-none mt-1">
                  HOTEL BIRIYANI
                </span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-6">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={item.action}
                  className="font-sans text-xs tracking-wider uppercase text-white/90 hover:text-brand-gold transition-colors duration-300 relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-brand-gold hover:after:w-full after:transition-all after:duration-300 cursor-pointer"
                >
                  {item.label}
                </button>
              ))}
            </nav>

            {/* Actions: Theme Toggle, Language Select, Call Button */}
            <div className="hidden md:flex items-center space-x-4">
              {/* Theme toggle */}
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={toggleTheme}
                className="p-2 rounded-full border border-brand-gold/30 hover:border-brand-gold bg-brand-maroon-deep/30 text-brand-gold hover:text-white transition-all cursor-pointer"
                title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              >
                {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </motion.button>

              {/* Language Selector */}
              <div className="relative">
                <button
                  onClick={() => setIsLangOpen(!isLangOpen)}
                  className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-full border border-brand-gold/30 bg-brand-maroon-deep/30 text-brand-gold hover:border-brand-gold text-xs transition-all cursor-pointer"
                >
                  <Globe className="w-3.5 h-3.5" />
                  <span className="uppercase font-semibold">{language}</span>
                </button>

                <AnimatePresence>
                  {isLangOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-2 w-32 rounded-xl bg-brand-maroon-dark dark:bg-stone-900 border border-brand-gold/25 shadow-2xl py-1 overflow-hidden"
                    >
                      {languages.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => {
                            setLanguage(lang.code);
                            setIsLangOpen(false);
                          }}
                          className={`w-full text-left px-4 py-2 text-xs transition-colors duration-200 cursor-pointer ${
                            language === lang.code
                              ? 'bg-brand-gold text-brand-maroon-dark font-bold'
                              : 'text-white/80 hover:bg-brand-maroon hover:text-brand-gold'
                          }`}
                        >
                          {lang.name}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <a
                href="tel:7395964901"
                className="inline-flex items-center space-x-2 px-4 py-2 rounded-full border border-brand-gold bg-brand-gold/10 text-brand-gold font-sans text-[10px] sm:text-xs uppercase tracking-widest font-semibold hover:bg-brand-gold hover:text-brand-maroon-dark transition-all duration-300 shadow-md hover:shadow-brand-gold/20"
              >
                <Phone className="w-3 h-3 animate-bounce" />
                <span>{t('callNow')}</span>
              </a>
            </div>

            {/* Mobile Menu & Small Screen Action Bar */}
            <div className="flex items-center space-x-3 md:hidden">
              <button
                onClick={toggleTheme}
                className="p-1.5 rounded-full border border-brand-gold/30 text-brand-gold hover:text-white"
                aria-label="Toggle Theme"
              >
                {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>

              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-1.5 rounded-lg text-white hover:text-brand-gold focus:outline-none"
                aria-label="Toggle Menu"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-45 bg-brand-maroon-dark/98 dark:bg-stone-950/98 flex flex-col justify-center px-6"
          >
            <div className="absolute top-6 right-6 flex items-center space-x-4">
              {/* Language Selector in Mobile */}
              <div className="flex space-x-2">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => setLanguage(lang.code)}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-all ${
                      language === lang.code
                        ? 'bg-brand-gold border-brand-gold text-brand-maroon-dark'
                        : 'border-white/25 text-white hover:text-brand-gold'
                    }`}
                  >
                    {lang.name}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 text-white hover:text-brand-gold"
                aria-label="Close Menu"
              >
                <X className="w-8 h-8" />
              </button>
            </div>

            <nav className="flex flex-col space-y-6 text-center mt-8">
              {menuItems.map((item, index) => (
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  key={item.id}
                  onClick={item.action}
                  className="font-serif text-2xl tracking-widest text-white hover:text-brand-gold py-2 transition-colors duration-300"
                >
                  {item.label}
                </motion.button>
              ))}

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                className="pt-8 flex flex-col items-center space-y-4"
              >
                <a
                  href="tel:7395964901"
                  className="w-full max-w-xs flex items-center justify-center space-x-2 py-4 rounded-full bg-brand-gold text-brand-maroon-dark font-sans text-sm uppercase tracking-widest font-bold shadow-lg shadow-brand-gold/20"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call 7395964901</span>
                </a>
                <span className="text-white/60 text-xs uppercase tracking-widest">
                  Open 12:00 PM - 11:00 PM
                </span>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
