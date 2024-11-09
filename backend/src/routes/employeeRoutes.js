import express from "express";
import {
  getAssignedReviews,
  submitFeedback,
} from "../controllers/employeeController.js";
import {
  authenticateToken,
  authorizeRole,
} from "../middleware/authMiddleware.js"; // Import the middleware

const router = express.Router();

// Protect routes with authentication and employee role check
router.use(authenticateToken); // Ensure only authenticated users can access these routes
router.use(authorizeRole("employee")); // Ensure the authenticated user has the "employee" role

// Employee routes
router.get("/reviews", getAssignedReviews); // Get reviews assigned to the employee
router.post("/reviews/feedback", submitFeedback); // Submit feedback for a review

export default router;
