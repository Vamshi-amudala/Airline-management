const db = require('../db');

const BookingModel = {
  createBooking: (bookingData, callback) => {
    const { name, email, phone, flight_id } = bookingData;

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
        // Step 1: Fetch flight info
        db.query(
          'SELECT source, destination, departure_time FROM airline_management.flights WHERE id = ?',
          [flight_id],
          (err, flightRows) => {
            if (err) return callback(err);
            if (flightRows.length === 0) return callback(new Error('Flight not found'));

            const { source, destination, departure_time } = flightRows[0];

            // Step 2: Get all unbooked seats for this flight
            db.query(
              'SELECT seat_number FROM flight_seats WHERE flight_id = ? AND is_booked = FALSE',
              [flight_id],
              (err, seatRows) => {
                if (err) return callback(err);
                if (seatRows.length === 0) return callback(new Error('No seats available'));

                // Pick a random seat
                const randomIndex = Math.floor(Math.random() * seatRows.length);
                const seatNumber = seatRows[randomIndex].seat_number;

                // Step 3: Insert booking with seat
                const sql = `
                  INSERT INTO bookings (user_id, flight_id, flight_time, source, destination, seat_number, status)
                  VALUES (?, ?, ?, ?, ?, ?, 'booked')
                `;
                db.query(
                  sql,
                  [userId, flight_id, departure_time, source, destination, seatNumber],
                  (err, result) => {
                    if (err) return callback(err);

                    // Step 4: Mark seat as booked
                    db.query(
                      'UPDATE flight_seats SET is_booked = TRUE WHERE flight_id = ? AND seat_number = ?',
                      [flight_id, seatNumber],
                      (err2) => {
                        if (err2) return callback(err2);

                        callback(null, {
                          message: 'Booking created successfully',
                          bookingId: result.insertId,
                          seatNumber: seatNumber
                        });
                      }
                    );
                  }
                );
              }
            );
          }
        );
      }
    });
  },

  getBookingsByEmail: (email, callback) => {
    const sql = `
        SELECT b.id AS booking_id, b.flight_time, b.status,b.seat_number,
            u.name, u.email, u.phone,
            f.flight_number, f.source, f.destination, f.airline, f.price
      FROM bookings b
      JOIN users u ON b.user_id = u.id
      JOIN airline_management.flights f ON b.flight_id = f.id
      WHERE u.email = ?

    `;
    db.query(sql, [email], callback);
  },


updateBooking: (updateData, callback) => {
    const { bookingId, name, email, phone, newFlightId } = updateData;

    db.query('SELECT user_id FROM bookings WHERE id = ?', [bookingId], (err, result) => {
        if (err) return callback(err);
        if (result.length === 0) return callback(new Error('Booking not found'));

        const userId = result[0].user_id;
        db.query(
            'UPDATE users SET name = ?, email = ?, phone = ? WHERE id = ?',
            [name, email, phone, userId],
            (err2) => {
                if (err2) return callback(err2);

                db.query(
                    'UPDATE bookings SET flight_id = ? WHERE id = ?',
                    [newFlightId, bookingId],
                    callback
                );
            }
        );
    });
},


  getById: (bookingId, callback) => {
    const sql = 'SELECT * FROM bookings WHERE id = ?';
    db.query(sql, [bookingId], callback);
  }
};


module.exports = BookingModel;
