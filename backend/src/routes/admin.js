const express = require('express');
const jwt = require('jsonwebtoken');
const Student = require('../models/Student');
const Content = require('../models/Content');
const Notice = require('../models/Notice');
const AdminLog = require('../models/AdminLog');
const { requireAdmin } = require('../middleware/auth');
const { logAdmin } = require('../utils/logAdmin');
const { toCsv } = require('../utils/csv');

const router = express.Router();

// POST /api/admin/login
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {
    const token = jwt.sign({ role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '7d' });
    return res.json({ token });
  }
  return res.status(401).json({ message: 'Incorrect username or password' });
});

// GET /api/admin/stats
router.get('/stats', requireAdmin, async (req, res) => {
  const [totalStudents, totalContent, totalNotices, byBranch, bySemester, byType] = await Promise.all([
    Student.countDocuments(),
    Content.countDocuments(),
    Notice.countDocuments(),
    Student.aggregate([{ $group: { _id: '$branch', count: { $sum: 1 } } }]),
    Student.aggregate([{ $group: { _id: '$semester', count: { $sum: 1 } } }]),
    Content.aggregate([{ $group: { _id: '$type', count: { $sum: 1 } } }]),
  ]);
  res.json({ totalStudents, totalContent, totalNotices, byBranch, bySemester, byType });
});

// GET /api/admin/logs?limit=50
router.get('/logs', requireAdmin, async (req, res) => {
  const limit = Number(req.query.limit) || 50;
  const logs = await AdminLog.find().sort({ createdAt: -1 }).limit(limit);
  res.json(logs);
});

// GET /api/admin/students
router.get('/students', requireAdmin, async (req, res) => {
  const students = await Student.find().select('-password').sort({ createdAt: -1 });
  res.json(students);
});

// GET /api/admin/students/export.csv
router.get('/students/export.csv', requireAdmin, async (req, res) => {
  const students = await Student.find().select('-password').sort({ createdAt: -1 });
  const csv = toCsv(students, [
    { label: 'Name', value: (s) => s.name },
    { label: 'Board Reg No', value: (s) => s.boardRegNo },
    { label: 'Branch', value: (s) => s.branch },
    { label: 'Semester', value: (s) => s.semester },
    { label: 'Email', value: (s) => s.boardEmail },
    { label: 'Roll Number', value: (s) => s.boardRollNumber },
    { label: 'Total Downloads', value: (s) => s.totalDownloads },
    { label: 'Last Login', value: (s) => (s.lastLoginAt ? s.lastLoginAt.toISOString() : 'Never') },
    { label: 'Joined', value: (s) => s.createdAt.toISOString() },
  ]);
  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', 'attachment; filename="students-export.csv"');
  res.send(csv);
});

// POST /api/admin/students/promote-semester  { studentIds: [] | 'all' }
// Bumps semester by 1, capped at 3, for the given students (or everyone).
router.post('/students/promote-semester', requireAdmin, async (req, res) => {
  const { studentIds } = req.body;
  const filter = studentIds === 'all' || !studentIds ? { semester: { $lt: 3 } } : { _id: { $in: studentIds }, semester: { $lt: 3 } };
  const result = await Student.updateMany(filter, [{ $set: { semester: { $add: ['$semester', 1] } } }]);
  logAdmin('students.promote', `${result.modifiedCount} student(s) promoted`);
  res.json({ promoted: result.modifiedCount });
});

// PUT /api/admin/students/:id  (admin can correct a student's details)
router.put('/students/:id', requireAdmin, async (req, res) => {
  const { name, branch, semester, boardEmail, boardRollNumber, boardRegNo } = req.body;
  const update = {};
  if (name) update.name = name;
  if (branch) update.branch = branch;
  if (semester) update.semester = Number(semester);
  if (boardEmail) update.boardEmail = boardEmail.toLowerCase();
  if (boardRollNumber) update.boardRollNumber = boardRollNumber;
  if (boardRegNo) update.boardRegNo = boardRegNo;

  const student = await Student.findByIdAndUpdate(req.params.id, update, { new: true }).select('-password');
  if (!student) return res.status(404).json({ message: 'Not found' });
  logAdmin('student.edit', student.name);
  res.json(student);
});

// DELETE /api/admin/students/:id
router.delete('/students/:id', requireAdmin, async (req, res) => {
  const student = await Student.findByIdAndDelete(req.params.id);
  if (!student) return res.status(404).json({ message: 'Not found' });
  logAdmin('student.delete', student.name);
  res.json({ message: 'Deleted' });
});

module.exports = router;
