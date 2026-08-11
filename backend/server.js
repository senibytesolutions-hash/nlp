import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";

import connectDB from "./config/db.js";
import applicationRoutes from "./routes/applicationRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import adminApplicationRoutes from "./routes/adminApplicationRoutes.js";
import announcementRoutes from "./routes/announcementRoutes.js";
import adminAnnouncementRoutes from "./routes/adminAnnouncementRoutes.js";
import { notFound, errorHandler } from "./middleware/errorHandler.js";

dotenv.config();

connectDB();

const app = express();

// Security & parsing middleware
app.use(helmet());
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(cookieParser());

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

// CORS - restrict to configured client origin(s)
const allowedOrigins = (process.env.CLIENT_ORIGIN || "http://localhost:5173")
  .split(",")
  .map((origin) => origin.trim());

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// Basic rate limiting on write endpoints to deter abuse
const formLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20,
  message: {
    success: false,
    message: "Too many submissions from this device. Please try again later.",
  },
});

// Tighter rate limiting on the admin login endpoint to deter brute forcing
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10,
  message: {
    success: false,
    message: "Too many login attempts. Please try again later.",
  },
});

// Health check
app.get("/api/health", (req, res) => {
  res.status(200).json({ success: true, message: "NLP API is running" });
});

// Public routes
app.use("/api/applications", formLimiter, applicationRoutes);
app.use("/api/contact", formLimiter, contactRoutes);
app.use("/api/announcements", announcementRoutes);

// Admin routes
app.use("/api/auth", authLimiter, authRoutes);
app.use("/api/admin/applications", adminApplicationRoutes);
app.use("/api/admin/announcements", adminAnnouncementRoutes);

// 404 + error handling
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`NLP API server running on port ${PORT} [${process.env.NODE_ENV || "development"}]`);
});
