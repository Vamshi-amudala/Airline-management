require('dotenv').config({ path: __dirname + '/../.env' });

const express = require('express');
const registerWithEureka = require('./eureka-client');
const bookingRoutes = require('./routes/bookingRoutes');

const app = express();
const PORT = process.env.PORT || 3001;


app.use(express.json());


app.use('/book', bookingRoutes);


app.listen(PORT, () => {
  console.log(`Booking Service running on port ${PORT}`);
  registerWithEureka('booking-service', PORT);
});
