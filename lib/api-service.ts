// API service for restaurant operations
import { Restaurant } from '@/types';

const API_BASE = '/api';

export type { Restaurant };

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  count?: number;
  message?: string;
  error?: string;
}

class RestaurantService {
  // Fetch all restaurants with optional filters
  async getRestaurants(filters?: {
    featured?: boolean;
    area?: string;
    cuisine?: string;
    search?: string;
  }): Promise<Restaurant[]> {
    try {
      const params = new URLSearchParams();
      if (filters?.featured) params.append('featured', 'true');
      if (filters?.area) params.append('area', filters.area);
      if (filters?.cuisine) params.append('cuisine', filters.cuisine);
      if (filters?.search) params.append('search', filters.search);

      const url = `${API_BASE}/restaurants?${params.toString()}`;
      const response = await fetch(url, {
        cache: 'no-store', // Always fetch fresh data
      });

      if (!response.ok) {
        throw new Error('Failed to fetch restaurants');
      }

      const result: ApiResponse<Restaurant[]> = await response.json();
      return result.data || [];
    } catch (error) {
      console.error('Error fetching restaurants:', error);
      return [];
    }
  }

  // Get featured restaurants
  async getFeaturedRestaurants(): Promise<Restaurant[]> {
    return this.getRestaurants({ featured: true });
  }

  // Get best places (top rated)
  async getBestPlaces(limit: number = 4): Promise<Restaurant[]> {
    const restaurants = await this.getRestaurants();
    return restaurants
      .sort((a, b) => b.rating - a.rating)
      .slice(0, limit);
  }

  // Create new restaurant
  async createRestaurant(data: Partial<Restaurant>): Promise<ApiResponse<Restaurant>> {
    try {
      const response = await fetch(`${API_BASE}/restaurants`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result: ApiResponse<Restaurant> = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || 'Failed to create restaurant');
      }

      return result;
    } catch (error: any) {
      return {
        success: false,
        error: error.message,
      };
    }
  }

  // Delete restaurant
  async deleteRestaurant(id: string): Promise<ApiResponse<void>> {
    try {
      const response = await fetch(`${API_BASE}/restaurants?id=${id}`, {
        method: 'DELETE',
      });

      const result: ApiResponse<void> = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || 'Failed to delete restaurant');
      }

      return result;
    } catch (error: any) {
      return {
        success: false,
        error: error.message,
      };
    }
  }
}

export const restaurantService = new RestaurantService();
