import Employee from "../models/Employee.js";
import Review from "../models/Review.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Add a new employee (with password hashing)
export const addEmployee = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Check if the employee already exists
    const existingEmployee = await Employee.findOne({ email });
    if (existingEmployee) {
      return res.status(400).json({ message: "Employee already exists" });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    const newEmployee = new Employee({
      name,
      email,
      password: hashedPassword, // Save hashed password
      role,
    });

    await newEmployee.save();
    res
      .status(201)
      .json({ message: "Employee added successfully", newEmployee });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Assign performance review (Ensure JWT and Admin Role)
export const assignReview = async (req, res) => {
  try {
    const { reviewerId, revieweeId } = req.body;

    // Check for JWT token in the request header
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return res
        .status(401)
        .json({ message: "Authorization denied. No token provided." });
    }

    // Verify the JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded || decoded.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Forbidden. Only admins can assign reviews." });
    }

    // Proceed with assigning the review
    const review = new Review({
      reviewer: reviewerId,
      reviewee: revieweeId,
    });
    await review.save();

    const employee = await Employee.findById(revieweeId);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    employee.assignedReviews.push(review._id);
    await employee.save();

    res.status(201).json({ message: "Review assigned successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
