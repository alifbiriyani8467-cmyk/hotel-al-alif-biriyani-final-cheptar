import React from 'react';
import { Gift, Zap, Sparkles, Users, ArrowRight, MessageSquare } from 'lucide-react';
import { motion } from 'motion/react';
import { useApp } from "./AppContext";

export default function SpecialOffers() {
  const { t } = useApp();

  const offers = [
    {
      id: 'o1',
      title: t('weekOffers'),
      description: t('offDetail1'),
      badge: t('limitedOffer'),
      icon: <Zap className="w-6 h-6 text-brand-gold animate-bounce" />,
      color: 'from-brand-maroon-dark via-brand-maroon/90 to-brand-maroon-deep',
      whatsappText: 'Hello, I want to order the Weekend Feast: Buy any 2 Biriyanis and get 1 Bread Halwa FREE!',
    },
    {
      id: 'o2',
      title: t('familyCombo'),
      description: t('offDetail3'),
      badge: 'Best Value',
      icon: <Users className="w-6 h-6 text-brand-gold" />,
      color: 'from-amber-950 via-brand-maroon-dark to-stone-900',
      whatsappText: 'Hello, I want to order the Family Royal Combo: 4 Biriyanis, 2 Starters & 4 Desserts for ₹1299!',
    },
    {
      id: 'o3',
      title: t('festOffers'),
      description: t('offDetail4'),
      badge: 'Traditional',
      icon: <Sparkles className="w-6 h-6 text-brand-gold" />,
      color: 'from-brand-maroon via-brand-maroon-light to-amber-900',
      whatsappText: 'Hello, I would like to pre-order for a Festival/Party and avail the Flat 10% Off deal!',
    },
    {
      id: 'o4',
      title: 'Weekend Family Deal',
      description: t('offDetail2'),
      badge: '15% Discount',
      icon: <Gift className="w-6 h-6 text-brand-gold" />,
      color: 'from-stone-900 via-brand-maroon-deep to-brand-maroon-dark',
      whatsappText: 'Hello, I want to order the Weekend Family Deal: Royal Biriyani + Chicken 65 + Beverage at 15% discount!',
    },
  ];

  return (
    <section id="special-offers" className="py-20 bg-brand-beige dark:bg-stone-950 border-y border-brand-gold/10 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-3 inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-brand-gold/20 bg-brand-maroon/5 text-brand-gold"
          >
            <Gift className="w-4 h-4" />
            <span className="font-sans text-[10px] tracking-widest uppercase font-bold">
              {t('limitedOffer')}
            </span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-serif text-3xl sm:text-4xl text-brand-maroon-dark dark:text-brand-gold font-bold tracking-tight mb-4"
          >
            {t('specialOffers')}
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-sans text-sm sm:text-base text-stone-600 dark:text-stone-400 leading-relaxed"
          >
            {t('offersSub')}
          </motion.p>
        </div>

        {/* Offers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {offers.map((offer, idx) => (
            <motion.div
              key={offer.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -5 }}
              className={`relative overflow-hidden rounded-3xl p-8 bg-gradient-to-br ${offer.color} border border-brand-gold/20 text-white shadow-2xl flex flex-col justify-between h-[220px] group`}
            >
              {/* Decorative Glow */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/10 rounded-full blur-3xl group-hover:bg-brand-gold/20 transition-all duration-500" />

              <div>
                {/* Upper row: icon and badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15">
                    {offer.icon}
                  </div>
                  <span className="font-sans text-[10px] tracking-wider uppercase font-bold px-3 py-1 bg-brand-gold text-brand-maroon-dark rounded-full border border-white/20">
                    {offer.badge}
                  </span>
                </div>

                {/* Offer details */}
                <h3 className="font-serif text-xl font-bold tracking-wide text-brand-gold-light group-hover:text-brand-gold transition-colors mb-2">
                  {offer.title}
                </h3>
                <p className="font-sans text-xs sm:text-sm text-stone-200 leading-relaxed max-w-md">
                  {offer.description}
                </p>
              </div>

              {/* Action Button */}
              <div className="mt-4 flex items-center justify-end">
                <a
                  href={`https://wa.me/917395964901?text=${encodeURIComponent(offer.whatsappText)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-brand-gold hover:text-white transition-all duration-300"
                >
                  <MessageSquare className="w-4 h-4 text-brand-gold group-hover:scale-110 transition-all" />
                  <span>Order Now</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
