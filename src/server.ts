import express from 'express';
import * as pg from "pg";
import * as dotenv from 'dotenv';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { Request, Response } from 'express'; 

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Connect to PostgreSQL
const client = new pg.Client({
  connectionString: process.env.DATABASE_URL,
});
client.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
    process.exit(1);
  }
  console.log('Connected to database!');
});

app.post('/signup', async (req: Request, res: Response) => {
  console.log('Received POST request to /signup');  // Log 1

  const { username, password } = req.body;

  // Basic input validation (add more as needed)
  if (!username || !password) {
    return res.status(400).json({ message: 'Please provide email and password' });
  }

  try {
    // Check for existing user
    console.log('Checking for existing user:', username);  // Log 2
    const existingUser = await client.query('SELECT * FROM users WHERE username = $1', [username]);
    if (existingUser.rows.length > 0) {
      return res.status(409).json({ message: 'Username already exists' });
    }

    // Hash password (use a strong hashing algorithm like bcrypt)
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Insert user into database
    console.log('Inserting user:', username);  // Log 3
    await client.query('INSERT INTO users (username, password, user_type) VALUES ($1, $2, "staff")', [username, hashedPassword]);

    res.status(201).json({ message: 'Registration successful' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});



// User schema (assuming it's already created in PostgreSQL)
interface User {
  id: number;
  email: string;
  password: string;
}

// Middleware to parse incoming data as JSON
app.use(express.json());

// Login endpoint
app.post('/login', async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Please provide email and password' });
  }

  try {
    // Find user by email
    const user = await client.query('SELECT * FROM users WHERE email = $1', [email]);
    if (user.rows.length === 0) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Compare hashed passwords
    const validPassword = await bcrypt.compare(password, user.rows[0].password);
    if (!validPassword) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate JWT (replace with your own secret key and payload)
    const token = jwt.sign({ userId: user.rows[0].id }, process.env.SECRET_KEY as string, { expiresIn: '1h' });

    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal' })
  }
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


// Catch-all route for unmatched routes
app.use('*', (req: Request, res: Response) => {
  res.status(404).json({ message: 'Route not found' });
});