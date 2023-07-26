const express = require('express');
const bodyParser = require("body-parser");
const path = require('path');
const app = express();
const port = 3000;
const {router: loginRoute, loggedInUserName} = require('./routes/login-routes.js');
const {router: resetPwdEmail, email} = require('./routes/resetpassword-route.js')
const newPwdPg = require('./routes/newPasswordPage-route.js')
const signUpRoute = require('./routes/signup-routes.js');
const checkEmail = require('./routes/checkemail-routes.js')
let ranId = Math.floor(Math.random() * 10000) + 3;
module.exports = ranId;
console.log(ranId);
require('dotenv').config();

app.use(bodyParser.json());
app.use(express.json());

app.use('/send-reset-pwd-email', resetPwdEmail);
app.use(`/${ranId}/:username`, newPwdPg)
app.use('/login', loginRoute);
app.use('/check-field', checkEmail);
app.use('/signup', signUpRoute);

const publicPath = path.join(__dirname, './public');
app.use(express.static(publicPath));

app.get('/', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

// app.get('/profile', (req, res) => {
//   // Use the loggedInUserName value in the response
//   console.log(loggedInUserName);
//   res.status(200).json({ userName: loggedInUserName });
// });

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

