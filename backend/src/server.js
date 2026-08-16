require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { connectDB } = require('./utils/db');
const { startKeepAlive } = require('./utils/keepAlive');
const { seedSuperAdmin } = require('./utils/seedSuperAdmin');
const authRoutes = require('./routes/auth');
const profileRoutes = require('./routes/profile');
const contentRoutes = require('./routes/content');
const noticeRoutes = require('./routes/notice');
const resultRoutes = require('./routes/result');
const adminRoutes = require('./routes/admin');
const reportRoutes = require('./routes/reports');
const faqRoutes = require('./routes/faq');
const documentRoutes = require('./routes/documents');
const teamRoutes = require('./routes/team');
const app = express();
/* =========================
   CORS
========================= */
const allowedOrigins = (process.env.CLIENT_ORIGIN || '')
    .split(',')
    .map((o) => o.trim())
    .filter(Boolean);
app.use(
    cors({
        origin: (origin, callback) => {
            // Allow requests without Origin header
            // and origins listed in CLIENT_ORIGIN
            if (
                !origin ||
                allowedOrigins.length === 0 ||
                allowedOrigins.includes(origin)
            ) {
                return callback(null, true);
            }
            callback(new Error('Not allowed by CORS'));
        },
        credentials: true,
    })
);
/* =========================
   BODY PARSER
========================= */
app.use(express.json());
/* =========================
   ROOT ROUTE
   domain.com/
========================= */
app.get('/', (req, res) => {
    res.json({
        status: 'ok',
        message: 'Server is running successfully',
        service: 'API Server',
        time: new Date().toISOString()
    });
});
/* =========================
   HEALTH CHECK
   domain.com/health
========================= */
app.get('/health', (req, res) => {
    res.json({
        status: 'ok',
        message: 'Server is healthy',
        time: new Date().toISOString()
    });
});
/* =========================
   API HEALTH CHECK
   domain.com/api/health
========================= */
app.get('/api/health', (req, res) => {
    res.json({
        status: 'ok',
        message: 'API is healthy',
        time: new Date().toISOString()
    });
});
/* =========================
   API ROUTES
========================= */
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/content', contentRoutes);
app.use('/api/notice', noticeRoutes);
app.use('/api/result', resultRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/faq', faqRoutes);
app.use('/api/documents', documentRoutes);
app.use('/api/team', teamRoutes);
/* =========================
   API 404
========================= */
app.use('/api', (req, res) => {
    res.status(404).json({
        message: 'Route not found'
    });
});
/* =========================
   GENERIC ERROR HANDLER
========================= */
app.use((err, req, res, next) => {
    console.error(err);

    // Multer throws a bare "File too large" with no usable number attached —
    // translate it into the real limit so whoever's uploading knows what to do.
    if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(413).json({
            message: 'That PDF is too large — please keep each file under 10MB and try again.'
        });
    }

    res.status(err.status || 500).json({
        message: err.message || 'Server error'
    });
});
/* =========================
   SERVER
========================= */
const PORT = process.env.PORT || 5000;
connectDB()
    .then(async () => {
        await seedSuperAdmin();
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
            startKeepAlive();
        });
    })
    .catch((err) => {
        console.error(
            'Failed to connect to MongoDB:',
            err.message
        );
        process.exit(1);
    });
