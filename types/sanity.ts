export interface SanityRestaurant {
  _id: string;
  _type: 'restaurant';
  _createdAt: string;
  _updatedAt: string;
  name: string;
  slug: {
    current: string;
  };
  description: string;
  cuisine: string[];
  area: string;
  location: string;
  priceRange: 'budget' | 'moderate' | 'premium';
  rating: number;
  coverImage: {
    asset: {
      _ref: string;
      _type: 'reference';
    };
    alt?: string;
  };
  gallery?: Array<{
    asset: {
      _ref: string;
      _type: 'reference';
    };
    alt?: string;
  }>;
  featured: boolean;
  openingHours?: string;
  phone?: string;
  website?: string;
  specialties?: string[];
  ambiance?: string;
  serviceQuality?: number;
  foodQuality?: number;
  valueForMoney?: number;
  reviewText?: string;
  visitDate?: string;
  wouldRecommend?: boolean;
}

export interface CreateRestaurantInput {
  name: string;
  description: string;
  cuisine: string[];
  area: string;
  location: string;
  priceRange: 'budget' | 'moderate' | 'premium';
  rating: number;
  coverImage: string;
  featured: boolean;
  openingHours?: string;
  phone?: string;
  website?: string;
  specialties?: string[];
  ambiance?: string;
  serviceQuality?: number;
  foodQuality?: number;
  valueForMoney?: number;
  reviewText?: string;
}
