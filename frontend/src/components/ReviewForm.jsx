import axios from "axios";
import { useState } from "react";

const ReviewForm = () => {
  const [reviewer, setReviewer] = useState("");
  const [reviewee, setReviewee] = useState("");
  const [rating, setRating] = useState(1);
  const [reviewText, setReviewText] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();

    if (!reviewer || !reviewee || !reviewText) {
      setError("All fields are required.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/api/employee/reviews/feedback", // Replace with the correct API endpoint
        { reviewer, reviewee, rating, reviewText },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 200) {
        setSuccess(true);
        setReviewer("");
        setReviewee("");
        setRating(1);
        setReviewText("");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to submit review.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl mx-auto">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">
          Submit a Review
        </h2>

        {success && (
          <p className="text-green-500 mb-4">
            Review submitted successfully! Thank you.
          </p>
        )}

        <form onSubmit={handleReviewSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="reviewer"
              className="block text-gray-700 font-medium"
            >
              Reviewer Name
            </label>
            <input
              type="text"
              id="reviewer"
              placeholder="Your name"
              value={reviewer}
              onChange={(e) => setReviewer(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div>
            <label
              htmlFor="reviewee"
              className="block text-gray-700 font-medium"
            >
              Reviewee Name
            </label>
            <input
              type="text"
              id="reviewee"
              placeholder="Employee's name"
              value={reviewee}
              onChange={(e) => setReviewee(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div>
            <label htmlFor="rating" className="block text-gray-700 font-medium">
              Rating
            </label>
            <select
              id="rating"
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              className="w-full p-3 border border-gray-300 rounded-md"
              required
            >
              <option value={1}>1 - Poor</option>
              <option value={2}>2 - Fair</option>
              <option value={3}>3 - Good</option>
              <option value={4}>4 - Very Good</option>
              <option value={5}>5 - Excellent</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="reviewText"
              className="block text-gray-700 font-medium"
            >
              Review
            </label>
            <textarea
              id="reviewText"
              placeholder="Write your review here"
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md"
              rows="4"
              required
            />
          </div>

          {/* Displaying errors if present */}
          {error && <p className="text-red-500">{error}</p>}

          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Submit Review
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReviewForm;
