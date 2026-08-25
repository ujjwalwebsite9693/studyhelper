const AdminLog = require('../models/AdminLog');

// Fire-and-forget audit logging — never let a logging failure break the
// actual admin action that triggered it.
function logAdmin(action, details = '') {
  AdminLog.create({ action, details }).catch((err) => console.error('AdminLog failed:', err.message));
}

module.exports = { logAdmin };
