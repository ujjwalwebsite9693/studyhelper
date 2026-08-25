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

// Verifies the JWT on protected admin routes. Both 'admin' and 'superadmin'
// accounts pass this — they have equal access to resource management
// (content, students, notices, reports, FAQ). Only account management
// (creating/removing admins) is gated further, see requireSuperAdmin below.
function requireAdmin(req, res, next) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;
  if (!token) return res.status(401).json({ message: 'Not logged in' });
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    if (payload.role !== 'admin' && payload.role !== 'superadmin') throw new Error('wrong role');
    req.isAdmin = true;
    req.adminId = payload.id;
    req.adminRole = payload.role;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Session expired, please log in again' });
  }
}

// Stricter guard for super-admin-only routes (managing other admin
// accounts). Always call requireAdmin first on the same route.
function requireSuperAdmin(req, res, next) {
  if (req.adminRole !== 'superadmin') {
    return res.status(403).json({ message: 'Only a super admin can do this' });
  }
  next();
}

module.exports = { requireStudent, requireAdmin, requireSuperAdmin };
