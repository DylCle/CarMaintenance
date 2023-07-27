const express = require("express");
const router = express.Router();
const path = require('path');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const saltRounds = 10;
require('dotenv').config({ path: path.resolve(__dirname, '..', '..', '.env') });
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'falco',
    password: process.env.DB_PASS,
    database: 'usersdatabase',
});

router.use(express.json());

router.get('/:id/:username', (req, res) => {
    const publicPath = path.join(__dirname, '../public');
    res.sendFile(path.join(publicPath, 'newpwd.html'));
});
router.put('/:username', (req, res) => {
    const { password, confirm_Password, storedUsername } = req.body;
  
    bcrypt.hash(password, saltRounds, (err, hash) => {
    
  
      const query = 'UPDATE users SET password = ?, confirm_password = ? WHERE username = ?';
      const user = {password:hash, confirm_Password:hash, storedUsername}
      const values = [user.password, user.confirm_Password, user.storedUsername];
  
      connection.query(query, values, (err, results) => {
        if (err) {
          console.log('Error updating password: ' + err);
          return res.status(500).json({ message: 'Error updating password' });
        } else {
          console.log('Password updated');
          return res.status(200).json({ message: 'Password updated successfully' });
        }
      });
    });
  });

module.exports = router;