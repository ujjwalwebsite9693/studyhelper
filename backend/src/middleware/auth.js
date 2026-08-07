const jwt = require('jsonwebtoken');

// Verifies the JWT on protected student routes and attaches req.studentId.
function requireStudent(req, res, next) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;
  if (!token) return res.status(401).json({ message: 'Not logged in' });
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    if (payload.role !== 'student') throw new Error('wrong role');
    req.studentId = payload.id;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Session expired, please log in again' });
  }
}

// Verifies the JWT on protected admin routes.
function requireAdmin(req, res, next) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;
  if (!token) return res.status(401).json({ message: 'Not logged in' });
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    if (payload.role !== 'admin') throw new Error('wrong role');
    req.isAdmin = true;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Session expired, please log in again' });
  }
}

module.exports = { requireStudent, requireAdmin };
