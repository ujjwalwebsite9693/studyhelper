const mongoose = require('mongoose');

// Public "Meet the Team" page — separate from Admin accounts, since not
// every team member (e.g. a content manager) necessarily has or needs
// admin login access, and this is purely display information.
const teamMemberSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    roleBadge: { type: String, required: true, trim: true }, // e.g. "SUPER ADMIN & DEVELOPER", "CONTENT MANAGER"
    branch: { type: String, default: '', trim: true },
    rollNumber: { type: String, default: '', trim: true },
    semesterLabel: { type: String, default: '', trim: true }, // free text, e.g. "3rd SEM. (25-28)"
    roleTitle: { type: String, default: '', trim: true }, // e.g. "Lead Architect & Developer"
    responsibilities: { type: String, default: '', trim: true },
    photoUrl: { type: String, default: '' },
    githubUrl: { type: String, default: '' },
    linkedinUrl: { type: String, default: '' },
    instagramUrl: { type: String, default: '' },
    websiteUrl: { type: String, default: '' },
    order: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
  },
  { versionKey: false }
);

module.exports = mongoose.model('TeamMember', teamMemberSchema);
