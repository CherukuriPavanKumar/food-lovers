'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FilterBar, { FilterState } from '@/components/reviews/FilterBar';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, ArrowRight } from 'lucide-react';
import Card from '@/components/ui/Card';
import StarRating from '@/components/ui/StarRating';
import { restaurantService } from '@/lib/api-service';
import type { Restaurant } from '@/types';

export default function ReviewsPage() {
  const [allReviews, setAllReviews] = useState<Restaurant[]>([]);
  const [filteredReviews, setFilteredReviews] = useState<Restaurant[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch restaurants from API
  useEffect(() => {
    async function fetchRestaurants() {
      setIsLoading(true);
      const data = await restaurantService.getRestaurants();
      setAllReviews(data);
      setFilteredReviews(data);
      setIsLoading(false);
    }
    fetchRestaurants();
  }, []);

  const handleFilterChange = (filters: FilterState) => {
    let filtered = [...allReviews];

    // Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(
        (review) =>
          review.name.toLowerCase().includes(searchLower) ||
          review.description.toLowerCase().includes(searchLower) ||
          review.area.toLowerCase().includes(searchLower)
      );
    }

    // Cuisine filter
    if (filters.cuisine !== 'All') {
      filtered = filtered.filter((review) =>
        review.cuisine.includes(filters.cuisine)
      );
    }

    // Area filter
    if (filters.area !== 'All') {
      filtered = filtered.filter((review) => review.area === filters.area);
    }

    // Price range filter
    if (filters.priceRange !== 'all') {
      filtered = filtered.filter((review) => review.priceRange === filters.priceRange);
    }

    // Rating filter
    if (filters.minRating > 0) {
      filtered = filtered.filter((review) => review.rating >= filters.minRating);
    }

    setFilteredReviews(filtered);
  };

  return (
    <>
      <Header />
      <main className="min-h-screen pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              All Reviews
            </h1>
            <p className="text-xl text-gray-600">
              {isLoading ? 'Loading...' : `Explore all ${allReviews.length} restaurant reviews`}
            </p>
          </div>

          <FilterBar onFilterChange={handleFilterChange} />

          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-emerald-600 border-t-transparent"></div>
            </div>
          ) : filteredReviews.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-xl text-gray-600">No restaurants found matching your criteria.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredReviews.map((review) => (
                <Link key={review.id} href={`/reviews/${review.slug}`}>
                  <Card className="h-full group cursor-pointer">
                    <div className="relative h-56 overflow-hidden">
                      <Image
                        src={review.coverImage}
                        alt={review.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full shadow-lg">
                        <StarRating rating={review.rating} size={16} showNumber={false} />
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors">
                        {review.name}
                      </h3>
                      
                      <div className="flex items-center gap-2 text-gray-600 mb-3">
                        <MapPin size={16} />
                        <span className="text-sm">{review.area}</span>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-3">
                        {review.cuisine.slice(0, 2).map((cuisine) => (
                          <span
                            key={cuisine}
                            className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs"
                          >
                            {cuisine}
                          </span>
                        ))}
                      </div>

                      <p className="text-gray-600 mb-4 line-clamp-2">
                        {review.description}
                      </p>

                      <div className="flex items-center justify-between">
                        <StarRating rating={review.rating} size={18} />
                        <span className="text-emerald-600 font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                          Read More <ArrowRight size={16} />
                        </span>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
