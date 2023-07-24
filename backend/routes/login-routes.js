const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;
const mysql = require('mysql2');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'falco',
  password: '1337',
  database: 'usersdatabase',
});

router.post('/', (req, res) => {
    console.log(req.body);
    const { userName, password } = req.body;
    const query = 'SELECT userName, password FROM users WHERE userName = ?';
    connection.query(query, [userName], (err, results) => {
      if (err) {
        console.error('Error querying the database:', err);
        return res.status(500).json({ error: 'Error querying the database' });
      }
  
      if (results.length === 0) {
        return res.status(401).json({ error: 'User not found' });
      }
  
      const user = results[0];
      const hashedPassword = user.password;
  
      bcrypt.compare(password, hashedPassword, (err, match) => {
        if (err) {
          console.error('Error comparing passwords:', err);
          return res.status(500).json({ error: 'Error comparing passwords' });
        }
  
        if (match) {
          res.status(200).json({ message: `Login successful ${user.userName}` });
        } else {
          return res.status(401).json({ error: 'Invalid credentials' });
        }
      });
    });
  });

  module.exports = router;
  