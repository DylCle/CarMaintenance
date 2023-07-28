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
router.get('/', (req, res) => {
     const query = 'select CarMake, CarModel, CarYear, CarImage from cars';
     connection.query(query, (err, results) => {
        if (err) {
            console.error('Error querying the database:', err);
            return res.status(500).json({ error: 'Error querying the database' });
          }
          res.send(results[0])
     })
  
});

module.exports = router;