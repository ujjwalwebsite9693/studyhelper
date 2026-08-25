// Shared validation used on the registration form (and mirrored on the
// backend in routes/auth.js, since client-side checks alone can always be
// bypassed by calling the API directly).

// Letters, spaces, and a few punctuation marks common in real names
// (apostrophes, hyphens, periods for initials). No digits or other symbols.
export function isValidName(name) {
  return /^[A-Za-z][A-Za-z\s.'-]{1,49}$/.test(name.trim());
}

// Exactly 10 digits, numbers only.
export function isValidRegNo(regNo) {
  return /^\d{10}$/.test(regNo.trim());
}

// Local parts that are obviously placeholders rather than a real person's
// email — "demo@gmail.com", "abcd@gmail.com", "test123@...", etc. This is a
// heuristic, not proof the mailbox is real or reachable — the only way to
// actually confirm that is an OTP/verification-link flow, which isn't
// implemented here.
const FAKE_LOCAL_PARTS = [
  'test', 'demo', 'abcd', 'abc', 'sample', 'dummy', 'fake', 'temp', 'temporary',
  'asdf', 'qwerty', 'xyz', 'example', 'admin', 'user', 'username', 'yourname',
  'name', 'email', 'mail', 'xxxx', 'noreply', 'no-reply', 'placeholder',
];

export function isLikelyRealEmail(email) {
  const trimmed = email.trim().toLowerCase();
  // Standard, reasonably strict email shape.
  if (!/^[a-z0-9][a-z0-9._%+-]*@[a-z0-9.-]+\.[a-z]{2,}$/.test(trimmed)) return false;

  const local = trimmed.split('@')[0];

  if (FAKE_LOCAL_PARTS.includes(local)) return false;
  // "abcd", "aaaa", "1234", "1111" style local parts.
  if (/^(.)\1*$/.test(local)) return false;
  if (/^(abcd|1234|0123)/.test(local)) return false;
  if (local.length < 3) return false;

  return true;
}

export const REGNO_LENGTH = 10;
