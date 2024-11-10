export default function EmployeeReviewHomePage() {
  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 min-h-screen py-12 px-6">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-blue-600">
          Employee Review Management
        </h1>
        <p className="mt-2 text-lg text-gray-600">
          Effortlessly manage, track, and improve your employees performance
          with our platform.
        </p>
      </header>

      <section className="bg-white shadow-md rounded-lg p-8 mb-8 w-full md:w-2/3 lg:w-1/2">
        <h2 className="text-3xl font-semibold text-blue-600 mb-4">
          Key Features
        </h2>
        <ul className="list-disc pl-6 space-y-3 text-gray-700">
          <li className="flex items-start">
            <span className="text-xl font-medium mr-2">✔️</span> Assign
            performance reviews to employees
          </li>
          <li className="flex items-start">
            <span className="text-xl font-medium mr-2">✔️</span> View all
            employee reviews or filter by employee ID
          </li>
          <li className="flex items-start">
            <span className="text-xl font-medium mr-2">✔️</span> Easily update
            review content for accurate feedback
          </li>
          <li className="flex items-start">
            <span className="text-xl font-medium mr-2">✔️</span> Track review
            history for better performance analysis
          </li>
          <li className="flex items-start">
            <span className="text-xl font-medium mr-2">✔️</span> Promote
            employees based on performance reviews
          </li>
        </ul>
      </section>

      <section className="bg-blue-600 text-white p-8 rounded-lg mb-8 w-full md:w-2/3 lg:w-1/2">
        <h2 className="text-3xl font-semibold mb-4">
          Manage Reviews with Ease
        </h2>
        <p className="mb-4">
          Take control of employee performance evaluations and improve your
          team&apos;s effectiveness. Sign in to start managing reviews and
          fostering employee growth.
        </p>
        <div className="space-x-4">
          <a
            href="/login"
            className="inline-block bg-white text-blue-600 py-2 px-4 rounded-lg text-lg font-semibold hover:bg-gray-200 transition"
          >
            Sign In
          </a>
          <a
            href="/signup"
            className="inline-block bg-white text-blue-600 py-2 px-4 rounded-lg text-lg font-semibold hover:bg-gray-200 transition"
          >
            Register
          </a>
        </div>
      </section>

      <footer className="text-center text-gray-600 mt-16">
        <p>
          &copy; {new Date().getFullYear()} Employee Review Platform. All rights
          reserved.
        </p>
      </footer>
    </div>
  );
}
