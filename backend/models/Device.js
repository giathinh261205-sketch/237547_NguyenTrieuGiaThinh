const mongoose = require('mongoose');

const deviceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  status: { type: String, enum: ['Active', 'Maintenance', 'Inactive'], default: 'Active' },
  classroom: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Device', deviceSchema);