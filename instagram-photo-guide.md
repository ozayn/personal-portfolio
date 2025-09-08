# Adding Your Instagram Photos to the Website

## Super Easy Method (5 minutes):

1. **Get your Instagram photo URLs:**
   - Go to https://instagram.com/ozayn
   - Right-click on any photo → "Open image in new tab"
   - Copy the URL from the new tab (looks like: `https://scontent-lga3-1.cdninstagram.com/v/...`)

2. **Or use this even easier method:**
   - Go to https://instagram.com/ozayn
   - Right-click on any photo → "Copy image address"
   - This gives you the direct image URL instantly!

3. **Update the code:**
   - Open `client/src/data/portfolio-data.ts`
   - Find the `photographyImages` array (starts around line 128)
   - Replace the Unsplash URLs with your Instagram URLs
   - Update the title, category, and description

## Example:
```javascript
{
  id: 1,
  title: "Your Photo Title",
  category: "street", // or "portraits", "urban", "travel", "candid"
  src: "https://scontent-lga3-1.cdninstagram.com/v/YOUR_PHOTO_URL",
  fullSrc: "https://scontent-lga3-1.cdninstagram.com/v/YOUR_PHOTO_URL",
  description: "Your photo description"
}
```

## Categories Available:
- **street** - Street photography, people in public spaces
- **portraits** - Portrait photography, close-ups
- **urban** - Architecture, city scenes, geometric patterns
- **travel** - Travel photography, landscapes, places
- **candid** - Spontaneous moments, unposed photos

## Pro Tips:
- Instagram URLs work directly in websites
- You can use the same URL for both `src` and `fullSrc`
- The photos will automatically be optimized for web display
- Make sure to match the category with your actual photo content