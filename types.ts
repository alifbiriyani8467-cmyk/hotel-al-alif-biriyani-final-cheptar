export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'biriyani' | 'chicken' | 'mutton' | 'grill' | 'starters' | 'rice' | 'beverages' | 'desserts' | 'parotta' | 'dosa' | 'omelette' | 'veggravy' | 'seafood';
  isVeg: boolean;
  isPopular?: boolean;
  image: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'dishes' | 'ambience' | 'all';
  image: string;
}

export interface Testimonial {
  id: string;
  name: string;
  rating: number;
  text: string;
  date: string;
}
