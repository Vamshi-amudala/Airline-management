const db = require('../db');

const FlightModel = {
  getAll: (callback) => {
    db.query('SELECT * FROM flights', callback);
  },

  getById: (id, callback) => {
    db.query('SELECT * FROM flights WHERE id = ?', [id], callback);
  },

  create: (flight, callback) => {
    const sql = `
      INSERT INTO flights (flight_number, airline, source, destination, departure_time, arrival_time, price)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    db.query(sql, [
      flight.flight_number, flight.airline, flight.source, flight.destination,
      flight.departureTime, flight.arrivalTime, flight.price
    ], callback);
  },

  update: (id, flight, callback) => {
    const sql = `
      UPDATE flights 
      SET flight_number=?, airline=?, source=?, destination=?, departure_time=?, arrival_time=?, price=?
      WHERE id=?
    `;
    db.query(sql, [
      flight.flight_number, flight.airline, flight.source, flight.destination,
      flight.departureTime, flight.arrivalTime, flight.price, id
    ], callback);
  },

  delete: (id, callback) => {
    db.query('DELETE FROM flights WHERE id = ?', [id], callback);
  }
};

module.exports = FlightModel;
