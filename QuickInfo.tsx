import React from 'react';
import { MapPin, Clock, Phone, Map } from 'lucide-react';
import { motion } from 'motion/react';

export default function QuickInfo() {
  const cards = [
    {
      icon: <MapPin className="w-6 h-6 text-brand-gold" />,
      title: 'Our Location',
      details: 'Singaperumal Koil',
      subtext: 'NH Service Road, Vinjiambakkam',
      actionLabel: 'Get Directions',
      actionUrl: 'https://maps.app.goo.gl/kfsG9AJSzPgbN84E9',
    },
    {
      icon: <Clock className="w-6 h-6 text-brand-gold" />,
      title: 'Operating Hours',
      details: '12:00 PM - 11:00 PM',
      subtext: 'Open Daily (Mon - Sun)',
      actionLabel: 'Fresh & Hot Food Always',
      actionUrl: null,
    },
    {
      icon: <Phone className="w-6 h-6 text-brand-gold" />,
      title: 'Call to Order',
      details: '+91 73959 64901',
      subtext: '+91 79049 18467',
      actionLabel: 'Click to Call',
      actionUrl: 'tel:7395964901',
    },
  ];

  return (
    <section
      id="quick-info"
      className="relative py-12 md:py-20 bg-brand-cream border-b border-brand-gold/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Ambient Top Frame */}
        <div className="flex justify-center mb-8">
          <div className="h-0.5 w-16 bg-brand-gold rounded" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {cards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6 lg:p-8 shadow-xl border border-brand-gold/10 hover:border-brand-gold/40 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
            >
              <div>
                {/* Icon Shell */}
                <div className="w-12 h-12 rounded-xl bg-brand-maroon/5 flex items-center justify-center mb-6 group-hover:bg-brand-maroon group-hover:text-white transition-all duration-300">
                  <div className="group-hover:scale-110 transition-transform duration-300">
                    {card.icon}
                  </div>
                </div>

                {/* Card Title */}
                <h3 className="font-serif text-lg tracking-wider text-brand-maroon font-bold mb-2">
                  {card.title}
                </h3>

                {/* Main Detail */}
                <p className="font-sans text-stone-900 font-bold text-lg mb-1">
                  {card.details}
                </p>

                {/* Subtext */}
                <p className="font-sans text-stone-500 text-sm mb-6">
                  {card.subtext}
                </p>
              </div>

              {/* Card CTA Link */}
              {card.actionUrl ? (
                <a
                  href={card.actionUrl}
                  target={card.actionUrl.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 text-xs uppercase tracking-widest font-bold text-brand-maroon-light hover:text-brand-gold transition-colors duration-300 mt-auto"
                >
                  <span>{card.actionLabel}</span>
                  <span className="text-sm font-light">→</span>
                </a>
              ) : (
                <span className="text-xs uppercase tracking-widest font-semibold text-brand-gold-dark mt-auto">
                  {card.actionLabel}
                </span>
              )}
            </motion.div>
          ))}
        </div>

        {/* Short Google Map quick link with formatted Address */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 bg-gradient-to-br from-brand-maroon-dark to-brand-maroon p-6 sm:p-8 rounded-3xl border border-brand-gold/20 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-6"
        >
          <div className="flex items-start space-x-4">
            <div className="bg-brand-gold/10 p-3 rounded-full border border-brand-gold/30 mt-1">
              <Map className="w-6 h-6 text-brand-gold" />
            </div>
            <div>
              <h4 className="font-serif text-brand-gold text-sm tracking-widest uppercase font-bold mb-2">
                Official Address
              </h4>
              <p className="font-sans text-brand-gold-light/95 font-medium leading-relaxed max-w-xl text-sm sm:text-base">
                Q242+GWF, NH Service Road, Singaperumal Koil, Vinjiambakkam, Tamil Nadu 603204
              </p>
            </div>
          </div>
          <a
            href="https://maps.app.goo.gl/kfsG9AJSzPgbN84E9"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full lg:w-auto px-6 py-3.5 bg-brand-gold text-brand-maroon-dark hover:bg-white hover:text-brand-maroon transition-all duration-300 rounded-full font-sans text-xs tracking-widest font-bold uppercase text-center shadow-lg hover:shadow-white/10"
          >
            Open in Google Maps
          </a>
        </motion.div>
      </div>
    </section>
  );
}
