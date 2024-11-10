import express from "express";
import authRoutes from "./routes/authRoutes.js"; // Authentication routes
import adminRoutes from "./routes/adminRoutes.js"; // Admin routes
import employeeRoutes from "./routes/employeeRoutes.js"; // Employee routes
import cors from "cors"; // Import CORS

const app = express();

// Allow requests from specific origin (frontend at localhost:5173)
const corsOptions = {
  origin: "http://localhost:5173", // Frontend URL (replace with your actual frontend URL in production)
  methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
  allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
};

// Apply CORS middleware globally
app.use(cors(corsOptions));

// Middleware to parse incoming JSON requests
app.use(express.json());

// Route for authentication-related operations
app.use("/api/auth", authRoutes);

// Route for admin-related operations
app.use("/api/admin", adminRoutes);

// Route for employee-related operations
app.use("/api/employee", employeeRoutes);

// Root route to check if the server is running
app.get("/", (req, res) => res.send("Employee Review System API is running"));

// Middleware to handle 404 errors for undefined routes
app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});

// Global error handler for catching all other errors
app.use((err, req, res, next) => {
  console.error(err.stack); // Log the error stack to the console
  res.status(500).json({ message: "Something went wrong!" }); // Send a 500 response
});

export default app;
