import React, { useState } from "react";
import Modal from "./Modal";
import useUserStore from "../../store/useUserStore";
import api from "../../../src/utils/api";

const AddPermitModal = () => {
  const { isAddPermitModalOpen, closeAddPermitModal, setPermits } =
    useUserStore();

  const [country, setCountry] = useState("");
  const [permitType, setPermitType] = useState("");
  const [deadline, setDeadline] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = useUserStore.getState().user?.token;
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      await api.post("/permits", { country, permitType, deadline });
      const permitsRes = await api.get("/permits");
      setPermits(permitsRes.data);
      closeAddPermitModal();
    } catch (err) {
      alert("Failed to add permit");
      console.error(err);
    }
  };

  return (
    <Modal
      isOpen={isAddPermitModalOpen}
      onClose={closeAddPermitModal}
      title="Add Permit"
    >
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
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded w-full"
        >
          Save Permit
        </button>
      </form>
    </Modal>
  );
};

export default AddPermitModal;
