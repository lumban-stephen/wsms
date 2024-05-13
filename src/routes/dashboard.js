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

app.get('/api/admin/dashboard', async (req, res) => {
    try {
      const client = await pool.connect();
  
      // Fetch Working Scholars in Service
      const workingScholarsResult = await client.query('SELECT COUNT(*) FROM scholars WHERE status = $1', ['In Service']);
      const workingScholarsCount = workingScholarsResult.rows[0].count;
  
      // Fetch Waiting for Assignment Scholars
      const waitingScholarsResult = await client.query('SELECT COUNT(*) FROM scholars WHERE status = $1', ['Waiting for Assignment']);
      const waitingScholarsCount = waitingScholarsResult.rows[0].count;
  
      // Fetch Latest Announcement (replace with your logic)
      const latestAnnouncementResult = await client.query('SELECT message FROM announcements ORDER BY created_at DESC LIMIT 1');
      const latestAnnouncement = latestAnnouncementResult.rows.length > 0 ? latestAnnouncementResult.rows[0].message : '';
  
      // Fetch Pending Applicants (replace with your logic)
      const pendingApplicantsCount = 523; // Replace with actual data fetching logic
  
      // Fetch Total Pending (replace with your logic - consider combining queries)
      const totalPendingCount = workingScholarsCount + waitingScholarsCount + pendingApplicantsCount;
  
      // Fetch Pending Dept Request (replace with your logic)
      const pendingDeptRequestCount = 16; // Replace with actual data fetching logic
  
      const dashboardData = {
        workingScholarsInService: workingScholarsCount,
        waitingForAssignment: waitingScholarsCount,
        latestAnnouncement,
        pendingApplicants: pendingApplicantsCount,
        totalPending: totalPendingCount,
        pendingDeptRequest: pendingDeptRequestCount,
      };
  
      client.release();
      res.json(dashboardData);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      res.status(500).send('Failed to fetch dashboard data');
    }
  });

  module.exports = router;