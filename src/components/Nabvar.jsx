import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";

function Navbar() {
  const location = useLocation();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [menuOpen, setMenuOpen] = useState(false); // State to toggle mobile menu

  const getLinkClasses = (path) => {
    return location.pathname === path
      ? "text-blue-500 font-bold"
      : "hover:text-blue-500 transition-all duration-300";
  };

  return (
    <nav className=" h-16 z-50 bg-black inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]  fixed w-full  text-white lg:px-8 px-3 py-6 flex items-center justify-between">
      {/* Logo */}

      <Link to="/" className=" w-36  flex gap-1  rounded-lg  ">
        <h1 className="text-lg font-bold text-red-700">Note</h1>
        <h2 className="text-base font-semibold mt-2 text-violet-800">Share</h2>
      </Link>

      {/* Hamburger Menu for Mobile */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="text-white text-2xl md:hidden block focus:outline-none"
      >
        ☰
      </button>

      {/* Links */}

      <div
        className={`${
          menuOpen ? "block" : "hidden"
        } md:flex flex-col md:flex-row md:bg-transparent bg-slate-600 italic  gap-4 absolute md:static  w-50% md:w-auto top-14 left-2/3 md:top-auto md:left-auto shadow-md md:shadow-none`}
      >
        <Link
          to="/"
          className={`${getLinkClasses(
            "/"
          )}text-white py-2 font-bold text-base hover:text-indigo-600 hover:scale-105 hover:duration-150 px-4 block md:inline-block`}
        >
          Home
        </Link>
        <Link
          to="/about"
          className={`${getLinkClasses(
            "/about"
          )}text-white py-2 font-bold text-base px-4 block md:inline-block`}
        >
          AboutUs
        </Link>
        {isLoggedIn ? (
          <div>
            <Link
              to="/mycontents"
              className={`${getLinkClasses(
                "/note/mycontents"
              )} px-4 py-2 block font-bold text-base md:inline-block  transition-all duration-300`}
            >
              MyContents
            </Link>

            <Link
              to="/profile"
              className={`${getLinkClasses(
                "/profile"
              )} px-4 py-2 block font-bold text-base md:inline-block  transition-all duration-300`}
            >
              Profile
            </Link>
          </div>
        ) : (
          <>
            <Link
              to="/login"
              className={`${getLinkClasses(
                "/login"
              )} px-4 py-2 block md:inline-block border border-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300`}
            >
              LogIn
            </Link>
            <Link
              to="/signup"
              className={`${getLinkClasses(
                "/signup"
              )} px-4 py-2 block md:inline-block bg-blue-500 text-white rounded hover:bg-white hover:text-zinc-800 transition-all duration-300`}
            >
              SignUp
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
