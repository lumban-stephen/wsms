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

router.post('/reqws', async (req, res) => {
  const { message, requestType, quantity } = req.body;
  const userName = req.userName;
  const userId = req.userId

  // Dept name can be retrieved from the authenticated user's information (if applicable)
  const deptNameFk = 1; // Replace with logic to get dept name FK

  try {
    const newRequest = await pool.query(
        `INSERT INTO ws_requests (ws_req_name, message, dept_name_fk, ws_req_stat, ws_req_type) VALUES ($1, $2, $3, 'pending', $4) RETURNING *`,
        [userName, message, deptNameFk, requestType] 
    );

    res.json(newRequest.rows[0]); // Send the newly created request data back
  } catch (error) {
    console.error(error);
    res.status(500).send('Error creating request');
  }
});

router.get('/maintain-applicants', async (req, res) => {
  try {
    const query = `
    SELECT a.*, CONCAT(n.fname, ' ', n.lname) AS full_name, ws.isRegistered
    FROM applicants a
    INNER JOIN names n ON a.name_fk = n.name_id
    LEFT JOIN working_scholars ws ON a.applicant_id = ws.applicant_fk -- Use LEFT JOIN for potential missing entries
    WHERE a.status = 'pending'  -- Filter for pending applicants only
`;

    const { rows } = await pool.query(query);
    res.json(rows);
  } catch (error) {
    console.error('Error fetching applicants:', error);
    res.status(500).json({ error: 'An error occurred while fetching applicants' });
  }
});

router.get('/maintain-ws', async (req, res) => {
  try {
    const query = `
      SELECT a.*, CONCAT(n.fname, ' ', n.lname) AS full_name
      FROM applicants a
      INNER JOIN names n ON a.name_fk = n.name_id
      WHERE a.status = 'accepted'  -- Filter for accepted applicants
    `;
    const { rows } = await pool.query(query);
    res.json(rows);
  } catch (error) {
    console.error('Error fetching applicants:', error);
    res.status(500).json({ error: 'An error occurred while fetching applicants' });
  }
});

router.post('/maintain-ws', async (req, res) => {
  try {
    const { applicant_fk } = req.body;

    // Check if applicant exists
    const applicantExists = await pool.query('SELECT * FROM applicants WHERE applicant_id = $1', [applicant_fk]);

    if (applicantExists.rows.length === 0) {
      return res.status(400).json({ message: 'Invalid applicant ID' });
    }

    // Check if applicant already assigned (optional depending on your logic)
    // const isAssigned = await pool.query('SELECT * FROM working_scholars WHERE applicant_fk = $1', [applicant_fk]);
    // if (isAssigned.rows.length > 0) {
    //   return res.status(400).json({ message: 'Applicant already assigned as working scholar' });
    // }

    const result = await pool.query(
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

router.get('/working-scholars/unassigned', async (req, res) => {
  try {
    const unassignedScholars = await pool.query(
      `
      SELECT ws.ws_id AS id,
       CONCAT(n.fname, ' ', n.lname) AS name,  -- Concatenate fname and lname with space
       a.gender,
       a.course,
       a.age,
       ws.applicant_fk,
       ws.dept_fk
      FROM working_scholars AS ws
      INNER JOIN applicants AS a ON ws.applicant_fk = a.applicant_id
      INNER JOIN names AS n ON a.name_fk = n.name_id;
      `
    );
    // Send only the data (rows) in the response
    res.json(unassignedScholars.rows);
  } catch (error) {
    console.error('Error fetching unassigned working scholars:', error);
    res.status(500).json({ message: 'Server Error' }); // Handle errors appropriately
  }
});




router.post('/suspend', async (req, res) => {
  try {
    const { applicant_fk } = req.body;

    if (!applicant_fk) {
      return res.status(400).json({ message: 'Missing applicant ID' });
    }

    // 1. Find working scholar record (optional, based on your needs)
    const findScholarQuery = `
      SELECT *
      FROM working_scholars
      WHERE applicant_fk = $1
    `;

    const { rows: scholarRows } = await pool.query(findScholarQuery, [applicant_fk]);

    // 2. Update applicant status (assuming scholar record found)
    const updateApplicantQuery = `
      UPDATE applicants
      SET status = 'denied'
      WHERE applicant_id = $1
    `;

    await pool.query(updateApplicantQuery, [applicant_fk]);

    // 3. Update isRegistered if scholar record found
    if (scholarRows.length > 0) {
      const updateScholarQuery = `
        UPDATE working_scholars
        SET isregistered = false
        WHERE applicant_fk = $1
      `;

      await pool.query(updateScholarQuery, [applicant_fk]);
    }

    res.json({ message: 'Applicant successfully suspended.' });
  } catch (error) {
    console.error('Error suspending working scholar:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.put('/assigndept', async (req, res) => {
  const { departmentId, scholarIds } = req.body;

  // Validate parameters
  if (!departmentId || !scholarIds || scholarIds.length === 0) {
    return res.status(400).json({ message: 'Invalid request parameters' });
  }

  try {
    // Batch update using a loop or transaction
    const updatePromises = scholarIds.map(async (scholarId) => {
      const updateRequestQuery = `
        UPDATE working_scholars
        SET dept_fk = $1
        WHERE ws_id = $2
      `;
    
      await pool.query(updateRequestQuery, [departmentId, scholarId]);
    });
    
    await Promise.all(updatePromises); // Wait for all updates to finish

    console.log('Scholars assigned successfully!');
    res.json({ message: 'Assignments updated successfully' });
  } catch (error) {
    console.error('Error assigning scholars:', error);
    // ... (same error handling logic)
  }
});


module.exports = router;
