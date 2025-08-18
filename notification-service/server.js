require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const notificationRoutes = require("./routes/notificationRoutes");

const app = express();
app.use(bodyParser.json());
app.use("/", notificationRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Notification Service running on port ${PORT}`));
