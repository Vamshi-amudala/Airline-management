const axios = require("axios");
const NOTIFY_URL = "http://localhost:3004/notify";

async function sendBookingNotification(user, booking) {
  const message = `Hi ${user.name}, your ticket is booked.\nFlight: ${booking.flight_number}\nSeat: ${booking.seat_number}`;
  await axios.post(NOTIFY_URL, { email: user.email, subject: "Booking Confirmed", message });
}

async function sendUpdateNotification(user, oldBooking, newBooking) {
  const message = `Hi ${user.name}, your booking has been updated.\nOld Flight: ${oldBooking.flight_number} Seat: ${oldBooking.seat_number}\nNew Flight: ${newBooking.flight_number} Seat: ${newBooking.seat_number}`;
  await axios.post(NOTIFY_URL, { email: user.email, subject: "Booking Updated", message });
}

async function sendCancelNotification(user, booking) {
  const message = `Hi ${user.name}, your ticket has been cancelled.\nFlight: ${booking.flight_number}\nSeat: ${booking.seat_number}`;
  await axios.post(NOTIFY_URL, { email: user.email, subject: "Booking Cancelled", message });
}

module.exports = { sendBookingNotification, sendUpdateNotification, sendCancelNotification };
