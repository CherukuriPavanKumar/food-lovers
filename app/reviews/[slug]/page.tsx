import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Calendar, Share2, Instagram, Facebook, ExternalLink } from 'lucide-react';
import StarRating from '@/components/ui/StarRating';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { getReviewBySlug, mockReviews } from '@/lib/mock-data';

interface PageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const review = getReviewBySlug(params.slug);
  
  if (!review) {
    return {
      title: 'Review Not Found',
    };
  }

  return {
    title: `${review.name} Review - Vizag Food Explorer`,
    description: review.description,
    openGraph: {
      images: [review.coverImage],
    },
  };
}

export async function generateStaticParams() {
  return mockReviews.map((review) => ({
    slug: review.slug,
  }));
}

export default function ReviewDetailPage({ params }: PageProps) {
  const review = getReviewBySlug(params.slug);

  if (!review) {
    notFound();
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Date not available';
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';

  return (
    <>
      <Header />
      <main className="min-h-screen pt-20">
        {/* Hero Image */}
        <div className="relative h-[60vh] overflow-hidden">
          <Image
            src={review.coverImage}
            alt={review.name}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <div className="max-w-7xl mx-auto">
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
                {review.name}
              </h1>
              <div className="flex flex-wrap items-center gap-6 text-white">
                <div className="flex items-center gap-2">
                  <MapPin size={20} />
                  <span>{review.area}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={20} />
                  <span>{formatDate(review.reviewDate)}</span>
                </div>
                <StarRating rating={review.rating} size={24} />
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Quick Info */}
              <Card className="p-6 mb-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-emerald-600 mb-1">
                      {review.ambiance.toFixed(1)}
                    </div>
                    <div className="text-sm text-gray-600">Ambiance</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-emerald-600 mb-1">
                      {review.service.toFixed(1)}
                    </div>
                    <div className="text-sm text-gray-600">Service</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-emerald-600 mb-1">
                      {review.taste.toFixed(1)}
                    </div>
                    <div className="text-sm text-gray-600">Taste</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-emerald-600 mb-1">
                      {review.valueForMoney.toFixed(1)}
                    </div>
                    <div className="text-sm text-gray-600">Value</div>
                  </div>
                </div>
              </Card>

              {/* Description */}
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Overview</h2>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  {review.description}
                </p>
                <p className="text-gray-700 leading-relaxed">
                  {review.fullReview}
                </p>
              </div>

              {/* Must Try Dishes */}
              {review.mustTryDishes && review.mustTryDishes.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">Must Try Dishes</h2>
                  <div className="flex flex-wrap gap-3">
                    {review.mustTryDishes.map((dish) => (
                      <span
                        key={dish}
                        className="px-4 py-2 bg-emerald-100 text-emerald-700 rounded-lg font-semibold"
                      >
                        {dish}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Gallery */}
              {review.gallery && review.gallery.length > 1 && (
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">Gallery</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {review.gallery.slice(1).map((image, index) => (
                      <div key={index} className="relative aspect-square rounded-lg overflow-hidden">
                        <Image
                          src={image}
                          alt={`${review.name} - Image ${index + 2}`}
                          fill
                          className="object-cover hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Location */}
              <Card className="p-6 mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Location</h3>
                <p className="text-gray-700 mb-4">{review.address || review.area}</p>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${
                    review.location && typeof review.location === 'object'
                      ? `${review.location.lat},${review.location.lng}`
                      : encodeURIComponent(review.name + ' ' + review.area)
                  }`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full"
                >
                  <Button variant="outline" className="w-full">
                    <MapPin size={20} />
                    View on Map
                  </Button>
                </a>
              </Card>

              {/* Highlights */}
              {review.highlights && review.highlights.length > 0 && (
                <Card className="p-6 mb-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Highlights</h3>
                  <ul className="space-y-2">
                    {review.highlights.map((highlight, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-emerald-600 mt-1">✓</span>
                        <span className="text-gray-700">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              )}

              {/* Cuisine & Price */}
              <Card className="p-6 mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Details</h3>
                <div className="mb-4">
                  <div className="text-sm text-gray-600 mb-2">Cuisine</div>
                  <div className="flex flex-wrap gap-2">
                    {review.cuisine.map((cuisine) => (
                      <span
                        key={cuisine}
                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                      >
                        {cuisine}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-2">Price Range</div>
                  <div className="text-lg font-semibold text-gray-900 capitalize">
                    {review.priceRange}
                  </div>
                </div>
              </Card>

              {/* Share */}
              <Card className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Share Review</h3>
                <div className="flex gap-3">
                  <button className="flex-1 p-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:opacity-90 transition-opacity">
                    <Instagram size={20} className="mx-auto" />
                  </button>
                  <button className="flex-1 p-3 bg-blue-600 text-white rounded-lg hover:opacity-90 transition-opacity">
                    <Facebook size={20} className="mx-auto" />
                  </button>
                  <button className="flex-1 p-3 bg-emerald-600 text-white rounded-lg hover:opacity-90 transition-opacity">
                    <Share2 size={20} className="mx-auto" />
                  </button>
                </div>
              </Card>
            </div>
          </div>

          {/* Back to Reviews */}
          <div className="mt-12 text-center">
            <Link href="/reviews">
              <Button variant="outline" size="lg">
                ← Back to All Reviews
              </Button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
