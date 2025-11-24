# ⚡ Quick Start Guide

Get your food review website up and running in 5 minutes!

## 🚀 Getting Started

### 1. Install & Run (1 minute)

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Visit: **http://localhost:3000**

---

## 🎨 Customize Your Site (5 minutes)

### Update Your Information

Open `lib/constants.ts` and update:

```typescript
export const SITE_CONFIG = {
  name: 'Your Name',                    // Change this
  title: 'Your City Food Explorer',     // Change this
  tagline: 'Your custom tagline',       // Change this
  
  author: {
    social: {
      instagram: 'https://instagram.com/yourhandle',  // Your link
      facebook: 'https://facebook.com/yourpage',      // Your link
      youtube: 'https://youtube.com/@yourchannel',    // Your link
      email: 'your@email.com'                         // Your email
    }
  },
  
  metrics: {
    followers: '300K+',        // Your follower count
    reviewsCount: '150+',      // Your review count
    restaurantsCovered: '50+'  // Restaurants you've covered
  }
};
```

**Save the file** and refresh your browser. Changes appear instantly! ✨

---

## 📁 Project Structure (What's Where)

```
Important Files:
├── lib/constants.ts           ← Edit: Your info & settings
├── lib/mock-data.ts           ← Edit: Sample reviews
├── components/                ← All reusable components
├── app/                       ← All pages
│   ├── page.tsx              ← Homepage
│   ├── reviews/              ← Reviews pages
│   ├── best-places/          ← Best places page
│   ├── about/                ← About page
│   └── contact/              ← Contact page
└── DOCS/                      ← Guides & documentation
```

---

## 🎯 What to Do Next

### Option A: Just Exploring? (Try this)

1. ✅ You're already running the site!
2. Browse around and see all the features
3. Check out the reviews page with filters
4. View individual review details
5. Test the contact form

### Option B: Ready to Launch? (Follow this order)

**Week 1: Customize**
1. Update `lib/constants.ts` with your info
2. Add your photos to `public/images/`
3. Change colors in `tailwind.config.ts` (optional)

**Week 2: Setup CMS**
1. Read `DOCS/SANITY-SETUP.md`
2. Create Sanity account
3. Set up CMS schemas
4. Add your real reviews

**Week 3: Deploy**
1. Push code to GitHub
2. Deploy to Vercel (free!)
3. Connect your domain
4. Go live! 🎉

---

## 🆘 Common Questions

### "How do I add my own reviews?"

**Quick way (for testing):**
Edit `lib/mock-data.ts` and add to the array.

**Proper way (for production):**
Set up Sanity CMS (see `DOCS/SANITY-SETUP.md`)

### "How do I change colors?"

Edit `tailwind.config.ts` and change `colors.emerald` to your preferred color.

### "How do I add my photo?"

1. Add image to `public/images/reviewer.jpg`
2. Update path in `lib/constants.ts`

### "Where's the contact form data sent?"

Currently it's client-side only. To collect submissions:
- Use services like Formspree, Web3Forms, or
- Add an API route to send emails

### "Can I use this without CMS?"

Yes! Keep using `lib/mock-data.ts` for reviews. It works perfectly for small sites.

---

## 📚 Full Documentation

- **README.md** - Complete project overview
- **DOCS/CMS-USER-GUIDE.md** - Managing content (25 pages!)
- **DOCS/SANITY-SETUP.md** - Technical CMS setup
- **DOCS/DEPLOYMENT-GUIDE.md** - Going live
- **PROJECT-SUMMARY.md** - Complete feature list

---

## 🛠️ Useful Commands

```bash
npm run dev          # Start development (you're here!)
npm run build        # Build for production
npm run start        # Run production build
npm run lint         # Check for code issues
```

---

## 🎨 Quick Customizations

### Change Primary Color

`tailwind.config.ts`:
```typescript
colors: {
  emerald: colors.blue,  // Change emerald to any color!
}
```

### Change Fonts

`app/layout.tsx`:
```typescript
import { Poppins } from 'next/font/google'  // Use any Google font
```

### Update Homepage Hero Image

`components/home/Hero.tsx`:
```typescript
backgroundImage: 'url(your-image-url-here)'
```

---

## 🚀 Deploy in 10 Minutes

1. **Create GitHub account** (if needed)
2. **Push your code:**
   ```bash
   git init
   git add .
   git commit -m "My food review site"
   git remote add origin YOUR_GITHUB_URL
   git push -u origin main
   ```

3. **Go to [vercel.com](https://vercel.com)**
4. **Click "Import Project"**
5. **Select your repo**
6. **Click "Deploy"**
7. **Done!** ✨

Your site is now live at: `your-project.vercel.app`

---

## ✅ Checklist: First 30 Minutes

- [ ] Run `npm install` and `npm run dev`
- [ ] Browse all pages (Home, Reviews, Best Places, About, Contact)
- [ ] Update your name in `lib/constants.ts`
- [ ] Update social media links
- [ ] Update metrics (followers, reviews count)
- [ ] Add your photo (optional)
- [ ] Test responsive design (resize browser)
- [ ] Test filters on Reviews page
- [ ] Read the README.md
- [ ] Star planning your content!

---

## 🎉 You're All Set!

The site is running at **http://localhost:3000**

**Next Steps:**
1. Explore and test everything
2. Read the documentation
3. Customize your content
4. Deploy to the world!

---

## 💡 Pro Tips

- **Use the filters** on the Reviews page - they're fully functional!
- **All pages are responsive** - try resizing your browser
- **Animations are smooth** - hover over cards and buttons
- **Check the About page** - great example of content structure
- **Contact form validates** - try submitting empty/invalid data

---

## 🆘 Need Help?

1. **Check the docs** in the `DOCS/` folder
2. **Read error messages** - they're usually helpful!
3. **Google the error** - Next.js has great docs
4. **Check console** in browser dev tools

---

## 🎊 Congratulations!

You now have a professional, production-ready food review website. 

**Make it yours and inspire food lovers!** 🍽️

---

**Current Status:**  
✅ Development server running  
✅ Ready for customization  
✅ Ready to add content  
✅ Ready to deploy

**Happy reviewing!** ⭐⭐⭐⭐⭐
