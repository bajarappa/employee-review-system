// src/controllers/adminController.js
import Employee from "../models/Employee.js";
import Review from "../models/Review.js";

// Add a new employee
export const addEmployee = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const newEmployee = new Employee({ name, email, password, role });
    await newEmployee.save();
    res.status(201).json(newEmployee);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Assign performance review
export const assignReview = async (req, res) => {
  try {
    const { reviewerId, revieweeId } = req.body;
    const review = new Review({
      reviewer: reviewerId,
      reviewee: revieweeId,
    });
    await review.save();
    const employee = await Employee.findById(revieweeId);
    employee.assignedReviews.push(review._id);
    await employee.save();
    res.status(201).json({ message: "Review assigned successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
