const express = require('express');
const jwt = require('jsonwebtoken');
const Student = require('../models/Student');

const router = express.Router();

function sign(id) {
  return jwt.sign({ id, role: 'student' }, process.env.JWT_SECRET, { expiresIn: '30d' });
}

// POST /api/auth/register
router.post('/register', async (req, res) => {
  try {
    const { name, boardRegNo, branch, semester, boardEmail, boardRollNumber, password } = req.body;

    if (!name || !boardRegNo || !branch || !semester || !boardEmail || !boardRollNumber || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    if (!['CSE', 'IT'].includes(branch)) {
      return res.status(400).json({ message: 'Invalid branch' });
    }
    if (![1, 2, 3].includes(Number(semester))) {
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
      boardRollNumber,
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

module.exports = router;
