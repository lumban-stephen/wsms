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
router.use(bodyParser.json());


router.post('/reqws', async (req, res) => {
    try {
      const {
        ws_req_name,
        message,
        dept_name_fk,
        ws_req_stat,
        ws_req_type,
      } = req.body;
  
      // Check if required fields are present
      if (!ws_req_name || !message || !dept_name_fk || !ws_req_stat || !ws_req_type) {
        return res.status(400).json({ error: 'Missing required fields' });
      }
  
      // Get the department ID from the departments table
      const departmentQuery = 'SELECT dept_id FROM departments WHERE dept_name = $1';
      const departmentValues = [dept_name_fk];
      const departmentResult = await pool.query(departmentQuery, departmentValues);
  
      if (departmentResult.rows.length === 0) {
        return res.status(404).json({ error: 'Department not found' });
      }
  
      const dept_fk = departmentResult.rows[0].dept_id;
  
      // Insert the new working scholar request into the ws_requests table
      const query =
        'INSERT INTO ws_requests (ws_req_name, message, dept_fk, ws_req_stat, ws_req_type) VALUES ($1, $2, $3, $4, $5) RETURNING *';
      const values = [
        ws_req_name,
        message,
        dept_fk,
        ws_req_stat,
        ws_req_type,
      ];
      const result = await pool.query(query, values);
  
      res.status(201).json(result.rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  module.exports = router;