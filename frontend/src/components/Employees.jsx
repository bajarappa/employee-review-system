import { useState, useEffect } from "react";
import axios from "axios";

export default function Employees() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  // Form state for adding/updating an employee
  const [employeeForm, setEmployeeForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "employee",
  });
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/admin/employees",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setEmployees(response.data);
      } catch (error) {
        setError("Failed to load employees. Unauthorized.");
        console.error("Error fetching employees:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEmployees();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmployeeForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddEmployee = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/admin/employee/add",
        employeeForm,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setEmployees((prev) => [...prev, response.data]);
      setMessage("Employee added successfully.");
      closeModal();
    } catch (error) {
      setError("Failed to add employee. Please try again.");
      console.error("Error adding employee:", error);
    }
  };

  const openUpdateModal = (employee) => {
    setEmployeeForm(employee); // Prefill the form with employee data
    setSelectedEmployeeId(employee._id);
    setUpdateModalOpen(true);
  };

  const handleUpdateEmployee = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:3000/api/admin/employee/update/${selectedEmployeeId}`,
        employeeForm,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setEmployees((prev) =>
        prev.map((emp) =>
          emp._id === selectedEmployeeId ? response.data : emp
        )
      );
      setMessage("Employee updated successfully.");
      closeModal();
    } catch (error) {
      setError("Failed to update employee. Please try again.");
      console.error("Error updating employee:", error);
    }
  };

  const openDeleteModal = (id) => {
    setSelectedEmployeeId(id);
    setDeleteModalOpen(true);
  };

  const handleDeleteEmployee = async () => {
    try {
      await axios.delete(
        `http://localhost:3000/api/admin/employee/remove/${selectedEmployeeId}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setEmployees((prev) =>
        prev.filter((emp) => emp._id !== selectedEmployeeId)
      );
      setMessage("Employee deleted successfully.");
      closeModal();
    } catch (error) {
      setError("Failed to delete employee. Please try again.");
      console.error("Error deleting employee:", error);
    }
  };

  const closeModal = () => {
    setAddModalOpen(false);
    setUpdateModalOpen(false);
    setDeleteModalOpen(false);
    setEmployeeForm({ name: "", email: "", password: "", role: "employee" });
    setSelectedEmployeeId(null);
  };

  if (loading) return <div>Loading employees...</div>;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
        Employees
      </h2>
      <button
        onClick={() => setAddModalOpen(true)}
        className="bg-blue-600 text-white px-4 py-2 mb-6 rounded hover:bg-blue-700"
      >
        Add Employee
      </button>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Role</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee._id} className="border-t">
                <td className="px-4 py-2">{employee.name}</td>
                <td className="px-4 py-2">{employee.email}</td>
                <td className="px-4 py-2">{employee.role}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => openUpdateModal(employee)}
                    className="text-blue-500 mr-4"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => openDeleteModal(employee._id)}
                    className="text-red-500"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Modal */}
      {(isAddModalOpen || isUpdateModalOpen) && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
            <h3 className="text-2xl font-semibold mb-4">
              {isAddModalOpen ? "Add Employee" : "Update Employee"}
            </h3>
            <form
              onSubmit={
                isAddModalOpen ? handleAddEmployee : handleUpdateEmployee
              }
            >
              <input
                type="text"
                name="name"
                value={employeeForm.name}
                onChange={handleInputChange}
                required
                placeholder="Name"
                className="w-full mb-3 p-2 border rounded"
              />
              <input
                type="email"
                name="email"
                value={employeeForm.email}
                onChange={handleInputChange}
                required
                placeholder="Email"
                className="w-full mb-3 p-2 border rounded"
              />
              <input
                type="password"
                name="password"
                value={employeeForm.password}
                onChange={handleInputChange}
                required
                placeholder="Password"
                className="w-full mb-3 p-2 border rounded"
              />
              <select
                name="role"
                value={employeeForm.role}
                onChange={handleInputChange}
                className="w-full mb-3 p-2 border rounded"
              >
                <option value="employee">Employee</option>
                <option value="admin">Admin</option>
              </select>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
              >
                {isAddModalOpen ? "Add" : "Update"}
              </button>
            </form>
            <button onClick={closeModal} className="mt-4 text-gray-500">
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
            <h3 className="text-2xl font-semibold mb-4">Confirm Delete</h3>
            <p>Are you sure you want to delete this employee?</p>
            <button
              onClick={handleDeleteEmployee}
              className="bg-red-600 text-white px-4 py-2 mt-4 rounded hover:bg-red-700 mr-4"
            >
              Yes, Delete
            </button>
            <button onClick={closeModal} className="text-gray-500">
              Cancel
            </button>
          </div>
        </div>
      )}

      {message && <p className="text-center text-green-500 mt-4">{message}</p>}
    </div>
  );
}
