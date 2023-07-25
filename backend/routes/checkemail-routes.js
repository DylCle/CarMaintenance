const express = require('express');
const router = express.Router();
const mysql = require('mysql2');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '..', '..',  '.env') });
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'falco',
  password: process.env.DB_PASS,
  database: 'usersdatabase',
});
router.post('/', (req, res) => {
  const { field, value } = req.body;
  const sql = `SELECT COUNT(*) AS count FROM users WHERE ${field} = ?`;
  connection.query(sql, [value], (err, result) => {
    if (err) {
      console.error('Error querying the database:', err);
      res.status(500).json({ error: 'Error querying the database' });
    } else {
      const count = result[0].count;
      res.status(200).json({ exists: count > 0 });
    }
  });
});

module.exports = router;
