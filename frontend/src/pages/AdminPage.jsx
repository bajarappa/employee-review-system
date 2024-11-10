// src/pages/AdminPage.js

import EmployeeForm from "../components/EmployeeForm";
import ReviewForm from "../components/ReviewForm";

const AdminPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h2 className="text-2xl mb-4">Admin Panel</h2>
      <EmployeeForm />
      <ReviewForm />
    </div>
  );
};

export default AdminPage;
