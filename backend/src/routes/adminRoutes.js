import express from "express";
import {
  addEmployee,
  addOrUpdateReview,
  assignReview,
  promoteToAdmin,
  removeEmployee,
  updateEmployee,
  viewEmployees,
  viewReviews,
} from "../controllers/adminController.js";
import {
  authenticateToken,
  authorizeAdmin,
} from "../middleware/authMiddleware.js"; // Import the middleware

const router = express.Router();

// Protect routes with authentication and admin role check
router.use(authenticateToken); // Ensure only authenticated users can access these routes
router.use(authorizeAdmin); // Ensure the authenticated user has an "admin" role

// // Admin routes
// router.post("/employees", addEmployee); // Add a new employee
// router.post("/reviews/assign", assignReview); // Assign a review to an employee
// Admin routes

// Employee routes
router.post("/employee/add", addEmployee);
router.put("/employee/update/:id", updateEmployee);
router.delete("/employee/remove/:id", removeEmployee);
router.get("/employees", viewEmployees);

// Review routes
router.post("/review", addOrUpdateReview);
router.get("/reviews", viewReviews);

// Admin routes
router.post("/review/assign", assignReview);
router.post("/employee/promote", promoteToAdmin);
export default router;
