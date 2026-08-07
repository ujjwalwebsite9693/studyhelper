const mongoose = require('mongoose');

// A student flagging a broken/wrong file so admins can fix it.
const reportSchema = new mongoose.Schema(
  {
    content: { type: mongoose.Schema.Types.ObjectId, ref: 'Content', required: true },
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
    reason: { type: String, required: true, trim: true },
    status: { type: String, enum: ['open', 'resolved'], default: 'open' },
    createdAt: { type: Date, default: Date.now },
  },
  { versionKey: false }
);

module.exports = mongoose.model('Report', reportSchema);
