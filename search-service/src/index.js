require('dotenv').config();
const express = require('express');
const registerWithEureka = require('./eureka-client');

const app = express();
const PORT = process.env.PORT || 3002;


app.use(express.json());


app.get('/search', (req, res) => {
    res.json({ message: 'Search Service is working!' });
});


app.listen(PORT, () => {
    console.log(`Search Service running on port ${PORT}`);
    registerWithEureka('search-service', PORT);
});

