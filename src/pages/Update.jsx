import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom"; // Import useNavigate

function UpdateNote() {
  const { id } = useParams(); // Extract the note ID from the URL
  const navigate = useNavigate(); // Initialize the navigate function
  const [title, setTitle] = useState(""); // State to track the title
  const [description, setDescription] = useState(""); // State to track the description
  const [price, setPrice] = useState(0); // State to track the price
  const [error, setError] = useState(null); // State to track errors
  const [success, setSuccess] = useState(null); // State to track success messages

  // Fetch the current note data when the component loads
  useEffect(() => {
    const fetchNote = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("Authentication token not found. Please log in.");
        return;
      }

      try {
        const headers = {
          Authorization: `Bearer ${token}`,
        };

        const response = await axios.get(
          `http://localhost:3000/api/v1/note/get-notes-by-id/${id}`,
          { headers }
        );

        // Populate the state with the current note data
        setTitle(response.data.name || ""); // Use "name" for the title
        setDescription(response.data.description || "");
        setPrice(response.data.price || 0);
        setError(null); // Clear any previous errors
      } catch (error) {
        setError(error.response?.data?.message || "Failed to fetch note data");
      }
    };

    fetchNote();
  }, [id]); // Dependency array ensures this runs when the component mounts

  const handleUpdate = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("Authentication token not found. Please log in.");
      return;
    }

    try {
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.put(
        `http://localhost:3000/api/v1/note/update-note/${id}`,
        { title, description, price },
        { headers }
      );

      setSuccess(response.data.message); // Set success message
      setError(null); // Clear any previous errors

      // Redirect to the NoteById page after a successful update
      setTimeout(() => {
        navigate(`/note/${id}`);
      }, 1000);
    } catch (error) {
      setError(error.response?.data?.message || "Failed to update note");
      setSuccess(null); // Clear any previous success messages
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-6 max-w-md w-full">
        <h1 className="text-2xl font-bold mb-4 text-center">Update Note</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && <p className="text-green-500 mb-4">{success}</p>}
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 font-bold mb-2">
            Title:
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border rounded px-3 py-2 w-full"
            placeholder="Enter Title"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-gray-700 font-bold mb-2"
          >
            Description:
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border rounded px-3 py-2 w-full"
            placeholder="Enter Description"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="price" className="block text-gray-700 font-bold mb-2">
            Price:
          </label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            className="border rounded px-3 py-2 w-full"
            placeholder="Enter Price"
          />
        </div>
        <div className="flex flex-col gap-2 justify-center items-center">
          <button
            onClick={handleUpdate}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 "
          >
            Update Note
          </button>
          <Link
            className="  px-4 border-black py-1 rounded hover:bg-gray-300 border-2 "
            to={`/note/${id}`}
          >
            Back
          </Link>
        </div>
      </div>
    </div>
  );
}

export default UpdateNote;
