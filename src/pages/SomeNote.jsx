import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function SomeNote() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/note/get-notes`,
          { headers }
        );
        setNotes(response.data);
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

  const visibleNotes = notes.slice(0, 4);

  return (
    <div>
      <div className="min-h-screen py-16 px-4">
        {notes.length === 0 ? (
          <p className="text-center text-gray-500">No notes found.</p>
        ) : (
          <div className="grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {visibleNotes.map((note, index) => (
              <div
                key={index}
                className="bg-sky-900 h-[300px] italic  shadow-md rounded-lg p-4 border border-gray-200 flex flex-col  justify-between "
              >
                <div className="flex flex-col items-center h-full">
                  <h2 className=" text-gray-900 font-semibold dark:text-white mb-2 items-center  flex">
                    <h1 className=" text-2xl">Title :</h1>
                    <h2 className="text-lg font-semibold text-black  ml-2">
                      {note.name && note.name.length > 20
                        ? `${note.name.slice(0, 20)}...`
                        : note.name || "Untitled Note"}
                    </h2>
                  </h2>
                  <p className="  line-clamp-2 group-hover:line-clamp-none transition-all text-sm font-medium text-gray-900  duration-300 ease-in-out">
                    {note.description && note.description.length > 50
                      ? `${note.description.slice(0, 45)}...`
                      : note.description || "No description available"}
                  </p>
                </div>
                <div className="mt-4 flex flex-col gap-2 items-center">
                  <p className="mb-2 ">
                    <span className="font-bold">Purchased:</span>{" "}
                    {note.purchases || 0} times
                  </p>
                  <span
                    className={`px-2 py-1 w-20  flex justify-center text-sm rounded ${
                      note.price === 0
                        ? "bg-green-100 text-green-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {note.price === 0 ? "Free" : `₹${note.price}`}
                  </span>
                  <Link
                    to={`/note/${note._id}`}
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 "
                  >
                    View Note
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default SomeNote;
