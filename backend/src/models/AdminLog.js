const mongoose = require('mongoose');

// A simple audit trail of admin actions, shown on the admin dashboard.
const adminLogSchema = new mongoose.Schema(
  {
    action: { type: String, required: true }, // e.g. "content.upload", "student.delete"
    details: { type: String, default: '' },
    createdAt: { type: Date, default: Date.now },
  },
  { versionKey: false }
);

module.exports = mongoose.model('AdminLog', adminLogSchema);
