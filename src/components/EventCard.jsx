import React from 'react';

const EventCard = ({ title, date, description }) => {
  return (
    <div style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '16px', margin: '10px 0' }}>
      <h3>{title}</h3>
      <p><strong>Date:</strong> {date}</p>
      <p>{description}</p>
      <button style={{ padding: '8px 16px', background: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
        Register Event
      </button>
    </div>
  );
};

export default EventCard;