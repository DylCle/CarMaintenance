const express = require('express');
const path = require('path');
const app = express();
const port = 3000;
const bcrypt = require('bcrypt');
const saltRounds = 10;

app.use(express.json());

const mysql = require('mysql2');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'falco',
  password: '1337',
  database: 'usersdatabase',
});

const publicPath = path.join(__dirname, './public');
app.use(express.static(publicPath));



app.get('/', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});



app.post('/check-field', (req, res) => {
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

app.post('/login', (req, res) => {
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


app.post('/signup', (req, res) => {
  const {
    userName,
    first_Name,
    last_Name,
    email,
    confirm_Email,
    password,
    confirm_Password,
  } = req.body;

  // Check if emails and passwords match
  if (email !== confirm_Email) {
    return res.status(400).json({ message: 'Emails do not match' });
  } else if (password !== confirm_Password) {
    return res.status(400).json({ message: 'Passwords do not match' });
  }

  // Hash the password using bcrypt
  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to hash password' });
    }

    // Create an object with the user data (including the hashed password)
    const user = {
      userName,
      first_Name,
      last_Name,
      email,
      confirm_Email,
      password: hash, // Store the hashed password in the database
      confirm_Password: hash, // Store the hashed password in the database
    };

    // Save the user data to the MySQL database
    const query =
      'INSERT INTO users (userName, first_name, last_name, email, confirm_email, password, confirm_password) VALUES (?, ?, ?, ?, ?, ?, ?)';
    const values = [
      user.userName,
      user.first_Name,
      user.last_Name,
      user.email,
      user.confirm_Email,
      user.password,
      user.confirm_Password,
    ];

    connection.query(query, values, (err, results) => {
      if (err) {
        console.log('error saving data: ' + err);
        res.status(500).json({ message: 'Error saving data' });
      } else {
        console.log('user data saved to database');
        res.status(200).json({ message: 'User signed up' });
      }
      connection.end();
    });
  });
});


// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
