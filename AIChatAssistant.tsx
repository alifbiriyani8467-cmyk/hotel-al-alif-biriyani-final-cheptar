import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, Sparkles, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../context/AppContext';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function AIChatAssistant() {
  const { t, language } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: t('aiGreeting'),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading]);

  const sendMessage = async (textToSend: string) => {
    if (!textToSend.trim()) return;

    const userMsg: Message = { role: 'user', content: textToSend };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [...messages, userMsg],
        }),
      });

      if (!response.ok) {
        throw new Error('Chat API returned an error');
      }

      const data = await response.json();
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: data.text || 'I apologize, I am experiencing a brief connection delay. Please feel free to call us directly!' },
      ]);
    } catch (err) {
      console.error('Error in AI Chat:', err);
      // Fallback response generator in case server is unavailable in current sandbox environment state
      let fallbackText = "Hello! We are famous for our hot, crispy VEG & NON-VEG STARTERS. We are open from 12:00 PM to 11:00 PM. You can browse our interactive tables or order directly on WhatsApp!";
      
      const lower = textToSend.toLowerCase();
      if (lower.includes('menu') || lower.includes('price') || lower.includes('eat') || lower.includes('food')) {
        fallbackText = "Our premium starters menu features: Chicken 65 Boneless (₹180), Chicken Lollipop Dry (₹140), Chicken Lollipop Saucy (₹170), Chicken 65 Bone-in (₹130), Paneer 65 (₹140), Mushroom 65 (₹130), Only 65 (₹120), and Gobi 65 (₹110). Click 'Add to Order' to build a custom WhatsApp order!";
      } else if (lower.includes('hour') || lower.includes('time') || lower.includes('open') || lower.includes('close')) {
        fallbackText = "We are open daily from 12:00 PM to 11:00 PM, ready to serve you fresh and piping hot wood-fired delicacies!";
      } else if (lower.includes('location') || lower.includes('address') || lower.includes('where') || lower.includes('maps')) {
        fallbackText = "You can find us premiumly located at NH Service Road, Singaperumal Koil, Vinjiambakkam, Tamil Nadu 603204. Tap the location pin floating button to see the route!";
      } else if (lower.includes('reserve') || lower.includes('book') || lower.includes('table') || lower.includes('seat')) {
        fallbackText = "We do not offer online table reservations at this time, but you are most welcome to visit us directly or place a food order on WhatsApp!";
      }

      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: fallbackText },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const quickPrompts = [
    { label: language === 'ta' ? 'மெனு & விலைகள்' : language === 'hi' ? 'मेन्यू और कीमतें' : 'Menu & Prices', query: 'Show me the menu and prices' },
    { label: language === 'ta' ? 'வேலை நேரம்' : language === 'hi' ? 'खुलने का समय' : 'Opening Hours', query: 'What are your working hours?' },
    { label: language === 'ta' ? 'முகவரி' : language === 'hi' ? 'पता' : 'Location', query: 'Where is Al Alif located?' },
    { label: language === 'ta' ? 'சிறப்பு சலுகைகள்' : language === 'hi' ? 'विशेष ऑफ़र' : 'Special Offers', query: 'What special offers do you have?' },
  ];

  return (
    <div className="fixed bottom-6 left-6 z-50 flex flex-col items-start">
      
      {/* Floating Chat Bubble Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        className="relative w-14 h-14 rounded-full bg-brand-maroon border border-brand-gold text-brand-gold flex items-center justify-center shadow-2xl hover:bg-brand-maroon-light transition-all cursor-pointer group"
        aria-label="Toggle AI Concierge"
      >
        <span className="absolute -top-1 -right-1 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-gold opacity-75"></span>
          <span className="relative inline-flex rounded-full h-4 w-4 bg-brand-gold text-[8px] font-bold text-brand-maroon-dark items-center justify-center">AI</span>
        </span>
        {isOpen ? <X className="w-6 h-6" /> : <Bot className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />}
      </motion.button>

      {/* Floating Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 30 }}
            transition={{ type: 'spring', damping: 22 }}
            className="absolute bottom-20 left-0 w-[350px] sm:w-[400px] h-[500px] rounded-3xl bg-white dark:bg-stone-900 border border-brand-gold/25 shadow-2xl overflow-hidden flex flex-col z-50"
          >
            {/* Chat Header */}
            <div className="p-4 bg-brand-maroon-dark text-white flex items-center justify-between border-b border-brand-gold/15">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-xl bg-brand-gold/10 border border-brand-gold/30">
                  <Bot className="w-5 h-5 text-brand-gold" />
                </div>
                <div>
                  <h4 className="font-serif text-sm font-bold text-brand-gold-light tracking-wide">{t('aiTitle')}</h4>
                  <div className="flex items-center space-x-1.5 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[10px] text-white/60 tracking-wider uppercase font-medium">{t('aiStatus')}</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Close Chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Chat Message Scrollport */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-brand-cream/40 dark:bg-stone-950/40">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 text-xs leading-relaxed shadow-md ${
                      msg.role === 'user'
                        ? 'bg-brand-maroon text-white rounded-br-none border border-brand-gold/10'
                        : 'bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-200 border border-brand-gold/15 rounded-bl-none'
                    }`}
                  >
                    {msg.role === 'assistant' && (
                      <div className="flex items-center space-x-1.5 text-brand-gold mb-1">
                        <Sparkles className="w-3 h-3" />
                        <span className="text-[9px] font-sans font-bold uppercase tracking-widest">Concierge</span>
                      </div>
                    )}
                    <p className="whitespace-pre-line">{msg.content}</p>
                  </div>
                </div>
              ))}
              
              {/* Animated Typing Indicator */}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white dark:bg-stone-900 border border-brand-gold/15 rounded-2xl rounded-bl-none px-4 py-3 text-xs text-stone-400 flex items-center space-x-1.5 shadow-md">
                    <Bot className="w-3.5 h-3.5 text-brand-gold animate-bounce" />
                    <div className="flex space-x-1">
                      <span className="w-1.5 h-1.5 bg-brand-gold/60 rounded-full animate-bounce [animation-delay:-0.3s]" />
                      <span className="w-1.5 h-1.5 bg-brand-gold/60 rounded-full animate-bounce [animation-delay:-0.15s]" />
                      <span className="w-1.5 h-1.5 bg-brand-gold/60 rounded-full animate-bounce" />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Suggestions panel */}
            <div className="px-4 py-2 bg-brand-cream/20 dark:bg-stone-950/20 flex gap-2 overflow-x-auto whitespace-nowrap scrollbar-none border-t border-brand-gold/5">
              {quickPrompts.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => sendMessage(prompt.query)}
                  className="px-3 py-1.5 bg-white dark:bg-stone-900 hover:bg-brand-maroon hover:text-white border border-brand-gold/20 text-[10px] font-semibold text-brand-maroon-dark dark:text-brand-gold rounded-full transition-all cursor-pointer shrink-0"
                >
                  {prompt.label}
                </button>
              ))}
            </div>

            {/* Input Form Footer */}
            <form onSubmit={handleSend} className="p-3 border-t border-brand-gold/15 bg-white dark:bg-stone-900 flex items-center space-x-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={t('aiPlaceholder')}
                disabled={isLoading}
                className="flex-1 px-4 py-2.5 rounded-xl border border-brand-gold/10 dark:border-stone-800 focus:outline-none focus:border-brand-gold bg-brand-cream/30 dark:bg-stone-950 text-xs text-stone-800 dark:text-stone-100 disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="p-2.5 rounded-xl bg-brand-maroon hover:bg-brand-maroon-light text-brand-gold disabled:opacity-40 transition-colors cursor-pointer shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
