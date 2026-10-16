import React from 'react';
import EventCard from '../components/EventCard';

const Home = () => {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="bg-blue-600 text-white rounded-2xl p-8 text-center shadow-lg">
        <h1 className="text-4xl font-extrabold mb-3">Welcome to Campus Events</h1>
        <p className="text-blue-100 text-lg max-w-2xl mx-auto">
          Discover, register, and organize amazing events happening across your university campus.
        </p>
      </div>

      {/* Featured Events Section */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Upcoming Events</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <EventCard />
          <EventCard />
          <EventCard />
        </div>
      </div>
    </div>
  );
};

export default Home;