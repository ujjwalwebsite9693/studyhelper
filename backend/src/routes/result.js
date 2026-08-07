const express = require('express');
const axios = require('axios');
const Student = require('../models/Student');
const { requireStudent } = require('../middleware/auth');
const { buildRollNumber } = require('../utils/rollNumber');

const router = express.Router();
const RESULT_API = 'https://sbte-api.anantdrishti.com/util/downloadResult';

// GET /api/result/download?semester=2
// Streams the PDF back to the browser if published, otherwise returns a
// clean JSON message instead of letting the external API's error surface.
router.get('/download', requireStudent, async (req, res) => {
  try {
    const student = await Student.findById(req.studentId);
    if (!student) return res.status(404).json({ message: 'Student not found' });

    const semester = Number(req.query.semester) || student.semester;
    if (![1, 2, 3].includes(semester)) {
      return res.status(400).json({ message: 'Invalid semester' });
    }

    const rollNumber = buildRollNumber(student.boardRegNo, semester);

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

    if (!isRealPdf) {
      return res.status(200).json({ available: false, message: 'Result not published yet' });
    }

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="result-sem${semester}-${rollNumber}.pdf"`);
    return res.send(buffer);
  } catch (err) {
    console.error('Result fetch error:', err.message);
    // Network/upstream failure — still don't show a raw error to the student.
    return res.status(200).json({ available: false, message: 'Result not published yet' });
  }
});

module.exports = router;
