const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt'); 
const saltRounds = 10; 
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const mysql = require('mysql2');
const path = require('path');
const {sendMail} = require('../public/js/emailer');
require('dotenv').config({ path: path.resolve(__dirname, '..', '..',  '.env') });
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'falco',
  password: process.env.DB_PASS,
  database: 'usersdatabase',
});

router.post('/', (req, res) => {
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
    if (email.toLowerCase() !== confirm_Email.toLowerCase()) {
      return res.status(400).json({ message: 'Emails do not match' });
    } else if (password !== confirm_Password) {
      return res.status(400).json({ message: 'Passwords do not match' });
    } else if (!emailPattern.test(email)){
        return res.status(400).json({ message: 'Invalid email format' });
    } else{
      const sendTo = `${email}`;
      const mailOptions = {
        from: process.env.MY_EMAIL,
        subject: 'Thanks for signing up',
        text: 'Hey, this is a test for when users sign up. Your user name is ' + userName
      }
      
      sendMail(sendTo, mailOptions)
        .then(info => {
          console.log("email sentL " + info.response);
        })  .catch(error => {
          console.log(error);
        });
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
        password: hash, 
        confirm_Password: hash, 
      };
  
      // Save the user data to the MySQL database
      const query =
        'INSERT INTO users (userName, first_name, last_name, email, confirm_email, password, confirm_password) VALUES (?, ?, ?, ?, ?, ?, ?)';
      const values = [
        user.userName,
        user.first_Name.toLowerCase(),
        user.last_Name.toLowerCase(),
        user.email.toLowerCase(),
        user.confirm_Email.toLowerCase(),
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

  module.exports = router;