// src/controllers/authController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * Validate credentials and return a signed JWT.
 * @param {string} email
 * @param {string} password
 * @returns {Promise<string>} JWT token
 */
async function loginController(email, password) {
    const user = await prisma.adminUser.findUnique({ where: { email } });
    if (!user) {
        const err = new Error('Invalid email or password');
        err.status = 401;
        throw err;
    }
    const passwordMatches = await bcrypt.compare(password, user.passwordHash);
    if (!passwordMatches) {
        const err = new Error('Invalid email or password');
        err.status = 401;
        throw err;
    }
    const payload = { sub: user.id, role: 'admin' };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
    return token;
}

module.exports = { loginController };
