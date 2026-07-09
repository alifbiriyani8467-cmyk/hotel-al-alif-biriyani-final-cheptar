import React, { useState, useMemo } from 'react';
import { MENU_ITEMS } from '../data';
import { MenuItem } from '../types';
import { ShoppingCart, Plus, Minus, MessageSquare, Flame, Check, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../context/AppContext';

export default function MenuSection() {
  const { t, language } = useApp();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [vegFilter, setVegFilter] = useState<'all' | 'veg' | 'nonveg'>('all');
  
  // Cart state: Record of itemId -> quantity
  const [cart, setCart] = useState<Record<string, number>>({});

  // Open/collapsed categories state
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>({
    starters: true,
    chicken: true,
    mutton: true,
    parotta: true,
    dosa: true,
    omelette: true,
    grill: true,
    veggravy: true,
    seafood: true,
  });

  const toggleCategory = (id: string) => {
    setOpenCategories((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Filtered menu items based on search query and veg filter
  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      let matchesVeg = true;
      if (vegFilter === 'veg') matchesVeg = item.isVeg;
      if (vegFilter === 'nonveg') matchesVeg = !item.isVeg;

      return matchesSearch && matchesVeg;
    });
  }, [searchQuery, vegFilter]);

  // Split filtered items by category
  const startersItems = useMemo(() => {
    return filteredItems.filter((item) => item.category === 'starters');
  }, [filteredItems]);

  const chickenItems = useMemo(() => {
    return filteredItems.filter((item) => item.category === 'chicken');
  }, [filteredItems]);

  const muttonItems = useMemo(() => {
    return filteredItems.filter((item) => item.category === 'mutton');
  }, [filteredItems]);

  const parottaItems = useMemo(() => {
    return filteredItems.filter((item) => item.category === 'parotta');
  }, [filteredItems]);

  const dosaItems = useMemo(() => {
    return filteredItems.filter((item) => item.category === 'dosa');
  }, [filteredItems]);

  const omeletteItems = useMemo(() => {
    return filteredItems.filter((item) => item.category === 'omelette');
  }, [filteredItems]);

  const grillItems = useMemo(() => {
    return filteredItems.filter((item) => item.category === 'grill');
  }, [filteredItems]);

  const veggravyItems = useMemo(() => {
    return filteredItems.filter((item) => item.category === 'veggravy');
  }, [filteredItems]);

  const seafoodItems = useMemo(() => {
    return filteredItems.filter((item) => item.category === 'seafood');
  }, [filteredItems]);

  // Cart helper functions
  const addToCart = (id: string) => {
    setCart((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => {
      const updated = { ...prev };
      if (updated[id] <= 1) {
        delete updated[id];
      } else {
        updated[id] -= 1;
      }
      return updated;
    });
  };

  const clearCart = () => setCart({});

  // Cart statistics
  const cartDetails = useMemo(() => {
    let totalItems = 0;
    let totalPrice = 0;
    const itemsList = (Object.entries(cart) as [string, number][]).map(([id, qty]) => {
      const item = MENU_ITEMS.find((m) => m.id === id);
      if (item) {
        totalItems += qty;
        totalPrice += item.price * qty;
        return { item, qty };
      }
      return null;
    }).filter(Boolean);

    return { totalItems, totalPrice, itemsList };
  }, [cart]);

  // Generate WhatsApp message and redirect
  const sendWhatsAppOrder = () => {
    if (cartDetails.itemsList.length === 0) return;

    let message = `*🕌 HOTEL AL ALIF BIRIYANI - NEW ORDER* 🕌\n`;
    message += `------------------------------------\n`;
    
    cartDetails.itemsList.forEach((cartItem) => {
      if (cartItem) {
        const { item, qty } = cartItem;
        const subtotal = item.price * qty;
        message += `• *${item.name}* x ${qty} ➔ ₹${subtotal}\n`;
      }
    });

    message += `------------------------------------\n`;
    message += `*Total Amount:* ₹${cartDetails.totalPrice}\n\n`;
    message += `Please confirm my order and let me know the preparation time. Thanks!`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/917395964901?text=${encodedMessage}`, '_blank');
  };

  const allDietsLabel = language === 'ta' ? 'அனைத்து உணவுகள்' : language === 'hi' ? 'सभी आहार' : 'All Diets';
  const vegLabel = language === 'ta' ? 'சைவம்' : language === 'hi' ? 'शाकाहारी' : 'Veg';
  const nonVegLabel = language === 'ta' ? 'அசைவம்' : language === 'hi' ? 'மாंसाहारी' : 'Non-Veg';
  const noDishMsg = language === 'ta' ? 'உங்கள் தேடலுக்கு ஏற்ற உணவுகள் எதுவும் இல்லை.' : language === 'hi' ? 'आपकी खोज के अनुसार कोई व्यंजन नहीं मिला।' : 'No dishes found matching your selection.';
  const resetFiltersBtn = language === 'ta' ? 'வடிகட்டிகளை மீட்டமை' : language === 'hi' ? 'फ़िल्टर रीसेट करें' : 'Reset Filters';
  const cartTitle = language === 'ta' ? 'உங்கள் வாட்ஸ்அப் ஆர்டர்' : language === 'hi' ? 'आपका व्हाट्सएप ऑर्डर' : 'Your WhatsApp Order';
  const clearAllLabel = language === 'ta' ? 'அனைத்தையும் நீக்கு' : language === 'hi' ? 'सभी हटाएं' : 'Clear All';
  const grandTotalLabel = language === 'ta' ? 'மொத்த தொகை' : language === 'hi' ? 'कुल योग' : 'Grand Total';
  const sendWhatsAppOrderBtn = language === 'ta' ? 'வாட்ஸ்அப்பில் ஆர்டரை அனுப்புக' : language === 'hi' ? 'व्हाट्सएप पर ऑर्डर भेजें' : 'Send Order to WhatsApp';
  const addToOrderLabel = language === 'ta' ? 'ஆர்டரில் சேர்' : language === 'hi' ? 'ऑर्डर में जोड़ें' : 'Add to Order';

  const categories = useMemo(() => [
    {
      id: 'starters',
      title: language === 'ta' ? 'வகை 1: வெஜ் & நான்-வெஜ் ஸ்டார்டர்ஸ்' : language === 'hi' ? 'श्रेणी 1: वेज और नॉन-वेज स्टार्टर्स' : 'Category 1: VEG & NON-VEG STARTERS',
    },
    {
      id: 'chicken',
      title: language === 'ta' ? 'வகை 2: சிக்கன் கிரேவி / டிரை' : language === 'hi' ? 'श्रेणी 2: चिकन ग्रेवी / ड्राई' : 'Category 2: CHICKEN GRAVY / DRY',
    },
    {
      id: 'mutton',
      title: language === 'ta' ? 'வகை 3: மட்டன் கிரேவி / டிரை' : language === 'hi' ? 'श्रेणी 3: मटन ग्रेवी / ड्राई' : 'Category 3: MUTTON GRAVY / DRY',
    },
    {
      id: 'parotta',
      title: language === 'ta' ? 'வகை 4: பரோட்டா & சப்பாத்தி' : language === 'hi' ? 'श्रेणी 4: परोट्टा और चपाती' : 'Category 4: PAROTTA & CHAPATTI',
    },
    {
      id: 'dosa',
      title: language === 'ta' ? 'வகை 5: தோசை' : language === 'hi' ? 'श्रेणी 5: डोसा' : 'Category 5: DOSAI',
    },
    {
      id: 'omelette',
      title: language === 'ta' ? 'வகை 6: ஆம்லெட்' : language === 'hi' ? 'श्रेणी 6: ऑमलेट' : 'Category 6: OMELETTE',
    },
    {
      id: 'grill',
      title: language === 'ta' ? 'வகை 7: தந்தூரி & கிரில்' : language === 'hi' ? 'श्रेणी 7: तंदूरी और ग्रिल' : 'Category 7: TANDOORI & GRILL',
    },
    {
      id: 'veggravy',
      title: language === 'ta' ? 'வகை 8: வெஜ் கிரேவி & டிரை' : language === 'hi' ? 'श्रेणी 8: वेज ग्रेवी और ड्राई' : 'Category 8: VEG GRAVY & DRY',
    },
    {
      id: 'seafood',
      title: language === 'ta' ? 'வகை 9: கடல் உணவு ஸ்டார்ட்டர்ஸ்' : language === 'hi' ? 'श्रेणी 9: सीफूड स्टार्टर्स' : 'Category 9: SEAFOOD STARTERS',
    }
  ], [language]);

  return (
    <section
      id="menu"
      className="py-16 md:py-24 bg-brand-cream dark:bg-stone-900 relative overflow-hidden transition-colors duration-500"
    >
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-maroon/5 rounded-full filter blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-gold/5 rounded-full filter blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="font-serif text-brand-gold text-xs sm:text-sm tracking-[0.25em] uppercase font-bold block mb-3">
            Royal Cuisine
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-brand-maroon dark:text-brand-gold font-black mb-4">
            {t('menu')}
          </h2>
          <div className="flex items-center justify-center space-x-2 my-4">
            <span className="h-[1px] w-8 bg-brand-gold" />
            <span className="text-xs text-brand-gold-dark font-serif uppercase tracking-widest">
              Gourmet Selection
            </span>
            <span className="h-[1px] w-8 bg-brand-gold" />
          </div>
          <p className="font-sans text-stone-500 dark:text-stone-400 text-sm sm:text-base">
            Savor our authentic dishes prepared with signature house-ground spice blends, fresh ingredients, and royal heritage recipe frameworks.
          </p>
        </div>

        {/* Filters and Search controls */}
        <div className="bg-white dark:bg-stone-950 rounded-3xl p-4 sm:p-6 shadow-xl border border-brand-gold/10 mb-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            
            {/* Search Input */}
            <div className="w-full md:w-1/2">
              <input
                type="text"
                placeholder={t('searchPlaceholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-5 py-3 rounded-xl border border-stone-200 dark:border-stone-800 focus:border-brand-gold focus:outline-none font-sans text-sm text-stone-800 dark:text-stone-100 placeholder-stone-400 dark:placeholder-stone-500 bg-stone-50 dark:bg-stone-900"
              />
            </div>

            {/* Diet Filter Switch */}
            <div className="flex bg-stone-100 dark:bg-stone-900 p-1.5 rounded-2xl w-full md:w-auto">
              <button
                onClick={() => setVegFilter('all')}
                className={`flex-1 md:flex-initial px-5 py-2.5 rounded-xl font-sans text-xs tracking-wider uppercase font-semibold transition-all duration-300 ${
                  vegFilter === 'all'
                    ? 'bg-brand-maroon text-white shadow'
                    : 'text-stone-500 dark:text-stone-400 hover:text-brand-maroon'
                }`}
              >
                {allDietsLabel}
              </button>
              <button
                onClick={() => setVegFilter('veg')}
                className={`flex-1 md:flex-initial px-5 py-2.5 rounded-xl font-sans text-xs tracking-wider uppercase font-semibold transition-all duration-300 flex items-center justify-center space-x-1.5 ${
                  vegFilter === 'veg'
                    ? 'bg-emerald-600 text-white shadow'
                    : 'text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/30'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500 border border-white" />
                <span>{vegLabel}</span>
              </button>
              <button
                onClick={() => setVegFilter('nonveg')}
                className={`flex-1 md:flex-initial px-5 py-2.5 rounded-xl font-sans text-xs tracking-wider uppercase font-semibold transition-all duration-300 flex items-center justify-center space-x-1.5 ${
                  vegFilter === 'nonveg'
                    ? 'bg-rose-600 text-white shadow'
                    : 'text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-rose-500 border border-white" />
                <span>{nonVegLabel}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Menu Display - Interactive Mobile-Friendly Table */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-stone-950 rounded-3xl border border-dashed border-stone-200 dark:border-stone-800">
            <HelpCircle className="w-12 h-12 text-stone-300 dark:text-stone-700 mx-auto mb-4" />
            <p className="font-sans text-stone-500 dark:text-stone-400 font-medium">{noDishMsg}</p>
            <button
              onClick={() => { setSearchQuery(''); setVegFilter('all'); }}
              className="mt-4 inline-flex items-center space-x-2 px-5 py-2 rounded-full border border-brand-maroon text-brand-maroon hover:bg-brand-maroon hover:text-white transition-colors cursor-pointer dark:border-brand-gold dark:text-brand-gold dark:hover:bg-brand-gold dark:hover:text-brand-maroon-dark"
            >
              {resetFiltersBtn}
            </button>
          </div>
        ) : (
          <div className="space-y-12">
            {categories.map((cat) => {
              const catItems = cat.id === 'starters'
                ? startersItems
                : cat.id === 'chicken'
                ? chickenItems
                : cat.id === 'mutton'
                ? muttonItems
                : cat.id === 'parotta'
                ? parottaItems
                : cat.id === 'dosa'
                ? dosaItems
                : cat.id === 'omelette'
                ? omeletteItems
                : cat.id === 'grill'
                ? grillItems
                : cat.id === 'veggravy'
                ? veggravyItems
                : seafoodItems;
              if (catItems.length === 0) return null;

              return (
                <div key={cat.id} className="space-y-4">
                  {/* Category Header Title (Clickable) */}
                  <button
                    onClick={() => toggleCategory(cat.id)}
                    className="w-full flex items-center justify-between focus:outline-none group cursor-pointer text-left py-2"
                    aria-expanded={openCategories[cat.id]}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="h-6 w-1 bg-brand-gold rounded-full group-hover:scale-y-110 transition-transform duration-300" />
                      <h3 className="font-serif text-lg sm:text-2xl font-black text-brand-maroon dark:text-brand-gold tracking-wide group-hover:text-brand-gold-dark transition-colors duration-300">
                        {cat.title}
                      </h3>
                    </div>
                    <div className="flex items-center space-x-2.5">
                      <span className="text-[10px] sm:text-xs font-mono text-stone-400 uppercase tracking-widest font-semibold bg-white dark:bg-stone-950 px-3 py-1.5 rounded-full border border-stone-100 dark:border-stone-900">
                        {catItems.length} {catItems.length === 1 ? 'item' : 'items'}
                      </span>
                      <div className="p-1.5 rounded-full bg-white dark:bg-stone-950 border border-stone-100 dark:border-stone-900 text-brand-maroon dark:text-brand-gold hover:bg-brand-cream/10 transition-colors">
                        {openCategories[cat.id] ? (
                          <ChevronUp className="w-4 h-4 text-brand-gold" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-brand-gold" />
                        )}
                      </div>
                    </div>
                  </button>

                  {/* Collapsible Content wrapper */}
                  <AnimatePresence initial={false}>
                    {openCategories[cat.id] && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        {/* Category Card */}
                        <div className="bg-white dark:bg-stone-950 rounded-3xl shadow-xl border border-brand-gold/10 overflow-hidden">
                          {/* Desktop Table: Hidden on Mobile */}
                          <div className="hidden md:block overflow-x-auto">
                            <table className="w-full text-left border-collapse font-sans">
                              <thead>
                                <tr className="border-b border-stone-100 dark:border-stone-900 text-stone-500 dark:text-stone-400 text-xs uppercase tracking-widest font-bold bg-stone-50/50 dark:bg-stone-900/10">
                                  <th className="py-4 px-6">Dish Name</th>
                                  <th className="py-4 px-6 text-center">Type</th>
                                  <th className="py-4 px-6 text-right">Price</th>
                                  <th className="py-4 px-6 text-right">Add to Order</th>
                                </tr>
                              </thead>
                              <tbody>
                                <AnimatePresence mode="popLayout">
                                  {catItems.map((item) => (
                                    <motion.tr
                                      layout
                                      initial={{ opacity: 0 }}
                                      animate={{ opacity: 1 }}
                                      exit={{ opacity: 0 }}
                                      transition={{ duration: 0.2 }}
                                      key={item.id}
                                      className="border-b border-stone-100 dark:border-stone-900/50 hover:bg-brand-cream/10 dark:hover:bg-stone-900/20 transition-colors"
                                    >
                                      <td className="py-4 px-6">
                                        <div className="flex items-center space-x-4">
                                          <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-12 h-12 rounded-xl object-cover border border-brand-gold/10"
                                            referrerPolicy="no-referrer"
                                          />
                                          <div>
                                            <h4 className="font-serif font-bold text-stone-900 dark:text-stone-100 text-sm sm:text-base">
                                              {item.name}
                                            </h4>
                                            <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5 line-clamp-1 max-w-md">
                                              {item.description}
                                            </p>
                                          </div>
                                        </div>
                                      </td>
                                      <td className="py-4 px-6 text-center">
                                        <span className={`inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                          item.isVeg 
                                            ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200/50 dark:border-emerald-800/50' 
                                            : 'bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-400 border border-rose-200/50 dark:border-rose-800/50'
                                        }`}>
                                          <span className={`w-1.5 h-1.5 rounded-full ${item.isVeg ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                                          <span>{item.isVeg ? 'Veg' : 'Non-Veg'}</span>
                                        </span>
                                      </td>
                                      <td className="py-4 px-6 text-right">
                                        <span className="font-mono font-bold text-stone-800 dark:text-stone-200 text-base">
                                          ₹{item.price}
                                        </span>
                                      </td>
                                      <td className="py-4 px-6 text-right">
                                        <div className="flex justify-end">
                                          {cart[item.id] ? (
                                            <div className="flex items-center space-x-1.5 bg-brand-maroon text-white rounded-full p-1 shadow-md">
                                              <button
                                                onClick={() => removeFromCart(item.id)}
                                                className="p-1 rounded-full hover:bg-brand-maroon-light transition-colors cursor-pointer"
                                                aria-label="Decrease quantity"
                                              >
                                                <Minus className="w-3 h-3" />
                                              </button>
                                              <span className="font-sans font-bold text-xs w-6 text-center text-brand-gold-light">
                                                {cart[item.id]}
                                              </span>
                                              <button
                                                onClick={() => addToCart(item.id)}
                                                className="p-1 rounded-full hover:bg-brand-maroon-light transition-colors cursor-pointer"
                                                aria-label="Increase quantity"
                                              >
                                                <Plus className="w-3 h-3" />
                                              </button>
                                            </div>
                                          ) : (
                                            <button
                                              onClick={() => addToCart(item.id)}
                                              className="px-4 py-1.5 rounded-full border border-brand-maroon dark:border-brand-gold text-brand-maroon dark:text-brand-gold hover:bg-brand-maroon hover:text-white dark:hover:bg-brand-gold dark:hover:text-brand-maroon-dark font-sans text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center space-x-1 shadow-sm hover:shadow cursor-pointer"
                                            >
                                              <Plus className="w-3 h-3" />
                                              <span>{addToOrderLabel}</span>
                                            </button>
                                          )}
                                        </div>
                                      </td>
                                    </motion.tr>
                                  ))}
                                </AnimatePresence>
                              </tbody>
                            </table>
                          </div>

                          {/* Mobile View: Rendered as stacked rows on phones */}
                          <div className="block md:hidden p-4 divide-y divide-stone-100 dark:divide-stone-900/50">
                            <AnimatePresence mode="popLayout">
                              {catItems.map((item) => (
                                <motion.div
                                  layout
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  exit={{ opacity: 0 }}
                                  key={item.id}
                                  className="py-4 flex flex-col space-y-3"
                                >
                                  <div className="flex items-start space-x-3">
                                    <img
                                      src={item.image}
                                      alt={item.name}
                                      className="w-14 h-14 rounded-xl object-cover border border-brand-gold/10 flex-shrink-0"
                                      referrerPolicy="no-referrer"
                                    />
                                    <div className="flex-1 min-w-0">
                                      <div className="flex items-center justify-between gap-2">
                                        <h4 className="font-serif font-bold text-stone-900 dark:text-stone-100 text-sm truncate">
                                          {item.name}
                                        </h4>
                                        <span className={`inline-flex items-center space-x-1 px-2 py-0.5 rounded-full text-[8px] font-bold uppercase tracking-wider ${
                                          item.isVeg 
                                            ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200/30' 
                                            : 'bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-400 border border-rose-200/30'
                                        }`}>
                                          <span>{item.isVeg ? 'Veg' : 'Non-Veg'}</span>
                                        </span>
                                      </div>
                                      <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5 line-clamp-2 leading-relaxed">
                                        {item.description}
                                      </p>
                                    </div>
                                  </div>

                                  <div className="flex items-center justify-between bg-stone-50 dark:bg-stone-900/50 p-2.5 rounded-xl">
                                    <div className="flex flex-col">
                                      <span className="text-[9px] text-stone-400 uppercase tracking-widest font-semibold">Price</span>
                                      <span className="font-mono font-bold text-brand-maroon dark:text-brand-gold text-sm">
                                        ₹{item.price}
                                      </span>
                                    </div>

                                    {cart[item.id] ? (
                                      <div className="flex items-center space-x-1.5 bg-brand-maroon text-white rounded-full p-1 shadow-md">
                                        <button
                                          onClick={() => removeFromCart(item.id)}
                                          className="p-1 rounded-full hover:bg-brand-maroon-light transition-colors cursor-pointer"
                                          aria-label="Decrease quantity"
                                        >
                                          <Minus className="w-3 h-3" />
                                        </button>
                                        <span className="font-sans font-bold text-xs w-6 text-center text-brand-gold-light">
                                          {cart[item.id]}
                                        </span>
                                        <button
                                          onClick={() => addToCart(item.id)}
                                          className="p-1 rounded-full hover:bg-brand-maroon-light transition-colors cursor-pointer"
                                          aria-label="Increase quantity"
                                        >
                                          <Plus className="w-3 h-3" />
                                        </button>
                                      </div>
                                    ) : (
                                      <button
                                        onClick={() => addToCart(item.id)}
                                        className="px-4 py-2 rounded-xl border border-brand-maroon dark:border-brand-gold text-brand-maroon dark:text-brand-gold hover:bg-brand-maroon hover:text-white dark:hover:bg-brand-gold dark:hover:text-brand-maroon-dark font-sans text-[10px] font-bold uppercase tracking-wider transition-all duration-300 flex items-center space-x-1 cursor-pointer"
                                      >
                                        <Plus className="w-3 h-3" />
                                        <span>{addToOrderLabel}</span>
                                      </button>
                                    )}
                                  </div>
                                </motion.div>
                              ))}
                            </AnimatePresence>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        )}

        {/* Sliding Premium Checkout / Order on WhatsApp drawer */}
        <AnimatePresence>
          {cartDetails.totalItems > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="fixed bottom-24 left-4 right-4 md:left-auto md:right-8 md:w-[420px] z-40 bg-brand-maroon-dark dark:bg-stone-950 text-white rounded-3xl p-6 shadow-2xl border border-brand-gold/30 backdrop-blur-md"
            >
              <div className="flex items-center justify-between border-b border-brand-gold/20 pb-4 mb-4">
                <div className="flex items-center space-x-2">
                  <div className="relative">
                    <ShoppingCart className="w-5 h-5 text-brand-gold" />
                    <span className="absolute -top-2 -right-2 bg-brand-gold text-brand-maroon-dark rounded-full w-4 h-4 flex items-center justify-center text-[9px] font-black">
                      {cartDetails.totalItems}
                    </span>
                  </div>
                  <h4 className="font-serif font-bold text-brand-gold tracking-wider">
                    {cartTitle}
                  </h4>
                </div>
                <button
                  onClick={clearCart}
                  className="font-sans text-[10px] tracking-widest text-brand-gold-light/60 hover:text-brand-gold uppercase font-bold cursor-pointer"
                >
                  {clearAllLabel}
                </button>
              </div>

              {/* Scrollable list of items inside cart drawer */}
              <div className="max-h-40 overflow-y-auto space-y-3 pr-1 mb-4 scrollbar-thin scrollbar-thumb-brand-gold">
                {cartDetails.itemsList.map((cartItem) => {
                  if (!cartItem) return null;
                  const { item, qty } = cartItem;
                  return (
                    <div key={item.id} className="flex items-center justify-between text-sm">
                      <div className="flex flex-col">
                        <span className="font-sans font-semibold text-white/95">
                          {item.name}
                        </span>
                        <span className="text-[10px] text-brand-gold-light/75">
                          ₹{item.price} {language === 'ta' ? 'வீதம்' : language === 'hi' ? 'प्रत्येक' : 'each'}
                        </span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className="text-xs text-brand-gold font-bold">
                          x{qty}
                        </span>
                        <span className="font-sans font-bold text-white min-w-[50px] text-right">
                          ₹{item.price * qty}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Order total info and WhatsApp action */}
              <div className="border-t border-brand-gold/20 pt-4">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-xs uppercase tracking-widest text-brand-gold-light/80 font-semibold">
                    {grandTotalLabel}
                  </span>
                  <span className="font-serif text-2xl font-bold text-brand-gold">
                    ₹{cartDetails.totalPrice}
                  </span>
                </div>

                <button
                  onClick={sendWhatsAppOrder}
                  className="w-full flex items-center justify-center space-x-3 py-4 bg-emerald-600 hover:bg-emerald-500 rounded-2xl font-sans font-bold text-sm tracking-widest uppercase transition-all duration-300 shadow-lg shadow-emerald-950/40 cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4 fill-current text-white" />
                  <span>{sendWhatsAppOrderBtn}</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
