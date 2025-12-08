// src/routes/seo.js
const express = require('express');
const router = express.Router();
const { getSeoConfig } = require('../controllers/seoController');

router.get('/', async (req, res, next) => {
    try {
        const page = req.query.page || 'home';
        const seo = await getSeoConfig(page);
        res.json(seo);
    } catch (err) {
        next(err);
    }
});

module.exports = router;
