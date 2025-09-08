# Portfolio Website

## Overview

This is a modern, responsive portfolio website built for a data scientist and photographer. The application showcases professional work, photography portfolio, and provides a contact form for potential clients or collaborators. The site is built with a full-stack architecture using React for the frontend and Express.js for the backend.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **UI Components**: Radix UI components via shadcn/ui library
- **State Management**: TanStack Query (React Query) for server state management
- **Routing**: Wouter for lightweight client-side routing
- **Build Tool**: Vite for fast development and optimized builds

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **Validation**: Zod for runtime type checking and validation
- **Session Management**: Built-in session handling for development

## Key Components

### Frontend Components
1. **Navigation**: Fixed header with smooth scrolling navigation
2. **Hero Section**: Landing area with personal introduction and call-to-action buttons
3. **Professional Section**: Displays projects, experience, education, and skills
4. **Photography Section**: Portfolio gallery with category filtering and lightbox modal
5. **Contact Section**: Contact form with validation and submission handling
6. **Lightbox Modal**: Full-screen image viewer for photography portfolio

### Backend Components
1. **API Routes**: RESTful endpoints for contact form submission and message retrieval
2. **Storage Layer**: Abstracted storage interface with in-memory implementation for development
3. **Database Schema**: User and contact message models with proper relationships
4. **Validation**: Server-side validation using Zod schemas

## Data Flow

1. **Contact Form Submission**:
   - User fills out contact form → Client-side validation → API request to `/api/contact`
   - Server validates data with Zod schema → Stores in database → Returns success response
   - Client displays success toast notification

2. **Photography Portfolio**:
   - Static data loaded from portfolio data file → Filtered by category → Displayed in responsive grid
   - Click on image → Opens lightbox modal with full-size image

3. **Professional Content**:
   - Static data for projects, experience, and education displayed in organized sections
   - Responsive design adapts to different screen sizes

## External Dependencies

### Frontend Dependencies
- **UI Framework**: React with extensive Radix UI component library
- **Styling**: Tailwind CSS with PostCSS processing
- **Icons**: Lucide React for consistent iconography
- **Date Handling**: date-fns for date formatting
- **HTTP Client**: Built-in fetch API with custom wrapper

### Backend Dependencies
- **Database**: Drizzle ORM with PostgreSQL dialect
- **Validation**: Zod for schema validation
- **Database Provider**: Neon Database serverless connection
- **Session Storage**: connect-pg-simple for PostgreSQL session store

### Development Dependencies
- **Build Tools**: Vite with React plugin and TypeScript support
- **Development Experience**: Replit-specific plugins for enhanced development workflow
- **Type Checking**: TypeScript with strict configuration

## Deployment Strategy

### Development Environment
- **Local Development**: Vite development server with HMR (Hot Module Replacement)
- **Backend**: Express server with TypeScript compilation via tsx
- **Database**: Neon Database with environment-based connection string

### Production Build
- **Frontend**: Vite production build generating optimized static assets
- **Backend**: esbuild bundling for Node.js deployment
- **Database**: Drizzle migrations for schema management
- **Static Assets**: Served directly by Express in production

### Environment Configuration
- **Database**: PostgreSQL connection via DATABASE_URL environment variable
- **Session Management**: Configurable session store with PostgreSQL backend
- **CORS**: Development-friendly CORS configuration

## How to Update Your Photography Portfolio

To replace the placeholder images with your actual Instagram photos:

1. **For each photo you want to add:**
   - Go to your Instagram post
   - Right-click on the image and select "Copy image address"
   - Open `client/src/data/portfolio-data.ts`
   - Find the `photographyImages` array
   - Replace the `src` and `fullSrc` URLs with your copied address
   - Update the `title`, `category`, and `description` to match your photo

2. **Available categories:**
   - `portraits` - Portrait photography
   - `travel` - Travel and landscape photos
   - `street` - Street photography and urban scenes
   - `nature` - Nature and wildlife photography
   - `experimental` - Creative and artistic compositions

3. **To add more photos:**
   - Copy an existing photo object in the array
   - Update the `id` to be unique
   - Replace all the details with your new photo information

## Changelog

- July 05, 2025: Initial portfolio website setup with dual-purpose design
- July 05, 2025: Added personal profile picture from uploaded image to hero section
- July 05, 2025: Instagram integration with direct link to @ozayn account
- July 05, 2025: Extracted resume content and updated professional information with accurate details
- July 05, 2025: Updated photography categories to street photography focus: street, portraits, urban, travel, candid
- July 05, 2025: Added actual resume file download functionality (.pages format)
- July 05, 2025: Enhanced professional experience and projects with real data from resume
- July 06, 2025: Implemented AI-powered search with intelligent fallback system for photography portfolio
- July 06, 2025: Optimized all photo files from 2MB+ to 1-2MB range for better performance
- July 06, 2025: Added comprehensive image loading optimizations and moved images to public folder
- July 06, 2025: Implemented masonry layout for all gallery views with natural photo dimensions
- July 06, 2025: Fixed photo framing to show vertical and horizontal photos in proper orientations
- July 11, 2025: Updated all project overviews with authentic descriptions from GitHub README files for maximum accuracy
- July 18, 2025: Implemented secure admin system with Replit authentication for private photo uploads
- July 18, 2025: Added database-powered photo management with automatic image optimization
- July 18, 2025: Created private admin access route (/login) hidden from public navigation
- July 18, 2025: Enhanced admin security by changing routes to memorable but non-obvious paths (/photo-studio → /portfolio-manager)
- July 22, 2025: Added new Standardized Test Analysis project to portfolio with authentic geospatial visualizations and analysis comparing SAT/ACT requirements to state averages
- July 22, 2025: Created dedicated project page for Standardized Test Analysis with detailed visualizations, technical details, and findings at /standardized-test-analysis route
- July 22, 2025: Updated FoodHub project with authentic content from README file including exact problem statement, key findings, and technical specifications
- July 22, 2025: Created dedicated project page for FoodHub Orders with comprehensive details, key findings, visualizations, and recommendations at /foodhub-orders route
- July 22, 2025: Enhanced FoodHub project page with authentic content from Jupyter notebook including detailed problem context, technical methodology, data dictionary, and multivariate analysis insights
- July 23, 2025: Implemented working clickable zoom functionality for all data visualizations with lightbox modals and improved user interaction
- July 23, 2025: Added comprehensive data sources sections to both project pages with detailed dataset information and specifications
- July 23, 2025: Streamlined navigation by removing "Test Analysis" tab for cleaner main navigation interface
- July 23, 2025: Created detailed project pages for Stock Market Sentiment Analysis, Subreddit Classification, and Graphs & Networks Exploration with comprehensive overviews, data sources, visualizations, and tools sections matching the established portfolio structure
- July 25, 2025: Enhanced Plant Seedling Classification page with Computer Vision, TensorFlow, and Transfer Learning emphasis plus specific package information from actual requirements files
- July 25, 2025: Created comprehensive Credit Card User Churn Prediction project page with advanced Ensemble Learning, Random Forest, AdaBoost, SMOTE oversampling, and Hyperparameter Tuning technical focus
- July 25, 2025: Built detailed Bank Customer Churn Prediction page emphasizing Neural Networks, TensorFlow, Keras, and Deep Learning techniques
- July 25, 2025: Developed Personal Loan Campaign Analysis page showcasing Decision Trees, Marketing Analytics, and Customer Segmentation strategies

## Deployment Information

### Admin Access URLs
- **Login**: yoursite.com/photo-studio
- **Portfolio Manager**: yoursite.com/portfolio-manager

### Security Features
- Hidden admin routes (not discoverable through public navigation)
- Replit OAuth authentication required
- Database-powered session management
- Automatic image optimization on upload
- Server-side file deletion protection

### Database Configuration
- PostgreSQL via Neon Database
- Automatic schema management with Drizzle ORM
- Session storage in database (not cookies)
- Photo metadata and file paths stored securely

### Photo Upload System
- Automatic optimization: resize to max 1920x1920px
- JPEG conversion at 85% quality
- File size reduction: typically 88-97% smaller
- Optimized files stored in `/client/public/photos/`
- Database records with metadata and file paths

### Environment Variables Required
- `DATABASE_URL`: PostgreSQL connection string
- `OPENAI_API_KEY`: For AI-powered photo search
- `SESSION_SECRET`: Session encryption key
- `REPLIT_DOMAINS`: Domain configuration for OAuth

## User Preferences

Preferred communication style: Simple, everyday language.