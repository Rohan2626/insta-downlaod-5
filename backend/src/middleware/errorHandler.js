// src/middleware/errorHandler.js
module.exports.errorHandler = (err, req, res, _next) => { // eslint-disable-line no-unused-vars
    console.error(err);
    const status = err.status || 500;
    const response = {
        success: false,
        error: {
            code: status,
            message: err.message || 'Internal Server Error',
        },
    };
    // Hide stack traces in production
    if (process.env.NODE_ENV !== 'production') {
        response.error.details = err.stack;
    }
    res.status(status).json(response);
};
