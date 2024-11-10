import { createContext, useState, useEffect, useMemo } from "react";
import { jwtDecode } from "jwt-decode"; // Correct import here
import PropTypes from "prop-types";
import axios from "axios";

// Create a Context for Authentication
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  // Check for a valid token on initial load
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);

        // Check if token is expired
        if (decodedToken.exp * 1000 < Date.now()) {
          localStorage.removeItem("token"); // Remove expired token
          setUser(null);
        } else {
          setUser(decodedToken);
        }
      } catch (error) {
        console.error("Invalid token", error);
        localStorage.removeItem("token");
        setError("Invalid or expired token. Please log in again.");
      }
    }
  }, []);

  const login = (token) => {
    try {
      const decodedToken = jwtDecode(token);

      // Check if token is expired
      if (decodedToken.exp * 1000 < Date.now()) {
        setError("Token has expired. Please log in again.");
      } else {
        setUser(decodedToken);
        localStorage.setItem("token", token);
        setError(""); // Clear any previous errors
      }
    } catch (error) {
      console.error("Invalid token during login", error);
      setError("Failed to log in. Please try again.");
    }
  };

  const signup = async (name, email, password, role = "employee") => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/register",
        {
          name,
          email,
          password,
          role,
        }
      );
      if (response.status === 201) {
        login(response.data.token); // Log the user in with the new token
      }
    } catch (error) {
      console.error("Signup error", error);
      setError("Failed to sign up. Please try again.");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  const authContextValue = useMemo(
    () => ({ user, login, logout, signup, error }),
    [user, error]
  );

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthContext;
