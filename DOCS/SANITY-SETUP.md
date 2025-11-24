# Sanity CMS Setup Guide

This document provides step-by-step instructions for setting up Sanity CMS for your food review website.

## Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Basic understanding of terminal commands

## Step 1: Create Sanity Project

1. **Install Sanity CLI globally:**
```bash
npm install -g @sanity/cli
```

2. **Create a new Sanity project:**
```bash
npm create sanity@latest
```

3. **Follow the prompts:**
   - Project name: `vizag-food-reviews`
   - Dataset: `production`
   - Output path: `./studio`
   - Template: `Clean project`

## Step 2: Configure Sanity Schemas

Create the following schema files in `studio/schemas/`:

### Schema: Review (Restaurant Review)

Create `studio/schemas/review.js`:

```javascript
export default {
  name: 'review',
  title: 'Restaurant Review',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Restaurant Name',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'description',
      title: 'Short Description',
      type: 'text',
      rows: 3,
      validation: Rule => Rule.required().min(50).max(200)
    },
    {
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: {
        hotspot: true
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'gallery',
      title: 'Gallery Images',
      type: 'array',
      of: [{ type: 'image' }]
    },
    {
      name: 'cuisine',
      title: 'Cuisine Types',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Indian', value: 'Indian' },
          { title: 'Chinese', value: 'Chinese' },
          { title: 'Continental', value: 'Continental' },
          { title: 'Italian', value: 'Italian' },
          { title: 'Seafood', value: 'Seafood' },
          { title: 'Street Food', value: 'Street Food' },
          { title: 'Biryani', value: 'Biryani' },
          { title: 'Fast Food', value: 'Fast Food' },
          { title: 'Cafe', value: 'Cafe' },
          { title: 'Desserts', value: 'Desserts' }
        ]
      },
      validation: Rule => Rule.required().min(1)
    },
    {
      name: 'area',
      title: 'Area/Location',
      type: 'string',
      options: {
        list: [
          { title: 'RK Beach', value: 'RK Beach' },
          { title: 'Dwaraka Nagar', value: 'Dwaraka Nagar' },
          { title: 'MVP Colony', value: 'MVP Colony' },
          { title: 'Madhurawada', value: 'Madhurawada' },
          { title: 'Gajuwaka', value: 'Gajuwaka' },
          { title: 'Rushikonda', value: 'Rushikonda' },
          { title: 'Siripuram', value: 'Siripuram' },
          { title: 'Jagadamba', value: 'Jagadamba' }
        ]
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'address',
      title: 'Full Address',
      type: 'text',
      rows: 2,
      validation: Rule => Rule.required()
    },
    {
      name: 'location',
      title: 'Map Location',
      type: 'object',
      fields: [
        {
          name: 'lat',
          title: 'Latitude',
          type: 'number',
          validation: Rule => Rule.required()
        },
        {
          name: 'lng',
          title: 'Longitude',
          type: 'number',
          validation: Rule => Rule.required()
        }
      ]
    },
    {
      name: 'rating',
      title: 'Overall Rating',
      type: 'number',
      validation: Rule => Rule.required().min(0).max(5)
    },
    {
      name: 'ambiance',
      title: 'Ambiance Rating',
      type: 'number',
      validation: Rule => Rule.required().min(0).max(5)
    },
    {
      name: 'service',
      title: 'Service Rating',
      type: 'number',
      validation: Rule => Rule.required().min(0).max(5)
    },
    {
      name: 'taste',
      title: 'Taste Rating',
      type: 'number',
      validation: Rule => Rule.required().min(0).max(5)
    },
    {
      name: 'valueForMoney',
      title: 'Value for Money Rating',
      type: 'number',
      validation: Rule => Rule.required().min(0).max(5)
    },
    {
      name: 'priceRange',
      title: 'Price Range',
      type: 'string',
      options: {
        list: [
          { title: 'Budget (< ₹200)', value: 'budget' },
          { title: 'Moderate (₹200-500)', value: 'moderate' },
          { title: 'Premium (₹500-1000)', value: 'premium' },
          { title: 'Luxury (> ₹1000)', value: 'luxury' }
        ]
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'fullReview',
      title: 'Full Review',
      type: 'array',
      of: [
        {
          type: 'block'
        }
      ],
      validation: Rule => Rule.required()
    },
    {
      name: 'mustTryDishes',
      title: 'Must Try Dishes',
      type: 'array',
      of: [{ type: 'string' }],
      validation: Rule => Rule.min(3).max(10)
    },
    {
      name: 'highlights',
      title: 'Highlights',
      type: 'array',
      of: [{ type: 'string' }],
      validation: Rule => Rule.min(3).max(8)
    },
    {
      name: 'reviewDate',
      title: 'Review Date',
      type: 'date',
      validation: Rule => Rule.required()
    },
    {
      name: 'featured',
      title: 'Featured Review',
      type: 'boolean',
      description: 'Show on homepage',
      initialValue: false
    },
    {
      name: 'bestPlace',
      title: 'Best Place',
      type: 'boolean',
      description: 'Show on Best Places page',
      initialValue: false
    }
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'area',
      media: 'coverImage'
    }
  }
}
```

### Update Schema Index

Edit `studio/schemas/index.js`:

```javascript
import review from './review'

export const schemaTypes = [review]
```

## Step 3: Configure Sanity Project

Update `studio/sanity.config.js`:

```javascript
import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'

export default defineConfig({
  name: 'default',
  title: 'Vizag Food Reviews',

  projectId: 'your-project-id', // Get from sanity.io dashboard
  dataset: 'production',

  plugins: [deskTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
```

## Step 4: Connect Next.js to Sanity

### Install Sanity Client

```bash
npm install next-sanity @portabletext/react @sanity/image-url
```

### Create Sanity Client

Create `lib/sanity.ts`:

```typescript
import { createClient } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2024-01-01',
  useCdn: false,
});

const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}
```

### Environment Variables

Create `.env.local`:

```
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_write_token
```

## Step 5: Fetch Data from Sanity

### Create Data Fetching Functions

Create `lib/sanity-queries.ts`:

```typescript
import { client } from './sanity';
import { Review } from '@/types';

export async function getAllReviews(): Promise<Review[]> {
  return await client.fetch(
    `*[_type == "review"] | order(reviewDate desc) {
      "id": _id,
      name,
      "slug": slug.current,
      cuisine,
      area,
      rating,
      priceRange,
      "coverImage": coverImage.asset->url,
      "gallery": gallery[].asset->url,
      description,
      highlights,
      address,
      location,
      reviewDate,
      featured,
      bestPlace,
      fullReview,
      ambiance,
      service,
      taste,
      valueForMoney,
      mustTryDishes
    }`
  );
}

export async function getFeaturedReviews(): Promise<Review[]> {
  return await client.fetch(
    `*[_type == "review" && featured == true] | order(reviewDate desc)[0...5] {
      "id": _id,
      name,
      "slug": slug.current,
      cuisine,
      area,
      rating,
      priceRange,
      "coverImage": coverImage.asset->url,
      description,
      highlights,
      address,
      location,
      reviewDate,
      featured
    }`
  );
}

export async function getReviewBySlug(slug: string): Promise<Review | null> {
  return await client.fetch(
    `*[_type == "review" && slug.current == $slug][0] {
      "id": _id,
      name,
      "slug": slug.current,
      cuisine,
      area,
      rating,
      priceRange,
      "coverImage": coverImage.asset->url,
      "gallery": gallery[].asset->url,
      description,
      highlights,
      address,
      location,
      reviewDate,
      featured,
      bestPlace,
      fullReview,
      ambiance,
      service,
      taste,
      valueForMoney,
      mustTryDishes
    }`,
    { slug }
  );
}

export async function getBestPlaces(): Promise<Review[]> {
  return await client.fetch(
    `*[_type == "review" && bestPlace == true] | order(rating desc) {
      "id": _id,
      name,
      "slug": slug.current,
      cuisine,
      area,
      rating,
      priceRange,
      "coverImage": coverImage.asset->url,
      description,
      highlights,
      address,
      location,
      reviewDate,
      bestPlace
    }`
  );
}
```

## Step 6: Update Pages to Use Sanity Data

### Update Homepage

Modify `app/page.tsx`:

```typescript
import { getFeaturedReviews } from '@/lib/sanity-queries';

export default async function HomePage() {
  const featuredReviews = await getFeaturedReviews();

  return (
    <>
      <Header />
      <main>
        <Hero />
        <FeaturedReviews reviews={featuredReviews} />
        <AboutPreview />
      </main>
      <Footer />
    </>
  );
}
```

### Update Reviews Page

Modify `app/reviews/page.tsx` to fetch from Sanity instead of mock data.

### Update Review Detail Page

Modify `app/reviews/[slug]/page.tsx` to use `getReviewBySlug()`.

## Step 7: Deploy Sanity Studio

### Option A: Deploy to Sanity's Cloud

```bash
cd studio
sanity deploy
```

This creates a URL like: `https://your-project.sanity.studio`

### Option B: Self-host with Next.js

Create `app/studio/[[...index]]/page.tsx`:

```typescript
'use client'

import { NextStudio } from 'next-sanity/studio'
import config from '@/studio/sanity.config'

export default function StudioPage() {
  return <NextStudio config={config} />
}
```

Access at: `http://localhost:3000/studio`

## Step 8: Configure CORS

1. Go to https://www.sanity.io/manage
2. Select your project
3. Go to "API" → "CORS Origins"
4. Add:
   - `http://localhost:3000` (development)
   - `https://yourdomain.com` (production)

## Step 9: Set Up Webhooks (Optional)

For automatic revalidation when content changes:

1. Go to Sanity dashboard
2. API → Webhooks
3. Add webhook:
   - URL: `https://yourdomain.com/api/revalidate`
   - Dataset: `production`
   - Trigger on: Create, Update, Delete

Create `app/api/revalidate/route.ts`:

```typescript
import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get('secret');

  if (secret !== process.env.REVALIDATION_SECRET) {
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 });
  }

  revalidatePath('/');
  revalidatePath('/reviews');
  revalidatePath('/best-places');

  return NextResponse.json({ revalidated: true });
}
```

## Testing

1. **Start Sanity Studio:**
```bash
cd studio
npm run dev
```

2. **Add a test review** in Sanity Studio

3. **Start Next.js:**
```bash
npm run dev
```

4. **Verify data appears** on your website

## Troubleshooting

### Issue: "Project ID not found"
- Check `.env.local` file exists
- Verify project ID in Sanity dashboard
- Restart dev server

### Issue: CORS errors
- Add your domain to CORS origins in Sanity
- Include `http://localhost:3000` for local development

### Issue: Images not loading
- Check image URLs in Sanity
- Verify `urlFor` function is working
- Check Next.js image domains in config

## Next Steps

1. Migrate mock data to Sanity
2. Train client on CMS usage
3. Set up automated backups
4. Configure analytics
5. Monitor performance

## Resources

- [Sanity Documentation](https://www.sanity.io/docs)
- [Next.js + Sanity Guide](https://www.sanity.io/plugins/next-sanity)
- [Sanity Image URLs](https://www.sanity.io/docs/image-url)
- [GROQ Query Language](https://www.sanity.io/docs/groq)

---

*Setup complete! Your CMS is ready to manage restaurant reviews.*
