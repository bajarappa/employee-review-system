// src/routes/auth.js
import express from "express";
import Employee from "../models/Employee.js";
import { hashPassword, comparePassword, generateToken } from "../utils/auth.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// Register route
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await hashPassword(password);
    const newEmployee = await Employee.create({
      name,
      email,
      password: hashedPassword,
    });
    res.status(201).json(newEmployee);
  } catch (error) {
    res.status(400).json({ message: "Error registering employee", error });
  }
});

// Login route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const employee = await Employee.findOne({ email });
    if (!employee || !(await comparePassword(password, employee.password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const token = generateToken(employee);
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error });
  }
});
router.get("/protected", authenticateToken, (req, res) => {
  res.json({ message: "You have access to this protected route!" });
});
export default router;
