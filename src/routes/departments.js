const express = require('express');
const { Pool } = require('pg');

const router = express.Router();

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "wsms",
  password: "10000max",
  port: 5432,
  // Consider removing secret key from here (store in environment variables)
  // secretkey: "M23y?_+Sb[ynL`_WBpp2LOzbOct&rq"
});

// Get all departments
router.get('/departments', async (req, res) => {
  try {
    const allDepartments = await pool.query('SELECT * FROM departments'); // Replace with your department table name
    res.json(allDepartments.rows);
  } catch (error) {
    console.error('Error fetching departments:', error);
    res.status(500).json({ message: 'Server Error' }); // Handle errors appropriately
  }
});

async function fetchDeptRequests(pool) {
  try {
    const deptRequests = await pool.query(
      'SELECT * FROM ws_requests WHERE ws_req_stat = $1',
      ['waiting']
    );
    return deptRequests.rows;
  } catch (error) {
    console.error('Error fetching department requests:', error);
    throw error; // Re-throw the error for proper handling in the main handler
  }
}

module.exports = {
  fetchDepartments,
  fetchDeptRequests, // Export the fetchDeptRequests function
};

// Removed redundant export of router (router is already exported by express.Router())
