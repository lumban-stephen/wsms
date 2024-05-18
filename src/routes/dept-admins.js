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

app.get('/api/dept-admins', async (req, res) => {
    try {
      const query = `
        SELECT username
        FROM users
        WHERE user_type = 'staff'
          AND dept_fk IS NULL
      `;
  
      const { rows } = await pool.query(query);
      const usernames = rows.map((row) => row.username);
  
      res.json(usernames);
    } catch (error) {
      console.error('Error fetching department admins:', error);
      res.status(500).json({ error: 'Failed to fetch department admins' });
    }
  });
  
  router.get('/api/dept-admins', async (req, res) => {
    try {
      const client = await pool.connect();
      const result = await client.query('SELECT username FROM users WHERE role = $1', ['admin']); // Replace with your query to fetch admins
      const usernames = result.rows.map((row) => row.username);
      res.json(usernames);
      client.release();
    } catch (error) {
      console.error('Error fetching department admins:', error);
      res.status(500).send('Failed to fetch department admins');
    }
  });
  
  // Route to update department details (modify based on your actual logic)
  router.patch('/api/departments/:id', async (req, res) => {
    const departmentId = parseInt(req.params.id);
    const { name, admin, contact, email } = req.body;
  
    if (!departmentId || !name || !admin || !contact || !email) {
      return res.status(400).send('Missing required department data');
    }
  
    try {
      const client = await pool.connect();
      const result = await client.query('UPDATE departments SET name = $1, admin = $2, contact = $3, email = $4 WHERE id = $5', [name, admin, contact, email, departmentId]);
      if (result.rowCount === 0) {
        return res.status(404).send('Department not found');
      }
      res.json({ message: 'Department updated successfully' });
      client.release();
    } catch (error) {
      console.error('Error updating department:', error);
      res.status(500).send('Failed to update department');
    }
  });

module.exports = router;
