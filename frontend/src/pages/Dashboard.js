import React from "react";
import useUserStore from "../store/useUserStore";

const Dashboard = () => {
  const mockPermits = [
    {
      id: 1,
      country: "Portugal",
      type: "Digital Nomad Visa",
      deadline: "2025-03-15",
    },
    { id: 2, country: "Thailand", type: "Non-B Visa", deadline: "2025-04-01" },
  ];

  const { openAddPermitModal } = useUserStore();

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Your Permits</h2>
        <button
          onClick={openAddPermitModal}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          + Add New Permit
        </button>
      </div>

      <ul className="space-y-4">
        {mockPermits.map((permit) => (
          <li key={permit.id} className="border p-4 rounded shadow">
            <strong>{permit.type}</strong> for {permit.country} — Deadline:{" "}
            {permit.deadline}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
