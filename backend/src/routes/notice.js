const express = require('express');
const Notice = require('../models/Notice');
const Student = require('../models/Student');
const { requireStudent, requireAdmin } = require('../middleware/auth');
const { logAdmin } = require('../utils/logAdmin');

const router = express.Router();

// GET /api/notice  (only notices targeted at this student's branch/semester, pinned first)
router.get('/', requireStudent, async (req, res) => {
  const student = await Student.findById(req.studentId);
  const notices = await Notice.find({
    $and: [
      { $or: [{ targetBranch: 'ALL' }, { targetBranch: student.branch }] },
      { $or: [{ targetSemester: 0 }, { targetSemester: student.semester }] },
    ],
  }).sort({ pinned: -1, createdAt: -1 });
  res.json(notices);
});

// GET /api/notice/unread-count
router.get('/unread-count', requireStudent, async (req, res) => {
  const student = await Student.findById(req.studentId);
  const since = student.lastNoticeSeenAt || new Date(0);
  const count = await Notice.countDocuments({
    createdAt: { $gt: since },
    $and: [
      { $or: [{ targetBranch: 'ALL' }, { targetBranch: student.branch }] },
      { $or: [{ targetSemester: 0 }, { targetSemester: student.semester }] },
    ],
  });
  res.json({ count });
});

// PUT /api/notice/mark-seen
router.put('/mark-seen', requireStudent, async (req, res) => {
  await Student.findByIdAndUpdate(req.studentId, { lastNoticeSeenAt: new Date() });
  res.json({ message: 'ok' });
});

// GET /api/notice/admin  (admin dashboard view — everything, regardless of targeting)
router.get('/admin', requireAdmin, async (req, res) => {
  const notices = await Notice.find().sort({ pinned: -1, createdAt: -1 });
  res.json(notices);
});

// POST /api/notice
router.post('/', requireAdmin, async (req, res) => {
  const { title, message, important, pinned, targetBranch, targetSemester } = req.body;
  if (!title || !message) return res.status(400).json({ message: 'Title and message are required' });
  const notice = await Notice.create({
    title, message, important: !!important, pinned: !!pinned,
    targetBranch: targetBranch || 'ALL',
    targetSemester: targetSemester ? Number(targetSemester) : 0,
  });
  logAdmin('notice.send', `${notice.title} → ${notice.targetBranch}/sem ${notice.targetSemester || 'all'}`);
  res.status(201).json(notice);
});

// DELETE /api/notice/:id
router.delete('/:id', requireAdmin, async (req, res) => {
  const notice = await Notice.findByIdAndDelete(req.params.id);
  if (!notice) return res.status(404).json({ message: 'Not found' });
  logAdmin('notice.delete', notice.title);
  res.json({ message: 'Deleted' });
});

module.exports = router;
