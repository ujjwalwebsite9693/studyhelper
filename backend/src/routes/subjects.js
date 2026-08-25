const express = require('express');
const router = express.Router();
const SubjectGuide = require('../models/SubjectGuide');
const { requireAdmin } = require('../middleware/auth');
const logAdmin = require('../utils/logAdmin');

const { toCsv } = require('../utils/csv');

// GET /public - Returns all subject guides sorted by semester then title (public)
router.get('/public', async (req, res) => {
  try {
    const { page = 1, limit = 12, search, branch, semester, sort } = req.query;
    
    const query = {};
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { introduction: { $regex: search, $options: 'i' } },
        { metaDescription: { $regex: search, $options: 'i' } }
      ];
    }
    if (branch) {
      query.branch = { $in: [branch, 'BOTH'] };
    }
    if (semester) {
      query.semester = semester;
    }

    let sortObj = { semester: 1, title: 1 };
    if (sort === 'newest') sortObj = { createdAt: -1 };
    else if (sort === 'oldest') sortObj = { createdAt: 1 };
    else if (sort === 'az') sortObj = { title: 1 };
    else if (sort === 'za') sortObj = { title: -1 };

    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const guides = await SubjectGuide.find(query)
      .select('slug title branch semester metaDescription introduction createdAt')
      .sort(sortObj)
      .skip(skip)
      .limit(parseInt(limit));
      
    const total = await SubjectGuide.countDocuments(query);
    
    // Process to return only first 200 chars of introduction
    const formattedGuides = guides.map(guide => ({
      ...guide.toObject(),
      introduction: guide.introduction ? guide.introduction.substring(0, 200) : ''
    }));

    res.json({
      guides: formattedGuides,
      total,
      page: parseInt(page),
      totalPages: Math.ceil(total / parseInt(limit))
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /public/:slug - Returns full subject guide by slug (public)
router.get('/public/:slug', async (req, res) => {
  try {
    const guide = await SubjectGuide.findOne({ slug: req.params.slug });
    if (!guide) return res.status(404).json({ message: 'Subject guide not found' });
    res.json(guide);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /admin/all - Returns all subject guides for admin (requireAdmin)
router.get('/admin/all', requireAdmin, async (req, res) => {
  try {
    const { search, branch, semester, sort } = req.query;
    
    const query = {};
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { introduction: { $regex: search, $options: 'i' } },
        { metaDescription: { $regex: search, $options: 'i' } }
      ];
    }
    if (branch) query.branch = branch;
    if (semester) query.semester = semester;

    let sortObj = { createdAt: -1 };
    if (sort === 'newest') sortObj = { createdAt: -1 };
    else if (sort === 'oldest') sortObj = { createdAt: 1 };
    else if (sort === 'az') sortObj = { title: 1 };
    else if (sort === 'za') sortObj = { title: -1 };

    const guides = await SubjectGuide.find(query).sort(sortObj);
    res.json(guides);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /admin/export.csv - Export all subject guides as CSV
router.get('/admin/export.csv', requireAdmin, async (req, res) => {
  try {
    const guides = await SubjectGuide.find({}).sort({ createdAt: -1 }).lean();
    const data = guides.map(g => ({
      title: g.title,
      slug: g.slug,
      branch: g.branch,
      semester: g.semester,
      metaDescription: g.metaDescription || '',
      createdAt: g.createdAt ? g.createdAt.toISOString() : ''
    }));
    const csv = toCsv(data, ['title', 'slug', 'branch', 'semester', 'metaDescription', 'createdAt']);
    res.header('Content-Type', 'text/csv');
    res.attachment('subjects.csv');
    res.send(csv);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST / - Create subject guide (requireAdmin)
router.post('/', requireAdmin, async (req, res) => {
  try {
    const data = req.body;
    if (!data.slug && data.title) {
      data.slug = data.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    }
    data.updatedAt = Date.now();
    const guide = new SubjectGuide(data);
    await guide.save();
    
    await logAdmin('CREATE_SUBJECT_GUIDE', `Created subject guide: ${guide.title} by Admin ID: ${req.user.id}`);
    res.status(201).json(guide);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT /:id - Update subject guide (requireAdmin)
router.put('/:id', requireAdmin, async (req, res) => {
  try {
    const data = req.body;
    data.updatedAt = Date.now();
    const guide = await SubjectGuide.findByIdAndUpdate(req.params.id, data, { new: true });
    if (!guide) return res.status(404).json({ message: 'Subject guide not found' });
    
    await logAdmin('UPDATE_SUBJECT_GUIDE', `Updated subject guide: ${guide.title} by Admin ID: ${req.user.id}`);
    res.json(guide);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE /:id - Delete subject guide (requireAdmin)
router.delete('/:id', requireAdmin, async (req, res) => {
  try {
    const guide = await SubjectGuide.findByIdAndDelete(req.params.id);
    if (!guide) return res.status(404).json({ message: 'Subject guide not found' });
    
    await logAdmin('DELETE_SUBJECT_GUIDE', `Deleted subject guide: ${guide.title} by Admin ID: ${req.user.id}`);
    res.json({ message: 'Subject guide deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
