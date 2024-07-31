// Import necessary libraries
const express = require('express');
const cors = require('cors');

// Create an instance of express to serve our app
const app = express();

// Middleware
app.use(express.json()); // Used to parse JSON bodies
app.use(cors()); // Enable All CORS Requests

// Initialize the main project data object
let projectData = {};

// Initialize the main route with a GET method
app.get('/all', (req, res) => {
    res.send(projectData);
});

// POST route to add new data to projectData
app.post('/add', (req, res) => {
    projectData = { ...req.body }; // This spreads the incoming body onto the projectData object
    res.send(projectData); // Send back the updated data
});

// Setup server
const port = 3000;
app.listen(port, () => {
    console.log(`Server running on localhost:${port}`);
});
