import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'ta' | 'hi';
type Theme = 'light' | 'dark';

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  theme: Theme;
  toggleTheme: () => void;
  t: (key: string) => string;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const translations: Record<Language, Record<string, string>> = {
  en: {
    home: 'Home',
    menu: 'Menu',
    gallery: 'Gallery',
    reviews: 'Reviews',
    contact: 'Contact',
    callNow: 'Call Now',
    bookTable: 'Book a Table',
    viewMenu: 'View Menu',
    tasteTradition: 'Taste the Tradition',
    tagline: 'Premium Wood-Fired Biriyani',
    subTagline: 'Indulge in the finest authentic Seeraga Samba and Basmati Biriyani cooked over traditional wood fire with handpicked premium spices.',
    reserveTable: 'Reserve a Royal Table',
    reserveSub: 'Experience the finest royal dining. Book your table instantly.',
    name: 'Your Full Name',
    phone: 'Phone Number',
    date: 'Select Date',
    time: 'Select Time',
    guests: 'Number of Guests',
    specialRequest: 'Special Request (Optional)',
    bookingBtn: 'Confirm Royal Reservation',
    bookingSuccess: 'Reservation Confirmed!',
    bookingSuccessSub: 'A table has been specially reserved for you. We look forward to serving you royalty!',
    searchPlaceholder: 'Search delicious food...',
    all: 'All Items',
    popular: 'Most Popular',
    veg: 'Veg Only',
    nonVeg: 'Non-Veg',
    address: 'Address',
    workingHours: 'Working Hours',
    phoneNumbers: 'Phone Numbers',
    specialOffers: 'Special Royal Offers',
    offersSub: 'Exquisite hand-crafted deals for our valued patrons.',
    weekOffers: 'Weekend Feast',
    festOffers: 'Festival Platter',
    familyCombo: 'Family Royal Combo',
    limitedOffer: 'Limited Time Deal',
    offDetail1: 'Buy any 2 Biriyanis, get a traditional Bread Halwa FREE! (Sat-Sun)',
    offDetail2: 'Royal Biriyani + Chicken 65 + Beverage at 15% discount for families.',
    offDetail3: 'A magnificent feast of 4 Biriyanis, 2 Starters & 4 Desserts at just ₹1299.',
    offDetail4: 'Flat 10% off on all pre-orders for regional festivals & parties.',
    aiTitle: 'Al Alif AI Concierge',
    aiStatus: 'Online - Ready to Serve',
    aiPlaceholder: 'Ask about menu, prices, location, orders...',
    aiGreeting: 'Greetings! I am your Al Alif AI Concierge. I can assist you with our menu, prices, working hours, or placing a WhatsApp order. How can I serve you today?',
  },
  ta: {
    home: 'முகப்பு',
    menu: 'மெனு',
    gallery: 'கேலரி',
    reviews: 'மதிப்புரைகள்',
    contact: 'தொடர்பு',
    callNow: 'அழைக்கவும்',
    bookTable: 'டேபிள் முன்பதிவு',
    viewMenu: 'மெனுவை காண்க',
    tasteTradition: 'பாரம்பரிய சுவை',
    tagline: 'பிரீமியம் விறகடுப்பு பிரியாணி',
    subTagline: 'பாரம்பரிய விறகடுப்பில், தேர்ந்தெடுக்கப்பட்ட உயர்தர மசாலாக்களுடன் சமைக்கப்பட்ட சீரக சம்பா மற்றும் பாசுமதி பிரியாணியின் சுவையை அனுபவியுங்கள்.',
    reserveTable: 'ராயல் டேபிள் முன்பதிவு செய்க',
    reserveSub: 'சிறந்த அரச உணவை அனுபவியுங்கள். உங்கள் டேபிளை உடனே முன்பதிவு செய்யுங்கள்.',
    name: 'உங்கள் முழு பெயர்',
    phone: 'தொலைபேசி எண்',
    date: 'தேதியை தேர்ந்தெடுக்கவும்',
    time: 'நேரத்தை தேர்ந்தெடுக்கவும்',
    guests: 'விருந்தினர்களின் எண்ணிக்கை',
    specialRequest: 'சிறப்பு கோரிக்கை (விருப்பத்தேர்வு)',
    bookingBtn: 'முன்பதிவை உறுதிசெய்',
    bookingSuccess: 'முன்பதிவு உறுதி செய்யப்பட்டது!',
    bookingSuccessSub: 'உங்களுக்காக ஒரு டேபிள் சிறப்பாக முன்பதிவு செய்யப்பட்டுள்ளது. தங்களை உபசரிக்க காத்திருக்கிறோம்!',
    searchPlaceholder: 'சுவையான உணவைத் தேடுங்கள்...',
    all: 'அனைத்தும்',
    popular: 'மிகப் பிரபலம்',
    veg: 'சைவம் மட்டும்',
    nonVeg: 'அசைவம்',
    address: 'முகவரி',
    workingHours: 'வேله நேரம்',
    phoneNumbers: 'தொலைபேசி எண்கள்',
    specialOffers: 'ராயல் சிறப்பு சலுகைகள்',
    offersSub: 'எங்கள் மதிப்பிற்குரிய வாடிக்கையாளர்களுக்கான பிரத்யேக சலுகைகள்.',
    weekOffers: 'வார இறுதி விருந்து',
    festOffers: 'பண்டிகை தட்டு சலுகை',
    familyCombo: 'குடும்ப ராயல் காம்போ',
    limitedOffer: 'வரம்புக்குட்பட்ட சலுகை',
    offDetail1: 'ஏதேனும் 2 பிரியாணிகள் வாங்கினால், பாரம்பரிய பிரெட் அல்வா இலவசம்! (சனி-ஞாயிறு)',
    offDetail2: 'ராயல் பிரியாணி + சிக்கன் 65 + குளிர்பானம் குடும்பங்களுக்கு 15% தள்ளுபடியில்.',
    offDetail3: '4 பிரியாணிகள், 2 ஸ்டார்டர்கள் & 4 இனிப்புகள் அடங்கிய பிரமாண்ட விருந்து வெறும் ₹1299.',
    offDetail4: 'பிராந்திய பண்டிகைகள் மற்றும் பார்ட்டிகளுக்கான அனைத்து முன்பதிவுகளுக்கும் 10% தள்ளுபடி.',
    aiTitle: 'அல் அலிஃப் AI உதவியாளர்',
    aiStatus: 'ஆன்லைன் - உதவ தயார்',
    aiPlaceholder: 'மெனு, விலை, முகவரி, ஆர்டர் பற்றி கேட்கவும்...',
    aiGreeting: 'வணக்கம்! நான் உங்கள் அல் அலிஃப் AI உதவியாளர். எங்களது மெனு, விலைகள், வேலை நேரம் அல்லது வாட்ஸ்அப் ஆர்டர் பற்றி உங்களுக்கு உதவ முடியும். நான் உங்களுக்கு எவ்வாறு உதவட்டும்?',
  },
  hi: {
    home: 'मुख्य पृष्ठ',
    menu: 'मेन्यू',
    gallery: 'गैलरी',
    reviews: 'समीक्षाएं',
    contact: 'संपर्क',
    callNow: 'कॉल करें',
    bookTable: 'टेबल बुक करें',
    viewMenu: 'मेन्यू देखें',
    tasteTradition: 'पारंपरिक स्वाद',
    tagline: 'प्रीमियम लकड़ी की आंच पर बनी बिरयानी',
    subTagline: 'पारंपरिक लकड़ी की आंच पर चुनिंदा प्रीमियम मसालों के साथ पकाई गई बेहतरीन जीरा सांबा और बासमती बिरयानी का आनंद लें।',
    reserveTable: 'शाही टेबल बुक करें',
    reserveSub: 'सर्वश्रेष्ठ शाही भोजन का अनुभव करें। तुरंत अपनी टेबल बुक करें।',
    name: 'आपका पूरा नाम',
    phone: 'फ़ोन नंबर',
    date: 'तारीख चुनें',
    time: 'समय चुनें',
    guests: 'अतिथियों की संख्या',
    specialRequest: 'विशेष अनुरोध (वैकल्पिक)',
    bookingBtn: 'शाही बुकिंग की पुष्टि करें',
    bookingSuccess: 'बुकिंग की पुष्टि हो गई!',
    bookingSuccessSub: 'आपके लिए एक विशेष टेबल आरक्षित की गई है। हम आपकी सेवा करने के लिए उत्सुक हैं!',
    searchPlaceholder: 'स्वादिष्ट भोजन खोजें...',
    all: 'सभी व्यंजन',
    popular: 'सबसे लोकप्रिय',
    veg: 'केवल शाकाहारी',
    nonVeg: 'मांसाहारी',
    address: 'पता',
    workingHours: 'कार्य समय',
    phoneNumbers: 'फ़ोन नंबर',
    specialOffers: 'शाही विशेष ऑफ़र',
    offersSub: 'हमारे सम्मानित संरक्षकों के लिए उत्कृष्ट तैयार सौदे.',
    weekOffers: 'वीकेंड दावत',
    festOffers: 'त्यौहार थाली ऑफ़र',
    familyCombo: 'फैमिली रॉयल कॉम्बो',
    limitedOffer: 'सीमित समय का सौदा',
    offDetail1: 'कोई भी 2 बिरयानी खरीदें, पारंपरिक ब्रेड हलवा मुफ्त पाएं! (शनि-रवि)',
    offDetail2: 'शाही बिरयानी + चिकन 65 + पेय परिवारों के लिए 15% छूट पर।',
    offDetail3: 'मात्र ₹1299 में 4 बिरयानी, 2 स्टार्टर्स और 4 डेसर्ट का शानदार भोज।',
    offDetail4: 'क्षेत्रीय त्योहारों और पार्टियों के लिए सभी प्री-ऑर्डर पर सीधे 10% की छूट।',
    aiTitle: 'अल अलिफ एआई द्वारपाल',
    aiStatus: 'ऑनलाइन - सेवा के लिए तैयार',
    aiPlaceholder: 'मेन्यू, दाम, पता, ऑर्डर के बारे में पूछें...',
    aiGreeting: 'नमस्ते! मैं आपका अल अलिफ एआई द्वारपाल हूं। मैं मेन्यू, दाम, खुलने का समय या व्हाट्सएप ऑर्डर के बारे में आपकी सहायता कर सकता हूँ। आज मैं आपकी क्या सेवा कर सकता हूँ?',
  }
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('alalif_lang');
    return (saved as Language) || 'en';
  });

  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('alalif_theme');
    return (saved as Theme) || 'light';
  });

  useEffect(() => {
    localStorage.setItem('alalif_lang', language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem('alalif_theme', theme);
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const t = (key: string): string => {
    return translations[language][key] || translations['en'][key] || key;
  };

  return (
    <AppContext.Provider value={{ language, setLanguage, theme, toggleTheme, t }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
