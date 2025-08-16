const BookingModel = require('../models/bookingModel');

const bookFlight = (req, res) => {
    const newBooking = req.body;
    BookingModel.createBooking(newBooking, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json({ bookingId: result.insertId, ...newBooking });
    });
};

const getBookingsByEmail = (req, res) => {
    const email = req.query.email;
    BookingModel.getBookingsByEmail(email, (err, bookings) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json({ bookings });
    });
};

const updateUserDetails = (req, res) => {
    const bookingId = req.params.bookingId;
    const { name, email, phone } = req.body;

    BookingModel.updateUserDetails({ bookingId, name, email, phone }, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });

        res.status(200).json({ message: "User details updated successfully" });
    });
};

const updateTicket = (req, res) => {
    const bookingId = req.params.bookingId;
    const { newFlightId } = req.body;

    BookingModel.updateBooking(bookingId, newFlightId, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        res.status(200).json({ message: "Ticket updated successfully", result });
    });
};



module.exports = { bookFlight, getBookingsByEmail , updateTicket, updateUserDetails};