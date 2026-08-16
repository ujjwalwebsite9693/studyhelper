const Admin = require('../models/Admin');

// Runs once at server startup. If no super admin exists yet, creates one
// from ADMIN_USERNAME/ADMIN_PASSWORD (falls back to the credentials given
// when this feature was set up, so it works out of the box). After that
// first run, manage admin accounts from the Super Admin panel instead —
// these env vars are only read when the collection is empty.
async function seedSuperAdmin() {
  const existing = await Admin.findOne({ role: 'superadmin' });
  if (existing) return;

  const username = process.env.ADMIN_USERNAME || 'Ujjwal Mehta';
  const password = process.env.ADMIN_PASSWORD || 'Ujjwal@9512';

  // Someone might already have an 'admin'-role account with this exact
  // username from before this feature existed — promote it instead of
  // creating a duplicate.
  const clash = await Admin.findOne({ username });
  if (clash) {
    clash.role = 'superadmin';
    await clash.save();
    console.log(`Promoted existing admin "${username}" to superadmin`);
    return;
  }

  await Admin.create({ username, password, role: 'superadmin' });
  console.log(`Seeded initial super admin account: ${username}`);
}

module.exports = { seedSuperAdmin };
