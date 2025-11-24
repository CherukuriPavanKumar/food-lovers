'use client';

import { useState, useEffect } from 'react';
import { m } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Star, Phone, Mail, Instagram, Facebook, Youtube, Send, Award, Trophy, Users, Navigation, Clock, DollarSign, ExternalLink, Search, Filter } from 'lucide-react';
import Card from '@/components/ui/Card';
import StarRating from '@/components/ui/StarRating';
import Button from '@/components/ui/Button';
import Newsletter from '@/components/home/Newsletter';
import Awards from '@/components/home/Awards';
import { restaurantService } from '@/lib/api-service';
import type { Restaurant } from '@/lib/api-service';
import { SITE_CONFIG } from '@/lib/constants';

export default function AllSections() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    businessName: '',
    type: 'general',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  
  // Restaurant data from API
  const [allRestaurants, setAllRestaurants] = useState<Restaurant[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Search and Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCuisine, setSelectedCuisine] = useState('all');
  const [selectedArea, setSelectedArea] = useState('all');
  const [filteredReviews, setFilteredReviews] = useState<Restaurant[]>([]);
  
  const bestPlaces = filteredReviews
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 4);

  // Fetch restaurants from API
  useEffect(() => {
    async function fetchRestaurants() {
      setIsLoading(true);
      const data = await restaurantService.getRestaurants();
      setAllRestaurants(data);
      setFilteredReviews(data);
      setIsLoading(false);
    }
    fetchRestaurants();
  }, []);

  // Filter reviews based on search and filters
  useEffect(() => {
    let filtered = allRestaurants;

    if (searchQuery) {
      filtered = filtered.filter(review =>
        review.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        review.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCuisine !== 'all') {
      filtered = filtered.filter(review =>
        review.cuisine.includes(selectedCuisine)
      );
    }

    if (selectedArea !== 'all') {
      filtered = filtered.filter(review =>
        review.area === selectedArea
      );
    }

    setFilteredReviews(filtered);
  }, [searchQuery, selectedCuisine, selectedArea, allRestaurants]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setSubmitSuccess(true);
    setFormData({ name: '', email: '', businessName: '', type: 'general', message: '' });
    setTimeout(() => setSubmitSuccess(false), 5000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      {/* Featured Reviews Section */}
      <section id="reviews" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Featured Reviews
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover the latest and greatest dining experiences in Visakhapatnam
            </p>
          </m.div>

          {/* Search and Filter Bar */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8"
          >
            <Card className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Search Input */}
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="Search restaurants..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    suppressHydrationWarning
                  />
                </div>

                {/* Cuisine Filter */}
                <div className="relative">
                  <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <select
                    value={selectedCuisine}
                    onChange={(e) => setSelectedCuisine(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent appearance-none bg-white"
                    suppressHydrationWarning
                  >
                    <option value="all">All Cuisines</option>
                    <option value="Indian">Indian</option>
                    <option value="Chinese">Chinese</option>
                    <option value="Continental">Continental</option>
                    <option value="Italian">Italian</option>
                    <option value="Street Food">Street Food</option>
                  </select>
                </div>

                {/* Area Filter */}
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <select
                    value={selectedArea}
                    onChange={(e) => setSelectedArea(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent appearance-none bg-white"
                    suppressHydrationWarning
                  >
                    <option value="all">All Areas</option>
                    <option value="MVP Colony">MVP Colony</option>
                    <option value="Rushikonda">Rushikonda</option>
                    <option value="Beach Road">Beach Road</option>
                    <option value="Madhurawada">Madhurawada</option>
                    <option value="Dwaraka Nagar">Dwaraka Nagar</option>
                  </select>
                </div>
              </div>

              {/* Results Count */}
              <div className="mt-4 text-center text-gray-600">
                {isLoading ? (
                  'Loading restaurants...'
                ) : (
                  <>Showing {filteredReviews.length} restaurant{filteredReviews.length !== 1 ? 's' : ''}</>
                )}
              </div>
            </Card>
          </m.div>

          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-emerald-600 border-t-transparent"></div>
            </div>
          ) : filteredReviews.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-2xl text-gray-600 mb-4">No restaurants found</p>
              <p className="text-gray-500">Try adjusting your search or filters</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredReviews.slice(0, 6).map((review, index) => (
              <m.div
                key={review.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link href={`/reviews/${review.slug}`}>
                  <Card className="h-full group hover:shadow-2xl transition-all duration-300">
                    <div className="relative h-56 overflow-hidden">
                      <Image
                        src={review.coverImage}
                        alt={review.name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full shadow-lg">
                        <StarRating rating={review.rating} size={16} showNumber={false} />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute bottom-4 left-4 right-4 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                        <div className="flex items-center justify-between text-white">
                          <span className="text-sm font-semibold flex items-center gap-1">
                            <ExternalLink size={16} />
                            View Details
                          </span>
                          <a
                            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(review.name + ' ' + (typeof review.location === 'string' ? review.location : review.area))}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="bg-emerald-600 hover:bg-emerald-700 p-2 rounded-full transition-colors"
                            title="Open in Google Maps"
                          >
                            <Navigation size={16} />
                          </a>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors">
                        {review.name}
                      </h3>
                      
                      <div className="flex items-center gap-2 text-gray-600 mb-3">
                        <MapPin size={16} className="text-emerald-600" />
                        <span className="text-sm">{review.area}</span>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-3">
                        {review.cuisine.slice(0, 2).map((cuisine) => (
                          <span
                            key={cuisine}
                            className="px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-xs font-medium"
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
                        <span className="text-sm text-gray-500 capitalize">{review.priceRange}</span>
                      </div>
                    </div>
                  </Card>
                </Link>
              </m.div>
            ))}
          </div>
          )}
        </div>
      </section>

      {/* Best Places Section */}
      <section id="best-places" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Trophy className="mx-auto mb-6 text-emerald-600" size={64} />
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Best Places to Eat
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Curated selection of Vizag's finest dining experiences
            </p>
          </m.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {bestPlaces.map((place, index) => (
              <m.div
                key={place.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div 
                  onClick={() => window.location.href = `/reviews/${place.slug}`}
                  className="cursor-pointer"
                >
                  <Card className="overflow-hidden group hover:shadow-2xl transition-all duration-300">
                    <div className="relative h-64">
                      <Image
                        src={place.coverImage}
                        alt={place.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute top-4 left-4 bg-amber-500 text-white px-4 py-2 rounded-full font-bold flex items-center gap-2 shadow-lg">
                        <Award size={20} />
                        #{index + 1} Best Place
                      </div>
                      <div className="absolute top-4 right-4">
                        <a
                          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.name + ' ' + place.location)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="bg-white hover:bg-emerald-600 hover:text-white p-3 rounded-full transition-all shadow-lg group/btn"
                          title="Open in Google Maps"
                        >
                          <Navigation size={20} className="group-hover/btn:rotate-45 transition-transform" />
                        </a>
                      </div>
                    </div>

                    <div className="p-6">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors">
                        {place.name}
                      </h3>

                      <div className="flex items-center gap-2 text-gray-600 mb-3">
                        <MapPin size={16} className="text-emerald-600" />
                        <span>{place.area}</span>
                      </div>

                      <p className="text-gray-700 mb-4">{place.description}</p>

                      <div className="flex items-center justify-between">
                        <StarRating rating={place.rating} size={20} />
                        <div className="flex items-center gap-1 text-emerald-600 font-semibold">
                          <DollarSign size={16} />
                          <span className="capitalize">{place.priceRange}</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              </m.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <m.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative">
                <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&q=80"
                    alt={SITE_CONFIG.author.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 bg-emerald-600 text-white p-6 rounded-xl shadow-xl">
                  <div className="text-3xl font-bold">{SITE_CONFIG.metrics.reviewsCount}</div>
                  <div className="text-sm">Reviews & Counting</div>
                </div>
              </div>
            </m.div>

            <m.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-block px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-semibold mb-4">
                About Me
              </span>
              
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Passionate Food Explorer & Reviewer
              </h2>
              
              <p className="text-lg text-gray-600 mb-6">
                {SITE_CONFIG.author.bio}
              </p>
              
              <p className="text-gray-600 mb-8">
                With over {SITE_CONFIG.metrics.restaurantsCovered} restaurants reviewed and a community 
                of {SITE_CONFIG.metrics.followers} food enthusiasts, I bring you honest, detailed reviews 
                that help you discover the best culinary experiences in Visakhapatnam.
              </p>

              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 bg-white rounded-lg shadow">
                  <Instagram className="mx-auto mb-2 text-emerald-600" size={32} />
                  <div className="font-bold text-gray-900">{SITE_CONFIG.metrics.followers}</div>
                  <div className="text-xs text-gray-600">Followers</div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg shadow">
                  <Award className="mx-auto mb-2 text-emerald-600" size={32} />
                  <div className="font-bold text-gray-900">Top Reviewer</div>
                  <div className="text-xs text-gray-600">2024</div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg shadow">
                  <Users className="mx-auto mb-2 text-emerald-600" size={32} />
                  <div className="font-bold text-gray-900">Trusted</div>
                  <div className="text-xs text-gray-600">by Thousands</div>
                </div>
              </div>
            </m.div>
          </div>
        </div>
      </section>

      {/* Awards Section */}
      <Awards />

      {/* Newsletter Section */}
      <Newsletter />

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Let's Work Together
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Looking to collaborate, sponsor content, or feature your restaurant? I'd love to hear from you!
            </p>
          </m.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-1 space-y-6">
              <Card className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Get in Touch</h3>
                
                <div className="space-y-4">
                  <a 
                    href={`mailto:${SITE_CONFIG.author.social.email}`}
                    className="flex items-start gap-3 text-gray-700 hover:text-emerald-600 transition-colors"
                  >
                    <Mail className="mt-1 flex-shrink-0 text-emerald-600" size={20} />
                    <div>
                      <div className="font-semibold">Email</div>
                      <div className="text-sm">{SITE_CONFIG.author.social.email}</div>
                    </div>
                  </a>

                  <div className="flex items-start gap-3 text-gray-700">
                    <MapPin className="mt-1 flex-shrink-0 text-emerald-600" size={20} />
                    <div>
                      <div className="font-semibold">Location</div>
                      <div className="text-sm">Visakhapatnam, Andhra Pradesh</div>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Follow Me</h3>
                <div className="flex gap-3">
                  <a
                    href={SITE_CONFIG.author.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:opacity-90"
                  >
                    <Instagram size={24} />
                  </a>
                  <a
                    href={SITE_CONFIG.author.social.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-blue-600 text-white rounded-lg hover:opacity-90"
                  >
                    <Facebook size={24} />
                  </a>
                  <a
                    href={SITE_CONFIG.author.social.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-red-600 text-white rounded-lg hover:opacity-90"
                  >
                    <Youtube size={24} />
                  </a>
                </div>
              </Card>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Send a Message</h2>
                
                {submitSuccess && (
                  <div className="mb-6 p-4 bg-emerald-100 text-emerald-800 rounded-lg">
                    Thanks for reaching out! I'll get back to you soon.
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        placeholder="John Doe"
                        suppressHydrationWarning
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        placeholder="john@example.com"
                        suppressHydrationWarning
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none"
                      placeholder="Tell me about your inquiry..."
                      suppressHydrationWarning
                    />
                  </div>

                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full md:w-auto"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Sending...' : (
                      <>
                        <Send size={20} />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
