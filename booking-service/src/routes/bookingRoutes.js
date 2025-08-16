const express = require('express');
const router = express.Router();
const BookingController = require('../controllers/bookingController');

router.post('/', BookingController.bookFlight);
router.get('/', BookingController.getBookingsByEmail);
router.put('/:bookingId/user', BookingController.updateTicket);
module.exports = router;