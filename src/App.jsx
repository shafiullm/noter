import "./App.css";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import CreateNote from "./pages/CreateNote";
import Login from "./pages/Login";
import { signOut } from "firebase/auth";
import { auth } from "./firebase-config";

function App() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));

  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
      window.location.pathname = "/";
    });
  };

  return (
    <Router>
      <nav className="flex justify-center space-x-7 text-xl font-semibold p-2 bg-white">
        <Link
          to=""
          className="text-black hover:text-gray-500 transition-colors duration-300"
        >
          {isAuth ? (
            "Notes"
          ) : (
            <img
              src="favicon_io\noter-logo.png"
              alt="Noter"
              className="h-10"
              style={{ cursor: "default" }} // You can adjust the size as needed
            />
          )}
        </Link>

        {isAuth && (
          <>
            <Link
              to="/createnote"
              className="text-black hover:text-gray-500 transition-colors duration-300"
            >
              Create Note
            </Link>
            <button
              onClick={signUserOut}
              className="text-black hover:text-gray-500 transition-colors duration-300"
            >
              Logout
            </button>
          </>
        )}
      </nav>
      <Routes>
        <Route
          path="/"
          element={<Home isAuth={isAuth} setIsAuth={setIsAuth} />}
        />
        <Route path="/createnote" element={<CreateNote isAuth={isAuth} />} />
        <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />
      </Routes>
    </Router>
  );
}

export default App;
