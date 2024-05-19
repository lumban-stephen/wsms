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

// API route to add a new department
app.post('/api/add-department', async (req, res) => {
  const { departmentId, imageUrl, departmentName, userType, contact, deptEmail } = req.body;
  try {
    const query = `
      INSERT INTO departments (department_id, image_url, department_name, user_type, contact, dept_email)
      VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;
    `;
    const values = [departmentId, imageUrl, departmentName, userType, contact, deptEmail];
    const result = await pool.query(query, values);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error inserting department', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
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

// Add a new department and user
router.post('/departments', async (req, res) => {
  const { departmentName, contact, deptEmail, userType } = req.body;

  try {
    // Start a transaction
    await pool.query('BEGIN');

    // Add a new department and get the generated department_id
    const departmentResult = await pool.query(
      'INSERT INTO departments (department_name, contact, dept_email) VALUES ($1, $2, $3) RETURNING department_id',
      [departmentName, contact, deptEmail]
    );
    const newDepartmentId = departmentResult.rows[0].department_id;

    // Add a new user with the generated department_id
    const userResult = await pool.query(
      'INSERT INTO users (user_type, dept_fk) VALUES ($1, (SELECT department_id FROM departments ORDER BY department_id DESC LIMIT 1)) RETURNING user_id',
      [userType]
    );
    const newUserId = userResult.rows[0].user_id;

    // Commit the transaction
    await pool.query('COMMIT');

    res.status(201).json({ departmentId: newDepartmentId, userId: newUserId });
  } catch (error) {
    // Rollback the transaction if an error occurred
    await pool.query('ROLLBACK');
    console.error('Error inserting department and user:', error);
    res.status(500).json({ error: 'An error occurred while adding the department and user.' });
  }
});

// Get all departments with users
router.get('/api/departments-users', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        d.department_id AS "departmentId",
        d.department_name AS "departmentName",
        d.contact AS "contact",
        d.dept_email AS "deptEmail",
        u.user_type AS "userType",
        'path/to/default/image.jpg' AS "imageUrl"
      FROM 
        departments d
      LEFT JOIN 
        users u ON d.department_id = u.dept_fk;
    `);
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching departments and users:', err.message);
    res.status(500).send('Server error');
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
