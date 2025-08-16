const BookingModel = require('../models/bookingModel');

const bookFlight = (req, res) => {
    const newBooking = req.body;
    BookingModel.createBooking(newBooking, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json({ bookingId: result.insertId, ...newBooking });
    });
};

const getBookingsByEmail = (req, res) => {
    const email = req.query.email; // pass email as query param
    BookingModel.getBookingsByEmail(email, (err, bookings) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json({ bookings });
    });
};


const updateTicket = (req, res) => {
    const bookingId = req.params.bookingId;
    const { name, email, phone, newFlightId } = req.body; 

    const updateData = { bookingId, name, email, phone, newFlightId };

    BookingModel.updateBooking(updateData, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        res.status(200).json({ message: "Ticket updated successfully", result });
    });
};


module.exports = { bookFlight, getBookingsByEmail , updateTicket};
