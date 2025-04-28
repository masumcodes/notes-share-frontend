import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
// import { useLocation } from "react-router-dom";

const HomePage = () => {
  // const location = useLocation();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  return (
    <div className="min-h-screen pt-5  bg-gradient-to-tr from-black to-zinc-700 flex flex-col justify-between">
      <div className="bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]">
        {/* Hero Section */}
        <section className="w-full h-auto lg:h-[700px]  ">
          <div className="flex flex-col lg:flex-row justify-between items-center lg:items-end p-4">
            <div className="relative z-10 flex flex-col items-center justify-center text-center text-white px-4 py-10 sm:py-20 w-full lg:w-1/2">
              <div className="tracking-wide flex flex-col sm:flex-row text-shadow-lg mb-4 space-y-2 sm:space-y-0 sm:space-x-2 text-3xl sm:text-4xl lg:text-5xl">
                <span className="font-bold text-[rgb(196,52,39)]">
                  Discover.
                </span>
                <h1 className="lg:text-7xl">&</h1>
                <span className="font-bold">Organize</span>
              </div>

              <div className="border-2 flex justify-end sm:ml-20 ml-6 p-4 border-dashed mb-4 -rotate-12 sm:scale-100 scale-90">
                <div>
                  <span className="text-yellow-300 text-4xl sm:text-5xl lg:text-6xl font-bold">
                    Quality*
                  </span>

                  <span className="text-purple-500 text-4xl sm:text-5xl lg:text-6xl font-bold">
                    Notes!
                  </span>
                </div>
                <img
                  src="cursor.png"
                  className="absolute mt-12"
                  width={50}
                  alt=""
                />
              </div>

              <div className="mt-10 sm:mt-20 px-2">
                <p className="text-base sm:text-lg md:text-xl max-w-xl mx-auto mb-6 text-center">
                  Find exactly what you need to ace your exams. Upload your own
                  notes and turn your knowledge into income!
                </p>
              </div>

              {isLoggedIn ? (
                <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 w-full items-center sm:items-start justify-center">
                  <Link
                    className="bg-gradient-to-br from-[rgb(197,27,12)] to-[rgb(226,84,71)] text-white py-3 px-8 rounded-3xl shadow-lg hover:bg-yellow-500 transition-all duration-300 text-center"
                    to="/createnote"
                  >
                    Create a New Note
                  </Link>
                  <Link
                    to="/viewallnotes"
                    className="text-[rgb(196,52,39)] py-3 px-8 rounded-3xl border-2 border-[rgb(196,52,39)] shadow-md hover:bg-blue-50 transition-all duration-300 text-center"
                  >
                    View Notes
                  </Link>
                </div>
              ) : (
                <div className="gap-3 justify-center   flex flex-col sm:flex-row w-full items-center sm:items-stretch">
                  <Link
                    to="/login"
                    className="w-full sm:w-auto py-3 px-6 bg-blue-600 text-white text-lg font-semibold rounded-2xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-center"
                  >
                    Log In
                  </Link>
                  <Link
                    to="/signup"
                    className="w-full sm:w-auto py-3 px-8 border-2 text-lg text-white font-semibold rounded-2xl hover:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-center"
                  >
                    SignUp
                  </Link>
                </div>
              )}
            </div>

            <div className="relative mt-10 sm:mt-20 w-64 h-64 sm:w-96 sm:h-96 lg:w-[500px] lg:h-[500px] overflow-hidden bg-gradient-to-bl from-fuchsia-500 to-violet-700 shadow-white shadow-lg rounded-full flex items-end justify-center border-2 border-dashed">
              <img
                src="paper-plane.png"
                alt="increase"
                className="absolute hover:scale-110 w-20  duration-300  lg:ml-44   top-20 left-10"
              />
              <div className="absolute top-10 lg:top-48 lg:left-3  flex-col flex justify-center">
                <h1 className="text-yellow-500 lg:ml-4  font-semibold lg:text-2xl">
                  {" "}
                  Turning study time into
                </h1>
                <h2 className="text-white lg:ml-32 lg:text-xl">
                  {" "}
                  Side income💰
                </h2>
              </div>
              <img
                src="girl.png"
                alt="girl"
                className="h-48 sm:h-72 lg:h-[330px] hover:scale-110 duration-500 object-cover"
              />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className=" py-16 px-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-12 text-blue-900">
            Features
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            <div className="bg-blue-100 p-6 rounded-xl shadow-lg hover:scale-105 transition-all duration-300">
              <h3 className="text-lg sm:text-xl font-semibold text-blue-800 mb-4">
                Organize Your Notes
              </h3>
              <p className="text-gray-700">
                Effortlessly categorize and organize your notes for quick
                access. Stay productive with our intuitive interface.
              </p>
            </div>
            <div className="bg-blue-100 p-6 rounded-xl shadow-lg hover:scale-105 transition-all duration-300">
              <h3 className="text-lg sm:text-xl font-semibold text-blue-800 mb-4">
                Secure Cloud Storage
              </h3>
              <p className="text-gray-700">
                All your notes are safely stored in the cloud, ensuring you can
                access them anytime, anywhere.
              </p>
            </div>
            <div className="bg-blue-100 p-6 rounded-xl shadow-lg hover:scale-105 transition-all duration-300">
              <h3 className="text-lg sm:text-xl font-semibold text-blue-800 mb-4">
                Easy Sharing
              </h3>
              <p className="text-gray-700">
                Share your notes effortlessly with friends or colleagues, and
                collaborate on ideas in real-time.
              </p>
            </div>
          </div>
        </section>

        {/* Footer Section */}
        <footer className="bg-blue-800 text-white text-center py-4 mt-12">
          <p>&copy; 2024 NoteShare | All Rights Reserved</p>
        </footer>
      </div>
    </div>
  );
};

export default HomePage;
