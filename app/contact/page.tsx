'use client';

import { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Mail, Phone, MapPin, Instagram, Facebook, Youtube, Send } from 'lucide-react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { SITE_CONFIG } from '@/lib/constants';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    businessName: '',
    type: 'general',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
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
      <Header />
      <main className="min-h-screen pt-20">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-br from-emerald-600 to-teal-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Let's Work Together
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto opacity-90">
              Looking to collaborate, sponsor content, or feature your restaurant? 
              I'd love to hear from you!
            </p>
          </div>
        </section>

        {/* Contact Content */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Contact Info */}
              <div className="lg:col-span-1 space-y-6">
                <Card className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Get in Touch</h3>
                  
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
                  <div className="space-y-3">
                    <a
                      href={SITE_CONFIG.author.social.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-gray-700 hover:text-emerald-600 transition-colors"
                    >
                      <Instagram size={20} />
                      <span>Instagram</span>
                    </a>
                    <a
                      href={SITE_CONFIG.author.social.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-gray-700 hover:text-emerald-600 transition-colors"
                    >
                      <Facebook size={20} />
                      <span>Facebook</span>
                    </a>
                    <a
                      href={SITE_CONFIG.author.social.youtube}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-gray-700 hover:text-emerald-600 transition-colors"
                    >
                      <Youtube size={20} />
                      <span>YouTube</span>
                    </a>
                  </div>
                </Card>

                <Card className="p-6 bg-emerald-50 border-2 border-emerald-200">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">For Businesses</h3>
                  <p className="text-gray-700 text-sm">
                    I offer honest, detailed reviews and social media promotion. 
                    Reach {SITE_CONFIG.metrics.followers} engaged food enthusiasts through authentic content.
                  </p>
                </Card>
              </div>

              {/* Contact Form */}
              <div className="lg:col-span-2">
                <Card className="p-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Send a Message</h2>
                  
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
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="businessName" className="block text-sm font-semibold text-gray-700 mb-2">
                          Business/Restaurant Name
                        </label>
                        <input
                          type="text"
                          id="businessName"
                          name="businessName"
                          value={formData.businessName}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                          placeholder="Optional"
                        />
                      </div>

                      <div>
                        <label htmlFor="type" className="block text-sm font-semibold text-gray-700 mb-2">
                          Inquiry Type *
                        </label>
                        <select
                          id="type"
                          name="type"
                          value={formData.type}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        >
                          <option value="general">General Inquiry</option>
                          <option value="collaboration">Collaboration/Sponsorship</option>
                          <option value="business">Restaurant Feature Request</option>
                        </select>
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
                      />
                    </div>

                    <Button 
                      type="submit" 
                      size="lg" 
                      className="w-full md:w-auto"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        'Sending...'
                      ) : (
                        <>
                          <Send size={20} />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </Card>

                {/* Collaboration Info */}
                <Card className="p-8 mt-8 bg-gradient-to-br from-emerald-50 to-teal-50">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Why Work With Me?
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <div className="text-3xl font-bold text-emerald-600 mb-2">
                        {SITE_CONFIG.metrics.followers}
                      </div>
                      <div className="text-sm text-gray-700">Engaged followers across platforms</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-emerald-600 mb-2">
                        {SITE_CONFIG.metrics.reviewsCount}
                      </div>
                      <div className="text-sm text-gray-700">Detailed, honest reviews</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-emerald-600 mb-2">
                        100%
                      </div>
                      <div className="text-sm text-gray-700">Authentic, transparent content</div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
