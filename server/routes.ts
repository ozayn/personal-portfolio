import type { Express } from "express";
import { createServer, type Server } from "http";
import { z } from "zod";
import OpenAI from "openai";
import { insertContactMessageSchema, insertPhotoSchema } from "@shared/schema";
import { storage } from "./storage";
import { setupAuth, isAuthenticated } from "./auth";
import multer from "multer";
import path from "path";
import fs from "fs";
import sharp from "sharp";

// Initialize OpenAI (only if API key is provided)
const openai = process.env.OPENAI_API_KEY ? new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
}) : null;

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  },
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Setup authentication
  await setupAuth(app);

  // Auth routes
  app.get('/api/auth/user', async (req: any, res) => {
    try {
      console.log("Auth endpoint called, REPLIT_DOMAINS:", process.env.REPLIT_DOMAINS);
      console.log("Auth endpoint called, REPL_ID:", process.env.REPL_ID);
      console.log("Session authenticated:", req.session.isAuthenticated);
      
      // For local development when Replit auth is disabled, or when no session exists
      if (!process.env.REPLIT_DOMAINS || !process.env.REPL_ID || !req.session.isAuthenticated) {
        console.log("Returning null for unauthenticated user");
        return res.json(null);
      }
      
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // Contact message routes
  app.get("/api/contact-messages", async (req, res) => {
    try {
      const messages = await storage.getContactMessages();
      res.json(messages);
    } catch (error) {
      console.error("Error fetching contact messages:", error);
      res.status(500).json({ message: "Failed to fetch contact messages" });
    }
  });

  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactMessageSchema.parse(req.body);
      const message = await storage.createContactMessage(validatedData);
      res.json(message);
    } catch (error) {
      console.error("Error creating contact message:", error);
      res.status(500).json({ message: "Failed to create contact message" });
    }
  });

  // Photo management routes (Admin only)
  app.get("/api/photos", async (req, res) => {
    try {
      const photos = await storage.getPhotos();
      res.json(photos);
    } catch (error) {
      console.error("Error fetching photos:", error);
      res.status(500).json({ message: "Failed to fetch photos" });
    }
  });

  app.post("/api/photos", isAuthenticated, upload.single('photo'), async (req, res) => {
    try {
      console.log("Upload request received:", {
        hasFile: !!req.file,
        body: req.body,
        fileInfo: req.file ? {
          size: req.file.size,
          mimetype: req.file.mimetype,
          originalname: req.file.originalname
        } : null
      });

      if (!req.file) {
        return res.status(400).json({ message: "No photo uploaded" });
      }

      const { title, category, event, description, tags } = req.body;
      
      // Generate unique filename
      const timestamp = Date.now();
      const filename = `photo_${timestamp}.jpg`;
      const optimizedFilename = `optimized_${filename}`;
      
      // Ensure photos directory exists - create both development and production paths
      const photosDir = path.join(process.cwd(), 'client/public/photos');
      const prodPhotosDir = path.join(process.cwd(), 'photos'); // Alternative production path
      
      if (!fs.existsSync(photosDir)) {
        fs.mkdirSync(photosDir, { recursive: true });
      }
      
      // Also create the production photos directory if needed
      if (!fs.existsSync(prodPhotosDir)) {
        fs.mkdirSync(prodPhotosDir, { recursive: true });
      }
      
      // Optimize and save image to both locations for production compatibility
      const photoPath = path.join(photosDir, optimizedFilename);
      const prodPhotoPath = path.join(prodPhotosDir, optimizedFilename);
      
      console.log(`Attempting to save image to: ${photoPath}`);
      const imageBuffer = await sharp(req.file.buffer)
        .resize(1920, 1920, { fit: 'inside', withoutEnlargement: true })
        .jpeg({ quality: 85 })
        .toBuffer();
      
      // Save to development location
      await fs.promises.writeFile(photoPath, imageBuffer);
      
      // Also save to production location for deployment compatibility
      try {
        await fs.promises.writeFile(prodPhotoPath, imageBuffer);
        console.log(`Also saved to production path: ${prodPhotoPath}`);
      } catch (error) {
        console.log(`Could not save to production path (this is okay in development): ${error}`);
      }
      
      // Verify file was created
      if (!fs.existsSync(photoPath)) {
        throw new Error(`Failed to save optimized image: ${optimizedFilename}`);
      }
      console.log(`Successfully saved optimized image: ${optimizedFilename}`);

      // Parse tags if they're a string and filter out empty ones
      const parsedTags = typeof tags === 'string' 
        ? tags.split(',').map(tag => tag.trim()).filter(tag => tag !== "") 
        : (tags || []).filter((tag: string) => tag.trim() !== "");

      const photoData = {
        title,
        category,
        event: event || null,
        src: `/photos/${optimizedFilename}`,
        fullSrc: `/photos/${optimizedFilename}`,
        description: description || null,
        tags: parsedTags || [],
      };

      const validatedData = insertPhotoSchema.parse(photoData);
      const photo = await storage.createPhoto(validatedData);
      console.log(`Photo uploaded successfully: ID ${photo.id}, Title: ${photo.title}`);
      res.json(photo);
    } catch (error) {
      console.error("Error uploading photo:", error);
      res.status(500).json({ message: "Failed to upload photo" });
    }
  });

  app.delete("/api/photos/:id", isAuthenticated, async (req, res) => {
    try {
      const photoId = parseInt(req.params.id);
      
      // Get photo info before deleting to remove the file
      const photos = await storage.getPhotos();
      const photo = photos.find(p => p.id === photoId);
      
      if (photo && photo.src) {
        // Delete the actual file from filesystem
        const fileName = photo.src.split('/').pop();
        if (fileName) {
          const filePath = path.join(process.cwd(), 'client/public/photos', fileName);
          try {
            if (fs.existsSync(filePath)) {
              fs.unlinkSync(filePath);
              console.log(`Deleted file: ${filePath}`);
            }
          } catch (fileError) {
            console.error("Error deleting file:", fileError);
          }
        }
      }
      
      await storage.deletePhoto(photoId);
      res.json({ message: "Photo deleted successfully" });
    } catch (error) {
      console.error("Error deleting photo:", error);
      res.status(500).json({ message: "Failed to delete photo" });
    }
  });

  // Placeholder endpoint for broken images
  app.get("/api/placeholder/:width/:height", (req, res) => {
    const { width, height } = req.params;
    const svg = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#f3f4f6"/>
      <text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle" font-family="Arial, sans-serif" font-size="14" fill="#6b7280">
        Image not found
      </text>
    </svg>`;
    res.setHeader('Content-Type', 'image/svg+xml');
    res.send(svg);
  });

  // AI-powered search analysis
  app.post("/api/search-analyze", async (req, res) => {
    try {
      const { query } = req.body;
      
      if (!query || typeof query !== 'string') {
        return res.status(400).json({ error: "Query is required" });
      }

      // Check if OpenAI is available
      if (!openai) {
        return res.status(503).json({ 
          error: "AI service not configured", 
          fallback: true,
          message: "Using smart keyword search instead"
        });
      }

      // the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
      const completion = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: `You are a photography portfolio search assistant. Analyze natural language queries and extract relevant search keywords for a photography portfolio.

Available photo categories and themes:
- Wedding Photography: wedding, bridal, elegance, romance, love, cake, bouquet, flower-girls, children, ceremony, celebration
- Events Photography: festival, vintage, fashion, style, formal, elegant, parasol, group
- Street Photography: street, candid, urban, summer, walking, documentary, life, childhood
- Long Exposure Photography: seascape, waves, rocks, water, motion, nature, coastal, ethereal, dynamic, light-trails, cascading, flow, energy

Return a JSON object with:
{
  "keywords": ["keyword1", "keyword2", ...],
  "intent": "brief description of what user is looking for",
  "categories": ["relevant", "categories"]
}

Focus on extracting emotional descriptors, technical terms, subject matter, and visual elements from the query.`
          },
          {
            role: "user",
            content: query
          }
        ],
        response_format: { type: "json_object" },
        max_tokens: 300
      });

      const analysis = JSON.parse(completion.choices[0].message.content || '{}');
      res.json(analysis);
    } catch (error: any) {
      console.error('OpenAI API error:', error);
      
      // Check if it's a quota exceeded error
      if (error.status === 429 || error.message?.includes('quota') || error.message?.includes('rate limit')) {
        // Return 429 status to trigger frontend fallback
        res.status(429).json({ 
          error: "AI quota exceeded", 
          fallback: true,
          message: "Using smart keyword search instead"
        });
      } else {
        // Other errors should also trigger fallback
        res.status(503).json({ 
          error: "AI service temporarily unavailable", 
          fallback: true,
          message: "Using smart keyword search instead"
        });
      }
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
