const express = require('express');
const router = express.Router();
const { Pool } = require('pg');
const bodyParser = require('body-parser');

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

router.get('/requests/:userDept', async (req, res) => {
  const { userDept } = req.params; // Destructure userDept from params
  console.log("dept fk is : " + userDept)

  if (!userDept) {
    return res.status(400).json({ error: 'Missing department information' }); // Handle missing data
  }

  try {
    const query = `
      SELECT * 
      FROM ws_requests 
      WHERE dept_name_fk = $1
      ORDER BY ws_req_id ASC;
    `;
    const values = [userDept];

    const result = await pool.query(query, values);

    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/deptreq', async (req, res) => {
    try {
      const {
        ws_req_name,
        message,
        dept_fk,
        ws_req_stat,
        ws_req_type,
        quantity
      } = req.body;
  
      const currentDate = Date.now();
      // Check if required fields are present
      if (!ws_req_name || !message || !dept_fk || !ws_req_stat || !ws_req_type || !quantity) {
        return res.status(400).json({ error: 'Missing required fields' });
      }
  
      // Insert the new working scholar request into the ws_requests table
      const query =
        'INSERT INTO ws_requests (ws_req_name, message, dept_name_fk, ws_req_stat, ws_req_type, quantity, date_created) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *';
      const values = [
        ws_req_name,
        message,
        dept_fk,
        ws_req_stat,
        ws_req_type,
        quantity,
        new Date(currentDate)
      ];
      const result = await pool.query(query, values);
  
      res.status(201).json(result.rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  module.exports = router;