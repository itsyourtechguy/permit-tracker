import React, { useState } from 'react';
import useUserStore from '../../store/useUserStore';
import Modal from './Modal';

const AuthModal = () => {
  const { isAuthModalOpen, closeAuthModal, login } = useUserStore();

  const [isLoginView, setIsLoginView] = useState(true);

  const handleLogin = (e) => {
    e.preventDefault();
    login({ name: "Jane Doe", email: "jane@example.com" });
    closeAuthModal();
  };

  const handleRegister = (e) => {
    e.preventDefault();
    login({ name: "New User", email: "new@example.com" });
    closeAuthModal();
  };

  return (
    <Modal isOpen={isAuthModalOpen} onClose={closeAuthModal} title={isLoginView ? "Login" : "Register"}>
      <div>
        {isLoginView ? (
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block mb-2">Email</label>
              <input type="email" required className="w-full border p-2 rounded" />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Password</label>
              <input type="password" required className="w-full border p-2 rounded" />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded w-full hover:bg-blue-600"
            >
              Login
            </button>
          </form>
        ) : (
          <form onSubmit={handleRegister}>
            <div className="mb-4">
              <label className="block mb-2">Email</label>
              <input type="email" required className="w-full border p-2 rounded" />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Password</label>
              <input type="password" required className="w-full border p-2 rounded" />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded w-full hover:bg-blue-600"
            >
              Register
            </button>
          </form>
        )}

        <p className="text-center mt-4 text-sm">
          {isLoginView ? "Don't have an account?" : "Already have an account?"}
          <button
            onClick={() => setIsLoginView(!isLoginView)}
            className="text-blue-500 ml-1 underline"
          >
            {isLoginView ? "Register" : "Login"}
          </button>
        </p>
      </div>
    </Modal>
  );
};

export default AuthModal;