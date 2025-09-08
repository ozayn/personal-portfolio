import express, { type Express } from "express";
import fs from "fs";
import path from "path";
import { createServer as createViteServer, createLogger } from "vite";
import { type Server } from "http";
import viteConfig from "../vite.config";
import { nanoid } from "nanoid";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const viteLogger = createLogger();

export function log(message: string, source = "express") {
  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  console.log(`${formattedTime} [${source}] ${message}`);
}

export async function setupVite(app: Express, server: Server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true as const,
  };

  const vite = await createViteServer({
    ...viteConfig,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      },
    },
    server: serverOptions,
    appType: "custom",
  });

  app.use(vite.middlewares);
  app.use("*", async (req, res, next) => {
    const url = req.originalUrl;

    try {
      const clientTemplate = path.resolve(
        __dirname,
        "..",
        "client",
        "index.html",
      );

      // always reload the index.html file from disk incase it changes
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`,
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e as Error);
      next(e);
    }
  });
}

export function serveStatic(app: Express) {
  const distPath = path.resolve(__dirname, "..", "dist", "public");
  const clientPath = path.resolve(__dirname, "..", "client", "public");
  const cwdPath = path.resolve(process.cwd(), "dist", "public");
  const cwdClientPath = path.resolve(process.cwd(), "client", "public");

  // Log paths for debugging
  console.log("Static file paths:");
  console.log("  distPath:", distPath, "exists:", fs.existsSync(distPath));
  console.log("  clientPath:", clientPath, "exists:", fs.existsSync(clientPath));
  console.log("  cwdPath:", cwdPath, "exists:", fs.existsSync(cwdPath));
  console.log("  cwdClientPath:", cwdClientPath, "exists:", fs.existsSync(cwdClientPath));
  console.log("  process.cwd():", process.cwd());
  console.log("  __dirname:", __dirname);
  
  // Check if dist/public/images exists
  if (fs.existsSync(distPath)) {
    const imagesPath = path.resolve(distPath, "images");
    const photosPath = path.resolve(distPath, "photos");
    console.log("  dist/images exists:", fs.existsSync(imagesPath));
    console.log("  dist/photos exists:", fs.existsSync(photosPath));
    if (fs.existsSync(imagesPath)) {
      const imageFiles = fs.readdirSync(imagesPath);
      console.log("  dist/images files:", imageFiles.slice(0, 3), "...");
    }
  }

  // Try multiple paths in order of preference
  const pathsToTry = [
    { path: distPath, name: "dist/public" },
    { path: cwdPath, name: "cwd/dist/public" },
    { path: clientPath, name: "client/public" },
    { path: cwdClientPath, name: "cwd/client/public" }
  ];

  let staticPath = null;
  for (const { path: tryPath, name } of pathsToTry) {
    if (fs.existsSync(tryPath)) {
      staticPath = tryPath;
      console.log(`Using static path: ${name} (${tryPath})`);
      break;
    }
  }

  if (staticPath) {
    app.use(express.static(staticPath));
    app.use("*", (_req, res) => {
      res.sendFile(path.resolve(staticPath, "index.html"));
    });
  } else {
    console.log("No static path found, serving fallback");
    // If none exists, serve a simple fallback
    app.use("*", (_req, res) => {
      res.status(200).send(`
        <!DOCTYPE html>
        <html>
          <head><title>Portfolio</title></head>
          <body>
            <h1>Portfolio Loading...</h1>
            <p>Static files not found. Please check the build process.</p>
            <p>Debug info: distPath=${distPath}, clientPath=${clientPath}</p>
          </body>
        </html>
      `);
    });
  }
}
