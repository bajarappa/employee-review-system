// src/routes/adminRoutes.js
import express from "express";
import { addEmployee, assignReview } from "../controllers/adminController.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

// Protect routes with admin role
router.use(authMiddleware); // Ensure only authenticated users can access these routes

router.post("/employees", addEmployee); // Add a new employee
router.post("/reviews/assign", assignReview); // Assign a review to an employee

export default router;
