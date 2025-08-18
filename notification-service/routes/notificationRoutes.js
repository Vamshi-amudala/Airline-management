const express = require("express");
const router = express.Router();
const { notify } = require("../controllers/notificationController");

router.post("/notify", notify);

module.exports = router;
