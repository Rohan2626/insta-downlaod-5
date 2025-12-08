// src/server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');

const downloadRouter = require('./routes/download');
const blogRouter = require('./routes/blog');
const authRouter = require('./routes/auth');
const seoRouter = require('./routes/seo');
const statsRouter = require('./routes/stats');
const translationsRouter = require('./routes/translations');

const { errorHandler } = require('./middleware/errorHandler');

const app = express();

// Middleware
app.use(helmet());
app.use(cors({ origin: ['http://localhost:3000', 'http://localhost:5173'], credentials: true }));
app.use(express.json());
app.use(morgan('combined'));

// Global rate limiter (adjust per route later)
const globalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 200, // limit each IP to 200 requests per window
    standardHeaders: true,
    legacyHeaders: false,
});
app.use(globalLimiter);

// Routes
app.use('/api/download', downloadRouter);
app.use('/api/blog', blogRouter);
app.use('/api/auth', authRouter);
app.use('/api/seo', seoRouter);
app.use('/api/admin/stats', statsRouter);
app.use('/api/translations', translationsRouter);

// Health check
app.get('/health', (req, res) => res.json({ status: 'ok' }));

// Error handling (must be after routes)
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
