const express = require("express");
const router = express.Router();

router.get('/', (req, res) => {

    let disableLink = () =>  {
        console.log('Acess denied');
        return res.status(500).json({ error: 'Error reseeting pwd' });
    }
    let timer = 10000; 
    setTimeout(disableLink, timer);

    if( timer === 0){
        console.log(`Received a POST request from`);
        res.send('timeout')
        return;
    }

    if (timer > 0){
        console.log(`Received a GET request from`);
        res.send('Timer isnt zero yet')
    }
  
    // You can send a response back to the client if required
    // res.json({ status: 'success', message: `Message received from ${username}` });
  });



module.exports = router;