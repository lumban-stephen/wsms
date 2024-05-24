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

router.get('/fetchrequests', async (req, res) => {
  try {
      const requestQuery = `
          SELECT *
          FROM ws_requests
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

router.put('dept-requests/:requestId', async (req, res) => {
  const requestId = req.params.requestId;
  const updatedStep = req.body.approvedStep; // Assuming property name is approvedStep

    try {
      // Update approval step using a parameterized query
      const updateRequestQuery = `
        UPDATE ws_requests
        SET ws_req_approved_step = LEAST($2, 4)  -- Limit to 4 steps
        WHERE ws_req_id = $1
        RETURNING *;  -- Optionally return updated data
      `;

      const updateResult = await client.query(updateRequestQuery, [requestId, updatedStep]);

      if (updateResult.rowCount === 0) {
        return res.status(404).json({ message: 'Request not found' });
      }

      // Optionally handle the updated data (if returned)
      // const updatedRequest = updateResult.rows[0];

      res.json({ message: 'Request approval step updated successfully' });
    } finally {
      await client.release();
    }

});

module.exports = router;
