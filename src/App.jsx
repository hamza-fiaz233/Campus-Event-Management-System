import React from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import EventCard from './components/EventCard';

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <main className="flex-grow max-w-7xl mx-auto px-4 py-8 w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Featured Events</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <EventCard />
          <EventCard />
          <EventCard />
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;