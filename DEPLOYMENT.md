# GitHub Pages Deployment Guide

This guide explains how to deploy your portfolio to GitHub Pages while keeping the full-stack version for development.

## Prerequisites

1. Push your code to a GitHub repository
2. Enable GitHub Pages in your repository settings

## Deployment Steps

### Option 1: Manual Deployment (Recommended)

1. **Build the frontend**:
   ```bash
   npm run build:frontend
   ```

2. **Copy built files to a separate branch**:
   ```bash
   # Create and switch to gh-pages branch
   git checkout --orphan gh-pages
   
   # Copy dist files to root
   cp -r dist/public/* .
   
   # Add and commit
   git add .
   git commit -m "Deploy to GitHub Pages"
   
   # Push to GitHub
   git push origin gh-pages
   ```

3. **Configure GitHub Pages**:
   - Go to your repository → Settings → Pages
   - Source: Deploy from a branch
   - Branch: gh-pages
   - Folder: / (root)

### Option 2: GitHub Actions (Automated)

The `.github/workflows/deploy.yml` file is already created for automatic deployment on every push to main.

## Important Notes

### For GitHub Pages Deployment:

1. **Base URL**: Update your repository name in the base path
2. **Contact Form**: Will need modification for static hosting
3. **API Calls**: Remove or replace with static alternatives

### Contact Form Alternatives for Static Site:

1. **Formspree**: Add action="https://formspree.io/f/YOUR_FORM_ID"
2. **Netlify Forms**: Use netlify attribute
3. **EmailJS**: Client-side email service
4. **GitHub Issues**: Link to create new issue

## Repository Structure for GitHub Pages

```
your-username.github.io/portfolio/
├── index.html          # Built from your React app
├── assets/            # CSS, JS, images
└── static files...    # Other built assets
```

## Testing Locally

Test the static build before deployment:
```bash
# Build frontend
npm run build:frontend

# Serve static files (install serve globally if needed)
npx serve dist/public
```

Your site will be available at: `https://your-username.github.io/repository-name/`