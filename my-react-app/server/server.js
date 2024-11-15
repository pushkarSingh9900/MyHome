// server/server.js

const express = require('express');
const sql = require('mssql');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Database configuration
const dbConfig = {
  user: 'SA',       // Replace with your SQL Server username
  password: 'MyStrongPass123',   // Replace with your SQL Server password
  server: 'localhost',             // Replace with your server address if different
  database: 'StudentHousingDB',
  options: {
    encrypt: true,                // Use true for Azure SQL
    trustServerCertificate: true,  // Use this if you're running locally
  },
};

// Connect to the database
sql.connect(dbConfig)
  .then((pool) => {
    if (pool.connected) {
      console.log('Connected to the database.');
    }
  })
  .catch((err) => {
    console.error('Database connection failed:', err);
  });

// Login endpoint
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Server-side validation for lakeheadu.ca email
    if (!email.endsWith('@lakeheadu.ca')) {
      return res.status(400).json({ message: 'Email must be a @lakeheadu.ca email.' });
    }

    // Query the database
    const result = await sql.query`SELECT * FROM users WHERE email = ${email} AND password = ${password}`;

    if (result.recordset.length === 0) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    // Successful login
    res.json({ message: 'Login successful.' });
  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).json({ message: 'Server error.' });
  }
});

// Start the server
const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
