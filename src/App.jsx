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
      window.location.pathname = "/login";
    });
  };

  return (
    <Router>
      <nav className="flex justify-center space-x-7 text-lg font-semibold p-2 bg-white">
        <Link
          to="/"
          className="text-black hover:text-gray-500 transition-colors duration-300"
        >
          Home
        </Link>

        {!isAuth ? (
          <Link
            to="/login"
            className="text-black hover:text-gray-500 transition-colors duration-300"
          >
            Login
          </Link>
        ) : (
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
        <Route path="/" element={<Home isAuth={isAuth} />} />
        <Route path="/createnote" element={<CreateNote isAuth={isAuth} />} />
        <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />
      </Routes>
    </Router>
  );
}

export default App;
