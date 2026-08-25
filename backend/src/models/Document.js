const mongoose = require('mongoose');

// Official college documents — bonafide certificate, forms, no-dues form,
// fee structure, etc. Deliberately separate from the Content model (which
// is semester/branch-specific study material) since these apply to
// everyone and aren't tied to a branch or semester.
const documentSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true }, // free text, e.g. "Bonafide", "Forms", "Fee Structure"
    description: { type: String, default: '', trim: true },
    fileUrl: { type: String, required: true },
    cloudinaryPublicId: { type: String, default: '' },
    fileType: { type: String, default: 'PDF' }, // e.g. PDF, ZIP, DOCX — shown as a small badge
    fileSizeBytes: { type: Number, default: 0 },
    downloadCount: { type: Number, default: 0 },
    order: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
  },
  { versionKey: false }
);

module.exports = mongoose.model('Document', documentSchema);
