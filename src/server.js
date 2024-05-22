require('dotenv').config();
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const authRoutes = require('./routes/authRoutes');
const announcement = require('./routes/announcements');
const applicants = require('./routes/applicants')
const wsreq = require('./routes/wsreq')
const ws = require('./routes/ws')
const users = require('./routes/users')
const departments = require('./routes/departments');
const dashboard = require('./routes/dashboard');
const deptadmin = require('./routes/deptadmins');

const app = express();

// Enable CORS for all origins
app.use(cors());

// Middleware for JSON parsing
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/api-announce', announcement);
app.use('/applicants', applicants);
app.use('/wsreq', wsreq);
app.use('/users', users);
app.use('/ws', ws);
app.use('/departments', departments);
app.use('/admin', dashboard)
app.use('/deptadmin', deptadmin)


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

module.exports = app;