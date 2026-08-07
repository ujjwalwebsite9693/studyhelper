require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { connectDB } = require('./utils/db');
const { startKeepAlive } = require('./utils/keepAlive');

const authRoutes = require('./routes/auth');
const profileRoutes = require('./routes/profile');
const contentRoutes = require('./routes/content');
const noticeRoutes = require('./routes/notice');
const resultRoutes = require('./routes/result');
const adminRoutes = require('./routes/admin');
const reportRoutes = require('./routes/reports');

const app = express();

const allowedOrigins = (process.env.CLIENT_ORIGIN || '')
  .split(',')
  .map((o) => o.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // allow same-origin/non-browser requests (no origin header) and any
      // origin explicitly listed in CLIENT_ORIGIN
      if (!origin || allowedOrigins.length === 0 || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
  })
);
app.use(express.json());

app.get('/api/health', (req, res) => res.json({ status: 'ok', time: new Date().toISOString() }));

app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/content', contentRoutes);
app.use('/api/notice', noticeRoutes);
app.use('/api/result', resultRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/reports', reportRoutes);

// 404 fallback for unknown API routes
app.use('/api', (req, res) => res.status(404).json({ message: 'Route not found' }));

// Generic error handler (e.g. multer file-size/type errors)
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ message: err.message || 'Server error' });
});

const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      startKeepAlive();
    });
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB:', err.message);
    process.exit(1);
  });
