const mongoose = require('mongoose');

const blogPostSchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true, trim: true },
  title: { type: String, required: true, trim: true },
  content: { type: String, required: true },
  excerpt: { type: String, required: true },
  category: { 
    type: String, 
    required: true, 
    enum: ['study-tips', 'exam-guide', 'career', 'technology', 'college-life'] 
  },
  tags: [{ type: String }],
  coverImageUrl: { type: String, default: '' },
  author: { type: String, default: 'HUB STUDY Team' },
  readTimeMinutes: { type: Number, default: 5 },
  published: { type: Boolean, default: false },
  views: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, { versionKey: false });

module.exports = mongoose.model('BlogPost', blogPostSchema);
