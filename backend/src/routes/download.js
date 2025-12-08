// src/routes/download.js
const express = require('express');
const router = express.Router();
const { z } = require('zod');
const { downloadController, proxyDownloadController } = require('../controllers/downloadController');

// Validation schema
const downloadSchema = z.object({
    url: z.string().url().regex(/^https?:\/\/([^.]+\.)?instagram\.com\/.*$/i, 'Must be an Instagram URL'),
});

router.post('/', async (req, res, next) => {
    try {
        const parsed = downloadSchema.parse(req.body);
        const result = await downloadController(parsed.url);
        res.json({ success: true, ...result });
    } catch (err) {
        next(err);
    }
});

router.get('/proxy', async (req, res, next) => {
    try {
        const url = req.query.url;
        const isAttachment = req.query.download === 'true'; // Check for download param

        if (!url) {
            return res.status(400).json({ error: 'Missing url parameter' });
        }
        await proxyDownloadController(url, isAttachment, res);
    } catch (err) {
        next(err);
    }
});

module.exports = router;
