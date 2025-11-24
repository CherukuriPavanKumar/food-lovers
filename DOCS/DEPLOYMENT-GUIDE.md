# Deployment Guide for Vizag Food Explorer

This guide covers deploying your food review website to production.

## Prerequisites

- GitHub account
- Vercel account (free tier available)
- Domain name (optional but recommended)
- Sanity project set up

## Option 1: Deploy to Vercel (Recommended)

Vercel is the easiest and fastest way to deploy Next.js applications.

### Step 1: Prepare Your Repository

1. **Initialize Git (if not already done):**
```bash
git init
git add .
git commit -m "Initial commit: Food review website"
```

2. **Create GitHub repository:**
   - Go to github.com
   - Click "New repository"
   - Name it (e.g., `vizag-food-explorer`)
   - Don't initialize with README (you already have one)

3. **Push to GitHub:**
```bash
git remote add origin https://github.com/yourusername/your-repo.git
git branch -M main
git push -u origin main
```

### Step 2: Deploy to Vercel

1. **Go to Vercel:**
   - Visit [vercel.com](https://vercel.com)
   - Sign up/Login with GitHub

2. **Import Project:**
   - Click "Add New" → "Project"
   - Select your GitHub repository
   - Click "Import"

3. **Configure Project:**
   - Framework Preset: Next.js (auto-detected)
   - Root Directory: `./`
   - Build Command: `npm run build` (default)
   - Output Directory: `.next` (default)

4. **Add Environment Variables:**

Click "Environment Variables" and add:

```
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_token
```

Get these from:
- Sanity dashboard: https://www.sanity.io/manage
- Project Settings → API

5. **Deploy:**
   - Click "Deploy"
   - Wait 2-3 minutes
   - Your site is live! 🎉

### Step 3: Configure Custom Domain

1. **In Vercel Dashboard:**
   - Go to Project → Settings → Domains
   - Add your domain (e.g., `vizagfoodexplorer.com`)

2. **Update DNS Records:**

If using a domain registrar (GoDaddy, Namecheap, etc.):

**For root domain (`example.com`):**
- Type: `A`
- Name: `@`
- Value: `76.76.21.21`

**For www subdomain:**
- Type: `CNAME`
- Name: `www`
- Value: `cname.vercel-dns.com`

3. **Wait for DNS Propagation:**
   - Usually takes 5-30 minutes
   - Can take up to 48 hours in rare cases

4. **Verify:**
   - Vercel will show a checkmark when ready
   - Visit your domain to test

## Option 2: Deploy to Netlify

### Step 1: Push to GitHub

Same as Vercel Step 1 above.

### Step 2: Deploy to Netlify

1. **Go to Netlify:**
   - Visit [netlify.com](https://netlify.com)
   - Sign up/Login with GitHub

2. **Import Project:**
   - Click "Add new site" → "Import an existing project"
   - Choose GitHub
   - Select your repository

3. **Configure Build Settings:**
   - Build command: `npm run build`
   - Publish directory: `.next`
   - Add environment variables (same as Vercel)

4. **Deploy:**
   - Click "Deploy site"
   - Wait for build to complete

### Step 3: Custom Domain

- Go to Site settings → Domain management
- Add custom domain
- Follow DNS configuration instructions

## Post-Deployment Checklist

### 1. Verify All Pages Work

- [ ] Homepage loads correctly
- [ ] Reviews page with filters
- [ ] Individual review pages
- [ ] Best Places page
- [ ] About page
- [ ] Contact form
- [ ] All images load

### 2. Test Performance

Use these tools:
- [PageSpeed Insights](https://pagespeed.web.dev/)
- [GTmetrix](https://gtmetrix.com/)
- [WebPageTest](https://www.webpagetest.org/)

**Target Metrics:**
- First Contentful Paint: < 1.8s
- Largest Contentful Paint: < 2.5s
- Cumulative Layout Shift: < 0.1
- Performance Score: > 90

### 3. SEO Configuration

**Verify in Google Search Console:**
1. Add property
2. Verify ownership
3. Submit sitemap: `https://yourdomain.com/sitemap.xml`

**Create sitemap.xml:**
```typescript
// app/sitemap.ts
import { MetadataRoute } from 'next'
import { getAllReviews } from '@/lib/sanity-queries'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const reviews = await getAllReviews()
  
  const reviewUrls = reviews.map((review) => ({
    url: `https://yourdomain.com/reviews/${review.slug}`,
    lastModified: review.reviewDate,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  return [
    {
      url: 'https://yourdomain.com',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: 'https://yourdomain.com/reviews',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: 'https://yourdomain.com/best-places',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: 'https://yourdomain.com/about',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: 'https://yourdomain.com/contact',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    ...reviewUrls,
  ]
}
```

### 4. Analytics Setup

**Google Analytics:**

1. Create GA4 property at [analytics.google.com](https://analytics.google.com)
2. Get Measurement ID (G-XXXXXXXXXX)
3. Add to `.env.local` and Vercel:
```
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

4. Add tracking code to `app/layout.tsx`:
```typescript
import Script from 'next/script'

export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}');
          `}
        </Script>
      </head>
      <body>{children}</body>
    </html>
  )
}
```

### 5. Security Headers

Add to `next.config.js`:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          }
        ]
      }
    ]
  }
}

module.exports = nextConfig
```

## Continuous Deployment

### Automatic Deploys

Once connected to GitHub:
- Every push to `main` branch triggers automatic deployment
- Pull requests get preview deployments
- Rollback to previous deployments instantly

### Branch Strategy

**Recommended workflow:**

1. **main** - Production branch
2. **staging** - Testing branch
3. **feature/*** - Feature branches

**Setup:**
- `main` → Production deployment
- `staging` → Staging deployment (optional)
- PRs → Preview deployments

## Monitoring & Maintenance

### 1. Uptime Monitoring

Use one of:
- [UptimeRobot](https://uptimerobot.com/) - Free
- [Pingdom](https://www.pingdom.com/)
- Vercel built-in monitoring

### 2. Error Tracking

**Sentry Integration:**

```bash
npm install @sentry/nextjs
```

Initialize in your app and add DSN to environment variables.

### 3. Regular Updates

**Weekly:**
- Check analytics
- Monitor performance
- Review error logs

**Monthly:**
- Update dependencies: `npm update`
- Review and refresh old content
- Check broken links

## Troubleshooting

### Build Fails

**Issue:** Build fails with module errors
**Solution:** 
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Environment Variables Not Working

**Solution:**
- Verify variables in Vercel dashboard
- Redeploy after adding new variables
- Check variable names match exactly

### Images Not Loading

**Solution:**
- Add image domains to `next.config.js`:
```javascript
module.exports = {
  images: {
    domains: ['cdn.sanity.io', 'images.unsplash.com'],
  },
}
```

### Slow Performance

**Solutions:**
1. Enable Vercel Analytics
2. Optimize images (use WebP)
3. Implement ISR for static pages
4. Enable Vercel caching
5. Use CDN for static assets

## Rollback Procedure

If issues occur after deployment:

**In Vercel:**
1. Go to Deployments
2. Find previous working deployment
3. Click three dots → Promote to Production
4. Confirm

**Takes effect immediately**

## Support Resources

- **Vercel Support:** [vercel.com/support](https://vercel.com/support)
- **Next.js Docs:** [nextjs.org/docs](https://nextjs.org/docs)
- **Community:** Next.js Discord, GitHub Discussions

---

## Quick Reference

### Useful Commands

```bash
# Build locally
npm run build

# Test production build
npm run start

# Check for errors
npm run lint

# Type check
npx tsc --noEmit
```

### Important URLs

- **Vercel Dashboard:** https://vercel.com/dashboard
- **GitHub Repo:** https://github.com/yourusername/your-repo
- **Sanity Studio:** https://your-project.sanity.studio
- **Analytics:** https://analytics.google.com

---

**Deployment Status Checklist:**

- [ ] Code pushed to GitHub
- [ ] Deployed to Vercel
- [ ] Custom domain configured
- [ ] Environment variables set
- [ ] All pages accessible
- [ ] Performance tested (>90 score)
- [ ] SEO verified
- [ ] Analytics tracking
- [ ] Sanity CMS connected
- [ ] Client trained on CMS
- [ ] Monitoring enabled

---

*Your food review website is now live and ready to inspire food lovers! 🍽️*
