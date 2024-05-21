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
    console.log(req.body)

    if (!username || !password) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Retrieve the most recently added ws_id from the working_scholars table
    const getLatestWsIdQuery = 'SELECT ws_id FROM working_scholars ORDER BY ws_id DESC LIMIT 1';
    const latestWsIdResult = await client.query(getLatestWsIdQuery);

    if (latestWsIdResult.rows.length === 0) {
      return res.status(400).json({ error: 'No working scholars found' });
    }

    const ws_id = latestWsIdResult.rows[0].id;

    const query = 'INSERT INTO users (username, password, user_type, userdetail_fk) VALUES ($1, $2, $3, $4)';
    const values = [username, hashedPassword, 'ws', ws_id];
    await client.query(query, values);

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

// User login route with backward compatibility
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if username and password are provided
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }

    // Query to fetch user details with JOINs
    const query = `
      SELECT
        u.user_id, u.username, u.password, u.user_type, u.dept_fk,
        n.fname AS first_name, n.lname AS last_name, n.mname AS middle_name, n.suffix,
        ud.address, ud.contact,
        d.department_name
      FROM users u
      LEFT JOIN user_details ud ON u.userdetail_fk = ud.userdetail_id
      LEFT JOIN names n ON ud.name_fk = n.name_id
      LEFT JOIN departments d ON u.dept_fk = d.department_id
      WHERE u.username = $1
    `;
    const values = [username];

    // Execute the query
    const { rows } = await pool.query(query, values);

    // Check if user exists
    if (rows.length === 0) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    const user = rows[0];

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    console.log(user);
    // Create a JWT token with user information
    const payload = {
      userId: user.user_id,
      username: user.username,
      userType: user.user_type,
      dept_fk: user.dept_fk,
      deptName: user.department_name,
    };
    const secret = process.env.SECRET_KEY;
    const token = jwt.sign(payload, secret, { expiresIn: '1h' });

    console.log("hello" + secret);
    // Return the JWT token
    return res.json({ token });
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
  const [firstName, ...lastNameParts] = completeName.split(' ');
  const lastName = lastNameParts.join(' ');

  try {
    // 2. Start a transaction
    await pool.query('BEGIN');

    // 3. Insert applicant data (names table first due to foreign key)
    const nameResult = await pool.query(
      'INSERT INTO names (fname, lname) VALUES ($1, $2) RETURNING name_id',
      [firstName, lastName]
    );
    const nameId = nameResult.rows[0].name_id;

    const applicantResult = await pool.query(
      'INSERT INTO applicants (name_fk, school_name, address, course, age, year, contact, parent_fk, status) VALUES ($1, $2, $3, $4, $5, $6, $7, null, $8) RETURNING applicant_id',
      [
        nameId,
        school,
        address,
        currentCourse,
        age,
        null,
        currentNumber,
        'pending',
      ]
    );
    const applicantId = applicantResult.rows[0].applicant_id;

    // 4. Insert parent data (if provided)
    if (fatherName && fathersOccupation) {
      const guardianResult = await pool.query(
        'INSERT INTO guardians (contact, name_fk, occupation) VALUES ($1, $2, $3) RETURNING guardian_id',
        [null, nameId, fathersOccupation]
      );
      const fatherId = guardianResult.rows[0].guardian_id;
      await pool.query('INSERT INTO parents (mother_fk, father_fk) VALUES (null, $1)', [
        fatherId,
      ]);
    }

    if (motherName && mothersOccupation) {
      const guardianResult = await pool.query(
        'INSERT INTO guardians (contact, name_fk, occupation) VALUES ($1, $2, $3) RETURNING guardian_id',
        [null, nameId, mothersOccupation]
      );
      const motherId = guardianResult.rows[0].guardian_id;
      await pool.query('INSERT INTO parents (mother_fk, father_fk) VALUES ($1, null)', [
        motherId,
      ]);
    }

    // 5. Commit the transaction
    await pool.query('COMMIT');
    res.json({ message: 'Working scholar registration successful!',
              redirectURL: '/login' });
  } catch (error) {
    console.error('Error registering working scholar:', error);
    await pool.query('ROLLBACK');
    res.status(500).json({ message: 'Error registering working scholar' });
  }
});

module.exports = router;