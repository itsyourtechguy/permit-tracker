import React from "react";
import useUserStore from "../store/useUserStore";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { user, logout, openAuthModal, openAddPermitModal } = useUserStore();

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };
  
  

  return (
    <header className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">Smart Permit Tracker</h1>
        <nav>
          <a href="/" className="mx-2 hover:underline">
            Home
          </a>

          {user ? (
            <>
              <a href="/dashboard" className="mx-2 hover:underline">
                Dashboard
              </a>
              <button
                onClick={openAddPermitModal}
                className="mx-2 hover:underline"
              >
                Add Permit
              </button>
              <button
                onClick={handleLogout}
                className="mx-2 bg-red-500 px-2 py-1 rounded hover:bg-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button onClick={openAuthModal} className="mx-2 hover:underline">
                Login
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
