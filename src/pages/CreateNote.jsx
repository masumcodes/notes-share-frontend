import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateNote = () => {
  const navigate = useNavigate();

  const [formValues, setFormValues] = useState({
    name: "",
    description: "",
    file: null,
    price: "",
  });
  const [isFree, setIsFree] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormValues((prevValues) => ({ ...prevValues, file }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate price if the note is not free
    if (!isFree && (!formValues.price || formValues.price <= 0)) {
      alert("Please enter a valid price.");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("name", formValues.name);
    formData.append("description", formValues.description);
    formData.append("file", formValues.file);
    formData.append("isFree", isFree);
    if (!isFree) {
      formData.append("price", formValues.price);
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/note/add`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      alert(response.data.message);
      setFormValues({
        name: "",
        description: "",
        file: null,
        price: "",
      });
      setIsFree(true);

      navigate("/mycontents");
      document.getElementById("file-input").value = ""; // Reset file input
    } catch (error) {
      console.error(
        "Failed to create note:",
        error.response?.data?.message || error.message
      );
      alert(error.response?.data?.message || "Failed to create note.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Create Note</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Note Name
          </label>
          <input
            id="name"
            type="text"
            name="name"
            value={formValues.name}
            onChange={handleInputChange}
            placeholder="Enter note name"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formValues.description}
            onChange={handleInputChange}
            placeholder="Enter description"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            rows="4"
            required
          ></textarea>
        </div>
        <div className="mb-4">
          <label
            htmlFor="file-input"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Upload File
          </label>
          <input
            id="file-input"
            type="file"
            onChange={handleFileChange}
            className="w-full px-2 py-1 text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Pricing
          </label>
          <div className="flex items-center gap-4">
            <div className="flex items-center">
              <input
                type="radio"
                id="free"
                name="pricing"
                checked={isFree}
                onChange={() => {
                  setIsFree(true);
                  setFormValues((prevValues) => ({ ...prevValues, price: "" })); // Clear price when free is selected
                }}
                className="w-4 h-4 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="free" className="ml-2 text-gray-700">
                Free
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="price"
                name="pricing"
                checked={!isFree}
                onChange={() => setIsFree(false)}
                className="w-4 h-4 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="price" className="ml-2 text-gray-700">
                Price
              </label>
            </div>
          </div>
          {!isFree && (
            <div className="mt-2 flex items-center border border-gray-300 rounded-md focus-within:ring-2 focus-within:ring-blue-500">
              <span className="px-3 text-gray-500">₹</span>
              <input
                type="number"
                name="price"
                value={formValues.price}
                onChange={handleInputChange}
                placeholder="Enter price"
                min="0"
                className="flex-1 px-2 py-2 focus:outline-none"
                required={!isFree}
              />
            </div>
          )}
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Note"}
        </button>
      </form>
    </div>
  );
};

export default CreateNote;
