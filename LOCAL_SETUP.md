# Local Development Setup Guide

## Prerequisites
- Node.js (v18 or higher)
- npm or yarn package manager
- Neon database account (free)
- OpenAI API key (optional, for AI features)

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up Environment Variables
Create a `.env` file in the project root with:
```bash
# Database
DATABASE_URL=your_neon_connection_string_here

# Session Management
SESSION_SECRET=your-super-secret-session-key-here

# OpenAI (optional - for AI features)
OPENAI_API_KEY=your_openai_api_key_here

# Environment
NODE_ENV=development
```

### 3. Set Up Database Schema
```bash
npm run db:push
```

### 4. Start Development Server
```bash
npm run dev
```

### 5. Access Your Website
Open your browser and go to: **http://localhost:3000**

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run check` - TypeScript type checking
- `npm run db:push` - Push database schema changes

## Project Structure

```
/Users/oz/Dropbox/2025/PersonalPortfolio/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── pages/         # Page components
│   │   ├── hooks/         # Custom React hooks
│   │   └── lib/           # Utility functions
│   └── public/            # Static assets
├── server/                # Express backend
│   ├── index.ts          # Server entry point
│   ├── routes.ts         # API routes
│   ├── db.ts            # Database connection
│   └── storage.ts       # Database operations
├── shared/               # Shared types and schemas
├── .env                  # Environment variables (create this)
└── package.json         # Dependencies and scripts
```

## Environment Variables

### Required
- `DATABASE_URL` - Neon PostgreSQL connection string
- `SESSION_SECRET` - Secret key for session management

### Optional
- `OPENAI_API_KEY` - For AI-powered search features
- `NODE_ENV` - Environment (development/production)

## Database Setup

### Using Neon (Recommended)
1. Sign up at [neon.tech](https://neon.tech)
2. Create a new project
3. Copy the connection string
4. Add to `.env` file as `DATABASE_URL`

### Database Schema
The app uses these tables:
- `photos` - Photography portfolio metadata
- `contact_messages` - Contact form submissions
- `users` - User accounts (for admin features)
- `sessions` - Login sessions

## Troubleshooting

### Common Issues

**1. "DATABASE_URL must be set" Error**
- Ensure `.env` file exists in project root
- Check that `DATABASE_URL` is correctly set
- Restart the development server

**2. "relation does not exist" Error**
- Run `npm run db:push` to create database tables
- Check database connection string

**3. Port Already in Use**
- The app runs on port 3000 by default
- Kill existing processes: `pkill -f "tsx server/index.ts"`
- Or change port in `server/index.ts`

**4. Authentication Errors**
- Authentication is disabled for local development
- These errors are normal and can be ignored locally

### Server Binding Issues
If you get "ENOTSUP" errors:
- The server is configured to bind to `127.0.0.1:3000`
- This should work on most systems
- If issues persist, check your network configuration

## Features Available Locally

✅ **Working:**
- Photo portfolio display
- Contact form submissions
- Database operations
- AI-powered search (if OpenAI key provided)
- File uploads and image optimization

⚠️ **Disabled for Local Development:**
- Production security features (HTTPS, secure cookies)
- Production session store (uses memory store locally)

## Development Tips

1. **Hot Reload**: The server automatically restarts when you make changes
2. **Database Changes**: Run `npm run db:push` after schema changes
3. **Environment Variables**: Always restart the server after changing `.env`
4. **File Uploads**: Photos are saved to `client/public/photos/`
5. **Logs**: Check terminal for server logs and error messages

## Next Steps for Deployment

1. Push code to GitHub
2. Choose deployment platform (Railway, Vercel, Netlify)
3. Set environment variables on hosting platform
4. Connect custom domain
5. Enable authentication for production

## Support

If you encounter issues:
1. Check this guide first
2. Verify all environment variables are set
3. Ensure database connection is working
4. Check server logs for specific error messages
