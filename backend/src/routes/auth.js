const express = require('express');
const jwt = require('jsonwebtoken');
const Student = require('../models/Student');
const { VALID_SEMESTERS } = require('../utils/constants');
const { isValidName, isValidRegNo, isLikelyRealEmail } = require('../utils/validators');

const router = express.Router();

function sign(id) {
  return jwt.sign({ id, role: 'student' }, process.env.JWT_SECRET, { expiresIn: '30d' });
}

// POST /api/auth/register
router.post('/register', async (req, res) => {
  try {
    const { name, boardRegNo, branch, semester, boardEmail, boardRollNumber, password } = req.body;

    if (!name || !boardRegNo || !branch || !semester || !boardEmail || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    if (!isValidName(name)) {
      return res.status(400).json({ message: 'Name should only contain letters' });
    }
    if (!isValidRegNo(boardRegNo)) {
      return res.status(400).json({ message: 'Board Registration No. must be exactly 10 digits' });
    }
    if (!isLikelyRealEmail(boardEmail)) {
      return res.status(400).json({ message: "That doesn't look like a real email address — please use your actual board registered email" });
    }
    if (!['CSE', 'IT'].includes(branch)) {
      return res.status(400).json({ message: 'Invalid branch' });
    }
    if (!VALID_SEMESTERS.includes(Number(semester))) {
      return res.status(400).json({ message: 'Invalid semester' });
    }

    const existing = await Student.findOne({
      $or: [{ boardEmail: boardEmail.toLowerCase() }, { boardRegNo }],
    });
    if (existing) {
      return res.status(409).json({ message: 'An account with this email or registration number already exists' });
    }

    const student = await Student.create({
      name,
      boardRegNo,
      branch,
      semester: Number(semester),
      boardEmail: boardEmail.toLowerCase(),
      boardRollNumber: boardRollNumber || '',
      password, // stored as plain text — see models/Student.js note
    });

    const token = sign(student._id);
    return res.status(201).json({
      token,
      student: sanitize(student),
      firstLogin: true,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Something went wrong while registering. Please try again.' });
  }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { boardEmail, password } = req.body;
    if (!boardEmail || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }
    const student = await Student.findOne({ boardEmail: boardEmail.toLowerCase() });
    if (!student || student.password !== password) {
      return res.status(401).json({ message: 'Incorrect email or password' });
    }
    student.loginStreak = computeStreak(student.lastLoginAt, student.loginStreak);
    student.lastLoginAt = new Date();
    await student.save();
    const token = sign(student._id);
    const firstLogin = !student.hasCompletedFirstLogin;
    return res.json({ token, student: sanitize(student), firstLogin });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Something went wrong while logging in. Please try again.' });
  }
});

function sanitize(student) {
  const obj = student.toObject();
  delete obj.password;
  return obj;
}

// Streak counts consecutive calendar days with at least one login.
// Same day again -> streak unchanged. Exactly one day later -> +1.
// Any bigger gap (or first ever login) -> streak resets to 1.
function computeStreak(prevLastLogin, prevStreak) {
  if (!prevLastLogin) return 1;
  const prevDay = new Date(prevLastLogin).toDateString();
  const today = new Date().toDateString();
  if (prevDay === today) return prevStreak || 1;

  const oneDayMs = 24 * 60 * 60 * 1000;
  const diffDays = Math.round((new Date(today) - new Date(prevDay)) / oneDayMs);
  return diffDays === 1 ? (prevStreak || 0) + 1 : 1;
}

module.exports = router;
