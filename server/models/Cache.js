const mongoose = require('mongoose');

const cacheSchema = new mongoose.Schema({
  query: { type: String, required: true },
  results: { type: Array, required: true },
  timestamp: { type: Date, default: Date.now, expires: '1d' } // Expire cache after 24 hours
});

module.exports = mongoose.model('Cache', cacheSchema);
