const mongoose = require('mongoose');

const CONTENT_TYPES = [
  'classtest', 'pyq', 'important', 'vvi', 'sample',
  'notes', 'syllabus', 'assignment', 'practical',
  'termwork', 'hots', 'ytlink',
];

const contentSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    type: { type: String, required: true, enum: CONTENT_TYPES },
    branch: { type: String, required: true, enum: ['CSE', 'IT'] },
    semester: { type: Number, required: true, enum: [1, 2, 3] },
    subject: { type: String, default: '', trim: true },
    fileUrl: { type: String, required: true },
    cloudinaryPublicId: { type: String, default: '' },
    downloadCount: { type: Number, default: 0 },
    uploadedAt: { type: Date, default: Date.now },
  },
  { versionKey: false }
);

contentSchema.index({ branch: 1, semester: 1, type: 1 });

module.exports = mongoose.model('Content', contentSchema);
module.exports.CONTENT_TYPES = CONTENT_TYPES;
