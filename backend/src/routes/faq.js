const express = require('express');
const Faq = require('../models/Faq');
const { requireStudent, requireAdmin } = require('../middleware/auth');
const { logAdmin } = require('../utils/logAdmin');

const router = express.Router();

// GET /api/faq  (students read the Help & Support list)
router.get('/', requireStudent, async (req, res) => {
  const faqs = await Faq.find().sort({ order: 1, createdAt: 1 });
  res.json(faqs);
});

// GET /api/faq/public  (no login — powers the chatbot on the landing page)
router.get('/public', async (req, res) => {
  const faqs = await Faq.find().sort({ order: 1, createdAt: 1 });
  res.json(faqs);
});

// GET /api/faq/admin  (same list, for the admin manager)
router.get('/admin', requireAdmin, async (req, res) => {
  const faqs = await Faq.find().sort({ order: 1, createdAt: 1 });
  res.json(faqs);
});

// POST /api/faq
router.post('/', requireAdmin, async (req, res) => {
  const { question, answer, order } = req.body;
  if (!question || !answer) return res.status(400).json({ message: 'Question and answer are required' });
  const faq = await Faq.create({ question, answer, order: Number(order) || 0 });
  logAdmin('faq.create', question);
  res.status(201).json(faq);
});

// PUT /api/faq/:id
router.put('/:id', requireAdmin, async (req, res) => {
  const { question, answer, order } = req.body;
  const update = {};
  if (question) update.question = question;
  if (answer) update.answer = answer;
  if (order !== undefined) update.order = Number(order);
  const faq = await Faq.findByIdAndUpdate(req.params.id, update, { new: true });
  if (!faq) return res.status(404).json({ message: 'Not found' });
  logAdmin('faq.edit', faq.question);
  res.json(faq);
});

// DELETE /api/faq/:id
router.delete('/:id', requireAdmin, async (req, res) => {
  const faq = await Faq.findByIdAndDelete(req.params.id);
  if (!faq) return res.status(404).json({ message: 'Not found' });
  logAdmin('faq.delete', faq.question);
  res.json({ message: 'Deleted' });
});

module.exports = router;
