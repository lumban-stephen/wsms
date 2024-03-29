require('dotenv').config(); // Load environment variables from .env file
const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Fetch and log the list of tables from the database
async function fetchTables() {
  try {
    const client = await pool.connect();
    const result = await client.query(
      "SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' AND table_type = 'BASE TABLE'"
    );
    const tables = result.rows.map(row => row.table_name);
    console.log('List of tables:', tables);
    client.release();
  } catch (err) {
    console.error('Error fetching tables', err);
  }
}

fetchTables(); // Call the function to fetch and log tables

// Close the pool when the Node.js process is terminated
process.on('SIGINT', () => {
  pool.end(() => {
    console.log('Pool has ended');
    process.exit(0);
  });
});
