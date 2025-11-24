import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'data', 'restaurants.json');

// Ensure data directory exists
async function ensureDataDir() {
  const dataDir = path.join(process.cwd(), 'data');
  try {
    await fs.access(dataDir);
  } catch {
    await fs.mkdir(dataDir, { recursive: true });
  }
}

// Read restaurants from JSON file
async function readRestaurants() {
  try {
    await ensureDataDir();
    const data = await fs.readFile(DATA_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    // If file doesn't exist, return empty array
    return [];
  }
}

// Write restaurants to JSON file
async function writeRestaurants(restaurants: any[]) {
  await ensureDataDir();
  await fs.writeFile(DATA_FILE, JSON.stringify(restaurants, null, 2), 'utf-8');
}

function generateId() {
  return `restaurant_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

// GET - Fetch all restaurants
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    let restaurants = await readRestaurants();

    // Apply filters
    const featured = searchParams.get('featured');
    const area = searchParams.get('area');
    const cuisine = searchParams.get('cuisine');
    const search = searchParams.get('search');

    if (featured === 'true') {
      restaurants = restaurants.filter((r: any) => r.featured);
    }

    if (area) {
      restaurants = restaurants.filter((r: any) => r.area === area);
    }

    if (cuisine) {
      restaurants = restaurants.filter((r: any) => r.cuisine.includes(cuisine));
    }

    if (search) {
      const searchLower = search.toLowerCase();
      restaurants = restaurants.filter((r: any) =>
        r.name.toLowerCase().includes(searchLower) ||
        r.description.toLowerCase().includes(searchLower)
      );
    }

    return NextResponse.json({
      success: true,
      data: restaurants,
      count: restaurants.length,
    });
  } catch (error: any) {
    console.error('Error fetching restaurants:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch restaurants',
        message: error.message,
      },
      { status: 500 }
    );
  }
}

// POST - Create new restaurant
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    if (!body.name || !body.description || !body.cuisine || !body.area || !body.location) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing required fields',
        },
        { status: 400 }
      );
    }

    const restaurants = await readRestaurants();

    // Generate slug and check for duplicates
    const slug = generateSlug(body.name);
    const existing = restaurants.find((r: any) => r.slug === slug);

    if (existing) {
      return NextResponse.json(
        {
          success: false,
          error: 'A restaurant with this name already exists',
        },
        { status: 409 }
      );
    }

    // Create new restaurant
    const newRestaurant = {
      id: generateId(),
      slug,
      name: body.name,
      description: body.description,
      cuisine: body.cuisine,
      area: body.area,
      location: body.location,
      priceRange: body.priceRange,
      rating: body.rating,
      coverImage: body.coverImage,
      featured: body.featured || false,
      openingHours: body.openingHours || 'Not specified',
      phone: body.phone || '',
      website: body.website || '',
      specialties: body.specialties || [],
      ambiance: body.ambiance || 'Casual',
      serviceQuality: body.serviceQuality || body.rating,
      foodQuality: body.foodQuality || body.rating,
      valueForMoney: body.valueForMoney || body.rating,
      reviewText: body.reviewText || body.description,
      visitDate: new Date().toISOString().split('T')[0],
      wouldRecommend: body.rating >= 4,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    restaurants.unshift(newRestaurant);
    await writeRestaurants(restaurants);

    return NextResponse.json(
      {
        success: true,
        message: 'Restaurant created successfully! 🎉',
        data: newRestaurant,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error creating restaurant:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to create restaurant',
        message: error.message,
      },
      { status: 500 }
    );
  }
}

// DELETE - Delete restaurant
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          error: 'Restaurant ID is required',
        },
        { status: 400 }
      );
    }

    const restaurants = await readRestaurants();
    const filtered = restaurants.filter((r: any) => r.id !== id);

    if (filtered.length === restaurants.length) {
      return NextResponse.json(
        {
          success: false,
          error: 'Restaurant not found',
        },
        { status: 404 }
      );
    }

    await writeRestaurants(filtered);

    return NextResponse.json({
      success: true,
      message: 'Restaurant deleted successfully',
    });
  } catch (error: any) {
    console.error('Error deleting restaurant:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to delete restaurant',
        message: error.message,
      },
      { status: 500 }
    );
  }
}
