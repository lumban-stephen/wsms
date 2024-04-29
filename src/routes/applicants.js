const express = require('express');
const app = express();
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
app.use(express.json());

// Endpoint to get all applicants
app.get('/api/applicants', async (req, res) => {
  try {
    const query = 'SELECT * FROM applicants';
    const { rows } = await pool.query(query);
    res.json(rows);
  } catch (error) {
    console.error('Error fetching applicants:', error);
    res.status(500).json({ error: 'An error occurred while fetching applicants' });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});