# 🎨 Sanity CMS Setup Guide

## Quick Setup (2 Options)

### Option 1: Use Existing Sanity Studio (If you have one)

If you already have a Sanity Studio set up, you need to add the restaurant schema:

1. Go to your Sanity Studio folder (separate from this project)
2. Create/Update the schema file for restaurants
3. Add the schema below to your Sanity Studio

### Option 2: Create New Sanity Studio (Recommended)

Set up a new Sanity Studio to manage your restaurant data:

## Step 1: Install Sanity CLI

```bash
npm install -g @sanity/cli
```

## Step 2: Create Sanity Studio

```bash
# Navigate to a different folder (not this project)
cd ..

# Create new Sanity Studio
sanity init

# Follow the prompts:
# - Login with your Sanity account
# - Create new project OR select existing project
# - Use project ID from your .env.local file
# - Choose schema: "Clean project with no predefined schemas"
# - Name it: "food-lovers-studio" (or any name)
```

## Step 3: Add Restaurant Schema

In your Sanity Studio folder, create this file:

**`schemas/restaurant.js`**

```javascript
export default {
  name: 'restaurant',
  title: 'Restaurant',
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
        maxLength: 96,
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: Rule => Rule.required()
    },
    {
      name: 'cuisine',
      title: 'Cuisine Types',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        layout: 'tags'
      },
      validation: Rule => Rule.required().min(1)
    },
    {
      name: 'area',
      title: 'Area/Location',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'location',
      title: 'Full Address',
      type: 'string'
    },
    {
      name: 'priceRange',
      title: 'Price Range',
      type: 'string',
      options: {
        list: [
          {title: 'Budget (< ₹200)', value: 'budget'},
          {title: 'Moderate (₹200-500)', value: 'moderate'},
          {title: 'Premium (₹500+)', value: 'premium'}
        ]
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'rating',
      title: 'Rating',
      type: 'number',
      validation: Rule => Rule.required().min(0).max(5)
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
      title: 'Photo Gallery',
      type: 'array',
      of: [{
        type: 'image',
        options: {
          hotspot: true
        }
      }]
    },
    {
      name: 'featured',
      title: 'Featured Restaurant',
      type: 'boolean',
      initialValue: false
    },
    {
      name: 'openingHours',
      title: 'Opening Hours',
      type: 'string'
    },
    {
      name: 'phone',
      title: 'Phone Number',
      type: 'string'
    },
    {
      name: 'website',
      title: 'Website',
      type: 'url'
    },
    {
      name: 'specialties',
      title: 'Specialties/Must Try Dishes',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        layout: 'tags'
      }
    },
    {
      name: 'ambiance',
      title: 'Ambiance Description',
      type: 'string'
    },
    {
      name: 'serviceQuality',
      title: 'Service Quality (0-5)',
      type: 'number',
      validation: Rule => Rule.min(0).max(5)
    },
    {
      name: 'foodQuality',
      title: 'Food Quality (0-5)',
      type: 'number',
      validation: Rule => Rule.min(0).max(5)
    },
    {
      name: 'valueForMoney',
      title: 'Value for Money (0-5)',
      type: 'number',
      validation: Rule => Rule.min(0).max(5)
    },
    {
      name: 'reviewText',
      title: 'Review Text',
      type: 'text'
    },
    {
      name: 'visitDate',
      title: 'Visit Date',
      type: 'date'
    },
    {
      name: 'wouldRecommend',
      title: 'Would Recommend',
      type: 'boolean',
      initialValue: true
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

## Step 4: Register Schema

In your Sanity Studio, update **`schemas/index.js`** (or `schema.js`):

```javascript
import restaurant from './restaurant'

export const schemaTypes = [restaurant]
```

## Step 5: Deploy Sanity Studio

```bash
# In your Sanity Studio folder
sanity deploy
```

This will give you a URL like: `https://your-project.sanity.studio`

## Step 6: Add Content

1. Go to your Sanity Studio URL
2. Click "Restaurant" content type
3. Click "Create new" 
4. Fill in restaurant details
5. Upload images
6. Publish!

## Step 7: Configure CORS in Sanity

1. Go to https://www.sanity.io/manage
2. Select your project
3. Go to "API" tab
4. Under "CORS Origins", add:
   - `http://localhost:3000` (for development)
   - Your production URL (e.g., `https://yourdomain.com`)
5. Allow credentials: ✓

## Step 8: Test Your Website

```bash
# Back in your Next.js project
npm run dev
```

Visit http://localhost:3000 - your restaurants should now appear!

---

## Alternative: Use JSON File (Quick Test)

If you want to test without Sanity first, your app already works with the JSON file at `data/restaurants.json`. The current setup uses `/api/local/restaurants` which reads from this file.

To add restaurants via the admin panel:
1. Run `npm run dev`
2. Look for the floating "+ Add Restaurant" button on homepage
3. Fill in the form
4. Data saves to `data/restaurants.json`

---

## Switching Between JSON and Sanity

**Currently using:** JSON file (`/api/local/restaurants`)

**To switch to Sanity:**
1. Complete Sanity setup above
2. Update `lib/api-service.ts` to use `/api/restaurants` instead of `/api/local/restaurants`
3. The Sanity API routes are already set up in `app/api/restaurants/route.ts`

**You can use both:**
- JSON file for testing/local development
- Sanity for production data

---

## 🎯 Quick Sanity Dashboard Access

After setup, access your content at:
- **Studio URL:** https://your-project.sanity.studio
- **Manage Console:** https://www.sanity.io/manage

---

## 📚 Helpful Commands

```bash
# Start Sanity Studio locally
sanity start

# Deploy studio updates
sanity deploy

# Check Sanity CLI version
sanity --version
```

---

## 🆘 Troubleshooting

**"Project not found"**
- Verify `NEXT_PUBLIC_SANITY_PROJECT_ID` in `.env.local` matches your Sanity project

**"Unauthorized"**
- Check `SANITY_API_TOKEN` has Editor permissions
- Regenerate token at https://www.sanity.io/manage → API → Tokens

**Images not showing**
- Add `cdn.sanity.io` to `next.config.js` (already done!)
- Verify images are published in Sanity Studio

**CORS errors**
- Add your domain to CORS origins in Sanity manage console

---

## ✅ Verification Checklist

- [ ] Sanity Studio created and deployed
- [ ] Restaurant schema added
- [ ] CORS configured
- [ ] At least 1 restaurant created in Sanity
- [ ] Images uploaded
- [ ] Restaurant published (not draft)
- [ ] API token has Editor role
- [ ] `.env.local` has correct credentials
- [ ] App runs with `npm run dev`
- [ ] Restaurants appear on website

---

**Need more help?** Check the official Sanity docs: https://www.sanity.io/docs
