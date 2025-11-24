import { NextResponse } from 'next/server';
import { sanityClient } from '@/lib/sanity-client';
import type { Restaurant } from '@/types';

// GROQ query to fetch all restaurants
const restaurantsQuery = `*[_type == "restaurant"] | order(_createdAt desc) {
  _id,
  name,
  "slug": slug.current,
  description,
  cuisine,
  area,
  "location": location,
  priceRange,
  rating,
  "coverImage": coverImage.asset->url,
  "gallery": gallery[].asset->url,
  featured,
  phone,
  website,
  openingHours,
  specialties,
  ambiance,
  serviceQuality,
  foodQuality,
  valueForMoney,
  reviewText,
  visitDate,
  wouldRecommend
}`;

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const featured = searchParams.get('featured');
    const area = searchParams.get('area');
    const cuisine = searchParams.get('cuisine');
    const search = searchParams.get('search');

    // Build dynamic query based on filters
    let query = restaurantsQuery;
    const filters: string[] = [];

    if (featured === 'true') {
      filters.push('featured == true');
    }
    if (area) {
      filters.push(`area == "${area}"`);
    }
    if (cuisine) {
      filters.push(`"${cuisine}" in cuisine`);
    }

    // Add filters to query
    if (filters.length > 0) {
      query = `*[_type == "restaurant" && ${filters.join(' && ')}] | order(_createdAt desc) {
        _id,
        name,
        "slug": slug.current,
        description,
        cuisine,
        area,
        "location": location,
        priceRange,
        rating,
        "coverImage": coverImage.asset->url,
        "gallery": gallery[].asset->url,
        featured,
        phone,
        website,
        openingHours,
        specialties,
        ambiance,
        serviceQuality,
        foodQuality,
        valueForMoney,
        reviewText,
        visitDate,
        wouldRecommend
      }`;
    }

    // Fetch from Sanity
    let restaurants: Restaurant[] = await sanityClient.fetch(query);

    // Apply search filter (client-side since GROQ search is complex)
    if (search) {
      const searchLower = search.toLowerCase();
      restaurants = restaurants.filter(
        (r) =>
          r.name.toLowerCase().includes(searchLower) ||
          r.description.toLowerCase().includes(searchLower) ||
          r.area.toLowerCase().includes(searchLower)
      );
    }

    return NextResponse.json({
      success: true,
      data: restaurants,
      count: restaurants.length,
    });
  } catch (error: any) {
    console.error('Error fetching restaurants from Sanity:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to fetch restaurants',
        data: [],
      },
      { status: 500 }
    );
  }
}
