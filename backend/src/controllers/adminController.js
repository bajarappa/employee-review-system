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
// Update an employee's details
export const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const employee = await Employee.findByIdAndUpdate(id, updates, {
      new: true,
    });
    if (!employee)
      return res.status(404).json({ message: "Employee not found" });

    res
      .status(200)
      .json({ message: "Employee updated successfully", employee });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Remove an employee
export const removeEmployee = async (req, res) => {
  try {
    const { id } = req.params;

    const employee = await Employee.findByIdAndDelete(id);
    if (!employee)
      return res.status(404).json({ message: "Employee not found" });

    res.status(200).json({ message: "Employee removed successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// View all employees
export const viewEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add or update performance review
export const addOrUpdateReview = async (req, res) => {
  try {
    const { reviewId, revieweeId, content } = req.body;

    let review;
    if (reviewId) {
      // Update existing review
      review = await Review.findByIdAndUpdate(
        reviewId,
        { content },
        { new: true }
      );
      if (!review) return res.status(404).json({ message: "Review not found" });
    } else {
      // Create new review
      review = new Review({ reviewee: revieweeId, content });
      await review.save();
    }

    res.status(200).json({ message: "Review saved successfully", review });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Promote an employee to admin
export const promoteToAdmin = async (req, res) => {
  try {
    const { employeeId } = req.body;

    const employee = await Employee.findByIdAndUpdate(
      employeeId,
      { role: "admin" },
      { new: true }
    );
    if (!employee)
      return res.status(404).json({ message: "Employee not found" });

    res.status(200).json({ message: "Employee promoted to admin", employee });
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
// View all reviews or reviews by employee ID
// View all reviews or reviews by employee ID
export const viewReviews = async (req, res) => {
  try {
    const { employeeId } = req.query; // Optional query parameter

    const filter = employeeId ? { reviewee: employeeId } : {};
    const reviews = await Review.find(filter)
      .populate("reviewer", "name") // Populate reviewer with only the name field
      .populate("reviewee", "name"); // Populate reviewee with only the name field

    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
