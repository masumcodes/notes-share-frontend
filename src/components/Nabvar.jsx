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

      <Link to="/" className=" w-36  rounded-lg  ">
        <img
          className="lg:h-10 h-8 rounded-lg w-32 lg:w-36 "
          src="Note.png"
          alt="logo"
        />
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
        } md:flex flex-col md:flex-row  items-center gap-4 absolute md:static  w-full md:w-auto top-14 left-0 md:top-auto md:left-auto shadow-md md:shadow-none`}
      >
        <Link
          to="/"
          className={`${getLinkClasses(
            "/"
          )}text-white py-2 font-bold text-lg hover:text-indigo-600 hover:scale-105 hover:duration-150 px-4 block md:inline-block`}
        >
          Home
        </Link>
        <Link
          to="/about"
          className={`${getLinkClasses(
            "/about"
          )}text-white py-2 font-bold text-lg px-4 block md:inline-block`}
        >
          AboutUs
        </Link>
        {isLoggedIn ? (
          <div>
            <Link
              to="/mycontents"
              className={`${getLinkClasses(
                "/note/mycontents"
              )} px-4 py-2 block font-bold text-lg md:inline-block  transition-all duration-300`}
            >
              MyContents
            </Link>

            <Link
              to="/profile"
              className={`${getLinkClasses(
                "/profile"
              )} px-4 py-2 block font-bold text-lg md:inline-block  transition-all duration-300`}
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
