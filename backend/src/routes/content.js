const express = require('express');
const multer = require('multer');
const Content = require('../models/Content');
const Student = require('../models/Student');
const { requireStudent, requireAdmin } = require('../middleware/auth');
const { uploadPdfBuffer, deleteRawAsset } = require('../utils/cloudinary');
const { logAdmin } = require('../utils/logAdmin');
const { toCsv } = require('../utils/csv');

// Cloudinary's free plan hard-caps raw/PDF uploads at 10MB per file — this
// is a plan-level ceiling, not something adjustable in Cloudinary's
// dashboard settings, so keep this matched to it rather than trying to
// raise it further. If the Cloudinary account is later upgraded to a paid
// plan, raise this number to match the new plan's limit.
const MAX_PDF_BYTES = 10 * 1024 * 1024; // 10MB

const router = express.Router();
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: MAX_PDF_BYTES },
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

// GET /api/content/pinned  (admin-curated "must read" for this student's branch/semester)
router.get('/pinned', requireStudent, async (req, res) => {
  const student = await Student.findById(req.studentId);
  const items = await Content.find({ pinned: true, branch: student.branch, semester: student.semester }).sort({ uploadedAt: -1 });
  res.json(items);
});

// GET /api/content/progress  (how much of each category this student has checked off)
router.get('/progress', requireStudent, async (req, res) => {
  const student = await Student.findById(req.studentId);
  const totals = await Content.aggregate([
    { $match: { branch: student.branch, semester: student.semester } },
    { $group: { _id: '$type', total: { $sum: 1 } } },
  ]);
  const completedSet = new Set(student.completedContent.map((id) => id.toString()));
  const completedItems = await Content.find({ _id: { $in: [...completedSet] } }, 'type');
  const completedByType = {};
  completedItems.forEach((i) => { completedByType[i.type] = (completedByType[i.type] || 0) + 1; });

  const progress = {};
  totals.forEach((t) => {
    progress[t._id] = { total: t.total, completed: completedByType[t._id] || 0 };
  });
  res.json(progress);
});

// POST /api/content/:id/complete  (toggle "studied" checklist)
router.post('/:id/complete', requireStudent, async (req, res) => {
  const student = await Student.findById(req.studentId);
  const idx = student.completedContent.findIndex((c) => c.toString() === req.params.id);
  let completed;
  if (idx === -1) {
    student.completedContent.push(req.params.id);
    completed = true;
  } else {
    student.completedContent.splice(idx, 1);
    completed = false;
  }
  await student.save();
  res.json({ completed });
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

// ---- Public routes below (no login — used on the landing page) ----

// GET /api/content/public/routine?branch=CSE&semester=3
// Returns the latest uploaded class routine for a branch/semester, or null.
router.get('/public/routine', async (req, res) => {
  const { branch, semester } = req.query;
  if (!branch || !semester) return res.status(400).json({ message: 'Branch and semester are required' });
  const item = await Content.findOne({ type: 'routine', branch, semester: Number(semester) }).sort({ uploadedAt: -1 });
  res.json(item || null);
});

// POST /api/content/public/:id/download  (routine only — kept narrow on
// purpose so this public, unauthenticated route can't be used to fetch
// arbitrary content by guessing IDs)
router.post('/public/:id/download', async (req, res) => {
  const item = await Content.findOneAndUpdate(
    { _id: req.params.id, type: 'routine' },
    { $inc: { downloadCount: 1 } },
    { new: true }
  );
  if (!item) return res.status(404).json({ message: 'Not found' });
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

// A multi-select upload can create several Content docs that all point at
// the exact same Cloudinary file (one branch/semester combo each). Before
// actually deleting that file from Cloudinary, make sure no other Content
// doc still references it — otherwise deleting one entry would 404 the rest.
async function deleteCloudinaryAssetIfUnshared(publicId, excludeId) {
  if (!publicId) return;
  const stillUsed = await Content.exists({ cloudinaryPublicId: publicId, _id: { $ne: excludeId } });
  if (!stillUsed) await deleteRawAsset(publicId);
}

// Frontend sends branches/semesters as a JSON-stringified array (works
// reliably through multipart form-data regardless of field-name quirks).
function parseArrayField(raw) {  if (!raw) return [];
  if (Array.isArray(raw)) return raw;
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [raw];
  } catch {
    return [raw];
  }
}

// POST /api/content  (admin uploads a single PDF, or adds a YouTube link —
// to one or more branches and semesters at once; the file is uploaded to
// Cloudinary only once and every resulting entry shares that same file)
router.post('/', requireAdmin, upload.single('file'), async (req, res) => {
  try {
    const { title, type, subject, ytUrl } = req.body;
    const branches = parseArrayField(req.body.branches);
    const semesters = parseArrayField(req.body.semesters).map(Number);

    if (!title || !type || branches.length === 0 || semesters.length === 0) {
      return res.status(400).json({ message: 'Title, type, and at least one branch and semester are required' });
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

    const created = [];
    for (const branch of branches) {
      for (const semester of semesters) {
        const item = await Content.create({
          title, type, branch, semester, subject: subject || '', fileUrl, cloudinaryPublicId,
        });
        created.push(item);
      }
    }
    logAdmin('content.upload', `${title} (${type}) → ${branches.join('/')} × sem ${semesters.join('/')} = ${created.length} entr${created.length === 1 ? 'y' : 'ies'}`);
    res.status(201).json(created);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message || 'Upload failed. Please try again.' });
  }
});

// POST /api/content/bulk  (admin uploads several PDFs at once under shared
// metadata — each file can also go to multiple branches/semesters)
router.post('/bulk', requireAdmin, upload.array('files', 20), async (req, res) => {
  try {
    const { type, subject } = req.body;
    const branches = parseArrayField(req.body.branches);
    const semesters = parseArrayField(req.body.semesters).map(Number);

    if (!type || branches.length === 0 || semesters.length === 0) {
      return res.status(400).json({ message: 'Type, and at least one branch and semester, are required' });
    }
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'Attach at least one PDF file' });
    }

    const created = [];
    for (const file of req.files) {
      const result = await uploadPdfBuffer(file.buffer, file.originalname);
      const title = file.originalname.replace(/\.pdf$/i, '');
      for (const branch of branches) {
        for (const semester of semesters) {
          const item = await Content.create({
            title, type, branch, semester, subject: subject || '',
            fileUrl: result.url, cloudinaryPublicId: result.publicId,
          });
          created.push(item);
        }
      }
    }
    logAdmin('content.bulk_upload', `${req.files.length} file(s) (${type}) → ${branches.join('/')} × sem ${semesters.join('/')} = ${created.length} entries`);
    res.status(201).json(created);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message || 'Bulk upload failed. Please try again.' });
  }
});

// POST /api/content/:id/pin  (admin toggles "must read" status)
router.post('/:id/pin', requireAdmin, async (req, res) => {
  const item = await Content.findById(req.params.id);
  if (!item) return res.status(404).json({ message: 'Not found' });
  item.pinned = !item.pinned;
  await item.save();
  logAdmin('content.pin', `${item.title} → ${item.pinned ? 'pinned' : 'unpinned'}`);
  res.json(item);
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
      // Other entries (other branch/semester copies from a multi-select
      // upload) may point at the same Cloudinary file — only actually
      // delete it from Cloudinary if nothing else still references it.
      await deleteCloudinaryAssetIfUnshared(item.cloudinaryPublicId, item._id);
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
  // Same safety check as PUT above — don't kill a file that a sibling
  // branch/semester entry (from the same multi-select upload) still uses.
  await deleteCloudinaryAssetIfUnshared(item.cloudinaryPublicId, item._id);
  await item.deleteOne();
  logAdmin('content.delete', item.title);
  res.json({ message: 'Deleted' });
});

module.exports = router;
