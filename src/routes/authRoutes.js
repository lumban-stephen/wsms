const express = require('express');
const bcrypt = require('bcryptjs');

const router = express.Router();


router.post('/signup', async (req, res) => {
  // Use the pool for database queries
    const client = await pool.connect();
    const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const query = 'INSERT INTO users (username, password) VALUES ($1, $2)';
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
