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

// Update department request status (assuming request ID is in the request body)
router.put('/api/dept-requests/:requestId', async (req, res) => {
  const { requestId } = req.params;
  const { ws_req_stat } = req.body; // Assuming 'ws_req_stat' is the status field

  // Validate request data (replace with your validation logic)
  if (!requestId || !ws_req_stat || (ws_req_stat !== 'approved' && ws_req_stat !== 'rejected' && ws_req_stat !== 'waiting')) {
    return res.status(400).json({ message: 'Invalid request data' });
  }

  try {
    const client = await pool.connect();
    const query = `
      UPDATE ws_requests
      SET ws_req_stat = $1
      WHERE request_id = $2;
    `;
    const values = [ws_req_stat, requestId];
    await client.query(query, values);
    await client.release();
    res.status(200).json({ message: 'Request updated successfully' });
  } catch (error) {
    console.error('Error updating request:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
