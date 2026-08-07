const mongoose = require('mongoose');

const noticeSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    message: { type: String, required: true, trim: true },
    important: { type: Boolean, default: false },
    pinned: { type: Boolean, default: false },
    // 'ALL' reaches everyone. Otherwise only students in this branch see it.
    targetBranch: { type: String, enum: ['ALL', 'CSE', 'IT'], default: 'ALL' },
    // 0 means every semester. Otherwise only that semester sees it.
    targetSemester: { type: Number, enum: [0, 1, 2, 3], default: 0 },
    createdAt: { type: Date, default: Date.now },
  },
  { versionKey: false }
);

module.exports = mongoose.model('Notice', noticeSchema);
