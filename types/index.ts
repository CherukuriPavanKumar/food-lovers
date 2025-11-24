export interface Restaurant {
  id: string;
  name: string;
  slug: string;
  cuisine: string[];
  area: string;
  rating: number;
  priceRange: 'budget' | 'moderate' | 'premium' | 'luxury';
  coverImage: string;
  gallery?: string[];
  description: string;
  highlights?: string[];
  address?: string;
  location?: {
    lat: number;
    lng: number;
  } | string;
  reviewDate?: string;
  featured?: boolean;
  bestPlace?: boolean;
  openingHours?: string;
  phone?: string;
  website?: string;
  specialties?: string[];
  ambiance?: string | number;
  serviceQuality?: number;
  foodQuality?: number;
  valueForMoney?: number;
  reviewText?: string;
  visitDate?: string;
  wouldRecommend?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface Review extends Restaurant {
  fullReview?: string;
  ambiance: number;
  service: number;
  taste: number;
  valueForMoney: number;
  mustTryDishes?: string[];
}

export interface SiteMetrics {
  followers: string;
  reviewsCount: string;
  restaurantsCovered: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  businessName?: string;
  message: string;
  type: 'collaboration' | 'general' | 'business';
}

export interface Award {
  _id: string;
  title: string;
  description: string;
  year: number;
  organization?: string;
  image: string;
  featured?: boolean;
  displayOrder?: number;
}
