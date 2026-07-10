import React from 'react';
import { Phone, MapPin, Clock } from 'lucide-react';
import { useApp } from './AppContext';

export default function ContactSection() {
  const { t, language } = useApp();

  return (
    <section id="contact" className="py-16 md:py-24 bg-brand-maroon-deep dark:bg-stone-950 text-white relative transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <span className="font-serif text-brand-gold text-xs sm:text-sm tracking-[0.25em] uppercase font-bold block mb-3">
            {t('contact')}
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-white font-black mb-4">
            {language === 'ta' ? 'எங்களைத் தொடர்பு கொள்ள' : language === 'hi' ? 'हमसे संपर्क करें' : 'Get in Touch'}
          </h2>
          <div className="h-0.5 w-12 bg-brand-gold mx-auto my-4" />
          <p className="font-sans text-brand-gold-light/75 text-sm sm:text-base">
            {language === 'ta' ? 'விறகடுப்பு பிரியாணியின் பாரம்பரிய சுவையை நேரில் வந்து சுவைத்திடுங்கள்!' : language === 'hi' ? 'लकड़ी की आंच पर बनी हमारी पारंपरिक बिरयानी के प्रामाणिक स्वाद का आनंद लेने के लिए पधारें।' : 'Visit us to experience the royal taste of authentic wood-fired biriyani.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 max-w-5xl mx-auto">
          
          {/* Left Column: Quick Contact Specs */}
          <div className="bg-brand-maroon-dark/60 dark:bg-stone-900/60 rounded-3xl p-8 border border-brand-gold/15 shadow-2xl backdrop-blur-sm space-y-6 flex flex-col justify-center">
            <h4 className="font-serif text-brand-gold text-2xl font-bold border-b border-brand-gold/15 pb-4 mb-2">{t('contact')}</h4>
            
            <div className="flex items-start space-x-4 text-base">
              <Phone className="w-5 h-5 text-brand-gold shrink-0 mt-1" />
              <div>
                <p className="font-sans font-bold text-white/90 text-lg">{t('phoneNumbers')}</p>
                <p className="font-sans text-stone-200 font-mono text-base mt-1">+91 7395964901</p>
                <p className="font-sans text-stone-200 font-mono text-base">+91 7904918467</p>
              </div>
            </div>

            <div className="flex items-start space-x-4 text-base">
              <Clock className="w-5 h-5 text-brand-gold shrink-0 mt-1" />
              <div>
                <p className="font-sans font-bold text-white/90 text-lg">{t('workingHours')}</p>
                <p className="font-sans text-stone-200 text-base mt-1">12:00 PM – 11:00 PM</p>
              </div>
            </div>

            <div className="flex items-start space-x-4 text-base">
              <MapPin className="w-5 h-5 text-brand-gold shrink-0 mt-1" />
              <div>
                <p className="font-sans font-bold text-white/90 text-lg">{t('address')}</p>
                <p className="font-sans text-stone-200 leading-relaxed text-sm mt-1">
                  Q242+GWF,<br />
                  NH Service Road,<br />
                  Singaperumal Koil,<br />
                  Vinjiambakkam,<br />
                  Tamil Nadu 603204
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Embedded Map Iframe */}
          <div className="relative rounded-3xl overflow-hidden border border-brand-gold/20 shadow-2xl h-[350px] md:h-auto min-h-[300px] w-full bg-brand-maroon-dark dark:bg-stone-900 flex items-center justify-center">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3891.871034458925!2d80.00392341530752!3d12.700144991034612!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a52f99077759d57%3A0x6a053c6f2a893240!2sNH%20Service%20Rd%2C%20Singaperumal%20Koil%2C%20Tamil%20Nadu%20603204!5e0!3m2!1sen!2sin!4v1692482381289!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer"
              title="Hotel Al Alif Biriyani Location"
              className="grayscale opacity-85 hover:grayscale-0 hover:opacity-100 transition-all duration-500 absolute inset-0"
            />
            <div className="absolute top-4 right-4 bg-brand-maroon/90 dark:bg-stone-900/90 border border-brand-gold/30 px-4 py-2 rounded-xl text-xs uppercase font-bold tracking-widest text-brand-gold z-10">
              Singaperumal Koil
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
