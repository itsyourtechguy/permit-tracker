import React, { useState } from 'react';
import useUserStore from '../../store/useUserStore';
import Modal from './Modal';

const AddPermitModal = () => {
  const { isAddPermitModalOpen, closeAddPermitModal } = useUserStore();
  const [country, setCountry] = useState('');
  const [permitType, setPermitType] = useState('');
  const [deadline, setDeadline] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ country, permitType, deadline });
    alert('Permit added!');
    closeAddPermitModal();
  };

  return (
    <Modal isOpen={isAddPermitModalOpen} onClose={closeAddPermitModal} title="Add Permit">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2">Country</label>
          <input
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Permit Type</label>
          <input
            type="text"
            value={permitType}
            onChange={(e) => setPermitType(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Deadline</label>
          <input
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Save Permit
        </button>
      </form>
    </Modal>
  );
};

export default AddPermitModal;