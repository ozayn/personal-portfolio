# Personal Portfolio - Project Summary

## 🎯 **Project Overview**
A modern, full-stack personal portfolio website showcasing professional work and photography, built with React, Express, and PostgreSQL.

## 🏗️ **Architecture**
- **Frontend**: React + TypeScript + Vite + Tailwind CSS
- **Backend**: Express.js + Node.js + TypeScript
- **Database**: Neon (Serverless PostgreSQL)
- **ORM**: Drizzle ORM
- **Deployment**: Railway (PaaS)
- **Domain**: ozayn.com (custom domain)

## 📁 **Project Structure**
```
/Users/oz/Dropbox/2025/PersonalPortfolio/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── pages/         # Page components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── lib/           # Utilities and configurations
│   │   └── data/          # Static data (portfolio info)
│   └── public/            # Static assets (images, photos)
├── server/                # Express backend
│   ├── index.ts          # Server entry point
│   ├── routes.ts         # API routes
│   ├── db.ts             # Database connection
│   ├── storage.ts        # Database operations
│   └── auth.ts           # Authentication setup
├── shared/               # Shared types and schemas
├── scripts/              # Build and deployment scripts
└── dist/                 # Production build output
```

## 🚀 **Quick Start Commands**

### **Development**
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Access at: http://localhost:5002
```

### **Production Build**
```bash
# Build for production
npm run build

# Start production server
npm start
```

### **Type Checking**
```bash
# Check TypeScript compilation
npm run check
```

### **Database**
```bash
# Push schema changes to database
npm run db:push
```

## 🔧 **Environment Variables**

### **Required (.env file)**
```bash
# Database
DATABASE_URL=your_neon_connection_string_here

# Session Management
SESSION_SECRET=your-super-secret-session-key-here

# Environment
NODE_ENV=development
```

### **Optional**
```bash
# OpenAI (for AI-powered search features)
OPENAI_API_KEY=your_openai_api_key_here
```

## 🗄️ **Database Setup**
- **Service**: Neon (Serverless PostgreSQL)
- **Connection**: Via DATABASE_URL environment variable
- **Tables**: 
  - `photos` - Photography portfolio images
  - `contact_messages` - Contact form submissions (if enabled)
  - `sessions` - User session storage

## 🌐 **Deployment**
- **Platform**: Railway
- **Repository**: GitHub (ozayn/personal-portfolio)
- **Domain**: ozayn.com
- **Auto-deploy**: Enabled on main branch push

### **Railway Environment Variables**
- `DATABASE_URL` - Neon connection string
- `SESSION_SECRET` - Session encryption key
- `OPENAI_API_KEY` - OpenAI API key (optional)
- `NODE_ENV=production`

## 📱 **Features**

### **Portfolio Sections**
1. **Hero Section** - Introduction and navigation
2. **Professional Section** - Data science projects and resume
3. **Photography Section** - Photo gallery with search functionality
4. **Contact Section** - Contact information and social links

### **Key Functionality**
- **Responsive Design** - Mobile-first approach
- **Photo Gallery** - Lightbox modal for image viewing
- **Search System** - AI-powered photo search with fallback
- **Static File Serving** - Optimized image delivery
- **Rate Limiting** - API protection against abuse

## 🔍 **Search System**
- **AI-Powered**: Uses OpenAI GPT-4o for intelligent photo search
- **Fallback**: Smart keyword matching when AI unavailable
- **Rate Limited**: 10 requests per minute per IP
- **Debounced**: 1-second delay to prevent excessive calls

## 🛠️ **Development Notes**

### **Recent Changes (2025)**
- ✅ Removed all Replit dependencies and references
- ✅ Simplified authentication (public portfolio access)
- ✅ Fixed TypeScript compilation errors
- ✅ Updated copyright year to 2025
- ✅ Removed contact form (information display only)
- ✅ Added contact section to navigation

### **Build Process**
1. **Frontend**: Vite builds React app to `dist/public/`
2. **Static Files**: Script copies `client/public/` to `dist/public/`
3. **Backend**: TypeScript compiled with `tsx` runtime

### **File Serving**
- **Development**: Vite dev server with HMR
- **Production**: Express serves static files from `dist/public/`

## 🐛 **Common Issues & Solutions**

### **OpenAI API Errors (429)**
- **Cause**: Quota exceeded or rate limiting
- **Solution**: System automatically falls back to keyword search
- **Status**: Expected behavior, not an error

### **Authentication Errors (401)**
- **Cause**: Public portfolio doesn't require authentication
- **Solution**: System returns `null` for unauthenticated users
- **Status**: Expected behavior

### **Build Failures**
- **Check**: TypeScript compilation with `npm run check`
- **Verify**: All imports and dependencies are correct
- **Clean**: Delete `node_modules` and `dist/`, then `npm install`

## 📚 **Documentation Files**
- `LOCAL_SETUP.md` - Detailed local development setup
- `DEPLOYMENT_GUIDE.md` - Complete deployment instructions
- `DEPLOYMENT_LESSONS.md` - Key lessons learned during deployment
- `replit.md` - Historical Replit setup notes (deprecated)

## 🔗 **External Services**
- **Neon**: Database hosting (free tier available)
- **Railway**: Application hosting and deployment
- **OpenAI**: AI-powered search features (optional)
- **GitHub**: Version control and repository hosting

## 📞 **Contact Information**
- **Email**: azin.faghihi@gmail.com
- **GitHub**: github.com/ozayn
- **LinkedIn**: linkedin.com/in/azin-faghihi
- **Website**: ozayn.com

---

**Last Updated**: January 2025  
**Status**: Production Ready ✅  
**Platform**: Railway + Neon + Custom Domain
