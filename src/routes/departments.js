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

router.post('/api/departments', async (req, res) => {
  const { departmentName, departmentAdmin, deptContact, deptEmail } = req.body;

  try {
    // Insert the department data into the database
    const query = `
      INSERT INTO departments (department_name, ws_count, employee_count, access_lvl, contact, dept_email)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;
    `;

    // Assuming access_lvl has a default value or is set elsewhere
    const values = [departmentName, 0, 0, null, deptContact, deptEmail]; // Set ws_count and employee_count to 0 initially

    const result = await pool.query(query, values);

    // Return the newly created department
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error inserting department:', error);
    res.status(500).json({ error: 'An error occurred while adding the department.' });
  }
});


// Get department details by ID
router.get('/departments/:departmentId', async (req, res) => {
  const departmentId = parseInt(req.params.departmentId);

  try {
    const departmentDetails = await pool.query(
      'SELECT * FROM departments WHERE department_id = $1',
      [departmentId]
    );

    if (departmentDetails.rows.length === 0) {
      return res.status(404).json({ message: 'Department not found' });
    }

    res.json(departmentDetails.rows[0]);
  } catch (error) {
    console.error('Error fetching department details:', error);
    res.status(500).json({ message: 'Server Error' }); // Handle errors appropriately
  }
});

// Get department requests by department ID (assuming separate table for requests)
router.get('/departments/:departmentId/requests', async (req, res) => {
  const departmentId = parseInt(req.params.departmentId);

  try {
    const departmentRequests = await pool.query(
      'SELECT * FROM ws_requests WHERE department_id = $1',
      [departmentId]
    );

    res.json(departmentRequests.rows);
  } catch (error) {
    console.error('Error fetching department requests:', error);
    res.status(500).json({ message: 'Server Error' }); // Handle errors appropriately
  }
});

async function fetchDeptRequests(pool) {
  // This function can be removed or modified based on your actual usage
}

// Get working scholars by department ID (assuming separate table for scholars)
router.get('/departments/:departmentId/working-scholars', async (req, res) => {
  const departmentId = parseInt(req.params.departmentId);

  try {
    const workingScholars = await pool.query(
      'SELECT * FROM working_scholars WHERE department_id = $1',
      [departmentId]
    );

    res.json(workingScholars.rows);
  } catch (error) {
    console.error('Error fetching working scholars:', error);
    res.status(500).json({ message: 'Server Error' }); // Handle errors appropriately
  }
});

module.exports = router;
