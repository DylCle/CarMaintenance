const express = require("express");
const router = express.Router();
const path = require('path');
const mysql = require('mysql2');
const { getLoggedId } = require('./login-routes.js');
require('dotenv').config({ path: path.resolve(__dirname, '..', '..', '.env') });
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'falco',
    password: process.env.DB_PASS,
    database: 'usersdatabase',
});

router.use(express.json());

router.put('/', (req, res) => {
    try {


        const loggedId = getLoggedId();
        const { CarMake, CarModel, CarYear, userId } = req.body;

        const query = `INSERT INTO cars (CarMake, CarModel, CarYear, UserId_FK) VALUES (?, ?, ?, ?);`
        connection.query(query, [CarMake, CarModel, CarYear, userId], (err, results) => {
            if (err) {
               return res.send(err)
            } else {
                return res.json({ message: 'Data saved successfully' });
            }
        })

    } catch (error) {
        console.error('Error querying the database:', error);
        res.status(500).json({ error: 'Error querying the database' });
    }
})



module.exports = router;