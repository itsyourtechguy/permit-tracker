import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import useUserStore from '../../store/useUserStore';
import api from '../../../src/utils/api';

const EditPermitModal = () => {
  const { currentPermit, isEditPermitModalOpen, closeEditPermitModal } = useUserStore();

  const [formData, setFormData] = useState({
    country: '',
    permitType: '',
    deadline: '',
  });

  useEffect(() => {
    if (currentPermit) {
      setFormData({
        country: currentPermit.country || '',
        permitType: currentPermit.permitType || '',
        deadline: currentPermit.deadline
          ? new Date(currentPermit.deadline).toISOString().split('T')[0]
          : '',
      });
    }
  }, [currentPermit]);

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!currentPermit?._id) {
      console.error("No valid permit");
      alert("Invalid permit selected.");
      return;
    }

    const { country, permitType, deadline } = formData;

    try {
      const token = useUserStore.getState().user?.token;

      await api.put(`/permits/${currentPermit._id}`, { country, permitType, deadline }, {
        headers: { Authorization: `Bearer ${token}` },
      });

      closeEditPermitModal();

      const res = await api.get('/permits');
      useUserStore.getState().setPermits(res.data);
    } catch (err) {
      console.error("Error updating permit:", err);
      alert("Failed to update permit");
    }
  };

  return (
    <Modal isOpen={isEditPermitModalOpen} onClose={closeEditPermitModal} title="Edit Permit">
      <form onSubmit={onSubmit}>
        <div className="mb-4">
          <label className="block mb-2">Country</label>
          <input
            type="text"
            name="country"
            value={formData.country}
            onChange={onChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Permit Type</label>
          <input
            type="text"
            name="permitType"
            value={formData.permitType}
            onChange={onChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Deadline</label>
          <input
            type="date"
            name="deadline"
            value={formData.deadline}
            onChange={onChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded w-full">
          Save Changes
        </button>
      </form>
    </Modal>
  );
};

export default EditPermitModal;