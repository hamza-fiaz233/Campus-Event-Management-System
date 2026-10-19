const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database Configuration
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'campus_event_db',
    password: 'admin123', // Aapka set kiya hua password
    port: 5432,
});

// Base Route
app.get('/', (req, res) => {
    res.send('Campus Event Management Backend is running, secure and connected to DB...');
});

// ==========================================
// 1. EVENTS CRUD APIs (Section 6)
// ==========================================

// GET ALL EVENTS (GET /api/events)
app.get('/api/events', async (req, res) => {
    try {
        const allEvents = await pool.query("SELECT * FROM events ORDER BY id DESC");
        res.json(allEvents.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// GET SINGLE EVENT BY ID (GET /api/events/:id)
app.get('/api/events/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const singleEvent = await pool.query("SELECT * FROM events WHERE id = \$1", [id]);
        
        if (singleEvent.rows.length === 0) {
            return res.status(404).json({ message: "Event not found!" });
        }
        res.json(singleEvent.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// CREATE NEW EVENT (POST /api/events)
app.post('/api/events', async (req, res) => {
    try {
        const { title, description, date, time, location, category, capacity } = req.body;
        const newEvent = await pool.query(
            "INSERT INTO events (title, description, date, time, location, category, capacity) VALUES(\$1, \$2, \$3, \$4, \$5, \$6, \$7) RETURNING *",
            [title, description, date, time, location, category, capacity]
        );
        res.json({ message: "Event created successfully!", event: newEvent.rows[0] });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// UPDATE AN EVENT (PUT /api/events/:id)
app.put('/api/events/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, date, time, location, category, capacity } = req.body;
        
        const updateEvent = await pool.query(
            "UPDATE events SET title = \$1, description = \$2, date = \$3, time = \$4, location = \$5, category = \$6, capacity = \$7 WHERE id = \$8 RETURNING *",
            [title, description, date, time, location, category, capacity, id]
        );

        if (updateEvent.rows.length === 0) {
            return res.status(404).json({ message: "Event not found to update!" });
        }
        res.json({ message: "Event was updated successfully!", event: updateEvent.rows[0] });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// DELETE AN EVENT (DELETE /api/events/:id)
app.delete('/api/events/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deleteEvent = await pool.query("DELETE FROM events WHERE id = \$1 RETURNING *", [id]);
        
        if (deleteEvent.rows.length === 0) {
            return res.status(404).json({ message: "Event not found to delete!" });
        }
        res.json({ message: "Event was deleted successfully!" });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// ==========================================
// 2. AUTHENTICATION APIs (Section 6)
// ==========================================

// USER SIGNUP (POST /api/signup)
app.post('/api/signup', async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        
        // Check if user already exists
        const userExist = await pool.query("SELECT * FROM users WHERE email = \$1", [email]);
        if (userExist.rows.length > 0) {
            return res.status(400).json({ message: "User already exists with this email!" });
        }

        // Insert new user
        const newUser = await pool.query(
            "INSERT INTO users (name, email, password, role) VALUES(\$1, \$2, \$3, \$4) RETURNING id, name, email, role",
            [name, email, password, role || 'student']
        );
        res.json({ message: "Registration successful!", user: newUser.rows[0] });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// USER LOGIN (POST /api/login)
app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await pool.query("SELECT * FROM users WHERE email = \$1", [email]);

        if (user.rows.length === 0 || user.rows[0].password !== password) {
            return res.status(401).json({ message: "Invalid Email or Password!" });
        }

        res.json({
            message: "Login successful!",
            user: {
                id: user.rows[0].id,
                name: user.rows[0].name,
                email: user.rows[0].email,
                role: user.rows[0].role
            }
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// ==========================================
// 3. STUDENT REGISTRATION APIs (Section 6)
// ==========================================

// REGISTER FOR AN EVENT (POST /api/register)
app.post('/api/register', async (req, res) => {
    try {
        const { user_id, event_id } = req.body;

        // Check if already registered
        const alreadyRegistered = await pool.query(
            "SELECT * FROM registrations WHERE user_id = \$1 AND event_id = \$2",
            [user_id, event_id]
        );
        if (alreadyRegistered.rows.length > 0) {
            return res.status(400).json({ message: "You are already registered for this event!" });
        }

        // Insert registration
        const newRegistration = await pool.query(
            "INSERT INTO registrations (user_id, event_id) VALUES(\$1, \$2) RETURNING *",
            [user_id, event_id]
        );
        res.json({ message: "Successfully registered for the event!", registration: newRegistration.rows[0] });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// GET ALL REGISTRATIONS WITH DETAILS (GET /api/registrations)
app.get('/api/registrations', async (req, res) => {
    try {
        const queryText = `
            SELECT r.id as registration_id, u.name as student_name, u.email, e.title as event_title, e.date, e.location 
            FROM registrations r
            JOIN users u ON r.user_id = u.id
            JOIN events e ON r.event_id = e.id
            ORDER BY r.id DESC
        `;
        const allRegistrations = await pool.query(queryText);
        res.json(allRegistrations.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// Server Listen
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
