import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom"; // Import useNavigate
import axios from "axios";

function NoteById() {
  const { id } = useParams(); // Get note ID from route parameters
  const navigate = useNavigate(); // Initialize navigate function
  const [note, setNote] = useState(null);
  const [error, setError] = useState(null); // State to track errors
  const [isOwner, setIsOwner] = useState(false); // State to check if user is the owner

  useEffect(() => {
    const fetchNoteById = async () => {
      const userId = localStorage.getItem("id");
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Authentication token not found. Please log in.");
        return;
      }

      try {
        const headers = {
          userId,
          Authorization: `Bearer ${token}`,
        };

        const response = await axios.get(
          `http://localhost:3000/api/v1/note/get-notes-by-id/${id}`,
          { headers }
        );

        setNote(response.data);
        setIsOwner(response.data.owner === userId); // Check if the logged-in user is the owner
      } catch (error) {
        if (error.response?.status === 401) {
          setError("Session expired. Please log in again.");
          localStorage.removeItem("token");
          window.location.href = "/login";
        } else {
          setError(error.response?.data?.message || "Failed to fetch note");
        }
      }
    };

    fetchNoteById();
  }, [id]);

  const handleDelete = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("Authentication token not found. Please log in.");
      return;
    }

    try {
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.delete(
        `http://localhost:3000/api/v1/note/delete-note-by-id/${id}`,
        { headers }
      );

      alert(response.data.message); // Show success message
      navigate("/mycontents"); // Redirect to the "My Notes" page after deletion
    } catch (error) {
      setError(error.response?.data?.message || "Failed to delete note");
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen py-8 px-4">
      <h1 className="text-3xl font-bold text-center mb-6">Note Details</h1>
      {error && <p className="text-center text-red-500">{error}</p>}
      {note ? (
        <div className="bg-white shadow-md rounded-lg p-6 border border-gray-200 max-w-lg mx-auto">
          <h2 className="text-2xl font-semibold mb-4">{note.name}</h2>
          <p className="text-gray-600 mb-4">
            <span className="font-bold">Description:</span> {note.description}
          </p>
          {note.file && (
            <div className="mb-2 flex gap-2 justify-start items-center">
              <p className="text-gray-700 font-bold mb-2">Attachment:</p>
              <a
                href={`http://localhost:3000/uploads/${note.file}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 rounded-md border-slate-500 bg-slate-300 border-2 p-1 mb-2 hover:text-black hover:font-semibold"
              >
                View File
              </a>
            </div>
          )}
          <p className="text-gray-700 mb-2">
            <span className="font-bold">Price:</span>{" "}
            {note.isFree ? "Free" : `₹${note.price}`}
          </p>
          <p className="text-gray-700">
            <span className="font-bold">Purchased:</span>{" "}
            {note.buyers?.length || 0} times
          </p>
          {isOwner && (
            <div className="flex justify-between px-2 ">
              <Link
                to={`/update-note/${note._id}`}
                className="border-2 bg-blue-500 border-black px-2 rounded-sm hover:bg-gray-400"
              >
                Edit
              </Link>
              <button
                onClick={handleDelete}
                className="border-2 bg-red-500 border-black px-2 rounded-sm hover:bg-gray-400"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      ) : (
        !error && <p className="text-center text-gray-500">Note not found.</p>
      )}
    </div>
  );
}

export default NoteById;
