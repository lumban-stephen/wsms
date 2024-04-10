const express = require('express');
const bcrypt = require('bcryptjs');
const { Pool } = require('pg');

const router = express.Router();

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "wsms",
  password: "10000max",
  port: 5432,
});

router.post('/signup', async (req, res) => {
  try {
    const client = await pool.connect();
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Consider using a prepared statement for better security
    const query = 'INSERT INTO users (username, password, user_type) VALUES ($1, $2, $3)';
    const values = [username, hashedPassword, "staff"];
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

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // 2. Input Validation (optional)
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  // 3. Fetch user from database
  try {
    const user = await User.findOne({ username }); // Replace with your database query

    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // 4. Compare password hash (assuming password is hashed in your database)
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // 5. Login successful (generate JWT, etc.)
    // Implement your logic to generate a JWT token or handle successful login
    // You can include user data in the response body or token payload
    
    res.json({ message: 'Login successful', user }); // Replace with your response

  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;