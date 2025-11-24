'use client';

import { useState } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { Plus, X, Upload, MapPin, DollarSign, Star, Utensils, Image as ImageIcon, Save, Trash2 } from 'lucide-react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

interface NewRestaurant {
  name: string;
  description: string;
  cuisine: string[];
  area: string;
  location: string;
  priceRange: 'budget' | 'moderate' | 'premium';
  rating: number;
  coverImage: string;
  featured: boolean;
}

export default function AdminPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newRestaurant, setNewRestaurant] = useState<NewRestaurant>({
    name: '',
    description: '',
    cuisine: [],
    area: '',
    location: '',
    priceRange: 'moderate',
    rating: 4.0,
    coverImage: '',
    featured: false,
  });
  const [cuisineInput, setCuisineInput] = useState('');
  const [imagePreview, setImagePreview] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!newRestaurant.name.trim()) {
      alert('Restaurant name is required');
      return;
    }
    if (!newRestaurant.description.trim()) {
      alert('Description is required');
      return;
    }
    if (newRestaurant.cuisine.length === 0) {
      alert('Please add at least one cuisine type');
      return;
    }
    if (!newRestaurant.area.trim()) {
      alert('Area is required');
      return;
    }
    if (!newRestaurant.coverImage.trim()) {
      alert('Cover image URL is required');
      return;
    }
    if (newRestaurant.rating < 0 || newRestaurant.rating > 5) {
      alert('Rating must be between 0 and 5');
      return;
    }
    
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/local/restaurants', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newRestaurant),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create restaurant');
      }

      alert(`✅ ${data.message}\n\nRestaurant "${newRestaurant.name}" has been successfully added to the database!`);
      resetForm();
      setIsOpen(false);
      
      // Reload the page to show new restaurant
      window.location.reload();
    } catch (error: any) {
      alert(`❌ Error: ${error.message}\n\nPlease try again or contact support.`);
      console.error('Error creating restaurant:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setNewRestaurant({
      name: '',
      description: '',
      cuisine: [],
      area: '',
      location: '',
      priceRange: 'moderate',
      rating: 4.0,
      coverImage: '',
      featured: false,
    });
    setCuisineInput('');
    setImagePreview('');
  };

  const addCuisine = () => {
    if (cuisineInput.trim() && !newRestaurant.cuisine.includes(cuisineInput.trim())) {
      setNewRestaurant({
        ...newRestaurant,
        cuisine: [...newRestaurant.cuisine, cuisineInput.trim()]
      });
      setCuisineInput('');
    }
  };

  const removeCuisine = (cuisine: string) => {
    setNewRestaurant({
      ...newRestaurant,
      cuisine: newRestaurant.cuisine.filter(c => c !== cuisine)
    });
  };

  const handleImageUrl = (url: string) => {
    setNewRestaurant({ ...newRestaurant, coverImage: url });
    setImagePreview(url);
  };

  return (
    <>
      {/* Floating Admin Button */}
      <m.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1 }}
        className="fixed bottom-8 right-8 z-50"
      >
        <Button
          onClick={() => setIsOpen(true)}
          className="!rounded-full !w-16 !h-16 shadow-2xl hover:shadow-emerald-500/50 transition-all duration-300"
        >
          <Plus size={28} />
        </Button>
      </m.div>

      {/* Admin Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            />

            {/* Modal */}
            <m.div
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 50 }}
              className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-4xl max-h-[90vh] overflow-auto z-50"
            >
              <Card className="p-6 md:p-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                    <Plus className="text-emerald-600" size={32} />
                    Add New Restaurant
                  </h2>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <X size={24} />
                  </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Image Upload */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Cover Image URL *
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="url"
                        value={newRestaurant.coverImage}
                        onChange={(e) => handleImageUrl(e.target.value)}
                        required
                        className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        placeholder="https://example.com/image.jpg"
                        suppressHydrationWarning
                      />
                      <Button type="button" variant="outline" onClick={() => handleImageUrl(newRestaurant.coverImage)}>
                        <ImageIcon size={20} />
                        Preview
                      </Button>
                    </div>
                    {imagePreview && (
                      <div className="mt-4 relative h-48 rounded-lg overflow-hidden">
                        <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                      </div>
                    )}
                  </div>

                  {/* Restaurant Name */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Restaurant Name *
                    </label>
                    <input
                      type="text"
                      value={newRestaurant.name}
                      onChange={(e) => setNewRestaurant({ ...newRestaurant, name: e.target.value })}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      placeholder="The Spice Garden"
                      suppressHydrationWarning
                    />
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Description *
                    </label>
                    <textarea
                      value={newRestaurant.description}
                      onChange={(e) => setNewRestaurant({ ...newRestaurant, description: e.target.value })}
                      required
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none"
                      placeholder="Describe the restaurant, ambiance, and highlights..."
                    />
                  </div>

                  {/* Cuisine Tags */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Cuisine Types *
                    </label>
                    <div className="flex gap-2 mb-3">
                      <input
                        type="text"
                        value={cuisineInput}
                        onChange={(e) => setCuisineInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addCuisine())}
                        className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        placeholder="e.g., Indian, Chinese"
                        suppressHydrationWarning
                      />
                      <Button type="button" onClick={addCuisine} variant="outline">
                        <Plus size={20} />
                        Add
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {newRestaurant.cuisine.map((cuisine) => (
                        <span
                          key={cuisine}
                          className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm flex items-center gap-2"
                        >
                          <Utensils size={14} />
                          {cuisine}
                          <button
                            type="button"
                            onClick={() => removeCuisine(cuisine)}
                            className="hover:text-red-600"
                          >
                            <X size={14} />
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Location Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Area *
                      </label>
                      <select
                        value={newRestaurant.area}
                        onChange={(e) => setNewRestaurant({ ...newRestaurant, area: e.target.value })}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      >
                        <option value="">Select Area</option>
                        <option value="MVP Colony">MVP Colony</option>
                        <option value="Rushikonda">Rushikonda</option>
                        <option value="Beach Road">Beach Road</option>
                        <option value="Madhurawada">Madhurawada</option>
                        <option value="Dwaraka Nagar">Dwaraka Nagar</option>
                        <option value="Gajuwaka">Gajuwaka</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Full Address *
                      </label>
                      <input
                        type="text"
                        value={newRestaurant.location}
                        onChange={(e) => setNewRestaurant({ ...newRestaurant, location: e.target.value })}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        placeholder="Full address for Google Maps"
                        suppressHydrationWarning
                      />
                    </div>
                  </div>

                  {/* Price Range & Rating */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Price Range *
                      </label>
                      <select
                        value={newRestaurant.priceRange}
                        onChange={(e) => setNewRestaurant({ ...newRestaurant, priceRange: e.target.value as any })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      >
                        <option value="budget">Budget (₹)</option>
                        <option value="moderate">Moderate (₹₹)</option>
                        <option value="premium">Premium (₹₹₹)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Rating (0-5) *
                      </label>
                      <input
                        type="number"
                        min="0"
                        max="5"
                        step="0.1"
                        value={newRestaurant.rating}
                        onChange={(e) => setNewRestaurant({ ...newRestaurant, rating: parseFloat(e.target.value) })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        suppressHydrationWarning
                      />
                    </div>
                  </div>

                  {/* Featured Toggle */}
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="featured"
                      checked={newRestaurant.featured}
                      onChange={(e) => setNewRestaurant({ ...newRestaurant, featured: e.target.checked })}
                      className="w-5 h-5 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
                    />
                    <label htmlFor="featured" className="text-sm font-semibold text-gray-700">
                      Mark as Featured Restaurant
                    </label>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-4 pt-4">
                    <Button type="submit" size="lg" className="flex-1">
                      <Save size={20} />
                      Save Restaurant
                    </Button>
                    <Button type="button" variant="outline" size="lg" onClick={resetForm}>
                      <Trash2 size={20} />
                      Clear
                    </Button>
                  </div>
                </form>
              </Card>
            </m.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
