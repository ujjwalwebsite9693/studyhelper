const express = require('express');
const axios = require('axios');
const Student = require('../models/Student');
const { requireStudent } = require('../middleware/auth');
const { buildRollNumber } = require('../utils/rollNumber');
const { VALID_SEMESTERS } = require('../utils/constants');

const router = express.Router();
const RESULT_API = 'https://sbte-api.anantdrishti.com/util/downloadResult';

// Shared fetch-and-classify logic used by both the logged-in and public
// result routes below.
async function fetchResultPdf(rollNumber) {
  const response = await axios.get(RESULT_API, {
    params: { rollNumber },
    responseType: 'arraybuffer',
    validateStatus: () => true, // we handle non-2xx ourselves below
  });

  const buffer = Buffer.from(response.data);
  // The upstream API serves the file as application/octet-stream (not
  // application/pdf), so the content-type header can't tell us whether a
  // result exists. Instead we check the actual file signature: real PDFs
  // start with the bytes "%PDF". Anything else (an HTML/JSON error body)
  // means the result isn't published yet.
  const isRealPdf = response.status === 200 && buffer.length > 4 && buffer.slice(0, 4).toString('ascii') === '%PDF';
  return { isRealPdf, buffer };
}

// GET /api/result/download?semester=2  (logged-in student — roll number is
// derived from their own saved registration number, so they can't fetch
// anyone else's result by guessing a semester number)
router.get('/download', requireStudent, async (req, res) => {
  try {
    const student = await Student.findById(req.studentId);
    if (!student) return res.status(404).json({ message: 'Student not found' });

    const semester = Number(req.query.semester) || student.semester;
    if (!VALID_SEMESTERS.includes(semester)) {
      return res.status(400).json({ message: 'Invalid semester' });
    }

    const rollNumber = buildRollNumber(student.boardRegNo, semester);
    const { isRealPdf, buffer } = await fetchResultPdf(rollNumber);

    if (!isRealPdf) {
      return res.status(200).json({ available: false, message: 'Result not published yet' });
    }

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="result-sem${semester}-${rollNumber}.pdf"`);
    return res.send(buffer);
  } catch (err) {
    console.error('Result fetch error:', err.message);
    return res.status(200).json({ available: false, message: 'Result not published yet' });
  }
});

// GET /api/result/public?rollNumber=211151825007  (no login required — for
// the landing page, where the visitor types their own full roll number
// directly, the same way the official SBTE portal works)
router.get('/public', async (req, res) => {
  try {
    const rollNumber = (req.query.rollNumber || '').trim();
    if (!rollNumber || !/^\d{6,20}$/.test(rollNumber)) {
      return res.status(400).json({ message: 'Enter a valid roll number' });
    }

    const { isRealPdf, buffer } = await fetchResultPdf(rollNumber);

    if (!isRealPdf) {
      return res.status(200).json({ available: false, message: 'Result not issued yet' });
    }

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="result-${rollNumber}.pdf"`);
    return res.send(buffer);
  } catch (err) {
    console.error('Public result fetch error:', err.message);
    return res.status(200).json({ available: false, message: 'Result not issued yet' });
  }
});

module.exports = router;
