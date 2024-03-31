const express = require('express');
const bcrypt = require('bcryptjs');
const { Pool } = require('pg');

const router = express.Router();

const pool = new Pool({
  user: "postgres",
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: "10000max",
  port: 5432,
});

(async () => {
  try {
    const client = await pool.connect();
    console.log('Database connection successful!');
    await client.release();
  } catch (error) {
    console.error('Error connecting to database:', error);
  }
})();

router.post('/signup', async (req, res) => {
  // Use the pool for database queries
    const client = await pool.connect();
    const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const query = 'INSERT INTO users (username, password, user_type) VALUES ($1, $2, "staff")';
    const values = [username, hashedPassword];
    await pool.query(query, values);

    res.status(201).json({ message: 'User created successfully' });
    client.release();
  } catch (error) {
    console.error('Error signing up user:', error);
    res.status(500).json({ error: 'An error occurred while signing up' });
  }
});

module.exports = router;
