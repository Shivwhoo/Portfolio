import express from "express";
import cors from "cors";

export const app = express();

app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true
}));

app.use(express.json());

// routes
import contactRoutes from "./routes/contactRoutes.js";
import projectRoutes from "./routes/projects.route.js";
import statsRoutes from "./routes/stats.routes.js";

app.use("/api/contact", contactRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/stats", statsRoutes);