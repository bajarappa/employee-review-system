// src/controllers/employeeController.js
import Employee from "../models/Employee.js";
import Review from "../models/Review.js";

// Get all reviews assigned to the employee
export const getAssignedReviews = async (req, res) => {
  try {
    const employee = await Employee.findById(req.user.id).populate(
      "assignedReviews"
    );
    res.status(200).json(employee.assignedReviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Submit feedback for a review
export const submitFeedback = async (req, res) => {
  try {
    const { reviewId, feedback } = req.body;
    const review = await Review.findById(reviewId);
    if (review) {
      review.feedback = feedback;
      await review.save();
      res.status(200).json({ message: "Feedback submitted successfully" });
    } else {
      res.status(404).json({ message: "Review not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
