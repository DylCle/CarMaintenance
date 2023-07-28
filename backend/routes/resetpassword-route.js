const express = require("express");
const router = express.Router();
const mysql = require('mysql2');
const path = require('path');
const axios = require('axios');
const { sendMail } = require('../public/js/emailer');
let email = '';
require('dotenv').config({ path: path.resolve(__dirname, '..', '..', '.env') });
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'falco',
    password: process.env.DB_PASS,
    database: 'usersdatabase',
});

router.post('/', (req, res) => {
    const { userName, email } = req.body;
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
        const linkId = require('../server.js');
        console.log(linkId);
        const url = `http://localhost:3000/id/${linkId}/username/${user.userName}`;
        console.log(url);

        axios.post(url, user, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(result => {
                console.log(result + 'this here!'); 
            })
            .catch(error => {
                console.error('Error:', error);
            });
        const sendTo = `${email}`;
        const mailOptions = {
            from: process.env.MY_EMAIL,
            subject: 'Reset Password',
            text: 'Hey, this is a test for when users Reset Passwords. Click the link here ' + url
        }
        sendMail(sendTo, mailOptions)
            .then(info => {
                console.log("email sentL " + info.response);
            }).catch(error => {
                console.log(error);
            });
        res.status(200).json({ userName: user.userName });
    })

});

module.exports = {
    router,
    email,
};

