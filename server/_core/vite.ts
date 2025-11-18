import * as express from "express";
import type { Express } from "express";
import fs from "fs";
import { type Server } from "http";
import { nanoid } from "nanoid";
import path from "path";
import { createServer as createViteServer } from "vite";
import viteConfig from "../../vite.config";

export async function setupVite(app: Express, server: Server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true as const,
  };

  const vite = await createViteServer({
    ...viteConfig,
    configFile: false,
    server: serverOptions,
    appType: "custom",
  });

  app.use(vite.middlewares);
  // The vite.middlewares will handle serving the index.html and client assets.
  // The custom middleware that was here is not needed and was causing pathing issues.
}

export function serveStatic(app: Express) {
  // This function should only run in production.
  if (process.env.NODE_ENV !== "production") return;

  // In production, the server runs from `dist/index.js`.
  // The client build is in `dist/client`.
  const distPath = path.resolve(import.meta.dirname, "..", "dist", "client");

  if (!fs.existsSync(distPath)) {
    console.error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
    return; // Exit if the directory doesn't exist
  }

  app.use(express.static(distPath));

  // For any other request, fall back to index.html to allow client-side routing to handle it.
  app.get("*", (_req, res) => {
    res.sendFile(path.resolve(distPath, "index.html"));
  });
}
