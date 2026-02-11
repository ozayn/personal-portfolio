# Key Deployment Lessons Learned

## 🚨 Critical Issues & Solutions

### 1. Static Files Not Loading
**Problem**: Photography section images returning 404 on Railway
**Root Cause**: `client/public` directory was ignored by `.gitignore`
**Solution**: 
- Comment out `public` in `.gitignore` (line 68)
- `git add client/public` to commit static files
- Create `scripts/copy-static-simple.js` for build process

### 2. Node.js ES Modules Compatibility
**Problem**: `import.meta.dirname` not available in Railway environment
**Solution**: Replace with:
```javascript
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
```

### 3. Server Host Binding
**Problem**: Server binding issues in different environments
**Solution**: Use environment-aware binding:
```javascript
const port = process.env.PORT || 5002;
const host = process.env.NODE_ENV === "production" ? "0.0.0.0" : "127.0.0.1";
```

### 4. Database Connection on Startup
**Problem**: Database connection failing during server startup
**Solution**: Implement lazy initialization:
```javascript
let _pool: Pool | null = null;
export function getPool(): Pool {
  if (!_pool) {
    _pool = new Pool({ connectionString: process.env.DATABASE_URL });
  }
  return _pool;
}
```

## 🔧 Essential Configuration Files

### railway.json
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

### package.json Scripts
```json
{
  "scripts": {
    "dev": "NODE_ENV=development tsx server/index.ts",
    "build": "vite build && node scripts/copy-static-simple.js",
    "start": "NODE_ENV=production tsx server/index.ts"
  }
}
```

## 🌍 Environment Variables

### Required for Railway
```
DATABASE_URL=postgresql://username:password@host:port/database?sslmode=require
SESSION_SECRET=your-super-secret-session-key-here
NODE_ENV=production
```

### Optional
```
OPENAI_API_KEY=your-openai-api-key-here
```

## 📁 File Structure Requirements

### Must be committed to Git:
- `client/public/` - All static files (images, photos, etc.)
- `scripts/copy-static-simple.js` - Build script
- `railway.json` - Railway configuration
- All source code files

### Must be in .gitignore:
- `.env` - Environment variables
- `node_modules/` - Dependencies
- `dist/` - Build output (generated)
- `.local/` - Local development files

## 🚀 Deployment Checklist

### Before Deployment:
- [ ] All static files committed to git
- [ ] Environment variables set in Railway
- [ ] `railway.json` configured
- [ ] Database schema pushed (`npm run db:push`)
- [ ] Build works locally (`npm run build`)

### After Deployment:
- [ ] Check Railway logs for errors
- [ ] Test all static file URLs
- [ ] Verify database connections
- [ ] Test all major functionality
- [ ] Check mobile responsiveness

## 🐛 Common Debugging Commands

```bash
# Check what's running on port 5002
lsof -i :5002

# Kill processes on port 5002
pkill -f "tsx server/index.ts"

# Check git status
git status

# Check if static files are committed
git ls-files client/public/

# Test build locally
npm run build && npm start
```

## 📊 Performance Considerations

### Static File Optimization:
- Images should be optimized (1-2MB max)
- Use appropriate formats (JPG for photos, SVG for icons)
- Consider CDN for production

### Database Optimization:
- Use connection pooling
- Implement lazy initialization
- Monitor connection limits

### Build Optimization:
- Minimize bundle size
- Use production builds for deployment
- Enable compression in production

## 🔒 Security Best Practices

### Environment Variables:
- Never commit secrets to git
- Use strong, unique session secrets
- Rotate API keys regularly
- Use different values for dev/prod

### Session Management:
- Use secure cookies in production
- Implement proper session timeouts
- Use HTTPS in production
- Validate all user inputs

## 📈 Monitoring & Maintenance

### Logs to Monitor:
- Server startup logs
- Database connection status
- Static file serving
- API endpoint responses
- Error rates and patterns

### Regular Maintenance:
- Update dependencies
- Monitor database performance
- Check static file accessibility
- Review error logs
- Test deployment pipeline

## 🎯 Success Metrics

### Deployment Success Indicators:
- ✅ Server starts without errors
- ✅ All static files load (200 status)
- ✅ Database connections work
- ✅ API endpoints respond correctly
- ✅ No 404 errors for expected resources
- ✅ Mobile responsiveness works
- ✅ Performance is acceptable

### Red Flags:
- ❌ 404 errors for static files
- ❌ Database connection errors
- ❌ Server binding failures
- ❌ Build process failures
- ❌ Environment variable errors
- ❌ Port conflicts
- ❌ Missing dependencies
