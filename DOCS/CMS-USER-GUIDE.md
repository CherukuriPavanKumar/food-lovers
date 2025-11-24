# CMS User Guide - Managing Your Food Review Website

This guide will help you add and manage restaurant reviews using Sanity CMS.

## 📚 Table of Contents

1. [Accessing the CMS](#accessing-the-cms)
2. [Adding a New Review](#adding-a-new-review)
3. [Editing Existing Reviews](#editing-existing-reviews)
4. [Managing Images](#managing-images)
5. [Publishing Reviews](#publishing-reviews)
6. [Best Practices](#best-practices)

---

## 🔐 Accessing the CMS

### First Time Setup

1. **Access Sanity Studio:**
   - Open your browser
   - Navigate to: `https://your-project.sanity.studio`
   - Or run locally: `npm run sanity` (if configured)

2. **Login:**
   - Use your Google account or email
   - Make sure you have editor permissions

### Dashboard Overview

When you log in, you'll see:
- **Reviews:** All restaurant reviews
- **Media:** Uploaded images
- **Settings:** Site configuration

---

## ➕ Adding a New Review

### Step 1: Create New Review

1. Click **"Reviews"** in the left sidebar
2. Click **"+ Create"** button
3. Select **"Restaurant Review"**

### Step 2: Fill in Basic Information

#### Required Fields:

**Restaurant Name**
- Enter the official restaurant name
- Example: "The Spice Route"

**Slug**
- Auto-generates from restaurant name
- Used in the URL (e.g., `/reviews/the-spice-route`)
- Can be manually edited if needed

**Description**
- Write a brief overview (2-3 sentences)
- Focus on what makes this place special
- Example: "Elegant beachfront dining with authentic North Indian cuisine and stunning sea views."

### Step 3: Location Details

**Area/Location**
- Select from dropdown or add new area
- Examples: "RK Beach", "Dwaraka Nagar", "MVP Colony"

**Full Address**
- Complete address with landmarks
- Example: "Beach Road, RK Beach, Visakhapatnam - 530002"

**Map Coordinates**
- Latitude: Get from Google Maps
- Longitude: Get from Google Maps
- Help: Right-click on Google Maps → "What's here?" to get coordinates

### Step 4: Cuisine & Categories

**Cuisine Types** (Multi-select)
- Check all that apply
- Examples: Indian, Chinese, Continental, Seafood

**Price Range**
- Budget: Under ₹200 per person
- Moderate: ₹200-500 per person
- Premium: ₹500-1000 per person
- Luxury: Over ₹1000 per person

### Step 5: Ratings

Rate each aspect from 0 to 5 (decimals allowed):

**Overall Rating** (Required)
- Your overall experience rating
- This is the main star rating shown

**Ambiance**
- Restaurant atmosphere and decor
- Lighting, music, seating comfort

**Service**
- Staff friendliness and efficiency
- Speed of service
- Attentiveness

**Taste**
- Food quality and flavor
- Preparation and cooking
- Authenticity

**Value for Money**
- Is it worth the price?
- Portion sizes vs. cost

### Step 6: Review Content

**Full Review** (Rich Text)
- Write your detailed review (300-800 words)
- Structure suggestion:
  1. First impression
  2. Ambiance description
  3. Service experience
  4. Food review (detailed)
  5. Overall recommendation

**Must-Try Dishes** (List)
- Add 3-5 signature dishes
- Click "+ Add item" for each dish
- Examples: "Butter Chicken", "Seafood Platter"

**Highlights** (List)
- Add 3-5 key features
- Examples: "Beachfront seating", "Live music", "Late night service"

### Step 7: Images

**Cover Image** (Required)
- Main hero image
- Best quality photo of the restaurant or signature dish
- Recommended: Landscape orientation, minimum 1200x800px

**Gallery Images** (Optional)
- Add 3-6 additional photos
- Mix of: food close-ups, ambiance, plating, restaurant exterior
- Click "Upload" or drag & drop images

**Image Tips:**
- Use high-resolution photos (at least 1200px wide)
- Good lighting is essential
- Avoid overly filtered images
- Include variety: food, ambiance, details

### Step 8: Special Flags

**Featured Review**
- Check this box to show on homepage
- Only feature your best reviews (3-5 max)

**Best Place**
- Check if this is a must-visit restaurant
- Appears on "Best Places" page
- Reserve for truly exceptional experiences

**Review Date**
- Date you visited the restaurant
- Used for sorting and display

---

## ✏️ Editing Existing Reviews

1. **Find the Review:**
   - Click "Reviews" in sidebar
   - Use search box or scroll to find
   - Click on the review to open

2. **Make Changes:**
   - Edit any field as needed
   - Changes are saved automatically (draft)

3. **Update Published Version:**
   - Click "Publish" button after editing
   - Changes go live immediately

### When to Update Reviews

- Restaurant has been renovated
- Menu has significantly changed
- New must-try dishes discovered
- Prices have changed substantially
- Service quality has improved/declined

---

## 🖼️ Managing Images

### Uploading Images

**From Review Page:**
- Click image field → "Select" or "Upload"
- Choose file from computer
- Image processes and uploads

**From Media Library:**
- Click "Media" in sidebar
- Drag & drop multiple images
- Add descriptions for organization

### Image Best Practices

✅ **Do:**
- Use natural lighting when possible
- Shoot in landscape for cover images
- Show food plating clearly
- Capture ambiance shots
- Include establishing shots of restaurant

❌ **Don't:**
- Use blurry or dark photos
- Over-edit or heavily filter
- Include personal faces without permission
- Use images from the internet (copyright)

### Image Optimization

The website automatically:
- Resizes images for different screen sizes
- Compresses for fast loading
- Generates modern formats (WebP)
- Lazy loads images below the fold

---

## 📤 Publishing Reviews

### Draft vs. Published

**Draft Status:**
- Review is saved but not visible on website
- You can continue editing
- Preview available in CMS

**Published Status:**
- Review is live on the website
- Visible to all visitors
- Can still be edited after publishing

### Publishing Workflow

1. **Complete all required fields**
2. **Upload images**
3. **Preview the review** (if available)
4. **Click "Publish" button**
5. **Verify live on website** (may take 1-2 minutes)

### Unpublishing

- Click review → "Unpublish" button
- Review becomes draft again
- Removed from website immediately

---

## 💡 Best Practices

### Review Writing Tips

1. **Be Specific:**
   - ❌ "The food was good"
   - ✅ "The butter chicken had a perfect balance of tomato richness and cream"

2. **Be Fair:**
   - Mention both positives and negatives
   - Focus on facts, not just opinions
   - Give context for ratings

3. **Be Descriptive:**
   - Paint a picture of the experience
   - Describe textures, flavors, presentation
   - Set the scene of the ambiance

4. **Be Helpful:**
   - Include practical info (parking, reservations needed)
   - Mention best time to visit
   - Provide price estimates

### Content Consistency

- **Review Length:** Aim for 400-600 words
- **Must-Try Dishes:** List 3-5 items
- **Highlights:** 3-5 bullet points
- **Photos:** 1 cover + 3-5 gallery images

### SEO Tips

- Use restaurant name naturally in review
- Mention location/area 2-3 times
- Include cuisine types in description
- Add relevant keywords (e.g., "best biryani in Vizag")

### Rating Guidelines

**5.0 Stars:** Exceptional, no flaws
**4.5-4.9:** Excellent with minor room for improvement
**4.0-4.4:** Very good, solidly recommended
**3.5-3.9:** Good, worth visiting
**3.0-3.4:** Average, has notable issues
**Below 3.0:** Below expectations, not recommended

---

## 🚨 Common Issues & Solutions

### Issue: Review Not Showing on Website

**Solutions:**
1. Check if review is published (not draft)
2. Wait 2-3 minutes for cache to clear
3. Hard refresh browser (Ctrl+Shift+R)
4. Verify all required fields are filled

### Issue: Images Not Uploading

**Solutions:**
1. Check file size (max 10MB recommended)
2. Use supported formats: JPG, PNG, WebP
3. Check internet connection
4. Try compressing image first

### Issue: Slug Already Exists

**Solutions:**
1. Modify restaurant name slightly
2. Add location: "restaurant-name-location"
3. Add number: "restaurant-name-2"

---

## 📊 Metrics to Track

Monitor these to improve content:

- **Most viewed reviews:** Create similar content
- **Highest rated places:** Feature prominently
- **Cuisine popularity:** Balance coverage
- **Geographic coverage:** Ensure area diversity

---

## 🔄 Regular Maintenance

### Weekly Tasks:
- Review new comments/feedback
- Check for outdated information
- Add 1-2 new reviews

### Monthly Tasks:
- Update featured reviews
- Verify restaurant info (hours, menu, prices)
- Analyze popular content
- Plan content for next month

### Quarterly Tasks:
- Revisit top restaurants
- Update old reviews if needed
- Archive closed restaurants
- Refresh homepage featured content

---

## 🎯 Content Strategy

### Building Your Review Library

**Start With:**
1. Popular, well-known restaurants
2. Your personal favorites
3. Diverse cuisine types
4. Various price ranges
5. Different neighborhoods

**Expand To:**
1. Hidden gems
2. New openings
3. Seasonal specials
4. Trending spots
5. Reader requests

### Maintaining Quality

- Don't rush reviews
- Visit during different times
- Try multiple dishes
- Take quality photos
- Get a second opinion if unsure

---

## 📞 Getting Help

**Technical Issues:**
- Clear browser cache
- Try different browser
- Contact site administrator

**Content Questions:**
- Refer to example reviews
- Check style guide
- Ask for feedback before publishing

---

## ✅ Pre-Publish Checklist

Before publishing each review:

- [ ] Restaurant name is correct
- [ ] All ratings filled (overall, ambiance, service, taste, value)
- [ ] Description is compelling (2-3 sentences)
- [ ] Full review is 400+ words
- [ ] 3-5 must-try dishes listed
- [ ] 3-5 highlights added
- [ ] Location and address are accurate
- [ ] Map coordinates added
- [ ] Cover image uploaded (high quality)
- [ ] 3+ gallery images added
- [ ] Cuisine types selected
- [ ] Price range selected
- [ ] Review date added
- [ ] Slug is clean and descriptive
- [ ] Featured/Best Place flags set appropriately
- [ ] Proofread for typos
- [ ] Preview looks good

---

**Remember:** Your reviews help thousands of food lovers make better dining decisions. Take pride in creating helpful, honest, and engaging content!

For technical support or questions, contact: [your-email@domain.com]

---

*Last Updated: November 2025*
