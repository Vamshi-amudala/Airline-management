const FlightModel = require('../models/flightModel');

exports.getAllFlights = (req, res) => {
  FlightModel.getAll((err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

exports.getFlightById = (req, res) => {
  FlightModel.getById(req.params.id, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ error: 'Flight not found' });
    res.json(results[0]);
  });
};


exports.createFlight = (req, res) => {
  console.log('Body received:', req.body);
  const newFlight = req.body;
  FlightModel.create(newFlight, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id: result.insertId, ...newFlight });
  });
};


exports.updateFlight = (req, res) => {
  FlightModel.update(req.params.id, req.body, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Flight updated successfully' });
  });
};

exports.deleteFlight = (req, res) => {
  FlightModel.delete(req.params.id, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Flight deleted successfully' });
  });
};
