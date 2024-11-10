import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="bg-blue-600 text-white p-4">
      <div className="flex justify-between items-center container mx-auto">
        <Link to="/" className="text-2xl font-bold">
          Company Name
        </Link>
        <nav className="space-x-4 flex items-center">
          {user ? (
            <>
              {/* Admin role-specific links */}
              {user.role === "admin" && (
                <>
                  <Link to="admin/assign-work" className="hover:text-gray-300">
                    Assign Work
                  </Link>
                  <Link to="admin/employees" className="hover:text-gray-300">
                    Employees
                  </Link>
                  <Link to="admin/reviews" className="hover:text-gray-300">
                    Reviews
                  </Link>
                </>
              )}

              {/* Employee role-specific link */}
              {user.role === "employee" && (
                <Link to="/dashboard" className="hover:text-gray-300">
                  Dashboard
                </Link>
              )}

              {/* Display user's name or fallback */}
              {/* <span className="text-gray-200">
                Hello, {user.name || user.username || "Guest"}
              </span> */}

              {/* Logout button */}
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              {/* Login and Signup links for non-authenticated users */}
              <Link to="/login" className="hover:text-gray-300">
                Login
              </Link>
              <Link to="/signup" className="hover:text-gray-300">
                Signup
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
