import React from 'react';

const EventCard = ({ event }) => {
  const title = event?.title || "Annual Tech Symposium 2026";
  const category = event?.category || "Workshop";
  const date = event?.date || "25 Oct 2026";
  const venue = event?.venue || "Main Auditorium";
  const description = event?.description || "Join us for an exciting series of tech talks, hands-on coding sessions, and project showcases.";

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition border border-gray-100 flex flex-col justify-between">
      <div className="p-5">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs font-semibold px-2.5 py-0.5 rounded bg-blue-100 text-blue-800">
            {category}
          </span>
          <span className="text-xs text-gray-500">{date}</span>
        </div>
        <h3 className="text-lg font-bold text-gray-800 mb-2">{title}</h3>
        <p className="text-sm text-gray-600 line-clamp-2 mb-3">{description}</p>
        <p className="text-xs text-gray-500 font-medium">📍 {venue}</p>
      </div>

      <div className="p-4 bg-gray-50 border-t border-gray-100">
        <button className="w-full bg-blue-600 text-white py-2 rounded-md text-sm font-semibold hover:bg-blue-700 transition">
          View Details
        </button>
      </div>
    </div>
  );
};

export default EventCard;