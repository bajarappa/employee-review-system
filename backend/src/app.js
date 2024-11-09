import express from "express";
import authRoutes from "./routes/auth.js";
// import employeeRoutes from "./routes/employees.js";
import reviewRoutes from "./routes/reviews.js";
import adminRoutes from "./routes/adminRoutes.js";
import employeeRoutes from "./routes/employeeRoutes.js";
const app = express();
app.use(express.json());

app.use("/api/auth", authRoutes);
// app.use("/api/employees", employeeRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/employee", employeeRoutes);
app.get("/", (req, res) => res.send("Employee Review System API is running"));

export default app;
