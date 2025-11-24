import { Review } from '@/types';

// Mock data for development - Replace with Sanity CMS data in production
export const mockReviews: Review[] = [
  {
    id: '1',
    name: 'The Spice Route',
    slug: 'the-spice-route',
    cuisine: ['Indian', 'Continental'],
    area: 'RK Beach',
    rating: 4.8,
    priceRange: 'premium',
    coverImage: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80',
      'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80',
      'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&q=80'
    ],
    description: 'Elegant beachfront dining with authentic North Indian cuisine and stunning sea views.',
    highlights: ['Beachfront seating', 'Live music weekends', 'Premium cocktails'],
    address: 'Beach Road, RK Beach, Visakhapatnam',
    location: { lat: 17.7231, lng: 83.3260 },
    reviewDate: '2024-11-15',
    featured: true,
    bestPlace: true,
    fullReview: 'An exceptional dining experience that combines coastal ambiance with culinary excellence...',
    ambiance: 5,
    service: 4.5,
    taste: 4.8,
    valueForMoney: 4,
    mustTryDishes: ['Butter Chicken', 'Tandoori Platter', 'Seafood Biryani']
  },
  {
    id: '2',
    name: 'Bamboo Bay',
    slug: 'bamboo-bay',
    cuisine: ['Chinese', 'Asian'],
    area: 'Dwaraka Nagar',
    rating: 4.5,
    priceRange: 'moderate',
    coverImage: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800&q=80',
      'https://images.unsplash.com/photo-1526318896980-cf78c088247c?w=800&q=80'
    ],
    description: 'Authentic Chinese cuisine with a modern twist in a cozy bamboo-themed setting.',
    highlights: ['Dim Sum Sundays', 'Wok-tossed specialties', 'Bubble tea bar'],
    address: 'Main Road, Dwaraka Nagar, Visakhapatnam',
    location: { lat: 17.7146, lng: 83.3140 },
    reviewDate: '2024-11-10',
    featured: true,
    bestPlace: false,
    fullReview: 'Bamboo Bay brings authentic flavors of the Orient to Vizag...',
    ambiance: 4.5,
    service: 4.5,
    taste: 4.8,
    valueForMoney: 5,
    mustTryDishes: ['Dim Sum Platter', 'Sichuan Chicken', 'Hakka Noodles']
  },
  {
    id: '3',
    name: 'Coastal Bistro',
    slug: 'coastal-bistro',
    cuisine: ['Seafood', 'Continental'],
    area: 'Rushikonda',
    rating: 4.7,
    priceRange: 'premium',
    coverImage: 'https://images.unsplash.com/photo-1551218372-a8789b81b253?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1551218372-a8789b81b253?w=800&q=80',
      'https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?w=800&q=80'
    ],
    description: 'Fresh seafood paradise with ocean views and innovative coastal cuisine.',
    highlights: ['Fresh catch daily', 'Sunset views', 'Chef specials'],
    address: 'Beach Road, Rushikonda, Visakhapatnam',
    location: { lat: 17.7838, lng: 83.3859 },
    reviewDate: '2024-11-08',
    featured: false,
    bestPlace: true,
    fullReview: 'For seafood lovers, Coastal Bistro is a must-visit destination...',
    ambiance: 5,
    service: 4.5,
    taste: 4.7,
    valueForMoney: 4.5,
    mustTryDishes: ['Grilled Pomfret', 'Prawn Tandoori', 'Fish Curry']
  },
  {
    id: '4',
    name: 'Street Spice Corner',
    slug: 'street-spice-corner',
    cuisine: ['Street Food', 'Indian'],
    area: 'MVP Colony',
    rating: 4.3,
    priceRange: 'budget',
    coverImage: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&q=80'
    ],
    description: 'Authentic street food flavors in a hygienic quick-service format.',
    highlights: ['Pani puri bar', 'Late night service', 'Budget-friendly'],
    address: 'MVP Colony, Sector 1, Visakhapatnam',
    location: { lat: 17.7563, lng: 83.3230 },
    reviewDate: '2024-11-05',
    featured: true,
    bestPlace: false,
    fullReview: 'Bringing the authentic taste of Indian street food with quality ingredients...',
    ambiance: 3.5,
    service: 4,
    taste: 4.5,
    valueForMoney: 5,
    mustTryDishes: ['Pani Puri', 'Pav Bhaji', 'Dahi Puri']
  },
  {
    id: '5',
    name: 'Biryani House',
    slug: 'biryani-house',
    cuisine: ['Biryani', 'Indian'],
    area: 'Gajuwaka',
    rating: 4.6,
    priceRange: 'moderate',
    coverImage: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800&q=80'
    ],
    description: 'Traditional Hyderabadi biryani with secret family recipes passed down generations.',
    highlights: ['Dum cooking', 'Family recipes', 'Authentic spices'],
    address: 'Main Road, Gajuwaka, Visakhapatnam',
    location: { lat: 17.7005, lng: 83.2109 },
    reviewDate: '2024-11-01',
    featured: false,
    bestPlace: true,
    fullReview: 'The aroma of slow-cooked biryani welcomes you to this hidden gem...',
    ambiance: 4,
    service: 4.5,
    taste: 5,
    valueForMoney: 4.5,
    mustTryDishes: ['Chicken Dum Biryani', 'Mutton Biryani', 'Double Ka Meetha']
  }
];

export const getFeaturedReviews = () => mockReviews.filter(r => r.featured).slice(0, 5);
export const getBestPlaces = () => mockReviews.filter(r => r.bestPlace);
export const getReviewBySlug = (slug: string) => mockReviews.find(r => r.slug === slug);
