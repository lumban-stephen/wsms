const express = require('express');
const router = express.Router();
const { Pool } = require('pg');

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
router.get('/maintain-applicants', async (req, res) => {
    try {
      const query = `
        SELECT a.*, CONCAT(n.fname, ' ', n.lname) AS full_name
        FROM applicants a
        INNER JOIN names n ON a.name_fk = n.name_id
        WHERE a.status = 'pending';
      `;
      const { rows } = await pool.query(query);
      res.json(rows);
    } catch (error) {
      console.error('Error fetching applicants:', error);
      res.status(500).json({ error: 'An error occurred while fetching applicants' });
    }
  });

  router.post('/maintain-applicants', async (req, res) => {
    const { applicant_fk } = req.body;
  
    try {
      const client = await pool.connect();
  
      try {
        await client.query('BEGIN');
  
        const insertQuery = 'INSERT INTO working_scholars (applicant_fk) VALUES ($1) RETURNING *';
        const insertResult = await client.query(insertQuery, [applicant_fk]);
  
        if (insertResult.rowCount === 1) {
          const updateQuery = 'UPDATE applicants SET status = \'accepted\' WHERE applicant_id = $1';
          const updateResult = await client.query(updateQuery, [applicant_fk]);
  
          if (updateResult.rowCount === 1) {
            await client.query('COMMIT');
            res.status(201).json({ message: 'Applicant added to working scholars successfully!' });
          } else {
            await client.query('ROLLBACK');
            res.status(500).json({ message: 'Error updating applicant status' });
          }
        } else {
          await client.query('ROLLBACK');
          res.status(500).json({ message: 'Error adding applicant to working scholars' });
        }
      } catch (error) {
        await client.query('ROLLBACK');
        console.error('Error during transaction:', error);
        res.status(500).json({ message: 'Internal server error' });
      } finally {
        client.release();
      }
    } catch (error) {
      console.error('Error acquiring client:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  router.post('/reject', async (req, res) => {
    try {
      const { applicant_fk } = req.body;
  
      if (!applicant_fk) {
        return res.status(400).json({ message: 'Missing applicant ID' });
      }
  
      const query = `
        UPDATE applicants
        SET status = 'denied'
        WHERE applicant_id = $1
      `;
  
      const result = await pool.query(query, [applicant_fk]);
  
      if (result.rowCount === 1) {
        res.json({ message: 'Applicant successfully rejected.' });
      } else {
        res.status(500).json({ message: 'An error occurred while rejecting applicant.' });
      }
    } catch (error) {
      console.error('Error rejecting applicant:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  router.post('/approve', async (req, res) => {
    try {
      const { applicant_fk } = req.body;
  
      if (!applicant_fk) {
        return res.status(400).json({ message: 'Missing applicant ID' });
      }
  
      // Update applicant status to 'accepted'
      const updateApplicantQuery = `
        UPDATE applicants
        SET status = 'accepted'
        WHERE applicant_id = $1
      `;
  
      await pool.query(updateApplicantQuery, [applicant_fk]);
  
      // Insert applicant into working_scholars table
      const insertScholarQuery = `
        INSERT INTO working_scholars (applicant_fk)
        VALUES ($1)
      `;
  
      await pool.query(insertScholarQuery, [applicant_fk]);
  
      res.json({ message: 'Applicant successfully approved.' });
    } catch (error) {
      console.error('Error approving applicant:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

module.exports = router;
