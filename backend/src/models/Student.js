const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    boardRegNo: { type: String, required: true, unique: true, trim: true },
    // NOTE: password is stored in PLAIN TEXT at the explicit request of the
    // project owner. This is a real security risk (see README) — anyone with
    // database access can read every student's password. Switch to bcrypt
    // hashing (a few lines in routes/auth.js) as soon as you're able to.
    password: { type: String, required: true },
    branch: { type: String, required: true, enum: ['CSE', 'IT'] },
    semester: { type: Number, required: true, enum: [1, 2, 3] },
    boardEmail: { type: String, required: true, unique: true, trim: true, lowercase: true },
    boardRollNumber: { type: String, required: true, trim: true },
    dpUrl: { type: String, default: '' },
    hasCompletedFirstLogin: { type: Boolean, default: false },

    // --- new fields ---
    bookmarks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Content' }],
    recentDownloads: [
      {
        content: { type: mongoose.Schema.Types.ObjectId, ref: 'Content' },
        title: String,
        downloadedAt: { type: Date, default: Date.now },
      },
    ],
    totalDownloads: { type: Number, default: 0 },
    lastLoginAt: { type: Date, default: null },
    lastNoticeSeenAt: { type: Date, default: null },

    createdAt: { type: Date, default: Date.now },
  },
  { versionKey: false }
);

module.exports = mongoose.model('Student', studentSchema);
