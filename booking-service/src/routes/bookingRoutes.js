const express = require('express');
const router = express.Router();
const BookingController = require('../controllers/bookingController');

router.post('/', BookingController.bookFlight);
router.get('/', BookingController.getBookingsByEmail);
router.put('/:bookingId/ticket', BookingController.updateTicket);
router.put('/:bookingId/user', BookingController.updateUserDetails);
router.delete('/:bookingId',BookingController.cancelBooking);
module.exports = router;