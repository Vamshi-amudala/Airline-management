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
  db.query(
    'SELECT source, destination FROM airline_management.flights WHERE id = ?',
    [flight_id],
    (err, flightRows) => {
      if (err) return callback(err);
      if (flightRows.length === 0) return callback(new Error('Flight not found'));

      const { source, destination } = flightRows[0];

      const sql = `
        INSERT INTO bookings (user_id, flight_id, flight_date, source, destination, status)
        VALUES (?, ?, ?, ?, ?, 'booked')
      `;
      db.query(sql, [userId, flight_id, flight_date, source, destination], callback);
    }
  );
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
      JOIN airline_management.flights f ON b.flight_id = f.id
      WHERE u.email = ?

    `;
    db.query(sql, [email], callback);
  },


    updateUserDetails: (updateData, callback) => {
        const { bookingId, name, email, phone } = updateData;

        const sql = `
            UPDATE users
            SET name = ?, email = ?, phone = ?
            WHERE id = ?
        `;

        db.query(sql, [name, email, phone, bookingId], callback);
    },

  getById: (bookingId, callback) => {
    const sql = 'SELECT * FROM bookings WHERE id = ?';
    db.query(sql, [bookingId], callback);
  }
};


module.exports = BookingModel;
