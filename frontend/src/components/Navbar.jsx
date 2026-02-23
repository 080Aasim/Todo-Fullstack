import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const { logout, token } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  return (
    <div className="border mb-2 flex justify-center gap-4 content-center p-1.5 rounded-xl">
      <Link
        to="/"
        className="border-2 border-blue-300 p-1 h-auto cursor-pointer rounded"
      >
        Home
      </Link>
      {!token && (
        <>
          <Link
            to="/login"
            className="border-2 border-blue-300 p-1 h-auto cursor-pointer rounded"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="border-2 border-blue-300 p-1 h-auto cursor-pointer rounded"
          >
            Register
          </Link>
        </>
      )}
      {token && (
        <>
          <button
            className="border-2 border-blue-300 p-1 h-auto cursor-pointer rounded"
            onClick={handleLogout}
          >
            Logout
          </button>
        </>
      )}
    </div>
  );
}

export default Navbar;
