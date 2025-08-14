require('dotenv').config({ path: __dirname + '/../.env' });

const express = require('express');
const registerWithEureka = require('./eureka-client');
const flightRoutes = require('./routes/flightRoutes');

const app = express();
app.use(express.json());
app.use('/flights', flightRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Flights Service running on port ${PORT}`);
  registerWithEureka('flights-service', PORT);
});
