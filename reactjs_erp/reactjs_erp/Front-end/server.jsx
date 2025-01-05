const express = require('express');
const path = require('path');

const app = express();

// Serve the React frontend
app.use(express.static(path.join(__dirname, 'build')));

// Define API endpoints
app.get('/api/data', (req, res) => {
  // Example API endpoint
  res.json({ message: 'Hello from the backend!' });
});

// Serve the React app for any other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
