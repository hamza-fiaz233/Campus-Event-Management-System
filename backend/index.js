// CREATE NEW EVENT WITH DUPLICATION VALIDATION (POST /api/events)
app.post('/api/events', async (req, res) => {
    try {
        const { title, description, date, time, location, category, capacity } = req.body;

        // Validation Rule: Check if event with same title AND date already exists
        const checkEvent = await pool.query(
            "SELECT * FROM events WHERE LOWER(title) = LOWER(\$1) AND date = \$2",
            [title, date]
        );

        if (checkEvent.rows.length > 0) {
            return res.status(400).json({ message: "This event is already scheduled on this date!" });
        }

        // Insert fresh event if no duplicate found
        const newEvent = await pool.query(
            "INSERT INTO events (title, description, date, time, location, category, capacity) VALUES(\$1, \$2, \$3, \$4, \$5, \$6, \$7) RETURNING *",
            [title, description, date, time, location, category, capacity]
        );
        res.json({ message: "Event scheduled successfully!", event: newEvent.rows[0] });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});
