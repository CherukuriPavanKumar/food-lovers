'use client';

import { useState, useEffect } from 'react';
import { m } from 'framer-motion';
import { Award as AwardIcon, Trophy } from 'lucide-react';
import Image from 'next/image';
import type { Award } from '@/types';

export default function Awards() {
  const [awards, setAwards] = useState<Award[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchAwards() {
      try {
        const response = await fetch('/api/awards');
        const result = await response.json();
        if (result.success) {
          setAwards(result.data);
        }
      } catch (error) {
        console.error('Error fetching awards:', error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchAwards();
  }, []);

  if (isLoading) {
    return (
      <section className="py-20 bg-gradient-to-br from-amber-50 via-white to-orange-50">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-amber-500 border-r-transparent"></div>
          </div>
        </div>
      </section>
    );
  }

  if (awards.length === 0) {
    return null;
  }

  return (
    <section className="py-20 bg-gradient-to-br from-amber-50 via-white to-orange-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Trophy className="w-8 h-8 text-amber-600" />
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
              Awards & Recognition
            </h2>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Celebrating milestones and achievements in food blogging
          </p>
        </m.div>

        {/* Awards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {awards.map((award, index) => (
            <m.div
              key={award._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 h-full">
                {/* Award Image */}
                <div className="relative h-64 overflow-hidden bg-gradient-to-br from-amber-100 to-orange-100">
                  <Image
                    src={award.image}
                    alt={award.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {award.featured && (
                    <div className="absolute top-4 right-4 bg-amber-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      Featured
                    </div>
                  )}
                </div>

                {/* Award Info */}
                <div className="p-6">
                  <div className="flex items-start gap-3 mb-3">
                    <AwardIcon className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-1">
                        {award.title}
                      </h3>
                      <p className="text-sm text-amber-600 font-semibold">
                        {award.year}
                        {award.organization && ` • ${award.organization}`}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    {award.description}
                  </p>
                </div>
              </div>
            </m.div>
          ))}
        </div>
      </div>
    </section>
  );
}
