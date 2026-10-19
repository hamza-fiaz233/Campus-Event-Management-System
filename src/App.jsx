import React, { useState, useEffect } from 'react';

function App() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Form States for manual scheduling
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState('Workshop');
  const [capacity, setCapacity] = useState('');
  
  // Status messages
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  // Fetch all events function
  const fetchEvents = () => {
    fetch('http://localhost:5000/api/events')
      .then((res) => res.json())
      .then((data) => {
        setEvents(data);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // Handle Form Submission (Manual Scheduling)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setIsError(false);

    const eventData = { title, description, date, time, location, category, capacity: parseInt(capacity) };

    try {
      const response = await fetch('http://localhost:5000/api/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(eventData)
      });

      const data = await response.json();

      if (!response.ok) {
        // Agar event already scheduled hoga toh backend error message dega
        setIsError(true);
        setMessage(data.message);
      } else {
        // Success execution
        setIsError(false);
        setMessage("Success: Event scheduled perfectly!");
        fetchEvents(); // Refresh database cards immediately
        
        // Reset form inputs
        setTitle(''); setDescription(''); setDate(''); setTime(''); setLocation(''); setCapacity('');
      }
    } catch (error) {
      setIsError(true);
      setMessage("Server connection error.");
    }
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#f4f6f7', minHeight: '100vh' }}>
      {/* Navbar */}
      <nav style={{ backgroundColor: '#2c3e50', padding: '15px 30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#fff' }}>
        <h1 style={{ margin: 0, fontSize: '24px' }}>Campus Event System</h1>
        <div><span>Home</span></div>
      </nav>

      <div style={{ display: 'flex', flexWrap: 'wrap', padding: '30px', gap: '30px' }}>
        
        {/* Left Side: Manual Event Scheduling Form */}
        <div style={{ flex: '1', minWidth: '350px', backgroundColor: '#fff', padding: '25px', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', height: 'fit-content' }}>
          <h2 style={{ color: '#2c3e50', marginTop: 0 }}>Schedule New Event</h2>
          
          {message && (
            <div style={{ padding: '10px', borderRadius: '4px', marginBottom: '15px', color: '#fff', fontWeight: 'bold', backgroundColor: isError ? '#e74c3c' : '#2ecc71' }}>
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '12px' }}>
              <label>Event Title:</label>
              <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required style={{ width: '100%', padding: '8px', marginTop: '5px', borderRadius: '4px', border: '1px solid #ccc' }} />
            </div>
            <div style={{ marginBottom: '12px' }}>
              <label>Description:</label>
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} required style={{ width: '100%', padding: '8px', marginTop: '5px', borderRadius: '4px', border: '1px solid #ccc', height: '60px' }} />
            </div>
            <div style={{ marginBottom: '12px', display: 'flex', gap: '10px' }}>
              <div style={{ flex: 1 }}>
                <label>Date:</label>
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required style={{ width: '100%', padding: '8px', marginTop: '5px', borderRadius: '4px', border: '1px solid #ccc' }} />
              </div>
              <div style={{ flex: 1 }}>
                <label>Time:</label>
                <input type="time" value={time} onChange={(e) => setTime(e.target.value)} required style={{ width: '100%', padding: '8px', marginTop: '5px', borderRadius: '4px', border: '1px solid #ccc' }} />
              </div>
            </div>
            <div style={{ marginBottom: '12px' }}>
              <label>Location:</label>
              <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} required style={{ width: '100%', padding: '8px', marginTop: '5px', borderRadius: '4px', border: '1px solid #ccc' }} />
            </div>
            <div style={{ marginBottom: '12px', display: 'flex', gap: '10px' }}>
              <div style={{ flex: 1 }}>
                <label>Category:</label>
                <select value={category} onChange={(e) => setCategory(e.target.value)} style={{ width: '100%', padding: '8px', marginTop: '5px', borderRadius: '4px', border: '1px solid #ccc' }}>
                  <option value="Workshop">Workshop</option>
                  <option value="Sports">Sports</option>
                  <option value="Seminar">Seminar</option>
                  <option value="Competition">Competition</option>
                </select>
              </div>
              <div style={{ flex: 1 }}>
                <label>Capacity:</label>
                <input type="number" value={capacity} onChange={(e) => setCapacity(e.target.value)} required style={{ width: '100%', padding: '8px', marginTop: '5px', borderRadius: '4px', border: '1px solid #ccc' }} />
              </div>
            </div>
            <button type="submit" style={{ width: '100%', backgroundColor: '#2c3e50', color: '#fff', border: 'none', padding: '12px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', fontSize: '16px' }}>
              Schedule Event
            </button>
          </form>
        </div>

        {/* Right Side: Live Event Feed */}
        <div style={{ flex: '2', minWidth: '450px' }}>
          <h2 style={{ color: '#2c3e50', marginTop: 0 }}>Live Campus Events</h2>
          {loading ? (
            <p>Loading records...</p>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px' }}>
              {events.map((event) => (
                <div key={event.id} style={{ backgroundColor: '#fff', borderLeft: '5px solid #3498db', borderRadius: '6px', padding: '20px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
                  <span style={{ backgroundColor: '#e8f4fd', color: '#3498db', padding: '3px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold' }}>{event.category}</span>
                  <h3 style={{ margin: '10px 0 5px 0', color: '#2c3e50' }}>{event.title}</h3>
                  <p style={{ color: '#7f8c8d', fontSize: '14px', marginTop: 0 }}>{event.description}</p>
                  <div style={{ fontSize: '13px', color: '#555', display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
                    <span>📍 {event.location}</span>
                    <span>📅 {new Date(event.date).toLocaleDateString()}</span>
                    <span>⏰ {event.time}</span>
                    <span>👥 Seats: {event.capacity}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default App;
