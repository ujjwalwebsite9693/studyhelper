const mongoose = require('mongoose');

const subjectGuideSchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true, trim: true },
  title: { type: String, required: true, trim: true },
  branch: { type: String, required: true, enum: ['CSE', 'IT', 'BOTH'] },
  semester: { type: Number, required: true, enum: [1, 2, 3, 4, 5, 6] },
  introduction: { type: String, required: true },
  concepts: [{ heading: String, explanation: String }],
  chapters: [{ title: String, summary: String, keyPoints: [String] }],
  importantQuestions: [String],
  mcqs: [{ question: String, options: [String], correctIndex: Number, explanation: String }],
  previousYearContext: { type: String, default: '' },
  examTips: [String],
  pdfContents: { type: String, default: '' },
  syllabusRelevance: { type: String, default: '' },
  faqs: [{ question: String, answer: String }],
  relatedTopics: [{ title: String, slug: String }],
  examples: [{ title: String, content: String }],
  metaDescription: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, { versionKey: false });

module.exports = mongoose.model('SubjectGuide', subjectGuideSchema);
