// src/routes/auth.js
const express = require('express');
const router = express.Router();
const { z } = require('zod');
const { loginController } = require('../controllers/authController');

const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
});

router.post('/login', async (req, res, next) => {
    try {
        const parsed = loginSchema.parse(req.body);
        const token = await loginController(parsed.email, parsed.password);
        res.json({ success: true, token });
    } catch (err) {
        next(err);
    }
});

module.exports = router;
