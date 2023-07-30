const express = require("express");
const router = express.Router();
const path = require('path');
const mysql = require('mysql2');
const multer = require('multer');
const fs = require('fs');
const { getLoggedId } = require('./login-routes.js');
require('dotenv').config({ path: path.resolve(__dirname, '..', '..', '.env') });
const dbConfig = ({
    host: 'localhost',
    user: 'falco',
    password: process.env.DB_PASS,
    database: 'usersdatabase',
});

router.use(express.json());

//HANDLES THE IMAGE
//CHECK SERVER.JS FOR MORE
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({ storage: storage });
router.post('/', upload.single('carImage'), async (req, res) => {
    try {
        const { carMake, carModel, carYear, userId } = req.body;
        if (!req.file) {
            return res.status(400).send('No file uploaded.');
        }

        //NEEDED TO GET FILE NAME
        const carImage = req.file.filename;

        // Save file details and car information to the database
        const connection = await mysql.createConnection(dbConfig);

        // Insert the car details into the cars table
        const [result] = await connection.execute(
            'INSERT INTO cars (UserId_FK, CarMake, CarModel, CarYear, CarImage) VALUES (?, ?, ?, ?, ?)',
            [userId, carMake, carModel, carYear, carImage]
        );

        connection.end();

        res.status(200).send(`Car uploaded successfully! Car ID: ${result.insertId}`);
    } catch (err) {
        console.error(err);
        res.status(500).send('An error occurred while uploading the car.');
    }
});




module.exports = router;