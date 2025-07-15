import React, { useEffect } from "react";
import api from "../utils/api";
import useUserStore from "../store/useUserStore";

const Dashboard = () => {
  const { openAddPermitModal, permits, setPermits } = useUserStore();

  useEffect(() => {
    const fetchPermits = async () => {
      try {
        const token = useUserStore.getState().user?.token;
        if (!token) return;

        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        const res = await api.get("/permits");
        setPermits(res.data);
      } catch (err) {
        console.error("Failed to fetch permits:", err);
      }
    };

    fetchPermits();
  }, [setPermits]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this permit?")) {
      try {
        const token = useUserStore.getState().user?.token;

        await api.delete(`/permits/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setPermits(permits.filter((permit) => permit._id !== id));
      } catch (err) {
        alert("Failed to delete permit");
        console.error(err);
      }
    }
  };

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
        {permits.length > 0 ? (
          permits.map((permit) => (
            <li
              key={permit._id}
              className="border p-4 rounded shadow flex justify-between items-center"
            >
              <div>
                <strong>{permit.permitType}</strong> for {permit.country} —
                Deadline: {new Date(permit.deadline).toLocaleDateString()}
              </div>
              <button
                onClick={() => handleDelete(permit._id)}
                className="text-red-500 hover:text-red-700"
              >
                ❌ Delete
              </button>
            </li>
          ))
        ) : (
          <p>No permits found. Add one!</p>
        )}
      </ul>
    </div>
  );
};

export default Dashboard;
