require('dotenv').config({ path: __dirname + '/../.env' });
const express = require('express');
const bcrypt = require('bcryptjs'); // Import bcryptjs directly
const jwt = require('jsonwebtoken');
const pool = require('./routes/authRoutes');

const router = express.Router();

// Login route
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  try {
    const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }
    const user = result.rows[0];
    const passwordMatch = await bcrypt.compare(password, user.password); // Use bcrypt.compare from bcryptjs
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }
    const token = jwt.sign({ userId: user.id }, process.env.SECRET_KEY);
    res.json({ token });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ error: 'An error occurred while logging in' });
  }
});

module.exports = router;