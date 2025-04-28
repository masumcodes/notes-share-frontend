import axios from "axios";
import { useEffect, useState } from "react";

const EditProfile = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [about, setAbout] = useState("");
  const [preview, setPreview] = useState(null);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [profilePicture, setProfilePicture] = useState(null);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/user/get-user-information",
          { headers }
        );
        const { username, email, about } = response.data;
        setUsername(username);
        setEmail(email);
        setAbout(about);
      } catch (error) {
        console.error("Error fetching profile:", error);
        setError("Failed to fetch profile information.");
      }
    };
    fetchProfile();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    if (!username || !email || !about) {
      setError("All fields are required.");
      setLoading(false);
      return;
    }

    try {
      // Create a FormData object to handle file uploads
      const formData = new FormData();
      formData.append("username", username);
      formData.append("email", email);
      formData.append("about", about);
      if (profilePicture) {
        formData.append("avatar", profilePicture); // Add the avatar file
      }

      await axios.put(
        "http://localhost:3000/api/v1/user/update-user-information",
        formData,
        {
          headers: {
            ...headers,
            "Content-Type": "multipart/form-data", // Set the content type for file uploads
          },
        }
      );

      setSuccess("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      setError(
        error.response?.data?.message ||
          "Failed to update profile. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    setProfilePicture(file);
    setPreview(URL.createObjectURL(file)); // Preview the image
  };

  return (
    <div
      className="flex justify-center items-center mt-10 min-h-screen"
      style={{
        backgroundImage: "url('/pexels-danbuilds-633409.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="max-w-lg mx-auto p-4  shadow-xl flex flex-col w-[500px] bg-gray-700 bg-opacity-95 rounded-xl">
        <h1 className="text-2xl text-zinc-500 items-center flex justify-center font-semibold">
          Edit Your Profile
        </h1>
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}
        <form onSubmit={handleSubmit} className="space-y-2">
          <div className="flex flex-col items-center">
            <div className="relative">
              <img
                src={preview || "/uploads/default-avatar.png"} // Default avatar if no image is selected
                alt="Profile Preview"
                className="w-32 h-32 rounded-full object-cover border-4 border-gray-300 shadow-md"
              />
              <label
                htmlFor="profile-picture"
                className="absolute bottom-0 right-0 bg-indigo-600 text-white p-2 rounded-full shadow-md cursor-pointer hover:bg-indigo-700 transition"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15.232 5.232a3 3 0 011.768-1.768m1.768 3.536a3 3 0 01-1.768 1.768M9 13l3 3m0 0l3-3m-3 3V7"
                  />
                </svg>
              </label>
              <input
                type="file"
                id="profile-picture"
                accept="image/*"
                onChange={handleProfilePictureChange}
                className="hidden"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-zinc-200"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-2 p-4 w-full border-2 border-gray-300 rounded-xl shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your username"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-zinc-200"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 p-4 w-full border-2 border-gray-300 rounded-xl shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label
              htmlFor="about"
              className="block text-sm font-medium text-zinc-200"
            >
              About Me
            </label>
            <textarea
              id="about"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              className="mt-2 p-4 w-full border-2 border-gray-300 rounded-xl shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Write about yourself (max 200 characters)"
              rows="4"
            ></textarea>
            <p className="text-sm text-gray-500 mt-1">
              {about.length}/200 characters
            </p>
          </div>

          <div>
            <button
              type="submit"
              className="w-full py-3 px-6 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              disabled={loading}
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
