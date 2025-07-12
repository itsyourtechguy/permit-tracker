import React from 'react';
import useUserStore from '../../store/useUserStore';
import Modal from './Modal';

const RegisterModal = () => {
  const { isRegisterModalOpen, closeRegisterModal, login } = useUserStore();

  const handleRegister = () => {
    login({ name: "New User", email: "new@example.com" });
    closeRegisterModal();
  };

  return (
    <Modal isOpen={isRegisterModalOpen} onClose={closeRegisterModal} title="Register">
      <form onSubmit={(e) => { e.preventDefault(); handleRegister(); }}>
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
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Register
        </button>
      </form>
    </Modal>
  );
};

export default RegisterModal;