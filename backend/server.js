const express = require('express');
const path = require('path');
const mysql = require('mysql2');
const app = express();
const port = 3000;

const publicPath = path.join(__dirname, './public');
app.use(express.static(publicPath));

app.get('/', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

// MySQL connection setup
const pool = mysql.createPool({
  database: 'mydusersdatabase',
});

// Test the connection
pool.getConnection((err, connection) => {
  if (err) throw err;
  console.log('Connected to MySQL!');
  connection.release(); // Release the connection to the pool
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
