const db = require('../db');

const BookingModel = {
  createBooking: (bookingData, callback) => {
    const { name, email, phone, flight_id, flight_date } = bookingData;


    db.query('SELECT id FROM users WHERE email = ?', [email], (err, users) => {
      if (err) return callback(err);

      let userId;

      if (users.length > 0) {

        userId = users[0].id;
        insertBooking(userId);
      } else {
        db.query(
          'INSERT INTO users (name, email, phone) VALUES (?, ?, ?)',
          [name, email, phone],
          (err, result) => {
            if (err) return callback(err);
            userId = result.insertId;
            insertBooking(userId);
          }
        );
      }

      function insertBooking(userId) {
        const sql = `
          INSERT INTO bookings (user_id, flight_id, flight_date, status)
          VALUES (?, ?, ?, 'booked')
        `;
        db.query(sql, [userId, flight_id, flight_date], callback);
      }
    });
  },

  getBookingsByEmail: (email, callback) => {
    const sql = `
        SELECT b.id AS booking_id, b.flight_date, b.status,
            u.name, u.email, u.phone,
            f.flight_number, f.source, f.destination, f.airline, f.price
      FROM bookings b
      JOIN users u ON b.user_id = u.id
      JOIN flights f ON b.flight_id = f.id
      WHERE u.email = ?

    `;
    db.query(sql, [email], callback);
  },
pdateUserDetails: (bookingId, userDetails, callback) => {
  const { name, email, phone } = userDetails;

  db.query('SELECT user_id FROM bookings WHERE id = ?', [bookingId], (err, result) => {
    if (err) return callback(err);
    if (result.length === 0) return callback(new Error('Booking not found'));

    const userId = result[0].user_id;

    const sql = 'UPDATE users SET name = ?, email = ?, phone = ? WHERE id = ?';
    db.query(sql, [name, email, phone, userId], callback);
  });
},

  getById: (bookingId, callback) => {
    const sql = 'SELECT * FROM bookings WHERE id = ?';
    db.query(sql, [bookingId], callback);
  }
};


module.exports = BookingModel;
