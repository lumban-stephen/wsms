const express = require('express');
const { Pool } = require('pg');
const router = express.Router();

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "wsms",
  password: "10000max",
  port: 5432,
  secretkey: "M23y?_+Sb[ynL`_WBpp2LOzbOct&rq"
});

// Get all announcements
router.get('/dept-announce', async (req, res) => {
    try {
      const allAnnouncements = await pool.query('SELECT * FROM announcements ORDER BY announcement_id DESC'); // Assuming your table is named 'announcements'
      res.json(allAnnouncements.rows);
    } catch (error) {
      console.error('Error fetching announcements:', error);
      res.status(500).json({ message: 'Server Error' }); // Handle errors appropriately
    }
  });

router.post('/dept-announce', async (req, res) => {
   try {
     const { title, message } = req.body; // Destructure title and body from request body
  
     const newAnnouncement = await pool.query(
       'INSERT INTO announcements (announcement_title, message) VALUES ($1, $2) RETURNING *',
       [title, message]
    );
  
     res.json(newAnnouncement.rows[0]); // Send the newly created announcement back to frontend
    } catch (error) {
     console.error('Error creating announcement:', error);
     res.status(500).json({ message: 'Server Error' }); // Handle errors appropriately
    }
  });

  module.exports = router;