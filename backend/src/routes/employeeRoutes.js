// src/routes/employeeRoutes.js
import express from "express";
import {
  getAssignedReviews,
  submitFeedback,
} from "../controllers/employeeController.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

// Protect routes with employee role
router.use(authMiddleware);

router.get("/reviews", getAssignedReviews); // Get reviews assigned to the employee
router.post("/reviews/feedback", submitFeedback); // Submit feedback for a review

export default router;
