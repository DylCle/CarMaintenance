const express = require("express");
const router = express.Router();
const path = require('path');
router.get('/', (req, res) => {

    let disableLink = () => {
        console.log('Acess denied');
        return res.status(500).json({ error: 'Error reseeting pwd' });
    }
    let timer = 10000;
    // setTimeout(disableLink, timer);

    if (timer === 0) {
        console.log(`Received a POST request from`);
        res.send('timeout')
        return;
    }

    if (timer > 0) {
        console.log(`Received a GET request from`);

        const publicPath = path.join(__dirname, '../public');
        console.log(publicPath);
        //res.sendFile(path.join(publicPath, 'newpwd.html', ));
        res.send(`
        <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" id="dynamic-css" href="../css/styles.css">
    <script id="dynamic-js" src="../js/new-pwd.js" defer type="module"></script>
    <title>Document</title>
</head>
<body>
    <div id="reset-form" >
        <button class="exit" style="color: blue;">X</button>
        <label for="New password">New password</label>
        <input type="password" name="password" id="password">
        <label for="Confirm new password">Confirm new password</label>
        <input type="password" name="confirm-password" id="confirm-password">
        <button id="send-btn">Send</button>
    </div>
    
</body>
</html>
        `)
    }

    // You can send a response back to the client if required
    // res.json({ status: 'success', message: `Message received from ${username}` });
});



module.exports = router;