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

module.exports = router;
