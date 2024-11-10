import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";

const SignUpForm = () => {
  const { signup, error } = useContext(AuthContext);
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("employee");
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Loading state

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      return; // Optionally add form validation or show error if needed
    }

    setIsLoading(true);
    await signup(name, email, password, role);
    setIsLoading(false);

    if (!error) {
      setSuccess(true);
      setName("");
      setEmail("");
      setPassword("");
      setRole("employee");

      // Redirect to login page after successful sign-up
      setTimeout(() => {
        navigate("/login"); // Navigate to login page
      }, 2000);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">
          Create an Account
        </h2>

        {success && (
          <p className="text-green-500 mb-4">
            Sign up successful! Redirecting to login...
          </p>
        )}

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <form onSubmit={handleSignUp} className="space-y-4 max-w-3xl">
          <div>
            <label htmlFor="name" className="block text-gray-700 font-medium">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-gray-700 font-medium">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* <div>
            <label htmlFor="role" className="block text-gray-700 font-medium">
              Select Role
            </label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            >
              <option value="employee">Employee</option>
              <option value="admin">Admin</option>
            </select>
          </div> */}

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 px-6 rounded-md text-white text-lg ${
              isLoading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
            } transition duration-300`}
          >
            {isLoading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Already have an account?{" "}
            <a href="/login" className="text-blue-600 hover:underline">
              Login here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
