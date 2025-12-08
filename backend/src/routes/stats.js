// src/routes/stats.js
const express = require('express');
const router = express.Router();
const { authGuard } = require('../middleware/authGuard');
const { getStats } = require('../controllers/statsController');

router.get('/', authGuard, async (req, res, next) => {
    try {
        const stats = await getStats();
        res.json(stats);
    } catch (err) {
        next(err);
    }
});

module.exports = router;
