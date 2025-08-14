require('dotenv').config();
const express = require('express');
const registerWithEureka = require('./eureka-client');

const app = express();
app.use(express.json());

// Flight data (mock)
const flights = [
  { id: 1, from: 'HYD', to: 'DEL', price: 4500 },
  { id: 2, from: 'DEL', to: 'BOM', price: 3500 }
];

// API endpoint
app.get('/flights', (req, res) => {
  res.json(flights);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Flights Service running on port ${PORT}`);
  registerWithEureka('flights-service', PORT);
});
