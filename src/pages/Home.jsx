import React from 'react';
import EventCard from '../components/EventCard';

const Home = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Upcoming Campus Events</h1>
      <EventCard title="Tech Workshop 2026" date="Nov 15, 2026" description="Learn latest trends in Web Development and AI." />
      <EventCard title="Annual Sports Gala" date="Dec 01, 2026" description="Join us for inter-departmental sports activities." />
    </div>
  );
};

export default Home;