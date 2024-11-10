// src/App.js

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import AdminPage from "./pages/AdminPage";
import { AuthProvider } from "./contexts/AuthContext";
import SignupPage from "./pages/signupPage";
import AssignWorkPage from "./pages/AssignWorkPage";
import EmployeesPage from "./pages/EmployeesPage";
import HomePage from "./pages/HomePage";
import ReviewsPage from "./pages/ReviewsPage";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <div className="container mx-auto px-4">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/admin/assign-work" element={<AssignWorkPage />} />
            <Route path="/admin/employees" element={<EmployeesPage />} />
            <Route path="/admin/reviews" element={<ReviewsPage />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
