import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function ViewAllNotes() {
  // Mock state for notes (Replace this with an API call or Redux state in a real app)
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    // Fetch all notes from the backend API
    const fetchNotes = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/note/get-notes`,
          { headers }
        ); // Replace with your actual API endpoint
        setNotes(response.data); // Assuming response data contains the notes array
        setLoading(false);
      } catch (err) {
        setError(err.message || "Failed to fetch notes");
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  if (loading) return <p>Loading notes...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  return (
    <div className="bg-gradient-to-bl from-black to-zinc-600 min-h-screen py-8 px-4">
      <h1 className="text-3xl font-bold text-center mb-6">All Notes</h1>

      {notes.length === 0 ? (
        <p className="text-center text-gray-500">No notes found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {notes.map((note, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg p-4 border border-gray-200 flex flex-col justify-between"
            >
              <div>
                <h2 className="text-xl font-semibold mb-2">
                  {note.name || "Untitled Note"}
                </h2>
                <p className="text-gray-600 mb-4 line-clamp-2 group-hover:line-clamp-none transition-all duration-300 ease-in-out">
                  {note.description}
                </p>

                <Link
                  to={`/note/${note._id}`}
                  className="text-blue-500 hover:underline"
                >
                  View Note
                </Link>
              </div>
              <div className="mt-4">
                <p className="mb-2 text-gray-700">
                  <span className="font-bold">Purchased:</span>{" "}
                  {note.purchases || 0} times
                </p>
                <span
                  className={`px-2 py-1 text-sm rounded ${
                    note.price === 0
                      ? "bg-green-100 text-green-700"
                      : "bg-blue-100 text-blue-700"
                  }`}
                >
                  {note.price === 0 ? "Free" : `₹${note.price}`}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ViewAllNotes;
