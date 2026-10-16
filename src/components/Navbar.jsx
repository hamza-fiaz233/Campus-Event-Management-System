import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0 flex items-center">
            <h1 className="text-xl font-bold">Campus Events</h1>
          </div>
          <div className="hidden md:flex space-x-6">
            <a href="/" className="hover:text-blue-200 transition">Home</a>
            <a href="/events" className="hover:text-blue-200 transition">Events</a>
            <a href="/dashboard" className="hover:text-blue-200 transition">Dashboard</a>
          </div>
          <div className="flex items-center space-x-3">
            <a href="/login" className="px-4 py-2 border border-white text-white rounded-md hover:bg-white hover:text-blue-600 transition text-sm font-medium">
              Login
            </a>
            <a href="/signup" className="px-4 py-2 bg-white text-blue-600 rounded-md text-sm font-semibold hover:bg-gray-100 transition">
              Sign Up
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;