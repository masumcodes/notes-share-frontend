import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ProfilePage from "./pages/ProfilePage";
import AboutPage from "./pages/AboutPage";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { authActions } from "./store/auth";
import EditProfile from "./pages/EditProfile";
import CreateNote from "./pages/CreateNote";
import ViewAllNotes from "./pages/ViewAllnotes";
import NoteById from "./pages/NoteById";
import Navbar from "./components/Nabvar";
import MyContents from "./pages/MyContents";
import UpdateNote from "./pages/Update";

const App = () => {
  const dispatch = useDispatch();
  const role = useSelector((state) => state.auth.role);

  useEffect(() => {
    const id = localStorage.getItem("id");
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (id && token && role) {
      dispatch(authActions.login());
      dispatch(authActions.changeRole(role));
    }
  }, [dispatch]);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/createnote" element={<CreateNote />} />
        <Route path="/viewallnotes" element={<ViewAllNotes />} />
        <Route path="/note/:id" element={<NoteById />} />
        <Route path="/mycontents" element={<MyContents />} />
        <Route path="/update-note/:id" element={<UpdateNote />} />
        <Route path="*" element={<h1>404 - Page Not Found</h1>} />
      </Routes>
    </>
  );
};

export default App;
