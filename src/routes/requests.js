const express = require('express');
const { request } = require('http');
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

router.get('/fetchrequests', async (req, res) => {
  try {
      const requestQuery = `
          SELECT *
          FROM ws_requests 
          WHERE ws_req_stat = 'waiting'
          ORDER BY ws_req_id ASC;  -- Optionally order by request ID
      `;
      const requestResult = await pool.query(requestQuery);

      // Log the result to ensure it's correct
      console.log(requestResult);

      // Send the result as a JSON response
      res.json(requestResult.rows);
  } catch (error) {
      // Log the error
      console.log(error);

      // Send an error response
      res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.put('/approve/:requestId', async (req, res) => {
  const requestId = req.params.requestId;
  const updatedStep = req.body.approvedStep; // Assuming property name is approvedStep

  // Validate parameters
  if (!requestId || updatedStep === undefined) {
    return res.status(400).json({ message: 'Invalid request parameters' });
  }

  try {
    // Update approval step using a parameterized query
    const updateRequestQuery = `
      UPDATE ws_requests
      SET approve_step = LEAST($2, 4)  -- Limit to 4 steps
      WHERE ws_req_id = $1
      RETURNING *;  -- Optionally return updated data
    `;

    const updateResult = await pool.query(updateRequestQuery, [requestId, updatedStep]);

    if (updateResult.rowCount === 0) {
      return res.status(404).json({ message: 'Request not found' });
    }

    // Optionally handle the updated data (if returned)
    // const updatedRequest = updateResult.rows[0];
    console.log(updateResult);

    res.json({ message: 'Request approval step updated successfully' });
  } catch (error) {
    console.error('Error approving request:', error);

    // Check for specific error types (e.g., database errors)
    if (error.code) {
      // Handle database errors
      res.status(500).json({ message: 'Database error occurred during approval. Please try again later.' });
    } else {
      // Generic error handling
      res.status(500).json({ message: 'Failed to approve request.' });
    }
  }
});

router.post('/rejectreq/:requestId', async (req, res) => {
  const requestId = req.params.requestId;

  try {
    // Update approval step using a parameterized query
    const rejectRequest = `UPDATE ws_requests SET ws_req_stat = $1 WHERE ws_req_id = $2`;
    const values = ['rejected', requestId];

    await pool.query(rejectRequest, values);

    res.json({ message: 'Request rejected successfully' });
  } catch (error) {
    console.error('Error rejecting request backend:', error);
    res.status(500).json({ message: 'backend Failed to reject request' });
  }
});

module.exports = router;
