# 🚀 Setup Instructions

## Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Git (optional)

## Step 1: Clone/Download the Project

```bash
# If using git
git clone <your-repo-url>
cd FOOD-LOVERS-GANG-main

# Or download and extract the ZIP file
```

## Step 2: Install Dependencies

```bash
npm install
# or
yarn install
```

## Step 3: Configure Environment Variables

1. Copy the example environment file:
```bash
cp .env.example .env.local
```

2. Open `.env.local` and fill in your values:

```env
# Required: Sanity CMS Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=your_sanity_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
SANITY_API_TOKEN=your_server_side_sanity_token
```

### How to Get Sanity Credentials:

1. Go to [https://www.sanity.io/manage](https://www.sanity.io/manage)
2. Create a new project or select existing one
3. Get your Project ID from the project settings
4. Create API tokens:
   - **Server Token**: Settings → API → Add API token → Editor role
   - Use this for `SANITY_API_TOKEN`

## Step 4: Run Development Server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Step 5: Customize Your Site

1. **Update Site Information** in `lib/constants.ts`:
   - Change your name
   - Update social media links
   - Modify taglines and descriptions

2. **Update Colors** in `tailwind.config.ts` (if needed)

3. **Add Your Logo/Images** in the `public/` folder

## Step 6: Build for Production

```bash
npm run build
npm start
# or
yarn build
yarn start
```

## Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Add environment variables in Vercel dashboard
5. Deploy!

### Deploy to Other Platforms

The app works on any platform that supports Next.js:
- Netlify
- Railway
- AWS Amplify
- DigitalOcean App Platform

## Troubleshooting

### "Module not found" errors
```bash
rm -rf node_modules package-lock.json
npm install
```

### Build errors
```bash
npm run build
# Check for any TypeScript or build errors
```

### Images not loading
- Check that image URLs are added to `next.config.js` under `remotePatterns`
- Verify image URLs are accessible

## Need Help?

- Check the [Next.js Documentation](https://nextjs.org/docs)
- Check the [Sanity Documentation](https://www.sanity.io/docs)
- Review `PROJECT-SUMMARY.md` for architecture details

## Optional Integrations

### Analytics (Google Analytics)
Add to `.env.local`:
```env
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

### Email Service (Resend)
Add to `.env.local`:
```env
RESEND_API_KEY=re_xxxxxxxx
```

---

Happy coding! 🎉
