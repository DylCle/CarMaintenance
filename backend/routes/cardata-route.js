const express = require("express");
const router = express.Router();
const path = require('path');
const mysql = require('mysql2');
const { getLoggedId } = require('./login-routes.js');
let logger;
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
router.get('/', async (req, res) => {
    try {
        const loggedId = getLoggedId();
        // Wait for the Promise to resolve the loggedId before proceeding
        const carsQuery = 'select CarMake, CarModel, CarYear, CarImage from cars WHERE UserId_FK = ?';
        const results = await new Promise((resolve, reject) => {
            connection.query(carsQuery, [loggedId], (err, results) => {
                if (err) {
                    console.error('Error querying the database:', err);
                    reject(err);
                } else {
                    console.log(results)
                    resolve(results);
                }
            });
        });

        if (results.length === 0) {
            return res.status(404).json({ error: 'No data found for the user' });
          }

        res.send(results[0]);
        console.log(loggedId + ' ' + 'this userid');
    } catch (error) {
        console.error('Error querying the database:', error);
        res.status(500).json({ error: 'Error querying the database' });
    }
});

module.exports = router;