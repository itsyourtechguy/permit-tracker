import React from 'react';

const Home = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Welcome to Smart Permit Tracker</h1>
      <p className="mb-4">Track visa deadlines, permits, and taxes across countries.</p>
      <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Get Started
      </button>
    </div>
  );
};

export default Home;