import { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Award, Trophy } from 'lucide-react';
import Card from '@/components/ui/Card';
import StarRating from '@/components/ui/StarRating';
import Button from '@/components/ui/Button';
import { getBestPlaces } from '@/lib/mock-data';

export const metadata: Metadata = {
  title: 'Best Places - Vizag Food Explorer',
  description: 'Discover the top-rated and must-visit restaurants in Visakhapatnam',
};

export default function BestPlacesPage() {
  const bestPlaces = getBestPlaces();

  return (
    <>
      <Header />
      <main className="min-h-screen pt-20">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-br from-emerald-600 to-teal-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
            <Trophy className="mx-auto mb-6" size={64} />
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Best Places to Eat
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto opacity-90">
              Curated selection of Vizag's finest dining experiences — restaurants that earned 
              the highest ratings and made unforgettable impressions
            </p>
          </div>
        </section>

        {/* Best Places Grid */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {bestPlaces.map((place, index) => (
                <Card key={place.id} className="overflow-hidden group">
                  <div className="relative h-80">
                    <Image
                      src={place.coverImage}
                      alt={place.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4 bg-amber-500 text-white px-4 py-2 rounded-full font-bold flex items-center gap-2">
                      <Award size={20} />
                      #{index + 1} Best Place
                    </div>
                    <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full shadow-lg">
                      <StarRating rating={place.rating} size={18} showNumber={false} />
                    </div>
                  </div>

                  <div className="p-8">
                    <h3 className="text-3xl font-bold text-gray-900 mb-3 group-hover:text-emerald-600 transition-colors">
                      {place.name}
                    </h3>

                    <div className="flex items-center gap-2 text-gray-600 mb-4">
                      <MapPin size={18} />
                      <span className="text-lg">{place.area}</span>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {place.cuisine.map((cuisine) => (
                        <span
                          key={cuisine}
                          className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-semibold"
                        >
                          {cuisine}
                        </span>
                      ))}
                    </div>

                    <p className="text-gray-700 text-lg mb-6 leading-relaxed">
                      {place.description}
                    </p>

                    {place.highlights && place.highlights.length > 0 && (
                      <div className="border-t pt-4 mb-6">
                        <h4 className="font-semibold text-gray-900 mb-3">Why it's special:</h4>
                        <ul className="space-y-2">
                          {place.highlights.map((highlight, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="text-emerald-600 mt-1">✓</span>
                              <span className="text-gray-700">{highlight}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <StarRating rating={place.rating} size={20} />
                      <Link href={`/reviews/${place.slug}`}>
                        <Button>Read Full Review</Button>
                      </Link>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Want to see your restaurant featured?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              I'm always on the lookout for exceptional dining experiences. Get in touch 
              for collaboration opportunities.
            </p>
            <Link href="/contact">
              <Button size="lg">Work With Me</Button>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
