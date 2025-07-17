import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Smart Permit Tracker for Freelancers & Digital Nomads
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto">
            Track visas, residence permits, and tax deadlines across countries.
            Never miss a deadline again.
          </p>
          <button
            onClick={() => navigate('/dashboard')}
            className="bg-white text-blue-600 px-6 py-3 rounded-lg shadow hover:bg-blue-50 transition"
          >
            Go to Dashboard
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 grid md:grid-cols-3 gap-10">
          <div className="text-center p-6 border rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-2">Track Permits</h3>
            <p>Keep track of digital nomad visas, work permits, and more.</p>
          </div>
          <div className="text-center p-6 border rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-2">Deadline Reminders</h3>
            <p>Get timely reminders so you never miss a renewal date.</p>
          </div>
          <div className="text-center p-6 border rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-2">AI-Powered Help</h3>
            <p>Get smart suggestions for forms, documents, and country-specific tips.</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-100 text-center">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-4">Ready to stay organized?</h2>
          <p className="mb-6">Start tracking your permits today — free forever for freelancers.</p>
          <button
            onClick={() => navigate('/dashboard')}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Get Started
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;