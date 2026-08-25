const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true, trim: true },
    // NOTE: stored in plain text, matching the same explicit decision made
    // for Student passwords elsewhere in this app (see models/Student.js).
    // Admin accounts have more power than student accounts, so if you
    // switch to bcrypt hashing anywhere first, do it here.
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'superadmin'], default: 'admin' },
    createdAt: { type: Date, default: Date.now },
  },
  { versionKey: false }
);

module.exports = mongoose.model('Admin', adminSchema);
