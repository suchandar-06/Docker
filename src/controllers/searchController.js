const db = require('../config/db');

exports.searchTransport = (req, res) => {
  const { type, from, to, date } = req.query;

  if (!type || !['flight', 'bus'].includes(type.toLowerCase())) {
    return res.status(400).json({
      success: false,
      message: "Query parameter 'type' must be either 'flight' or 'bus'."
    });
  }

  const category = type.toLowerCase() === 'flight' ? 'flights' : 'buses';
  let results = db[category];

  if (from) {
    results = results.filter(item => item.from.toUpperCase() === from.trim().toUpperCase());
  }
  if (to) {
    results = results.filter(item => item.to.toUpperCase() === to.trim().toUpperCase());
  }
  if (date) {
    results = results.filter(item => item.date === date.trim());
  }

  return res.status(200).json({
    success: true,
    count: results.length,
    data: results
  });
};

exports.getItemById = (req, res) => {
  const { type, id } = req.params;
  const category = type.toLowerCase() === 'flight' ? 'flights' : 'buses';

  if (!db[category]) {
    return res.status(400).json({ success: false, message: "Invalid service type." });
  }

  const item = db[category].find(entry => entry.id === id);
  if (!item) {
    return res.status(404).json({ success: false, message: `${type} with ID ${id} not found.` });
  }

  return res.status(200).json({ success: true, data: item });
};
