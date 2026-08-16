const express = require('express');
const TeamMember = require('../models/TeamMember');
const { requireAdmin } = require('../middleware/auth');
const { logAdmin } = require('../utils/logAdmin');

const router = express.Router();

// GET /api/team/public  (no login — shown on the public Team page)
router.get('/public', async (req, res) => {
  const members = await TeamMember.find().sort({ order: 1, createdAt: 1 });
  res.json(members);
});

// GET /api/team/admin/all
router.get('/admin/all', requireAdmin, async (req, res) => {
  const members = await TeamMember.find().sort({ order: 1, createdAt: 1 });
  res.json(members);
});

// POST /api/team
router.post('/', requireAdmin, async (req, res) => {
  const {
    name, roleBadge, branch, rollNumber, semesterLabel, roleTitle,
    responsibilities, photoUrl, githubUrl, linkedinUrl, instagramUrl, websiteUrl, order,
  } = req.body;
  if (!name || !roleBadge) return res.status(400).json({ message: 'Name and role badge are required' });

  const member = await TeamMember.create({
    name, roleBadge, branch, rollNumber, semesterLabel, roleTitle,
    responsibilities, photoUrl, githubUrl, linkedinUrl, instagramUrl, websiteUrl,
    order: Number(order) || 0,
  });
  logAdmin('team.add', member.name);
  res.status(201).json(member);
});

// PUT /api/team/:id
router.put('/:id', requireAdmin, async (req, res) => {
  const update = { ...req.body };
  if (update.order !== undefined) update.order = Number(update.order);
  const member = await TeamMember.findByIdAndUpdate(req.params.id, update, { new: true });
  if (!member) return res.status(404).json({ message: 'Not found' });
  logAdmin('team.edit', member.name);
  res.json(member);
});

// DELETE /api/team/:id
router.delete('/:id', requireAdmin, async (req, res) => {
  const member = await TeamMember.findByIdAndDelete(req.params.id);
  if (!member) return res.status(404).json({ message: 'Not found' });
  logAdmin('team.delete', member.name);
  res.json({ message: 'Deleted' });
});

module.exports = router;
