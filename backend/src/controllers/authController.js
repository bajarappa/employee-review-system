import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Employee from "../models/Employee.js";

// Register a new employee (this is analogous to user registration)
export const registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    // Check if the employee already exists based on email
    const employeeExists = await Employee.findOne({ email });
    if (employeeExists) {
      return res.status(400).json({ message: "Employee already exists" });
    }

    // Hash the password before saving
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new employee
    const newEmployee = new Employee({
      name,
      email,
      password: hashedPassword,
      role,
    });

    // Save the employee to the database
    await newEmployee.save();

    res
      .status(201)
      .json({
        message: "Employee registered successfully",
        employee: newEmployee,
      });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Login employee and return JWT token
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the employee by email
    const employee = await Employee.findOne({ email });
    if (!employee) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, employee.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate a JWT token for the authenticated employee
    const token = jwt.sign(
      { id: employee._id, role: employee.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
