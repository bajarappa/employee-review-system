import { useState, useEffect } from "react";
import axios from "axios";

export default function AssignWork() {
  const [employees, setEmployees] = useState([]);
  const [selectedReviewer, setSelectedReviewer] = useState("");
  const [selectedReviewee, setSelectedReviewee] = useState("");
  const [message, setMessage] = useState("");

  // Fetch all employees to display in the dropdowns
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/admin/employees",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`, // Include token in the request for authorization
            },
          }
        );
        console.log("Employees fetched:", response.data); // Log fetched employees data
        setEmployees(response.data); // Set the employees state with the fetched data
      } catch (error) {
        console.error("Error fetching employees:", error);
        setMessage("Failed to fetch employees. Please try again.");
      }
    };
    fetchEmployees();
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedReviewer || !selectedReviewee) {
      setMessage("Please select both a reviewer and a reviewee.");
      return;
    }

    console.log("Assigning review with data:", {
      reviewerId: selectedReviewer,
      revieweeId: selectedReviewee,
    });

    try {
      const response = await axios.post(
        "http://localhost:3000/api/admin/review/assign", // Adjust your endpoint if needed
        {
          reviewerId: selectedReviewer,
          revieweeId: selectedReviewee,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Ensure the token is included
          },
        }
      );

      console.log("Response from assignment:", response.data); // Log the response from the server
      setMessage(response.data.message); // Display the response message
      setSelectedReviewer(""); // Clear the reviewer selection
      setSelectedReviewee(""); // Clear the reviewee selection
    } catch (error) {
      console.error("Error assigning review:", error);
      setMessage("Failed to assign review. Please try again.");
    }
  };

  return (
    <div className="assign-work p-4 bg-gray-100 rounded-lg shadow-md max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-semibold mb-4 text-center">
        Assign Review to Employee
      </h2>

      <form onSubmit={handleSubmit} className="assign-work-form">
        {/* Reviewer Dropdown */}
        <div className="form-group mb-4">
          <label htmlFor="reviewer" className="block mb-2 font-medium">
            Select Reviewer:
          </label>
          <select
            id="reviewer"
            value={selectedReviewer}
            onChange={(e) => setSelectedReviewer(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded"
          >
            <option value="">-- Select a Reviewer --</option>
            {employees.map((employee) => (
              <option key={employee._id} value={employee._id}>
                {employee.name} - {employee.email}
              </option>
            ))}
          </select>
        </div>

        {/* Reviewee Dropdown */}
        <div className="form-group mb-4">
          <label htmlFor="reviewee" className="block mb-2 font-medium">
            Select Reviewee:
          </label>
          <select
            id="reviewee"
            value={selectedReviewee}
            onChange={(e) => setSelectedReviewee(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded"
          >
            <option value="">-- Select a Reviewee --</option>
            {employees.map((employee) => (
              <option key={employee._id} value={employee._id}>
                {employee.name} - {employee.email}
              </option>
            ))}
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Assign Review
        </button>
      </form>

      {/* Message */}
      {message && (
        <p className="mt-4 text-center font-medium text-green-600">{message}</p>
      )}
    </div>
  );
}
