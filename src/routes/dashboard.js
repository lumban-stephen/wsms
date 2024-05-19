const express = require('express');
const { Pool } = require('pg');
const router = express.Router();

// Create a connection pool for efficient database interactions
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "wsms",
  password: "10000max",
  port: 5432,
});

// Define the route handler for GET requests to /admin/dashboard
router.get('/dashboard', async (req, res) => {
  try {
    // Combine queries for efficiency
    const scholarStatusCounts = await pool.query(`
      SELECT
        COUNT(CASE WHEN a.status = 'accepted' THEN 1 END) AS working_in_service,
        COUNT(CASE WHEN a.status = 'pending' THEN 1 END) AS waiting_for_assignment
      FROM working_scholars ws
      INNER JOIN applicants a ON ws.applicant_fk = a.applicant_id;
    `);

    const workingScholarsCount = scholarStatusCounts.rows[0].working_in_service;
    const waitingForAssignment = scholarStatusCounts.rows[0].waiting_for_assignment;

    // Fetch other data
    const latestAnnouncementResult = await pool.query(`
      SELECT message FROM announcements
      ORDER BY date_posted DESC
      LIMIT 1;
    `);

    const latestAnnouncement = latestAnnouncementResult.rows.length > 0 ?
      latestAnnouncementResult.rows[0].message : 'No announcements';

    const pendingApplicantsCount = await pool.query(`
      SELECT COUNT(*) AS pending_applicants
      FROM applicants
      WHERE status = 'pending';
    `);

    const totalRetiredCount = await pool.query(`
      SELECT COUNT(*) AS total_retired
      FROM applicants
      WHERE status = 'retired';
    `);

    const waitingRequestsCount = await pool.query(`
      SELECT COUNT(*) AS waiting_requests
      FROM ws_requests
      WHERE ws_req_stat = 'waiting';
    `);

    // Construct the dashboard data object
    const dashboardData = {
      workingScholarsInService: workingScholarsCount,
      waitingForAssignment,
      latestAnnouncement,
      pendingApplicants: pendingApplicantsCount.rows[0].pending_applicants,
      totalRetired: totalRetiredCount.rows[0].total_retired,
      pendingDeptRequest: waitingRequestsCount.rows[0].waiting_requests,
    };

    console.log(dashboardData); // Log the constructed data for debugging
    res.json(dashboardData); // Send the data as a JSON response

  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    res.status(500).send('Failed to fetch dashboard data');
  }
});

module.exports = router;
