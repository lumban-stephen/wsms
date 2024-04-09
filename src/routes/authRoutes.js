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

router.post('auth/signup', async (req, res) => {
  try {
    const client = await pool.connect();
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Consider using a prepared statement for better security
    const query = 'INSERT INTO users (username, password) VALUES ($1, $2)';
    const values = [username, hashedPassword];
    await pool.query(query, values);

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Error signing up user:', error);
    if (error.code === '23505') { // Example: Duplicate username constraint violation
      res.status(400).json({ error: 'Username already exists' });
    } else {
      res.status(500).json({ error: 'An error occurred while signing up' });
    }
  } finally {
    if (client) {
      await client.release();
    }
  }
});

module.exports = router;