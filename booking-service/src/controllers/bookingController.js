const BookingModel = require('../models/bookingModel');
const { sendBookingNotification, sendUpdateNotification, sendCancelNotification } = require('../notificationHelpers');

const bookFlight = async (req, res) => {
    const newBooking = req.body;

    BookingModel.createBooking(newBooking, async (err, result) => {
        if (err) return res.status(500).json({ error: err.message });

        const bookingId = result.insertId;
        const bookingData = { ...newBooking, bookingId };

        try {
            await sendBookingNotification(newBooking, bookingData);
        } catch (notifErr) {
            console.error("Notification failed:", notifErr.message);
        }

        res.status(200).json({ bookingId, ...newBooking });
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

const updateTicket = async (req, res) => {
    const bookingId = req.params.bookingId;
    const { newFlightId } = req.body;

    BookingModel.updateBooking(bookingId, newFlightId, async (err, result) => {
        if (err) return res.status(500).json({ error: err.message });

        try {
            await sendUpdateNotification(result, result);
        } catch (notifErr) {
            console.error("Notification failed:", notifErr.message);
        }

        res.status(200).json({ message: "Ticket updated successfully", result });
    });
};

const cancelBooking = async (req, res) => {
    const bookingId = req.params.bookingId;

    BookingModel.cancelBooking(bookingId, async (err, result) => {
        if (err) return res.status(500).json({ error: err.message });

        try {
            await sendCancelNotification(result, result);
        } catch (notifErr) {
            console.error("Notification failed:", notifErr.message);
        }

        res.status(200).json({
            message: "Ticket cancelled successfully",
            bookingId: result.bookingId,
            flightId: result.flightId,
            seatReleased: result.seatReleased
        });
    });
};

module.exports = { bookFlight, getBookingsByEmail, updateTicket, updateUserDetails, cancelBooking };
