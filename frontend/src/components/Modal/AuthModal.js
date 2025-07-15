import React, { useState } from 'react';
import Modal from './Modal';
import useUserStore from '../../store/useUserStore';
import api, { setAuthToken } from '../../../src/utils/api';

const AuthModal = () => {
  const { isAuthModalOpen, closeAuthModal } = useUserStore();
  const { login } = useUserStore();

  const [isLoginView, setIsLoginView] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const { name, email, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', { email, password });
      setAuthToken(res.data.token); // Set token in headers
      login(res.data); // Update Zustand state
      closeAuthModal();
    } catch (err) {
      alert('Login failed');
      console.error(err);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/register', { name, email, password });
      setAuthToken(res.data.token); // Set token in headers
      login(res.data); // Update Zustand state
      closeAuthModal();
    } catch (err) {
      alert('Registration failed');
      console.error(err);
    }
  };

  return (
    <Modal isOpen={isAuthModalOpen} onClose={closeAuthModal} title={isLoginView ? "Login" : "Register"}>
      <div>
        {isLoginView ? (
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={onChange}
                placeholder="email"
                className="w-full border p-2 rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Password</label>
              <input
                type="password"
                name="password"
                placeholder="password"
                value={password}
                onChange={onChange}
                className="w-full border p-2 rounded"
                required
              />
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
              <label className="block mb-2">Name</label>
              <input
                type="text"
                name="name"
                placeholder="name"
                value={name}
                onChange={onChange}
                className="w-full border p-2 rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Email</label>
              <input
                type="email"
                name="email"
                placeholder="email"
                value={email}
                onChange={onChange}
                className="w-full border p-2 rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Password</label>
              <input
                type="password"
                name="password"
                placeholder="password"
                value={password}
                onChange={onChange}
                className="w-full border p-2 rounded"
                required
              />
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