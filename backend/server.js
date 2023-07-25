const express = require('express');
const bodyParser = require("body-parser");
const path = require('path');
const app = express();
const port = 3000;
const loginRoute = require('./routes/login-routes.js');
const signUpRoute = require('./routes/signup-routes.js');
const checkEmail = require('./routes/checkemail-routes.js')
require('dotenv').config();

app.use(bodyParser.json());
app.use(express.json());

app.use('/login', loginRoute);
app.use('/check-field', checkEmail);
app.use('/signup', signUpRoute);

const publicPath = path.join(__dirname, './public');
app.use(express.static(publicPath));

app.get('/', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
