import { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import axios from "axios"; // Import axios

function MyContents() {
  const [notes, setNotes] = useState([]); // Initialize notes as an array
  const userId = localStorage.getItem("id"); // Retrieve the user's ID from localStorage
  const headers = {
    id: userId,
    authorization: `Bearer ${localStorage.getItem("token")}`, // Add space after "Bearer"
  };

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/note/get-notes`,
          { headers }
        );

        const userNotes = response.data.filter((note) => note.owner === userId);
        setNotes(userNotes); // Set the filtered notes
      } catch (error) {
        console.error("Error fetching notes:", error);
      }
    };

    fetchNotes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]); // Add userId as a dependency

  return (
    <div className=" min-h-screen pt-5  bg-gradient-to-tr from-black to-zinc-700 flex flex-col justify-between">
      <div className="">
        <h1 className="text-3xl text-white font-semibold text-center mb-6">
          My Notes
        </h1>
        {notes.length === 0 ? (
          <p className="text-center text-zinc-200">No notes found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-2">
            {notes.map((note, index) => (
              <div
                key={index}
                className="bg-gray-700 bg-opacity-70 shadow-md rounded-lg p-4 w-[350px] border-2     flex flex-col "
              >
                <div className="flex flex-col justify-start  gap-2 h-full group">
                  <div className="flex items-center gap-2 ">
                    <h2 className="text-orange-500  font-semibold text-xl ">
                      Title
                    </h2>
                    <h1 className="text-xl font-bold text-white">:</h1>
                    <h2 className="text-white font-medium text-base">
                      {note.name.length > 30
                        ? note.name.slice(0, 32) + "..."
                        : note.name}
                    </h2>
                  </div>
                  <div className="flex items-center gap-2 ">
                    <h2 className="text-orange-500  font-semibold text-xl ">
                      Description
                    </h2>
                    <h1 className="text-xl font-bold text-white">:</h1>
                    <h2 className="text-white font-medium text-base">
                      {note.description.length > 20
                        ? note.description.slice(0, 20) + "..."
                        : note.description}
                    </h2>
                  </div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-orange-500 text-lg font-semibold">
                      Created At
                    </h2>
                    <h1 className="text-lg font-semibold text-white">:</h1>
                    <h2 className="text-white font-light text-base">
                      {new Date(note.createdAt).toLocaleDateString() ||
                        "Unknown Date"}
                    </h2>
                  </div>
                  <div className="flex items-center justify-center  ">
                    <Link
                      to={`/note/${note._id}`}
                      className="text-white rounded border-2    bg-[rgb(14,20,98)] p-1 hover:bg-[rgb(35,41,131)]"
                    >
                      View Note
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>{" "}
    </div>
  );
}

export default MyContents;
