import { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Image from 'next/image';
import { Instagram, Facebook, Youtube, Mail, Award, Users, MapPin } from 'lucide-react';
import Card from '@/components/ui/Card';
import { SITE_CONFIG } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'About - Vizag Food Explorer',
  description: 'Learn about my journey as a food reviewer and content creator in Visakhapatnam',
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-20">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-br from-emerald-600 to-teal-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="text-white">
                <h1 className="text-5xl md:text-6xl font-bold mb-6">
                  About Me
                </h1>
                <p className="text-xl md:text-2xl opacity-90 leading-relaxed">
                  Food enthusiast, content creator, and your trusted guide to 
                  Visakhapatnam's culinary landscape
                </p>
              </div>
              <div className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&q=80"
                  alt={SITE_CONFIG.author.name}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center">My Journey</h2>
            
            <div className="prose prose-lg max-w-none">
              <p className="text-xl text-gray-700 leading-relaxed mb-6">
                What started as a simple passion for food has evolved into a mission to document 
                and share the incredible culinary diversity of Visakhapatnam. With over {SITE_CONFIG.metrics.reviewsCount} 
                detailed reviews and counting, I've made it my goal to be your most reliable source 
                for dining recommendations in Vizag.
              </p>
              
              <p className="text-xl text-gray-700 leading-relaxed mb-6">
                Every restaurant visit is an adventure. I don't just taste the food — I experience 
                the ambiance, observe the service, appreciate the presentation, and evaluate the 
                overall value. My reviews are honest, detailed, and designed to help you make 
                informed decisions about where to spend your time and money.
              </p>

              <p className="text-xl text-gray-700 leading-relaxed mb-6">
                From hidden street food gems to upscale fine dining establishments, from traditional 
                Andhra cuisine to international flavors, I've covered it all. My community of {SITE_CONFIG.metrics.followers} 
                food lovers trusts my recommendations because I maintain complete transparency and 
                never compromise on authenticity.
              </p>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">
              By the Numbers
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="p-8 text-center">
                <Instagram className="mx-auto mb-4 text-emerald-600" size={48} />
                <div className="text-4xl font-bold text-gray-900 mb-2">
                  {SITE_CONFIG.metrics.followers}
                </div>
                <div className="text-gray-600">Instagram Followers</div>
              </Card>

              <Card className="p-8 text-center">
                <Award className="mx-auto mb-4 text-emerald-600" size={48} />
                <div className="text-4xl font-bold text-gray-900 mb-2">
                  {SITE_CONFIG.metrics.reviewsCount}
                </div>
                <div className="text-gray-600">Detailed Reviews</div>
              </Card>

              <Card className="p-8 text-center">
                <MapPin className="mx-auto mb-4 text-emerald-600" size={48} />
                <div className="text-4xl font-bold text-gray-900 mb-2">
                  {SITE_CONFIG.metrics.restaurantsCovered}
                </div>
                <div className="text-gray-600">Restaurants Covered</div>
              </Card>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">
              What Drives Me
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Authenticity</h3>
                <p className="text-gray-700 leading-relaxed">
                  Every review is based on genuine personal experience. I visit restaurants 
                  anonymously, pay for my meals, and share unbiased opinions. No sponsored 
                  content without clear disclosure.
                </p>
              </Card>

              <Card className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Detail-Oriented</h3>
                <p className="text-gray-700 leading-relaxed">
                  From ambiance to service quality, from taste profiles to value for money, 
                  I evaluate every aspect of the dining experience to give you the complete picture.
                </p>
              </Card>

              <Card className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Community First</h3>
                <p className="text-gray-700 leading-relaxed">
                  My followers are my priority. I respond to comments, take suggestions, 
                  and constantly engage with the community to understand what they're looking for.
                </p>
              </Card>

              <Card className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Local Love</h3>
                <p className="text-gray-700 leading-relaxed">
                  I'm passionate about promoting local businesses and hidden gems. Every review 
                  helps small restaurants gain visibility and helps diners discover new favorites.
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* Social Section */}
        <section className="py-16 bg-emerald-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Let's Connect
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Follow my food adventures on social media and never miss a new review
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href={SITE_CONFIG.author.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:shadow-lg transition-shadow flex items-center gap-3 font-semibold"
              >
                <Instagram size={24} />
                Instagram
              </a>
              <a
                href={SITE_CONFIG.author.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:shadow-lg transition-shadow flex items-center gap-3 font-semibold"
              >
                <Facebook size={24} />
                Facebook
              </a>
              <a
                href={SITE_CONFIG.author.social.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-red-600 text-white rounded-lg hover:shadow-lg transition-shadow flex items-center gap-3 font-semibold"
              >
                <Youtube size={24} />
                YouTube
              </a>
              <a
                href={`mailto:${SITE_CONFIG.author.social.email}`}
                className="px-8 py-4 bg-emerald-600 text-white rounded-lg hover:shadow-lg transition-shadow flex items-center gap-3 font-semibold"
              >
                <Mail size={24} />
                Email Me
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
