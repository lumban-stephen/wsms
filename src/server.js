require('dotenv').config({ path: __dirname + '/../.env' });
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const authRoutes = require('./routes/authRoutes');
const announcement = require('./routes/announcements');

const app = express();

// Enable CORS for all origins
app.use(cors());

// Middleware for JSON parsing
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/api-announce', announcement);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

module.exports = app;