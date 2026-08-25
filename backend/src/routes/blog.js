const express = require('express');
const router = express.Router();
const BlogPost = require('../models/BlogPost');
const { requireAdmin } = require('../middleware/auth');
const logAdmin = require('../utils/logAdmin');

const { toCsv } = require('../utils/csv');

// GET /public - Returns published posts, sorted newest first
router.get('/public', async (req, res) => {
  try {
    const { category, tag, page = 1, limit = 10, search, sort } = req.query;
    const query = { published: true };
    
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } },
        { excerpt: { $regex: search, $options: 'i' } },
        { tags: { $regex: search, $options: 'i' } }
      ];
    }
    
    if (category) query.category = category;
    if (tag) query.tags = tag;

    let sortObj = { createdAt: -1 };
    if (sort === 'oldest') sortObj = { createdAt: 1 };
    else if (sort === 'popular') sortObj = { views: -1 };

    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const posts = await BlogPost.find(query)
      .sort(sortObj)
      .skip(skip)
      .limit(parseInt(limit));
      
    const total = await BlogPost.countDocuments(query);
    
    res.json({
      posts,
      total,
      page: parseInt(page),
      totalPages: Math.ceil(total / parseInt(limit))
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /public/:slug - Get single published post by slug
router.get('/public/:slug', async (req, res) => {
  try {
    const post = await BlogPost.findOne({ slug: req.params.slug, published: true });
    if (!post) return res.status(404).json({ message: 'Post not found or not published' });
    
    post.views += 1;
    await post.save();
    
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /admin/all - Returns all posts including drafts
router.get('/admin/all', requireAdmin, async (req, res) => {
  try {
    const { page = 1, limit = 20, search, category, status, sort } = req.query;
    const query = {};
    
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } },
        { excerpt: { $regex: search, $options: 'i' } },
        { tags: { $regex: search, $options: 'i' } }
      ];
    }
    if (category) query.category = category;
    if (status === 'published') query.published = true;
    else if (status === 'draft') query.published = false;

    let sortObj = { createdAt: -1 };
    if (sort === 'oldest') sortObj = { createdAt: 1 };
    else if (sort === 'popular') sortObj = { views: -1 };

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const posts = await BlogPost.find(query)
      .sort(sortObj)
      .skip(skip)
      .limit(parseInt(limit));
      
    const total = await BlogPost.countDocuments(query);

    res.json({
      posts,
      total,
      page: parseInt(page),
      totalPages: Math.ceil(total / parseInt(limit))
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /admin/export.csv - Export all blog posts as CSV
router.get('/admin/export.csv', requireAdmin, async (req, res) => {
  try {
    const posts = await BlogPost.find({}).sort({ createdAt: -1 }).lean();
    const data = posts.map(p => ({
      title: p.title,
      slug: p.slug,
      category: p.category,
      author: p.author || 'Admin',
      published: p.published ? 'Yes' : 'No',
      views: p.views || 0,
      createdAt: p.createdAt ? p.createdAt.toISOString() : ''
    }));
    const csv = toCsv(data, ['title', 'slug', 'category', 'author', 'published', 'views', 'createdAt']);
    res.header('Content-Type', 'text/csv');
    res.attachment('blog_posts.csv');
    res.send(csv);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST / - Create blog post
router.post('/', requireAdmin, async (req, res) => {
  try {
    const data = req.body;
    if (!data.slug && data.title) {
      data.slug = data.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    }
    
    // Calculate read time: avg 200 words/min
    if (data.content) {
      const words = data.content.trim().split(/\s+/).length;
      data.readTimeMinutes = Math.ceil(words / 200);
    }
    
    const post = new BlogPost(data);
    await post.save();
    
    await logAdmin('CREATE_BLOG_POST', `Created post: ${post.title} by Admin ID: ${req.user.id}`);
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT /:id - Update blog post
router.put('/:id', requireAdmin, async (req, res) => {
  try {
    const data = req.body;
    data.updatedAt = Date.now();
    
    if (data.content) {
      const words = data.content.trim().split(/\s+/).length;
      data.readTimeMinutes = Math.ceil(words / 200);
    }
    
    const post = await BlogPost.findByIdAndUpdate(req.params.id, data, { new: true });
    if (!post) return res.status(404).json({ message: 'Post not found' });
    
    await logAdmin('UPDATE_BLOG_POST', `Updated post: ${post.title} by Admin ID: ${req.user.id}`);
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE /:id - Delete blog post
router.delete('/:id', requireAdmin, async (req, res) => {
  try {
    const post = await BlogPost.findByIdAndDelete(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    
    await logAdmin('DELETE_BLOG_POST', `Deleted post: ${post.title} by Admin ID: ${req.user.id}`);
    res.json({ message: 'Post deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
