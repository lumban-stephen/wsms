const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes'); // Import authRoutes
const app = express();
const port = 5000;
const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

module.exports = pool;

app.use(bodyParser.json());
app.use('/api', authRoutes); // Use authRoutes

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
