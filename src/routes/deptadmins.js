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

router.get('/fetchstaff', async (req, res) => {
    try {
      const query = `
        SELECT username
        FROM users
        WHERE user_type = 'staff'
          AND dept_fk IS NULL
      `;
  
      const { rows } = await pool.query(query);
      const usernames = rows.map((row) => row.username);
      
      console.log(usernames);
      res.json(usernames);
    } catch (error) {
      console.error('Error fetching department admins:', error);
      res.status(500).json({ error: 'Failed to fetch department admins' });
    }
  });
  
  
  router.put('/updatedept', async (req, res) => {
    try {
      const { id, name, contact, email } = req.body;
  
      // Check if all required fields are provided
      if (!id || !name || !contact || !email) {
        return res.status(400).json({ error: 'Missing required fields' });
      }
  
      // Start a transaction
      await pool.query('BEGIN');
  
      // Update the department details
      const updateDeptQuery = `
        UPDATE departments
        SET department_name = $1, contact = $2, dept_email = $3
        WHERE department_id = $4
        RETURNING *
      `;
      const updateDeptValues = [name, contact, email, id];
      const { rows: updatedDeptRows } = await pool.query(updateDeptQuery, updateDeptValues);
  
      if (updatedDeptRows.length === 0) {
        // Rollback the transaction if the department update failed
        await pool.query('ROLLBACK');
        return res.status(404).json({ error: 'Department not found' });
      }
  
      // Update the user's department foreign key (dept_fk)
      // const updateUserQuery = `
      //   UPDATE users
      //   SET dept_fk = $1
      //   WHERE username = $2
      // `;
      // const updateUserValues = [id, admin];
      // await pool.query(updateUserQuery, updateUserValues);
  
      // Commit the transaction
      await pool.query('COMMIT');
  
      res.status(200).json(updatedDeptRows[0]);
    } catch (error) {
      // Rollback the transaction in case of an error
      await pool.query('ROLLBACK');
      console.error('Error updating department:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

module.exports = router;
