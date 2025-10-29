import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import healthcheckRoutes from './routes/healthcheck.routes.js';
import authRoutes from './routes/auth.routes.js';

const app = express();

// IMPORTANT: Always configure CORS before other middlewares
// This prevents cross-origin request issues in production
app.use(cors({
    origin: process.env.CORS_ORIGIN || "*",
    credentials: true
}));

// IMPORTANT: Always configure cookie parser before routes that use cookies
// Without this, req.cookies will be undefined
app.use(cookieParser());

// IMPORTANT: Always configure body parser middleware BEFORE routes
// Without this, req.body will be undefined in your controllers
app.use(express.json({ limit: "16kb" })); // Parse JSON bodies
app.use(express.urlencoded({ extended: true, limit: "16kb" })); // Parse URL-encoded bodies

// Healthcheck route - typically uses path like /health or /healthcheck, not /healthcheckRoutes
app.use("/api/v1/health", healthcheckRoutes);

// Authentication routes
app.use("/api/v1/auth", authRoutes);

// IMPORTANT: Error handling middleware should be AFTER all routes
// This ensures all errors are caught and properly formatted
app.use((err, req, res, next) => {
    // Handle any uncaught errors
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    
    res.status(statusCode).json({
        success: false,
        message: message,
        ...(process.env.NODE_ENV === "development" && { stack: err.stack })
    });
});

// 404 handler for undefined routes
// IMPORTANT: In Express 5.x, "*" pattern is not supported for catch-all routes
// Use app.use() without path to catch all unmatched routes
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: `Route ${req.originalUrl} not found`
    });
});

export default app;