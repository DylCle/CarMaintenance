const express = require('express');
const bodyParser = require("body-parser");
const path = require('path');
const app = express();
const port = 3000;
const {router: loginRoute, loggedInUserName, loggedId} = require('./routes/login-routes.js');
const {router: resetPwdEmail, email} = require('./routes/resetpassword-route.js')
const newPwdPg = require('./routes/newPasswordPage-route.js')
const signUpRoute = require('./routes/signup-routes.js');
const checkEmail = require('./routes/checkemail-routes.js')
const carData = require('./routes/cardata-route.js')
const urlId = require('./dynamic.js');
require('dotenv').config();
const id = urlId(15);
module.exports = id;

console.log(id);
app.use(bodyParser.json());
app.use(express.json());

app.use('/send-reset-pwd-email', resetPwdEmail);
app.use(`/:${id}/:username`, newPwdPg)
app.use('/login', loginRoute);
app.use('/check-field', checkEmail);
app.use('/signup', signUpRoute);
app.use('/cardata', carData);

const publicPath = path.join(__dirname, './public');
app.use(express.static(publicPath));

app.get('/', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

