import fs from 'fs/promises';
import path from 'path';
import { mockReviews } from './mock-data';

async function migrateData() {
  const dataFile = path.join(process.cwd(), 'data', 'restaurants.json');
  
  // Transform mock data to match API schema
  const restaurants = mockReviews.map((review, index) => ({
    id: `restaurant_${Date.now() + index}_${Math.random().toString(36).substr(2, 9)}`,
    slug: review.slug,
    name: review.name,
    description: review.description,
    cuisine: review.cuisine,
    area: review.area,
    location: review.location,
    priceRange: review.priceRange,
    rating: review.rating,
    coverImage: review.coverImage,
    featured: review.featured,
    openingHours: (review as any).openingHours || 'Not specified',
    phone: (review as any).phone || '',
    website: (review as any).website || '',
    specialties: (review as any).specialties || [],
    ambiance: (review as any).ambiance || 'Casual',
    serviceQuality: (review as any).serviceQuality || review.rating,
    foodQuality: (review as any).foodQuality || review.rating,
    valueForMoney: (review as any).valueForMoney || review.rating,
    reviewText: (review as any).reviewText || review.description,
    visitDate: (review as any).visitDate || new Date().toISOString().split('T')[0],
    wouldRecommend: review.rating >= 4,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }));

  // Write to JSON file
  await fs.mkdir(path.dirname(dataFile), { recursive: true });
  await fs.writeFile(dataFile, JSON.stringify(restaurants, null, 2), 'utf-8');
  
  console.log(`✅ Migrated ${restaurants.length} restaurants to database!`);
  console.log(`📁 Data saved to: ${dataFile}`);
}

// Run migration
if (require.main === module) {
  migrateData().catch(console.error);
}

export { migrateData };
