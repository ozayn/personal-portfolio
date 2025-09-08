# Portfolio Deployment Guide

This guide documents the complete process of deploying a React + Express + PostgreSQL portfolio application to Railway, including all the challenges we encountered and solutions we implemented.

## Table of Contents
- [Local Development Setup](#local-development-setup)
- [Deployment to Railway](#deployment-to-railway)
- [Key Challenges & Solutions](#key-challenges--solutions)
- [Environment Variables](#environment-variables)
- [Static File Handling](#static-file-handling)
- [Database Setup](#database-setup)
- [Domain Configuration](#domain-configuration)

## Local Development Setup

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- PostgreSQL database (we use Neon)
- Git

### 1. Clone and Install Dependencies
```bash
git clone <your-repo-url>
cd personal-portfolio
npm install
```

### 2. Environment Variables
Create a `.env` file in the root directory:
```env
# Database
DATABASE_URL=postgresql://username:password@host:port/database?sslmode=require

# Session Management
SESSION_SECRET=your-super-secret-session-key-here

# OpenAI (optional - for AI search functionality)
OPENAI_API_KEY=your-openai-api-key-here

# Environment
NODE_ENV=development
```

### 3. Database Setup
```bash
# Push database schema to Neon
npm run db:push
```

### 4. Run Locally
```bash
# Development mode (with hot reload)
npm run dev

# Production mode (builds and serves)
npm run build
npm start
```

The application will be available at `http://localhost:3000`

## Deployment to Railway

### 1. Railway Setup
1. Create account at [railway.app](https://railway.app)
2. Connect your GitHub repository
3. Create a new project from your repo

### 2. Environment Variables in Railway
Add these environment variables in Railway dashboard:
```
DATABASE_URL=postgresql://username:password@host:port/database?sslmode=require
SESSION_SECRET=your-super-secret-session-key-here
OPENAI_API_KEY=your-openai-api-key-here
NODE_ENV=production
```

### 3. Railway Configuration
Create `railway.json` in your project root:
```json
{
  "$schema": "https://railway.app/railway.schema.json",
  "build": {
    "builder": "NIXPACKS",
    "buildCommand": "npm run build"
  },
  "deploy": {
    "startCommand": "npm start",
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 10
  }
}
```

### 4. Package.json Scripts
Ensure your `package.json` has these scripts:
```json
{
  "scripts": {
    "dev": "NODE_ENV=development tsx server/index.ts",
    "build": "vite build && node scripts/copy-static-simple.js",
    "start": "NODE_ENV=production tsx server/index.ts",
    "check": "tsc",
    "db:push": "drizzle-kit push"
  }
}
```

## Key Challenges & Solutions

### 1. Static File Serving Issue
**Problem**: Images in photography section not loading on Railway deployment.

**Root Cause**: The `client/public` directory was being ignored by `.gitignore`, so static files weren't included in the deployment.

**Solution**: 
- Commented out `public` entry in `.gitignore` (line 68)
- Added all static files to git: `git add client/public`
- Created `scripts/copy-static-simple.js` to copy static files during build

### 2. Node.js ES Modules Compatibility
**Problem**: `import.meta.dirname` not available in Railway's Node.js environment.

**Solution**: Replaced with:
```javascript
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
```

### 3. Server Host Binding
**Problem**: Server binding issues in different environments.

**Solution**: Updated `server/index.ts`:
```javascript
const port = process.env.PORT || 3000;
const host = process.env.NODE_ENV === "production" ? "0.0.0.0" : "127.0.0.1";
```

### 4. Authentication System Migration
**Problem**: Replit-specific authentication not compatible with Railway.

**Solution**: 
- Removed `server/replitAuth.ts`
- Created `server/auth.ts` with session-based authentication
- Used memory store for production, PostgreSQL store for development

### 5. Database Connection Issues
**Problem**: Database connection failing on startup.

**Solution**: Implemented lazy initialization in `server/db.ts`:
```javascript
// Lazy initialization to avoid immediate database connection
let _pool: Pool | null = null;
let _db: ReturnType<typeof drizzle> | null = null;

export function getPool(): Pool {
  if (!_pool) {
    _pool = new Pool({ connectionString: process.env.DATABASE_URL });
  }
  return _pool;
}
```

## Environment Variables

### Required Variables
- `DATABASE_URL`: PostgreSQL connection string
- `SESSION_SECRET`: Secret key for session management
- `NODE_ENV`: Environment (development/production)

### Optional Variables
- `OPENAI_API_KEY`: For AI-powered search functionality

### Security Notes
- Never commit `.env` files to git
- Use strong, unique session secrets
- Rotate API keys regularly
- Use environment-specific values

## Static File Handling

### Build Process
1. Vite builds the React app to `dist/public`
2. `scripts/copy-static-simple.js` copies `client/public/*` to `dist/public`
3. Express serves static files from `dist/public`

### Static File Script
The `scripts/copy-static-simple.js` script:
- Checks multiple possible source/destination paths
- Recursively copies all files and directories
- Provides detailed logging for debugging
- Handles different deployment environments

## Database Setup

### Using Neon (Recommended)
1. Create account at [neon.tech](https://neon.tech)
2. Create a new database
3. Copy the connection string
4. Add to environment variables
5. Run `npm run db:push` to create schema

### Schema Management
- Uses Drizzle ORM for type-safe database operations
- Schema defined in `shared/schema.ts`
- Migrations handled by `drizzle-kit push`

## Domain Configuration

### Adding Custom Domain to Railway
1. In Railway dashboard, go to your project
2. Click "Settings" → "Domains"
3. Add your domain (e.g., `ozayn.com`)
4. Select port 8080 (Railway's default)
5. Configure DNS records as instructed

### DNS Configuration
Railway will provide DNS records to add to your domain provider:
- CNAME record pointing to Railway's domain
- A record for root domain (if needed)

## Troubleshooting

### Common Issues
1. **Port conflicts**: Ensure no other services are using port 3000
2. **Static files not loading**: Check that `client/public` is committed to git
3. **Database connection errors**: Verify `DATABASE_URL` is correct
4. **Build failures**: Check that all dependencies are in `package.json`

### Debugging Commands
```bash
# Check what's running on port 3000
lsof -i :3000

# Kill processes on port 3000
pkill -f "tsx server/index.ts"

# Check git status
git status

# Check environment variables
echo $DATABASE_URL
```

## File Structure
```
personal-portfolio/
├── client/                 # React frontend
│   ├── public/            # Static files (images, photos, etc.)
│   └── src/               # React source code
├── server/                # Express backend
│   ├── auth.ts           # Authentication middleware
│   ├── db.ts             # Database connection
│   ├── index.ts          # Server entry point
│   ├── routes.ts         # API routes
│   ├── storage.ts        # Database operations
│   └── vite.ts           # Vite integration
├── scripts/              # Build scripts
│   └── copy-static-simple.js
├── shared/               # Shared types and schema
├── .env                  # Environment variables (local)
├── railway.json          # Railway configuration
└── package.json          # Dependencies and scripts
```

## Best Practices

1. **Environment Separation**: Use different environment variables for dev/prod
2. **Security**: Never commit secrets to git
3. **Static Files**: Ensure all static assets are committed to repository
4. **Database**: Use connection pooling and lazy initialization
5. **Error Handling**: Implement proper error handling and logging
6. **Monitoring**: Set up monitoring for production deployments

## Next Steps

- Set up custom domain with Railway
- Configure SSL certificates
- Set up monitoring and logging
- Implement CI/CD pipeline
- Add performance monitoring
- Set up backup strategies for database
