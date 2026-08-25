// Mirrors frontend/src/utils/validators.js — kept in sync manually since
// the two run in different environments. Server-side checks matter more:
// the frontend's checks can always be skipped by calling the API directly.

function isValidName(name) {
  return /^[A-Za-z][A-Za-z\s.'-]{1,49}$/.test((name || '').trim());
}

function isValidRegNo(regNo) {
  return /^\d{10}$/.test((regNo || '').trim());
}

const FAKE_LOCAL_PARTS = [
  'test', 'demo', 'abcd', 'abc', 'sample', 'dummy', 'fake', 'temp', 'temporary',
  'asdf', 'qwerty', 'xyz', 'example', 'admin', 'user', 'username', 'yourname',
  'name', 'email', 'mail', 'xxxx', 'noreply', 'no-reply', 'placeholder',
];

function isLikelyRealEmail(email) {
  const trimmed = (email || '').trim().toLowerCase();
  if (!/^[a-z0-9][a-z0-9._%+-]*@[a-z0-9.-]+\.[a-z]{2,}$/.test(trimmed)) return false;

  const local = trimmed.split('@')[0];
  if (FAKE_LOCAL_PARTS.includes(local)) return false;
  if (/^(.)\1*$/.test(local)) return false;
  if (/^(abcd|1234|0123)/.test(local)) return false;
  if (local.length < 3) return false;

  return true;
}

module.exports = { isValidName, isValidRegNo, isLikelyRealEmail };
