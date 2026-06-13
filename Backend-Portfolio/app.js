import express from "express";
import cors from "cors";

export const app = express();

const allowedOrigins = [
  process.env.CORS_ORIGIN,
  "https://portfolio-silk-three-85.vercel.app",
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (curl, Postman, server-to-server)
      if (!origin) return callback(null, true);
      // Allow exact matches
      if (allowedOrigins.includes(origin)) return callback(null, true);
      // Allow any *.vercel.app preview deployment
      if (/^https:\/\/[a-z0-9-]+\.vercel\.app$/.test(origin)) return callback(null, true);
      callback(new Error(`CORS blocked: ${origin}`));
    },
    credentials: true,
  }),
);

app.use(express.json());

// routes
import contactRoutes from "./routes/contactRoutes.js";
import projectRoutes from "./routes/projects.route.js";
import statsRoutes from "./routes/stats.routes.js";

app.use("/api/contact", contactRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/stats", statsRoutes);
