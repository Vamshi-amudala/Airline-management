const Search = require('../models/searchModel');

const searchController = (req, res) => {
  const filters = req.query; // source, destination, date, airline, minPrice, maxPrice

  Search.searchFlights(filters, (err, results) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: 'No flights found' });
    }
    res.json(results);
  });
};

module.exports = { searchController };
