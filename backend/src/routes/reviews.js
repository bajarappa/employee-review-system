// src/routes/reviews.js
import express from "express";
import Review from "../models/Review.js";
import {
  authenticateToken,
  authorizeAdmin,
} from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authenticateToken, authorizeAdmin, async (req, res) => {
  const { reviewerId, revieweeId } = req.body;
  const review = await Review.create({
    reviewer: reviewerId,
    reviewee: revieweeId,
  });
  res.status(201).json(review);
});

// More review routes for listing and feedback submission

export default router;
