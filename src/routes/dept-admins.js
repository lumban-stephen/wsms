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
  
module.exports = router;
