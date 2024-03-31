require('dotenv').config({ path: __dirname + '/../.env' });
const express = require('express');
const bcrypt = require('bcryptjs'); // Import bcryptjs directly
const jwt = require('jsonwebtoken');
const pool = require('./routes/authRoutes');
const router = express.Router();
const app = express();

app.use(express.json()); // Add JSON parsing middleware

app.use('/auth', require('./routes/authRoutes')); // Mount authRoutes under /auth

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

module.exports = router;