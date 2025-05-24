import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { authActions } from "../store/auth";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineMail } from "react-icons/md";
import { FcAbout } from "react-icons/fc";

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_BACKEND_URL
          }/api/v1/user/get-user-information`,
          { headers }
        );
        setProfile(response.data);
        console.log("Profile data:", response.data); // Debugging
      } catch (error) {
        console.error("Error fetching profile:", error);
        if (error.response && error.response.status === 401) {
          handleLogout();
        }
      }
    };

    fetchProfile();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    dispatch(authActions.logout());
    navigate("/login", { replace: true });
  };

  if (!profile) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-300">
        <p className="text-gray-700 text-lg">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 bg-gradient-to-tr from-black to-zinc-700 justify-center mt-11 items-center min-h-screen">
      <div className="flex flex-col shadow-2xl bg-gray-700 bg-opacity-95  rounded-md p-10  w-[500px]">
        <div className="flex justify-center ml-4 text-white mb-4">
          <img
            src={
              profile.avatar
                ? `${import.meta.env.VITE_BACKEND_URL}/uploads/${
                    profile.avatar
                  }`
                : "/default-avatar.png"
            }
            alt="Profile"
            className="w-32 h-32 border-2 rounded-full shadow-md object-cover"
          />
        </div>
        <div className="flex flex-col items-start ml-4 mb-4">
          <div className="flex items-center gap-6">
            <h1 className="flex gap-1 items-center text-base font-semibold text-slate-300 mr-2">
              <FaRegUser />
              Username :
            </h1>
            <h1 className="text-lg font-semibold underline text-neutral-400">
              {profile.username || "Username"}
            </h1>
          </div>
          <div className="flex items-center gap-6">
            <h1 className="flex gap-1 items-center text-base font-semibold text-slate-300">
              <MdOutlineMail />
              Email :
            </h1>
            <p className="text-neutral-400 underline">
              {profile.email || "Email"}
            </p>
          </div>
        </div>
        <div className="flex flex-col px-4 gap-2">
          <h1 className="text-base flex text-slate-300 font-semibold">
            <FcAbout />
            About me :
          </h1>
          <span className="border-2 rounded-md w-[400px] p-2 h-32 text-white">
            {profile.about || "About me"}
          </span>
        </div>
        <div className="flex justify-around mt-4">
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600"
          >
            Logout
          </button>
          <button
            onClick={() => navigate("/edit-profile")}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600"
          >
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
