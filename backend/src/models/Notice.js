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
    targetSemester: { type: Number, enum: [0, 1, 2, 3, 4, 5, 6], default: 0 },
    // Shown as a scrolling ticker on the public landing page — separate from
    // whether it reaches logged-in students, so an admin can run a
    // public-facing announcement without it also appearing in the app.
    ticker: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
  },
  { versionKey: false }
);

module.exports = mongoose.model('Notice', noticeSchema);
