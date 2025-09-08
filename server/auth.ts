import session from "express-session";
import type { Express, RequestHandler } from "express";
import connectPg from "connect-pg-simple";
import MemoryStore from "memorystore";

export function getSession() {
  const sessionTtl = 7 * 24 * 60 * 60 * 1000; // 1 week

  // For production, use memory store to avoid database connection issues
  if (process.env.NODE_ENV === "production") {
    const MemoryStoreSession = MemoryStore(session);
    return session({
      secret: process.env.SESSION_SECRET || "dev-secret-key",
      store: new MemoryStoreSession({
        checkPeriod: 86400000, // prune expired entries every 24h
      }),
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: true,
        maxAge: sessionTtl,
      },
    });
  }

  // For development, use PostgreSQL store
  const pgStore = connectPg(session);
  const sessionStore = new pgStore({
    conString: process.env.DATABASE_URL,
    createTableIfMissing: true,
    ttl: sessionTtl,
    tableName: "sessions",
  });
  return session({
    secret: process.env.SESSION_SECRET || "dev-secret-key",
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: sessionTtl,
    },
  });
}

export async function setupAuth(app: Express) {
  app.set("trust proxy", 1);
  app.use(getSession());

  // Simple login endpoint for admin access
  app.post("/api/login", (req, res) => {
    const { password } = req.body;
    
    // Simple password check - you can make this more secure
    if (password === process.env.ADMIN_PASSWORD || password === "admin123") {
      req.session.isAuthenticated = true;
      req.session.userId = "admin";
      res.json({ success: true, message: "Login successful" });
    } else {
      res.status(401).json({ success: false, message: "Invalid password" });
    }
  });

  // Logout endpoint
  app.post("/api/logout", (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ success: false, message: "Logout failed" });
      }
      res.json({ success: true, message: "Logout successful" });
    });
  });

  // Check auth status
  app.get("/api/auth/status", (req, res) => {
    res.json({ 
      isAuthenticated: !!req.session.isAuthenticated,
      userId: req.session.userId 
    });
  });
}

export const isAuthenticated: RequestHandler = async (req, res, next) => {
  if (req.session.isAuthenticated) {
    return next();
  }
  
  res.status(401).json({ message: "Unauthorized" });
};
