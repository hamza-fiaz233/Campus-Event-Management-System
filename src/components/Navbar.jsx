import React from 'react';

const Navbar = () => {
  return (
    <nav style={{ padding: '1rem', background: '#282c34', color: 'white', display: 'flex', justifyContent: 'space-between' }}>
      <h2>Campus Event System</h2>
      <div>
        <a href="/" style={{ color: 'white', margin: '0 10px', textDecoration: 'none' }}>Home</a>
        <a href="/login" style={{ color: 'white', margin: '0 10px', textDecoration: 'none' }}>Login</a>
        <a href="/signup" style={{ color: 'white', margin: '0 10px', textDecoration: 'none' }}>Signup</a>
        <a href="/dashboard" style={{ color: 'white', margin: '0 10px', textDecoration: 'none' }}>Dashboard</a>
      </div>
    </nav>
  );
};

export default Navbar;