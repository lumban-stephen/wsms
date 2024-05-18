const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
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
router.get('/api/user', async (req, res) => {
    try {
      const userId = req.user.user_id; // Assuming user ID is stored in req.user.id
  
      if (!userId) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
  
      // SQL query to fetch user details
      const query = `
      SELECT a.*
      FROM applicants AS a
      INNER JOIN working_scholars AS ws ON ws.applicant_fk = a.applicant_id
      INNER JOIN users AS u ON u.user_id = ws.user_id
      WHERE u.user_id = $1;
    `;
  
      const result = await pool.query(query, [userId]);
  
      if (result.rows.length === 0) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      const userData = result.rows[0];
      res.json(userData);
    } catch (error) {
      console.error('Error fetching user data:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

module.exports = router;
