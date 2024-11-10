import Employee from "../models/Employee.js";
import Review from "../models/Review.js";

// Get all reviews assigned to the employee with reviewer and reviewee names
export const getAssignedReviews = async (req, res) => {
  try {
    const employee = await Employee.findById(req.user.id).populate({
      path: "assignedReviews",
      populate: [
        { path: "reviewer", select: "name" },
        { path: "reviewee", select: "name" },
      ],
    });
    res.status(200).json(employee.assignedReviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Submit feedback for a review and remove it from assignedReviews
export const submitFeedback = async (req, res) => {
  try {
    const { reviewId, feedback } = req.body;
    const review = await Review.findById(reviewId);

    if (review) {
      // Add the feedback to the review
      review.feedback = feedback;
      review.status = "completed"; // Mark review as completed

      // Save the review
      await review.save();

      // Remove the completed review from the employee's assignedReviews
      await Employee.findByIdAndUpdate(
        req.user.id,
        { $pull: { assignedReviews: reviewId } },
        { new: true }
      );

      res.status(200).json({ message: "Feedback submitted successfully" });
    } else {
      res.status(404).json({ message: "Review not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
