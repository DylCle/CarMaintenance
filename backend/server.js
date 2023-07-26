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

require('dotenv').config();
function ranId(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}
let id = ranId(15);
module.exports = id;

console.log(id);
app.use(bodyParser.json());
app.use(express.json());

app.use('/send-reset-pwd-email', resetPwdEmail);
app.use(`/${id}/:username`, newPwdPg)
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

