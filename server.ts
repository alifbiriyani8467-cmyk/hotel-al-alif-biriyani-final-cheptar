import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialize Gemini API to prevent crashes on startup
let aiClient: GoogleGenAI | null = null;

function getAI(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn("GEMINI_API_KEY environment variable is not defined. Falling back to local assistant mode.");
    return null;
  }
  if (!aiClient) {
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

const RESTAURANT_SYSTEM_INSTRUCTION = `
You are the Al Alif AI Concierge, a helpful, polite, and highly professional virtual assistant for "Hotel Al Alif Biriyani" located in Singaperumal Koil. Your goal is to guide patrons with information about our luxury restaurant.

Here is the exact truth and info you must use to answer:
1. Restaurant Identity: Hotel Al Alif Biriyani (Famous for traditional wood-fired premium Seeraga Samba and Basmati Biriyanis cooked to perfection).
2. Physical Location / Address: 
   Q242+GWF,
   NH Service Road,
   Singaperumal Koil,
   Vinjiambakkam,
   Tamil Nadu 603204
3. Phone Numbers: 
   - +91 7395964901 (Primary & WhatsApp)
   - +91 7904918467
4. Working Hours: 
   - 12:00 PM – 11:00 PM (Daily Open)
5. Our Premium Menu Categories and Pricing:
   - Category 1: VEG & NON-VEG STARTERS:
     * Chicken 65 (Bone) - ₹130 (Tender bone-in chicken marinated in signature Southern spices and crisp-fried)
     * Chicken 65 (Boneless) - ₹180 (Crispy boneless chicken bites with fresh ginger-garlic and curry leaves)
     * Chicken Lollipop Dry - ₹140 (Seasoned chicken drummettes fried golden-brown and served dry)
     * Chicken Lollipop Saucy - ₹170 (Crispy glazed drummettes coated in sweet, spicy, and tangy special sauce)
     * Only 65 - ₹120 (Signature super crispy nuggets heavily spiced with 65 seasoning)
     * Gobi 65 - ₹110 (Deep-spiced rice batter dipped crunchy cauliflower florets)
     * Paneer 65 - ₹140 (Premium paneer chunks tossed in Southern herbs and fried)
     * Mushroom 65 - ₹130 (Fresh button mushrooms marinated in handpicked spices and fried)
   - Category 2: CHICKEN GRAVY / DRY:
     * Chilli Chicken Dry - ₹150 (Tender crispy chicken chunks tossed in a savory, spicy, and tangy chili-soy sauce)
     * Chilli Chicken Gravy - ₹170 (Delectable battered chicken bites simmered in a rich, spicy, and tangy Indo-Chinese dark chili gravy)
     * Chicken Manchurian Dry - ₹160 (Crispy chicken bits tossed with finely chopped garlic, ginger, green chilies, and tangy Manchurian glaze)
     * Chicken Manchurian Gravy - ₹180 (Juicy chicken chunks cooked in a succulent, velvety ginger-garlic Manchurian sauce)
     * Chicken Masala - ₹160 (Traditional home-style chicken curry slow-cooked with fresh tomatoes, onions, and freshly ground country spices)
     * Only Chicken Masala - ₹170 (An intense, extra-thick rich chicken gravy made with our secret spice paste, cooked slowly)
     * Pepper Chicken Masala - ₹170 (A fiery, semi-dry preparation featuring tender chicken tossed with cracked black pepper and curry leaves)
     * Chettinadu Chicken Masala - ₹180 (An aromatic South Indian classic cooked with roasted coconut, fennel, star anise, and signature Chettinad spices)
     * Chicken Fry - ₹170 (Deep-marinated country chicken pieces wok-tossed with aromatic spices and caramelized curry leaves)
     * Butter Chicken Masala - ₹190 (Rich, velvety, and mildly sweet tomato-cashew cream gravy loaded with roasted chicken tikka pieces)

6. Reservation / Table Booking:
   - We do not offer online table reservations at this time. Customers are welcome to visit us directly or place a food delivery/takeout order.
   - Alternatively, they can call us at +91 7395964901 for any special dining inquiries.

7. WhatsApp Order:
   - We support home delivery and takeouts via WhatsApp!
   - Customers can build their order on the website menu and click "Send Order via WhatsApp", or directly message us on WhatsApp at +91 7395964901.

8. Special Offers:
   - Weekend Feast: Buy any 2 Biriyanis, get a traditional Bread Halwa FREE! (Sat-Sun)
   - Family Royal Combo: 4 Biriyanis, 2 Starters & 4 Desserts at just ₹1299.
   - Festival Platter: 10% off on all pre-orders for regional festivals & parties.
   - Weekend Family Deal: Royal Biriyani + Chicken 65 + Beverage at 15% discount for families.

Guidelines for response:
- Be warm, hospitable, and write in a premium, elegant style.
- Give concise answers. If asked about the menu, mention a few popular items (like Mutton Biriyani, Chicken 65, Elaneer Payasam, Bread Halwa) or list them beautifully.
- If asked to place an order, kindly guide the user to use our Menu Builder on the webpage, or contact us directly on WhatsApp.
- Maintain a helpful tone. Keep responses within 2-3 short, highly readable paragraphs or bullet points.

9. Expanded Mutton Gravy & Seafood Selection:
   - Category 3: MUTTON GRAVY / DRY:
     * Mutton Masala - ₹220
     * Chettinadu Mutton Masala - ₹230
     * Mutton Fry - ₹200
     * Mutton Pepper Fry - ₹220
     * Prawns Masala - ₹180
     * Chettinadu Prawns Masala - ₹190
     * Fish Masala - ₹210
     * Kadai Chicken - ₹180
     * Mutton Thala Curry - ₹140
     * Mutton Boti - ₹120
     * Mutton Payya - ₹130
   - Category 4: PAROTTA & CHAPATTI:
     * Parotta (1 Piece) - ₹20
     * Veechu Parotta - ₹25
     * Ceylon Parotta - ₹100
     * Chicken Ceylon Parotta - ₹140
     * Egg Lappa - ₹40
     * Egg Kuthu Parotta - ₹110
     * Chicken Kuthu Parotta - ₹140
     * Veg Kuthu Parotta - ₹100
     * Chilli Parotta - ₹130
     * Chapatti (1 Set) - ₹40
    - Category 5: DOSAI:
      * Plain Dosa - ₹40
      * Egg Dosa - ₹60
      * Kal Dosa - ₹20
      * Ghee Dosa - ₹60
      * Podi Dosa - ₹50
      * Special Dosa - ₹60
      * Chicken Kari Dosa - ₹100
      * Mutton Kari Dosa - ₹130
    - Category 6: OMELETTE:
      * Onion Omelette - ₹20
      * Plain Omelette - ₹20
      * Masala Omelette - ₹30
      * Kalakki - ₹20
      * Chicken Omelette - ₹50
      * Egg Podimas - ₹60
      * Half Boiled - ₹20
    - Category 7: TANDOORI & GRILL:
      * Tandoori Chicken (Full) - ₹440
      * Tandoori Chicken (Half) - ₹230
      * Tandoori Chicken (Quarter) - ₹120
      * Grill Chicken (Full) - ₹440
      * Grill Chicken (Half) - ₹230
      * Grill Chicken (Quarter) - ₹120
      * BBQ Chicken (Full) - ₹450
      * BBQ Chicken (Half) - ₹240
      * BBQ Chicken (Quarter) - ₹130
      * Chicken Tikka (6 Pieces) - ₹180
    - Category 8: VEG GRAVY & DRY:
      * Chilli Gobi Dry - ₹120
      * Chilli Gobi Gravy - ₹130
      * Gobi Manchurian Dry - ₹120
      * Gobi Manchurian Gravy - ₹130
      * Chilli Mushroom Dry - ₹130
      * Chilli Mushroom Gravy - ₹140
      * Mushroom Manchurian Dry - ₹130
      * Mushroom Manchurian Gravy - ₹140
      * Chilli Paneer Dry - ₹150
      * Chilli Paneer Gravy - ₹170
      * Paneer Manchurian Dry - ₹150
      * Paneer Manchurian Gravy - ₹170
      * Paneer Masala - ₹140
      * Paneer Butter Masala - ₹160
    - Category 9: SEAFOOD STARTERS:
      * Ahlla Fish Fry (1 Piece) - ₹70
      * Nethili Fish Fry (1 Plate) - ₹190
      * Chilli Fish Dry - ₹180
      * Chilli Fish Gravy - ₹190
      * Fish Manchurian Dry - ₹180
      * Fish Manchurian Gravy - ₹190
      * Fish Masala - ₹170
      * Chettinadu Fish Masala - ₹180
      * Prawns 65 - ₹180
      * Prawns Masala - ₹170
      * Chettinadu Prawns - ₹180
      * Prawns Pepper Fry - ₹190
`;

// AI Assistant Chat API Endpoint (Updated)
app.post('/api/chat', async (req, res) => {
  try {
    const { messages } = req.body;
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Invalid messages body' });
    }

    const lastUserMessage = messages[messages.length - 1]?.content || '';

    const ai = getAI();
    if (!ai) {
      // SMART FALLBACK ASSISTANT (Rule-based answers)
      const lowercaseMsg = lastUserMessage.toLowerCase();
      let reply = "Thank you for contacting Hotel Al Alif Biriyani! ";

      if (lowercaseMsg.includes('menu') || lowercaseMsg.includes('eat') || lowercaseMsg.includes('food') || lowercaseMsg.includes('price') || lowercaseMsg.includes('rate') || lowercaseMsg.includes('chicken') || lowercaseMsg.includes('mutton') || lowercaseMsg.includes('prawn') || lowercaseMsg.includes('fish') || lowercaseMsg.includes('parotta') || lowercaseMsg.includes('chapatti') || lowercaseMsg.includes('dosa') || lowercaseMsg.includes('dosai') || lowercaseMsg.includes('omelette') || lowercaseMsg.includes('egg') || lowercaseMsg.includes('tandoori') || lowercaseMsg.includes('grill') || lowercaseMsg.includes('bbq') || lowercaseMsg.includes('tikka') || lowercaseMsg.includes('paneer') || lowercaseMsg.includes('gobi') || lowercaseMsg.includes('mushroom') || lowercaseMsg.includes('seafood') || lowercaseMsg.includes('shrimp') || lowercaseMsg.includes('starters') || lowercaseMsg.includes('gravy') || lowercaseMsg.includes('dry') || lowercaseMsg.includes('65')) {
        reply += "Our premium menu features: \n1) VEG & NON-VEG STARTERS (Chicken 65 Boneless at ₹180, Chicken Lollipop Dry at ₹140, Paneer 65 at ₹140, Mushroom 65 at ₹130, and Gobi 65 at ₹110)\n2) CHICKEN GRAVY / DRY (Butter Chicken Masala at ₹190, Chilli Chicken Dry at ₹150, Chilli Chicken Gravy at ₹170, and Chettinadu Chicken Masala at ₹180)\n3) MUTTON GRAVY / DRY (Chettinadu Mutton Masala at ₹230, Mutton Pepper Fry at ₹220, Prawns Masala at ₹180, Fish Masala at ₹210)\n4) PAROTTA & CHAPATTI (Chicken Ceylon Parotta at ₹140, Chilli Parotta at ₹130, Egg Kuthu Parotta at ₹110, Parotta at ₹20, Chapatti at ₹40)\n5) DOSAI (Chicken Kari Dosa at ₹100, Mutton Kari Dosa at ₹130, Plain Dosa at ₹40, Ghee Dosa at ₹60, Podi Dosa at ₹50)\n6) OMELETTE (Onion Omelette at ₹20, Masala Omelette at ₹30, Kalakki at ₹20, Chicken Omelette at ₹50, Egg Podimas at ₹60)\n7) TANDOORI & GRILL (Tandoori Chicken Full at ₹440, Grill Chicken Full at ₹440, BBQ Chicken Full at ₹450, Chicken Tikka at ₹180)\n8) VEG GRAVY & DRY (Paneer Butter Masala at ₹160, Chilli Gobi Dry at ₹120, Chilli Paneer Gravy at ₹170, Mushroom Manchurian Dry at ₹130)\n9) SEAFOOD STARTERS (Ahlla Fish Fry at ₹70, Nethili Fish Fry at ₹190, Prawns 65 at ₹180, Prawns Pepper Fry at ₹190, Chilli Fish at ₹180).\n\nYou can browse the interactive tables and order directly via WhatsApp on our webpage!";
      } else if (lowercaseMsg.includes('hour') || lowercaseMsg.includes('time') || lowercaseMsg.includes('open') || lowercaseMsg.includes('close') || lowercaseMsg.includes('when')) {
        reply += "We are delighted to serve you daily from 12:00 PM to 11:00 PM. We hope to see you soon!";
      } else if (lowercaseMsg.includes('location') || lowercaseMsg.includes('address') || lowercaseMsg.includes('where') || lowercaseMsg.includes('maps') || lowercaseMsg.includes('locate') || lowercaseMsg.includes('place')) {
        reply += "We are premiumly located right on the NH Service Road, Singaperumal Koil, Vinjiambakkam, Tamil Nadu 603204 (Google Maps shortcode: Q242+GWF). You can also click the floating map icon to find turn-by-turn navigation.";
      } else if (lowercaseMsg.includes('book') || lowercaseMsg.includes('reserve') || lowercaseMsg.includes('table') || lowercaseMsg.includes('seat')) {
        reply += "You can book a premium royal table instantly by scrolling to the 'Book a Table' form on our page! Fill in your details (Name, Guests, Date/Time), and we will have a royal dining setup ready for you.";
      } else if (lowercaseMsg.includes('whatsapp') || lowercaseMsg.includes('order') || lowercaseMsg.includes('delivery') || lowercaseMsg.includes('takeaway')) {
        reply += "We support fast home delivery and premium takeouts. You can compile your favorite items on our interactive menu and tap 'Send Order via WhatsApp' to chat with us, or message us directly on WhatsApp at +91 7395964901.";
      } else if (lowercaseMsg.includes('contact') || lowercaseMsg.includes('phone') || lowercaseMsg.includes('call') || lowercaseMsg.includes('number')) {
        reply += "You can reach us at our direct helplines: +91 7395964901 or +91 7904918467. We are happy to assist!";
      } else if (lowercaseMsg.includes('offer') || lowercaseMsg.includes('discount') || lowercaseMsg.includes('deal')) {
        reply += "We have premium specials! Enjoy our Weekend Feast (get Bread Halwa free with 2 Biriyanis), our Family Royal Combo (4 Biriyanis + 2 Starters + 4 Desserts for just ₹1299), or our 15% family discount on Biriyani + Chicken 65 combos!";
      } else {
        reply += "I can help you with our menu, prices, working hours, exact address, table booking, or WhatsApp delivery! How can I assist you with your dining experience today?";
      }

      return res.json({ text: reply });
    }

    // Call actual Gemini API with search grounding capabilities
    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: lastUserMessage,
      config: {
        systemInstruction: RESTAURANT_SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });

    return res.json({ text: response.text });

  } catch (error: any) {
    console.error('Error in AI Chat API route:', error);
    res.status(500).json({ error: 'Server error processing your request.' });
  }
});

// Configure Vite or Static Asset Serving
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    // Serve index.html for SPA fallback
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Hotel Al Alif server listening on http://localhost:${PORT}`);
  });
}

startServer();
