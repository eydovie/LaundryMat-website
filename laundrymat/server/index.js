// index.js
// This is where the Express app is created, all middleware
// is registered, and the server starts listening for requests.

import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import errorHandler from "./middleware/errorHandler.js";
import process from "node:process";

// Load .env variables into process.env — must be called
// before anything else that uses environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// ── Middleware stack ──
// Every request passes through these in order, top to bottom.

// helmet adds security HTTP headers automatically
app.use(helmet());

// morgan logs every request: method, url, status, response time
app.use(morgan("dev"));

// cors allows our React frontend (port 5173) to call this API
app.use(
  cors({
    origin: ["http://localhost:5173", process.env.CLIENT_URL],
    credentials: true,
  }),
);

// express.json() parses incoming JSON request bodies
// Without this, req.body would be undefined
app.use(express.json());

// ── Routes ──
// All booking-related endpoints live under /api/bookings
app.use("/api/bookings", bookingRoutes);

// ── Health check ──
// A simple endpoint to confirm the server is running
app.get("/api/health", (req, res) => {
  res.json({ success: true, message: "LaundryMat API is running" });
});

// ── 404 handler ──
// Catches any request that didn't match a route above
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

// ── Global error handler ──
// Must be registered LAST — after all routes
app.use(errorHandler);

// ── Start server ──
app.listen(PORT, () => {
  console.log(`🚀 LaundryMart server running on port ${PORT}`);
  console.log(`📡 Health check: http://localhost:${PORT}/api/health`);
});
