const express = require('express');
const searchRoutes = require('./routes/searchRoutes');
const registerWithEureka = require('./eureka-client');

require('dotenv').config({ path: __dirname + '/../.env' });

const app = express();
const PORT = process.env.PORT || 3002;

app.use(express.json());
app.use('/search', searchRoutes);

app.listen(PORT, () => {
  console.log(`Search Service running on port ${PORT}`);
  registerWithEureka('search-service', PORT);
});
