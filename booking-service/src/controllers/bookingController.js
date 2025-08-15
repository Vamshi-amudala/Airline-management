const BookingModel = require('../models/bookingModel');

exports.bookFlight = (req, res) => {
    console.log("Booking received", req.body);

    const newBooking = req.body;

    // ⚡ Use the correct function name
    BookingModel.createBooking(newBooking, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });

        res.status(200).json({
            bookingId: result.insertId,
            ...newBooking
        });
    });
};
