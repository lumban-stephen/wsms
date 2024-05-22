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
router.post('/api/add-department', async (req, res) => {
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



// Get all departments
router.get('/alldept', async (req, res) => {
  try {
    const allDepartments = await pool.query('SELECT * FROM departments'); // Replace with your department table name
    res.json(allDepartments.rows);
  } catch (error) {
    console.error('Error fetching departments:', error);
    res.status(500).json({ message: 'Server Error' }); // Handle errors appropriately
  }
});

// Add a new department and user
router.post('/adddept', async (req, res) => {
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

    res.status(201).json({
      departmentId: newDepartmentId,
      userId: newUserId,
      departmentName, // Include the departmentName from the request body
      contact, // Include the contact from the request body
      deptEmail, // Include the deptEmail from the request body
      userType, // Include the userType from the request body
    });
  } catch (error) {
    // Rollback the transaction if an error occurred
    await pool.query('ROLLBACK');
    console.error('Error inserting department and user:', error);
    res.status(500).json({ error: 'An error occurred while adding the department and user.' });
  }
});

// Get all departments with users
// router.get('/api/departments-users', async (req, res) => {
//   try {
//     const result = await pool.query(`
//       SELECT 
//         d.department_id AS "departmentId",
//         d.department_name AS "departmentName",
//         d.contact AS "contact",
//         d.dept_email AS "deptEmail",
//         u.user_type AS "userType",
//         'path/to/default/image.jpg' AS "imageUrl"
//       FROM 
//         departments d
//       LEFT JOIN 
//         users u ON d.department_id = u.dept_fk;
//     `);
//     res.json(result.rows);
//   } catch (err) {
//     console.error('Error fetching departments and users:', err.message);
//     res.status(500).send('Server error');
//   }
// });


// Get working scholar from specific department
router.get('/dept-profile/:departmentId/working-scholars', async (req, res) => {
  const departmentId = parseInt(req.params.departmentId);

  try {
    const workingScholars = await pool.query(
      `SELECT w.ws_id, w.dept_fk, n.fname || ' ' || n.lname AS name, 
           a.address, a.school_name, 
           a.fb, a.contact
      FROM working_scholars w
      INNER JOIN applicants a ON w.applicant_fk = a.applicant_id
      INNER JOIN names n ON a.name_fk = n.name_id
      WHERE w.dept_fk = $1`,
      [departmentId]
    );

    if (workingScholars.rows.length === 0) {
      return res.status(404).json({ message: 'No Working Scholars here' });
    }
    console.log(workingScholars.rows)
    res.json(workingScholars.rows);
  } catch (error) {
    console.error('Error fetching Working Scholars:', error);
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
router.get('/departments/:departmentId/', async (req, res) => {
  const departmentId = parseInt(req.params.departmentId);

  try {
    const deptDetail = await pool.query(
      'SELECT department_id, department_name, contact, dept_email FROM departments WHERE department_id = $1',
      [departmentId]
    );

    res.json(deptDetail.rows[0]);
  } catch (error) {
    console.error('Error fetching dept details:', error);
    res.status(500).json({ message: 'Server Error' }); // Handle errors appropriately
  }
});

router.get('/departments/by-name/:name', async (req, res) => {
  const { name } = req.params;

  if (!name) {
    return res.status(400).json({ error: 'Missing department name parameter' });
  }

  try {
    const query = `SELECT department_id FROM departments WHERE department_name = $1`;
    const values = [name];

    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Department not found' });
    }

    const departmentId = result.rows[0].id;
    res.json({ id: departmentId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
