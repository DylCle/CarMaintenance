const express = require("express");
const router = express.Router();
const mysql = require('mysql2');
const path = require('path');
let email = '';
require('dotenv').config({ path: path.resolve(__dirname, '..', '..',  '.env') });
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'falco',
    password: process.env.DB_PASS,
    database: 'usersdatabase',
});

router.post('/', (req, res) => {
    const {userName, email } = req.body; 
    const query = 'SELECT email, userName FROM users WHERE email = ?';

    connection.query(query, [email], (err, results) => {
        if (err) {
            console.error('Error querying the database:', err);
            return res.status(500).json({ error: 'Error querying the database' });
        }
    
        if (results.length === 0) {
            return res.status(401).json({ error: 'User not found' });
        }
        const user = results[0];
        console.log(user.userName);
        res.status(200).json({userName: user.userName});
    })

});

module.exports = {
    router,
    email,
  };

