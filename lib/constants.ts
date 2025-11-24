export const SITE_CONFIG = {
  name: 'P. Kiran Kumar',
  title: 'Vizag Food Explorer',
  tagline: 'Discovering Vizag\'s Best Eats — one plate at a time',
  description: 'Join me on a culinary journey through Visakhapatnam\'s finest restaurants, hidden gems, and street food treasures.',
  url: 'https://vizagfoodexplorer.com',
  author: {
    name: 'P. Kiran Kumar',
    role: 'Food Reviewer & Content Creator',
    bio: 'Passionate about discovering and sharing the best culinary experiences in Visakhapatnam.',
    image: '/images/reviewer.jpg',
    social: {
      instagram: 'https://instagram.com/vizagfoodexplorer',
      facebook: 'https://facebook.com/vizagfoodexplorer',
      youtube: 'https://youtube.com/@vizagfoodexplorer',
      email: 'contact@vizagfoodexplorer.com'
    }
  },
  metrics: {
    followers: '300K+',
    reviewsCount: '150+',
    restaurantsCovered: '50+'
  }
};

export const CUISINES = [
  'All',
  'Indian',
  'Chinese',
  'Continental',
  'Italian',
  'Seafood',
  'Street Food',
  'Biryani',
  'Fast Food',
  'Cafe',
  'Desserts'
];

export const AREAS = [
  'All',
  'RK Beach',
  'Dwaraka Nagar',
  'MVP Colony',
  'Madhurawada',
  'Gajuwaka',
  'Rushikonda',
  'Siripuram',
  'Jagadamba'
];

export const PRICE_RANGES = [
  { value: 'all', label: 'All Prices' },
  { value: 'budget', label: '₹ Budget (< ₹200)' },
  { value: 'moderate', label: '₹₹ Moderate (₹200-500)' },
  { value: 'premium', label: '₹₹₹ Premium (₹500-1000)' },
  { value: 'luxury', label: '₹₹₹₹ Luxury (> ₹1000)' }
];
