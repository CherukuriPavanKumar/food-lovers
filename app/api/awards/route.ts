import { NextResponse } from 'next/server';
import { sanityClient } from '@/lib/sanity-client';
import type { Award } from '@/types';

const awardsQuery = `*[_type == "award"] | order(displayOrder asc, year desc) {
  _id,
  title,
  description,
  year,
  organization,
  "image": image.asset->url,
  featured,
  displayOrder
}`;

export async function GET() {
  try {
    const awards: Award[] = await sanityClient.fetch(awardsQuery);

    return NextResponse.json({
      success: true,
      data: awards,
      count: awards.length,
    });
  } catch (error: any) {
    console.error('Error fetching awards from Sanity:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to fetch awards',
        data: [],
      },
      { status: 500 }
    );
  }
}
