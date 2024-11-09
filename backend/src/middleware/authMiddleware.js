import jwt from "jsonwebtoken";

// Middleware to authenticate the user and attach user data to the request
export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1]; // Get the token from the "Bearer" prefix

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    req.user = user; // Attach user data to the request object
    next();
  });
};

// Middleware to check if the user has the "admin" role
export const authorizeAdmin = (req, res, next) => {
  if (req.user && req.user.role !== "admin") {
    return res.status(403).json({ message: "Admin access required" });
  }
  next();
};

// You can also add more role-based authorization here, for example:
export const authorizeRole = (role) => {
  return (req, res, next) => {
    if (req.user && req.user.role !== role) {
      return res.status(403).json({ message: `${role} access required` });
    }
    next();
  };
};
