const express = require('express');
const path = require('path');
const app = express();
const port = 3000; 

// Get the absolute path to the 'public' folder
const publicPath = path.join(__dirname, './public');

// Middleware to serve static files from the 'public' folder
app.use(express.static(publicPath));

// Route for the root URL, you can remove the previous 'app.get' for '/'
app.get('/', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
