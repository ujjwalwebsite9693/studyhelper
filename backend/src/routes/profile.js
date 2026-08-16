const express = require('express');
const Student = require('../models/Student');
const { requireStudent } = require('../middleware/auth');
const { VALID_SEMESTERS } = require('../utils/constants');

const router = express.Router();

// GET /api/profile/me
router.get('/me', requireStudent, async (req, res) => {
  const student = await Student.findById(req.studentId).select('-password');
  if (!student) return res.status(404).json({ message: 'Student not found' });
  res.json(student);
});

// PUT /api/profile/me  (edit name/branch/semester/dpUrl, marks first login complete)
router.put('/me', requireStudent, async (req, res) => {
  try {
    const { name, branch, semester, dpUrl } = req.body;
    const update = { hasCompletedFirstLogin: true };
    if (name) update.name = name;
    if (branch) {
      if (!['CSE', 'IT'].includes(branch)) return res.status(400).json({ message: 'Invalid branch' });
      update.branch = branch;
    }
    if (semester) {
      if (!VALID_SEMESTERS.includes(Number(semester))) return res.status(400).json({ message: 'Invalid semester' });
      update.semester = Number(semester);
    }
    if (dpUrl) update.dpUrl = dpUrl;

    const student = await Student.findByIdAndUpdate(req.studentId, update, {
      new: true,
    }).select('-password');
    res.json(student);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Could not update profile. Please try again.' });
  }
});

// PUT /api/profile/change-password
router.put('/change-password', requireStudent, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: 'Current and new password are required' });
    }
    if (newPassword.length < 4) {
      return res.status(400).json({ message: 'New password must be at least 4 characters' });
    }
    const student = await Student.findById(req.studentId);
    if (!student || student.password !== currentPassword) {
      return res.status(401).json({ message: 'Current password is incorrect' });
    }
    student.password = newPassword;
    await student.save();
    res.json({ message: 'Password updated' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Could not change password. Please try again.' });
  }
});

module.exports = router;
