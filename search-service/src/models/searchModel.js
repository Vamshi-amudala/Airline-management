const db = require('../db');

const Search = {
  searchFlights: (filters, callback) => {
    if (!filters.source || !filters.destination) {
      return callback(new Error('Source and destination are required'));
    }

    let sql = 'SELECT * FROM flights WHERE source = ? AND destination = ?';
    const params = [filters.source, filters.destination];

    if (filters.date) {
      sql += ' AND DATE(departure_time) = ?';
      params.push(filters.date);
    }
    if (filters.airline) {
      sql += ' AND airline = ?';
      params.push(filters.airline);
    }
    if (filters.minPrice) {
      sql += ' AND price >= ?';
      params.push(filters.minPrice);
    }
    if (filters.maxPrice) {
      sql += ' AND price <= ?';
      params.push(filters.maxPrice);
    }

    db.query(sql, params, callback);
  }
};


module.exports = Search;
