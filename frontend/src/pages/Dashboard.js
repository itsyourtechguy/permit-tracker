import React, { useEffect, useState } from 'react';
import useUserStore from '../store/useUserStore';
import api from '../utils/api';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [permits, setPermits] = useState([]);
  const [loading, setLoading] = useState(true);
  const { openAddPermitModal } = useUserStore();
  const navigate = useNavigate();

  // Fetch permits
  useEffect(() => {
    const fetchPermits = async () => {
      try {
        const token = useUserStore.getState().user?.token;
        if (!token) {
          navigate('/'); // Redirect if not logged in
          return;
        }

        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        const res = await api.get('/permits');
        setPermits(res.data);
      } catch (err) {
        console.error('Failed to fetch permits:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPermits();
  }, [navigate]);

  // Dummy AI suggestion
  const aiSuggestion = "💡 Pro Tip: Portugal offers a 1-year digital nomad visa. Apply 2 months before expiry.";

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Your Permit Dashboard</h1>
          <button
            onClick={openAddPermitModal}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            + Add Permit
          </button>
        </div>

        {/* AI Suggestion Card */}
        <div className="bg-yellow-100 text-yellow-800 p-4 rounded-lg mb-8">
          {aiSuggestion}
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow flex flex-col items-center">
            <h3 className="text-lg font-semibold">Total Permits</h3>
            <p className="text-3xl font-bold">{permits.length}</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow flex flex-col items-center">
            <h3 className="text-lg font-semibold">Expiring Soon</h3>
            <p className="text-3xl font-bold">
              {permits.filter(p => new Date(p.deadline) < new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)).length}
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow flex flex-col items-center">
            <h3 className="text-lg font-semibold">Upcoming Deadlines</h3>
            <p className="text-3xl font-bold">
              {permits.filter(p => new Date(p.deadline) > new Date()).length}
            </p>
          </div>
        </div>

        {/* Permit List */}
        <h2 className="text-2xl font-semibold mb-4">Your Permits</h2>
        {loading ? (
          <p>Loading permits...</p>
        ) : permits.length === 0 ? (
          <div className="bg-white p-6 rounded-lg shadow text-center">
            <p className="text-gray-600">No permits yet. Click “+ Add Permit” to get started.</p>
          </div>
        ) : (
          <ul className="space-y-4">
            {permits.map((permit) => (
              <li key={permit._id} className="bg-white p-4 rounded-lg shadow flex justify-between items-center">
                <div>
                  <strong>{permit.permitType}</strong> for {permit.country} —{' '}
                  <span className="text-gray-600">
                    Deadline: {new Date(permit.deadline).toLocaleDateString()}
                  </span>
                </div>
                <div className="space-x-2">
                  <button
                    onClick={() => useUserStore.setState({ currentPermit: permit, isEditPermitModalOpen: true })}
                    className="text-blue-500 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={async () => {
                      if (window.confirm('Delete this permit?')) {
                        try {
                          await api.delete(`/permits/${permit._id}`, {
                            headers: { Authorization: `Bearer ${useUserStore.getState().user?.token}` },
                          });
                          const res = await api.get('/permits');
                          useUserStore.getState().setPermits(res.data);
                        } catch (err) {
                          alert('Failed to delete permit.');
                          console.error(err);
                        }
                      }
                    }}
                    className="text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Dashboard;