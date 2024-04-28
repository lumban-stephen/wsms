const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const { Pool } = require('pg');
const jwt = require('jsonwebtoken');
const router = express.Router();

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "wsms",
  password: "10000max",
  port: 5432,
  secretkey: "M23y?_+Sb[ynL`_WBpp2LOzbOct&rq"
});

router.post('/signup', async (req, res) => {
  try {
    const client = await pool.connect();
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = 'INSERT INTO users (username, password, user_type) VALUES ($1, $2, $3)';
    const values = [username, hashedPassword, 'admin'];
    await client.query(query, values); // Use await when executing queries
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Error signing up user:', error);
    if (error.code === '23505') {
      res.status(400).json({ error: 'Username already exists' });
    } else {
      res.status(500).json({ error: 'An error occurred while signing up' });
    }
  }
});

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if username and password are provided
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }

    // Get the user from the database
    const query = 'SELECT * FROM users WHERE username = $1';
    const values = [username];
    const { rows } = await pool.query(query, values);

    // If no user is found, return an error
    if (rows.length === 0) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    const user = rows[0];

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    // If the password is invalid, return an error
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Create a JWT token with the user's information
    const payload = {
      userId: user.user_id,
      username: user.username,
      user_type: user.user_type,
      // Add any other user data you want to include in the token
    };
    const secret = 'M23y?_+Sb[ynL`_WBpp2LOzbOct&rq'; // Replace with your actual JWT secret
    const token = jwt.sign(payload, secret, { expiresIn: '1h' }); // Set token expiration time as needed

    // Return the JWT token to the client
    res.json({ token });
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/register', async (req, res) => {
  const {
    completeName,
    address,
    currentCourse,
    currentNumber,
    gender,
    age,
    school,
    userFB,
    fatherName,
    fathersOccupation,
    motherName,
    mothersOccupation,
  } = req.body;

  // 1. Extract First and Last Name from completeName
  const nameParts = completeName.split(' ');
  const firstName = nameParts[0];
  const lastName = nameParts.slice(1).join(' ');

  // 2. Create a transaction to ensure data integrity
  try {
    await pool.query('BEGIN');

    // 3. Insert applicant data (names table first due to foreign key)
    console.log("Die 1")
    const insertNameResult = await pool.query('INSERT INTO names (fname, name_id) VALUES ($1, DEFAULT)', [firstName]);
    const nameId = insertNameResult.rows[0].name_id;
    console.log(nameId);

    const insertApplicantResult = await pool.query(
      'INSERT INTO applicant (name_fk, school_name, address, course, age, year, contact, parent_fk, status) VALUES ($1, $2, $3, $4, $5, $6, $7, null, $8)',
      [nameId, school, address, currentCourse, age, null, currentNumber, null, 'Registered']
    );

    const applicantId = insertApplicantResult.rows[0].applicant_id;

    // 4. Insert parent data (if provided)
    if (fatherName && fathersOccupation) {
      const insertGuardianResult = await pool.query(
        'INSERT INTO guardians (contact, name_fk, occupation) VALUES ($1, $2, $3)',
        [null, applicantId, fathersOccupation] // Contact can be added later
      );
      const guardianId = insertGuardianResult.rows[0].guardian_id;

      await pool.query('INSERT INTO parents (mother_fk, father_fk) VALUES (null, $1)', [guardianId]);
    }

    if (motherName && mothersOccupation) {
      const insertGuardianResult = await pool.query(
        'INSERT INTO guardians (contact, name_fk, occupation) VALUES ($1, $2, $3)',
        [null, applicantId, mothersOccupation] // Contact can be added later
      );
      const guardianId = insertGuardianResult.rows[0].guardian_id;

      await pool.query('INSERT INTO parents (mother_fk, father_fk) VALUES ($1, null)', [guardianId]);
    }

    // 5. Commit the transaction
    await pool.query('COMMIT');
    res.json({ message: 'Working scholar registration successful!' });
  } catch (error) {
    console.error('Error registering working scholar:', error);
    await pool.query('ROLLBACK');
    res.status(500).json({ message: 'Error registering working scholar' });
  }
});

module.exports = router;