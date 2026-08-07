const express = require('express');
const Report = require('../models/Report');
const { requireStudent, requireAdmin } = require('../middleware/auth');
const { logAdmin } = require('../utils/logAdmin');

const router = express.Router();

// POST /api/reports  (student flags a broken/wrong resource)
router.post('/', requireStudent, async (req, res) => {
  const { contentId, reason } = req.body;
  if (!contentId || !reason) return res.status(400).json({ message: 'Please describe the issue' });
  const report = await Report.create({ content: contentId, student: req.studentId, reason });
  res.status(201).json(report);
});

// GET /api/reports  (admin — open reports first)
router.get('/', requireAdmin, async (req, res) => {
  const reports = await Report.find()
    .populate('content', 'title type branch semester fileUrl')
    .populate('student', 'name boardEmail')
    .sort({ status: 1, createdAt: -1 });
  res.json(reports);
});

// PUT /api/reports/:id/resolve
router.put('/:id/resolve', requireAdmin, async (req, res) => {
  const report = await Report.findByIdAndUpdate(req.params.id, { status: 'resolved' }, { new: true });
  if (!report) return res.status(404).json({ message: 'Not found' });
  logAdmin('report.resolve', String(report._id));
  res.json(report);
});

module.exports = router;
