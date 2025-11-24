'use client';

import { useState } from 'react';
import { m } from 'framer-motion';
import { Mail, Send, Check } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address');
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSuccess(true);
    setEmail('');
    
    setTimeout(() => setIsSuccess(false), 5000);
  };

  return (
    <section className="py-16 bg-gradient-to-br from-emerald-600 to-emerald-800 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <m.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <m.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full mb-6"
          >
            <Mail className="text-white" size={32} />
          </m.div>

          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Never Miss a Delicious Review!
          </h2>
          <p className="text-xl text-emerald-100 mb-8 max-w-2xl mx-auto">
            Subscribe to get weekly updates on the best food spots in Visakhapatnam, exclusive restaurant deals, and foodie tips!
          </p>

          {isSuccess ? (
            <m.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white/20 backdrop-blur-md text-white px-6 py-4 rounded-lg inline-flex items-center gap-3 text-lg font-semibold"
            >
              <Check size={24} className="text-emerald-200" />
              Thanks for subscribing! Check your inbox.
            </m.div>
          ) : (
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="flex-1 px-6 py-4 rounded-lg text-gray-900 placeholder-gray-500 focus:ring-4 focus:ring-white/30 focus:outline-none"
                  suppressHydrationWarning
                />
                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className="!bg-amber-500 hover:!bg-amber-600 !text-white whitespace-nowrap"
                >
                  {isSubmitting ? (
                    'Subscribing...'
                  ) : (
                    <>
                      <Send size={20} />
                      Subscribe
                    </>
                  )}
                </Button>
              </div>
              <p className="text-emerald-100 text-sm mt-4">
                🔒 Your email is safe with us. Unsubscribe anytime.
              </p>
            </form>
          )}
        </m.div>
      </div>
    </section>
  );
}
