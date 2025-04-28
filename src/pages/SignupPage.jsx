import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const SignUpPage = () => {
  const [Value, setValue] = useState({
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const change = (e) => {
    const { name, value } = e.target;
    setValue({ ...Value, [name]: value });
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      if (
        Value.username === "" ||
        Value.email === "" ||
        Value.password === ""
      ) {
        alert("Please fill all the fields");
      } else {
        const response = await axios.post(
          "http://localhost:3000/api/v1/user/sign-up",
          Value
        );
        alert(response.data.message);
        navigate("/login");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
          <h2 className="text-center text-3xl font-extrabold text-blue-900">
            Sign Up
          </h2>
          <form className="space-y-6" onSubmit={submit}>
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                value={Value.username}
                required
                onChange={change}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={Value.email}
                required
                onChange={change}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={Value.password}
                required
                onChange={change}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <button
                type="submit"
                className="w-full py-3 px-6 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Sign Up
              </button>
            </div>
          </form>

          <p className="text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 hover:text-blue-700">
              Login
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default SignUpPage;
