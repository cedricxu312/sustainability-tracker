import express from "express";
import cors from "cors";
import actionsRouter from "./routes/actions.js";

// Initialize Express application
const app = express();
const PORT = process.env.PORT || 3001;

// CORS configuration
const corsOptions = {
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
  credentials: true,
  optionsSuccessStatus: 200
};

// Middleware configuration
app.use(cors(corsOptions));
app.use(express.json({ limit: '10mb' })); // Limit JSON payload size
app.use(express.urlencoded({ extended: true }));

// Request logging middleware for debugging
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.url}`);
  next();
});

// Health check endpoint
app.get("/", (req, res) => {
  res.json({ 
    message: "Sustainability Actions API is running!",
    version: "1.0.0",
    timestamp: new Date().toISOString(),
    endpoints: {
      actions: "/api/actions"
    }
  });
});

// API routes
app.use("/api/actions", actionsRouter);

// 404 handler for undefined routes
app.use("*", (req, res) => {
  res.status(404).json({
    error: "Endpoint not found",
    message: `The requested endpoint ${req.originalUrl} does not exist`,
    availableEndpoints: [
      "GET /",
      "GET /api/actions",
      "POST /api/actions",
      "PUT /api/actions/:id",
      "PATCH /api/actions/:id",
      "DELETE /api/actions/:id"
    ]
  });
});

// Global error handler
app.use((error, req, res, next) => {
  console.error("Unhandled error:", error);
  res.status(500).json({
    error: "Internal server error",
    message: "An unexpected error occurred",
    timestamp: new Date().toISOString()
  });
});

// Start the server
app.listen(PORT, () => {
  console.log("=".repeat(50));
  console.log(`Sustainability Actions API Server`);
  console.log(`Running on port: ${PORT}`);
  console.log(`Server URL: http://localhost:${PORT}`);
  console.log(`Started at: ${new Date().toISOString()}`);
  console.log("=".repeat(50));
});

// Graceful shutdown handling
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully');
  process.exit(0);
});
