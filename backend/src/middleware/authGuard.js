// src/middleware/authGuard.js
const jwt = require('jsonwebtoken');

/**
 * Protect routes that require admin access.
 * Expects token in Authorization header as `Bearer <token>`.
 */
function authGuard(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        const err = new Error('Authorization header missing');
        err.status = 401;
        return next(err);
    }
    const token = authHeader.split(' ')[1];
    if (!token) {
        const err = new Error('Token not provided');
        err.status = 401;
        return next(err);
    }
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.admin = payload; // attach admin info to request
        next();
    } catch (e) {
        const err = new Error('Invalid or expired token');
        err.status = 401;
        next(err);
    }
}

module.exports = { authGuard };
