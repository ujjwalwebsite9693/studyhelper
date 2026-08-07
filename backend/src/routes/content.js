const express = require('express');
const multer = require('multer');
const Content = require('../models/Content');
const Student = require('../models/Student');
const { requireStudent, requireAdmin } = require('../middleware/auth');
const { uploadPdfBuffer, deleteRawAsset } = require('../utils/cloudinary');
const { logAdmin } = require('../utils/logAdmin');
const { toCsv } = require('../utils/csv');

const router = express.Router();
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 20 * 1024 * 1024 }, // 20MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== 'application/pdf') return cb(new Error('Only PDF files are allowed'));
    cb(null, true);
  },
});

// GET /api/content?branch=CSE&semester=2&type=notes&search=data+structures&subject=DBMS&sort=newest|oldest|popular
router.get('/', requireStudent, async (req, res) => {
  const { branch, semester, type, search, subject, sort } = req.query;
  const filter = {};
  if (branch) filter.branch = branch;
  if (semester) filter.semester = Number(semester);
  if (type) filter.type = type;
  if (subject) filter.subject = subject;
  if (search) {
    const re = new RegExp(search.trim(), 'i');
    filter.$or = [{ title: re }, { subject: re }];
  }

  let query = Content.find(filter);
  if (sort === 'oldest') query = query.sort({ uploadedAt: 1 });
  else if (sort === 'popular') query = query.sort({ downloadCount: -1 });
  else query = query.sort({ uploadedAt: -1 }); // 'newest' / default

  const items = await query;
  res.json(items);
});

// GET /api/content/bookmarks/mine
router.get('/bookmarks/mine', requireStudent, async (req, res) => {
  const student = await Student.findById(req.studentId).populate('bookmarks');
  res.json(student?.bookmarks || []);
});

// POST /api/content/:id/bookmark  (toggle)
router.post('/:id/bookmark', requireStudent, async (req, res) => {
  const student = await Student.findById(req.studentId);
  const idx = student.bookmarks.findIndex((b) => b.toString() === req.params.id);
  let bookmarked;
  if (idx === -1) {
    student.bookmarks.push(req.params.id);
    bookmarked = true;
  } else {
    student.bookmarks.splice(idx, 1);
    bookmarked = false;
  }
  await student.save();
  res.json({ bookmarked });
});

// POST /api/content/:id/download  (increments counters, logs recent download, returns url)
router.post('/:id/download', requireStudent, async (req, res) => {
  const item = await Content.findByIdAndUpdate(req.params.id, { $inc: { downloadCount: 1 } }, { new: true });
  if (!item) return res.status(404).json({ message: 'Not found' });

  await Student.findByIdAndUpdate(req.studentId, {
    $inc: { totalDownloads: 1 },
    $push: {
      recentDownloads: {
        $each: [{ content: item._id, title: item.title, downloadedAt: new Date() }],
        $position: 0,
        $slice: 10,
      },
    },
  });

  res.json({ url: item.fileUrl });
});

// ---- Admin only below ----

// GET /api/content/admin/all?search=&type=
router.get('/admin/all', requireAdmin, async (req, res) => {
  const { search, type } = req.query;
  const filter = {};
  if (type) filter.type = type;
  if (search) {
    const re = new RegExp(search.trim(), 'i');
    filter.$or = [{ title: re }, { subject: re }];
  }
  const items = await Content.find(filter).sort({ uploadedAt: -1 });
  res.json(items);
});

// GET /api/content/admin/top?limit=5
router.get('/admin/top', requireAdmin, async (req, res) => {
  const limit = Number(req.query.limit) || 5;
  const items = await Content.find().sort({ downloadCount: -1 }).limit(limit);
  res.json(items);
});

// GET /api/content/admin/export.csv
router.get('/admin/export.csv', requireAdmin, async (req, res) => {
  const items = await Content.find().sort({ uploadedAt: -1 });
  const csv = toCsv(items, [
    { label: 'Title', value: (i) => i.title },
    { label: 'Type', value: (i) => i.type },
    { label: 'Branch', value: (i) => i.branch },
    { label: 'Semester', value: (i) => i.semester },
    { label: 'Subject', value: (i) => i.subject },
    { label: 'Downloads', value: (i) => i.downloadCount },
    { label: 'Uploaded At', value: (i) => i.uploadedAt.toISOString() },
    { label: 'File URL', value: (i) => i.fileUrl },
  ]);
  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', 'attachment; filename="content-export.csv"');
  res.send(csv);
});

// POST /api/content  (admin uploads a single PDF, or adds a YouTube link)
router.post('/', requireAdmin, upload.single('file'), async (req, res) => {
  try {
    const { title, type, branch, semester, subject, ytUrl } = req.body;
    if (!title || !type || !branch || !semester) {
      return res.status(400).json({ message: 'Title, type, branch and semester are required' });
    }

    let fileUrl = '';
    let cloudinaryPublicId = '';

    if (type === 'ytlink') {
      if (!ytUrl) return res.status(400).json({ message: 'YouTube URL is required for this type' });
      fileUrl = ytUrl;
    } else {
      if (!req.file) return res.status(400).json({ message: 'PDF file is required' });
      const result = await uploadPdfBuffer(req.file.buffer, req.file.originalname);
      fileUrl = result.url;
      cloudinaryPublicId = result.publicId;
    }

    const item = await Content.create({
      title, type, branch, semester: Number(semester), subject: subject || '', fileUrl, cloudinaryPublicId,
    });
    logAdmin('content.upload', `${item.title} (${item.type}, ${item.branch} sem ${item.semester})`);
    res.status(201).json(item);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message || 'Upload failed. Please try again.' });
  }
});

// POST /api/content/bulk  (admin uploads several PDFs at once under shared metadata)
router.post('/bulk', requireAdmin, upload.array('files', 20), async (req, res) => {
  try {
    const { type, branch, semester, subject } = req.body;
    if (!type || !branch || !semester) {
      return res.status(400).json({ message: 'Type, branch and semester are required' });
    }
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'Attach at least one PDF file' });
    }

    const created = [];
    for (const file of req.files) {
      const result = await uploadPdfBuffer(file.buffer, file.originalname);
      const title = file.originalname.replace(/\.pdf$/i, '');
      const item = await Content.create({
        title, type, branch, semester: Number(semester), subject: subject || '',
        fileUrl: result.url, cloudinaryPublicId: result.publicId,
      });
      created.push(item);
    }
    logAdmin('content.bulk_upload', `${created.length} files (${type}, ${branch} sem ${semester})`);
    res.status(201).json(created);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message || 'Bulk upload failed. Please try again.' });
  }
});

// PUT /api/content/:id  (edit metadata, optionally replace file)
router.put('/:id', requireAdmin, upload.single('file'), async (req, res) => {
  try {
    const { title, subject, branch, semester, ytUrl } = req.body;
    const item = await Content.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Not found' });

    if (title) item.title = title;
    if (subject !== undefined) item.subject = subject;
    if (branch) item.branch = branch;
    if (semester) item.semester = Number(semester);

    if (item.type === 'ytlink' && ytUrl) {
      item.fileUrl = ytUrl;
    } else if (req.file) {
      await deleteRawAsset(item.cloudinaryPublicId);
      const result = await uploadPdfBuffer(req.file.buffer, req.file.originalname);
      item.fileUrl = result.url;
      item.cloudinaryPublicId = result.publicId;
    }

    await item.save();
    logAdmin('content.edit', item.title);
    res.json(item);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Update failed. Please try again.' });
  }
});

// DELETE /api/content/:id
router.delete('/:id', requireAdmin, async (req, res) => {
  const item = await Content.findById(req.params.id);
  if (!item) return res.status(404).json({ message: 'Not found' });
  await deleteRawAsset(item.cloudinaryPublicId);
  await item.deleteOne();
  logAdmin('content.delete', item.title);
  res.json({ message: 'Deleted' });
});

module.exports = router;
