require('dotenv').config();
const express = require('express');
const registerWithEureka = require('./eureka-client');

const app = express();
const PORT = process.env.PORT || 3002;

// Middleware
app.use(express.json());

// Routes
app.get('/search', (req, res) => {
    res.json({ message: 'Search Service is working!' });
});

// Start server
app.listen(PORT, () => {
    console.log(`Search Service running on port ${PORT}`);
    registerWithEureka('search-service', PORT);
});

