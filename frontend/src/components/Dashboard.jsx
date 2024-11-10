import React, { useEffect, useState } from "react";
import axios from "axios";
import AuthContext from "../contexts/AuthContext";

const Dashboard = () => {
  const { user } = React.useContext(AuthContext);
  const [reviews, setReviews] = useState([]); // List of reviews
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(""); // Error message
  const [reviewId, setReviewId] = useState(""); // Selected review ID
  const [feedback, setFeedback] = useState(""); // Feedback text
  const [message, setMessage] = useState(""); // Message to display after submission
  const [modalOpen, setModalOpen] = useState(false); // Modal state
  const [submittedReview, setSubmittedReview] = useState(null); // State to track submission feedback
  const [reviewToSubmit, setReviewToSubmit] = useState(null); // State to track the review to submit

  // Fetch reviews when the component mounts
  useEffect(() => {
    if (user) {
      const fetchReviews = async () => {
        try {
          // Fetch reviews for the current user
          const response = await axios.get(
            "http://localhost:3000/api/employee/reviews",
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );

          // Map reviews with reviewer and reviewee names directly
          const reviewsWithNames = response.data.map((review) => ({
            ...review,
            reviewerName: review.reviewer?.name || "Unknown", // Directly accessing reviewer name
            revieweeName: review.reviewee?.name || "Unknown", // Directly accessing reviewee name
          }));

          setReviews(reviewsWithNames);
        } catch (err) {
          setError("Failed to fetch reviews.");
        } finally {
          setLoading(false);
        }
      };
      fetchReviews();
    } else {
      setLoading(false); // If no user, stop loading
    }
  }, [user]);

  // Handle the review submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!reviewId || !feedback) {
      setMessage("Please select a review and provide feedback.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/api/employee/reviews/feedback",
        {
          reviewId,
          feedback,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.message) {
        setMessage("Feedback submitted successfully.");
        setReviewId(""); // Clear selected review
        setFeedback(""); // Clear feedback text
        setModalOpen(false); // Close modal after submission
        setSubmittedReview("Review submitted successfully!");
        // Remove the review from the list after submission
        setReviews(reviews.filter((review) => review._id !== reviewId));
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
      setMessage("Failed to submit feedback. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl mx-auto">
        {/* Reviews Section */}
        <div>
          <h3 className="text-2xl font-medium text-gray-700 mb-4">
            Please review your besties
          </h3>

          {/* Loading State */}
          {loading && <p className="text-gray-500">Loading reviews...</p>}

          {/* Error Handling */}
          {error && <p className="text-red-500">{error}</p>}

          {/* Success Message */}
          {submittedReview && (
            <p className="text-green-500 mb-4">{submittedReview}</p>
          )}

          {/* No Reviews or Available Reviews */}
          {!loading && !error && reviews.length === 0 ? (
            <p className="text-gray-500">No reviews available.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reviews.map((review) => (
                <div
                  key={review._id}
                  className="bg-gray-50 p-6 rounded-md shadow-sm"
                >
                  <p className="text-gray-600">
                    <strong>Reviewer:</strong>{" "}
                    {review.reviewerName || "Unknown"}
                  </p>
                  {/* <p className="text-gray-600">
                    <strong>Reviewee:</strong>{" "}
                    {review.revieweeName || "Unknown"}
                  </p> */}
                  <div className="flex justify-between items-center mt-4">
                    <button
                      onClick={() => {
                        setReviewToSubmit(review); // Set the review to submit
                        setReviewId(review._id); // Set the selected review ID
                        setModalOpen(true); // Open the modal
                      }}
                      className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      Submit Feedback
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-2xl font-semibold mb-4 text-center">
              Submit Feedback
            </h2>

            {/* Error Message */}
            {message && (
              <p className="text-red-500 text-center mb-4">{message}</p>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Feedback */}
              <div className="form-group">
                <label htmlFor="feedback" className="block font-medium mb-2">
                  Feedback:
                </label>
                <textarea
                  id="feedback"
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  required
                  rows="4"
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                ></textarea>
              </div>

              {/* Submit Button */}
              <div className="flex justify-between">
                <button
                  type="submit"
                  className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
                >
                  Submit
                </button>
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="bg-gray-300 text-black py-2 px-4 rounded-md hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
