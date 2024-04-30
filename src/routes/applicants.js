const express = require('express');
const router = express.Router();
const { Pool } = require('pg');

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "wsms",
    password: "10000max",
    port: 5432,
    secretkey: "M23y?_+Sb[ynL`_WBpp2LOzbOct&rq"
  });

// Middleware to parse JSON request bodies
router.use(express.json());

// Endpoint to get all applicants
router.get('/maintain-applicants', async (req, res) => {
    try {
      const query = `
        SELECT a.*, CONCAT(n.fname, ' ', n.lname) AS full_name
        FROM applicants a
        INNER JOIN names n ON a.name_fk = n.name_id;
      `;
      const { rows } = await pool.query(query);
      res.json(rows);
    } catch (error) {
      console.error('Error fetching applicants:', error);
      res.status(500).json({ error: 'An error occurred while fetching applicants' });
    }
  });

  router.post('/maintain-applicants', async (req, res) => {
    try {
      const { applicant_fk } = req.body;
  
      // Database connection logic (replace with your actual database interaction)
      const database = await connectToDatabase(); // Replace with your connection logic
      const result = await database.query(
        'INSERT INTO working_scholars (applicant_fk) VALUES ($1)',
        [applicant_fk]
      );
  
      if (result.rowCount === 1) {
        res.status(201).json({ message: 'Applicant added to working scholars successfully!' });
      } else {
        res.status(500).json({ message: 'Error adding applicant to working scholars' });
      }
    } catch (error) {
      console.error('Error adding working scholar:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

module.exports = router;
