import { useEffect, useState } from "react";

export default function GetReviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/admin/reviews",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`, // Include token for authorization
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch reviews");
        }
        const data = await response.json();
        setReviews(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const handleUpdate = (id) => {
    // Implement update functionality here
    console.log(`Update review with ID: ${id}`);
  };

  const handleView = (id) => {
    // Implement view functionality here
    console.log(`View review with ID: ${id}`);
  };

  return (
    <div>
      <h2>Reviews</h2>
      <table className="table-auto w-full border-collapse border">
        <thead>
          <tr>
            <th className="border p-2">Created At</th>
            <th className="border p-2">Updated At</th>
            <th className="border p-2">Reviewer</th>
            <th className="border p-2">Reviewee</th>
            <th className="border p-2">Feedback</th>
            <th className="border p-2">Status</th>

            {/* <th className="border p-2">Actions</th> */}
          </tr>
        </thead>
        <tbody>
          {reviews.map((review) => (
            <tr key={review._id}>
              <td className="border p-2">
                {new Date(review.createdAt).toLocaleString()}
              </td>
              <td className="border p-2">
                {new Date(review.updatedAt).toLocaleString()}
              </td>
              <td className="border p-2">
                {review.reviewer ? review.reviewer.name : "Not Assigned"}
              </td>
              <td className="border p-2">
                {review.reviewee?.name || "Unknown"}
              </td>
              <td className="border p-2">{review.feedback || "No feedback"}</td>
              <td className="border p-2">{review.status}</td>

              {/* <td className="border p-2">
                <button
                  onClick={() => handleView(review._id)}
                  className="text-blue-600 hover:underline mr-2"
                >
                  View
                </button>
                <button
                  onClick={() => handleUpdate(review._id)}
                  className="text-green-600 hover:underline"
                >
                  Update
                </button>
              </td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
