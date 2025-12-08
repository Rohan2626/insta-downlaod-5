// src/routes/translations.js
const express = require('express');
const router = express.Router();
const { getTranslations } = require('../controllers/translationsController');

router.get('/:lang', async (req, res, next) => {
    try {
        const lang = req.params.lang;
        const data = await getTranslations(lang);
        res.json(data);
    } catch (err) {
        next(err);
    }
});

module.exports = router;
