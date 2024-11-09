import express from "express";
import { addEmployee, assignReview } from "../controllers/adminController.js";
import {
  authenticateToken,
  authorizeAdmin,
} from "../middleware/authMiddleware.js"; // Import the middleware

const router = express.Router();

// Protect routes with authentication and admin role check
router.use(authenticateToken); // Ensure only authenticated users can access these routes
router.use(authorizeAdmin); // Ensure the authenticated user has an "admin" role

// Admin routes
router.post("/employees", addEmployee); // Add a new employee
router.post("/reviews/assign", assignReview); // Assign a review to an employee

export default router;
