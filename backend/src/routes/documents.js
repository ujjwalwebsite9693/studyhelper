const express = require('express');
const multer = require('multer');
const DocumentModel = require('../models/Document');
const { requireAdmin } = require('../middleware/auth');
const { uploadFileBuffer, deleteRawAsset } = require('../utils/cloudinary');
const { logAdmin } = require('../utils/logAdmin');

const MAX_FILE_BYTES = 10 * 1024 * 1024; // 10MB — matches Cloudinary's free-plan cap

const router = express.Router();
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: MAX_FILE_BYTES },
});

function formatSize(bytes) {
  if (!bytes) return '';
  const mb = bytes / (1024 * 1024);
  return mb >= 1 ? `${mb.toFixed(1)} MB` : `${Math.max(1, Math.round(bytes / 1024))} KB`;
}

// GET /api/documents/public  (no login — shown on the public Documents page)
router.get('/public', async (req, res) => {
  const docs = await DocumentModel.find().sort({ order: 1, createdAt: -1 });
  res.json(docs.map((d) => ({ ...d.toObject(), fileSizeLabel: formatSize(d.fileSizeBytes) })));
});

// POST /api/documents/public/:id/download  (no login — increments the counter)
router.post('/public/:id/download', async (req, res) => {
  const doc = await DocumentModel.findByIdAndUpdate(req.params.id, { $inc: { downloadCount: 1 } }, { new: true });
  if (!doc) return res.status(404).json({ message: 'Not found' });
  res.json({ url: doc.fileUrl });
});

// ---- Admin only below ----

// GET /api/documents/admin/all
router.get('/admin/all', requireAdmin, async (req, res) => {
  const docs = await DocumentModel.find().sort({ order: 1, createdAt: -1 });
  res.json(docs.map((d) => ({ ...d.toObject(), fileSizeLabel: formatSize(d.fileSizeBytes) })));
});

// POST /api/documents  (upload a new document)
router.post('/', requireAdmin, upload.single('file'), async (req, res) => {
  try {
    const { title, category, description, order } = req.body;
    if (!title || !category) return res.status(400).json({ message: 'Title and category are required' });
    if (!req.file) return res.status(400).json({ message: 'Please attach a file' });

    const result = await uploadFileBuffer(req.file.buffer, req.file.originalname);
    const doc = await DocumentModel.create({
      title, category, description: description || '',
      fileUrl: result.url, cloudinaryPublicId: result.publicId,
      fileType: result.extension || 'FILE',
      fileSizeBytes: req.file.size,
      order: Number(order) || 0,
    });
    logAdmin('document.upload', `${doc.title} (${doc.category})`);
    res.status(201).json(doc);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message || 'Upload failed. Please try again.' });
  }
});

// PUT /api/documents/:id  (edit metadata, optionally replace file)
router.put('/:id', requireAdmin, upload.single('file'), async (req, res) => {
  try {
    const { title, category, description, order } = req.body;
    const doc = await DocumentModel.findById(req.params.id);
    if (!doc) return res.status(404).json({ message: 'Not found' });

    if (title) doc.title = title;
    if (category) doc.category = category;
    if (description !== undefined) doc.description = description;
    if (order !== undefined) doc.order = Number(order);

    if (req.file) {
      await deleteRawAsset(doc.cloudinaryPublicId);
      const result = await uploadFileBuffer(req.file.buffer, req.file.originalname);
      doc.fileUrl = result.url;
      doc.cloudinaryPublicId = result.publicId;
      doc.fileType = result.extension || 'FILE';
      doc.fileSizeBytes = req.file.size;
    }

    await doc.save();
    logAdmin('document.edit', doc.title);
    res.json(doc);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Update failed. Please try again.' });
  }
});

// DELETE /api/documents/:id
router.delete('/:id', requireAdmin, async (req, res) => {
  const doc = await DocumentModel.findById(req.params.id);
  if (!doc) return res.status(404).json({ message: 'Not found' });
  await deleteRawAsset(doc.cloudinaryPublicId);
  await doc.deleteOne();
  logAdmin('document.delete', doc.title);
  res.json({ message: 'Deleted' });
});

module.exports = router;
