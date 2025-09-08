# Quick Reference - Personal Portfolio

## 🚀 **Essential Commands**

### **Development**
```bash
npm run dev          # Start development server (localhost:3000)
npm run build        # Build for production
npm run check        # TypeScript type checking
npm start           # Start production server
```

### **Database**
```bash
npm run db:push     # Push schema changes to database
```

### **Git & Deployment**
```bash
git add -A
git commit -m "Your commit message"
git push origin main    # Deploys to Railway automatically
```

## 🔧 **Environment Variables (.env)**
```bash
DATABASE_URL=your_neon_connection_string_here
SESSION_SECRET=your-super-secret-session-key-here
OPENAI_API_KEY=your_openai_api_key_here  # Optional
NODE_ENV=development
```

## 📁 **Key Files**
- `client/src/pages/home.tsx` - Main portfolio page
- `client/src/components/` - React components
- `client/src/data/portfolio-data.ts` - Portfolio content
- `server/routes.ts` - API endpoints
- `server/db.ts` - Database connection
- `.env` - Environment variables (create this)

## 🌐 **URLs**
- **Local**: http://localhost:3000
- **Production**: https://ozayn.com
- **Railway Dashboard**: https://railway.app

## 🗄️ **Database**
- **Service**: Neon (PostgreSQL)
- **Tables**: photos, contact_messages, sessions
- **Connection**: Via DATABASE_URL

## ⚠️ **Common "Errors" (Normal Behavior)**
- **401 Unauthorized**: Portfolio is public, no auth required
- **429 Too Many Requests**: OpenAI quota exceeded, fallback works
- **AI quota exceeded**: System uses keyword search instead

## 🛠️ **Troubleshooting**
```bash
# Kill port 3000 if in use
lsof -ti:3000 | xargs kill -9

# Clean install
rm -rf node_modules package-lock.json
npm install

# Check TypeScript errors
npm run check
```

## 📚 **Documentation**
- `PROJECT_SUMMARY.md` - Complete project overview
- `LOCAL_SETUP.md` - Detailed setup instructions
- `DEPLOYMENT_GUIDE.md` - Deployment instructions
- `DEPLOYMENT_LESSONS.md` - Key lessons learned

---
**Last Updated**: January 2025
