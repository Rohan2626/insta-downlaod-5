// src/services/cache.js
const Redis = require('ioredis');

let redis = null;
// Simple in-memory cache fallback
const memoryCache = new Map();

if (process.env.REDIS_URL) {
    redis = new Redis(process.env.REDIS_URL, {
        lazyConnect: true,
        retryStrategy: (times) => {
            if (times > 3) {
                console.warn('Redis connection failed too many times, disabling Redis.');
                return null;
            }
            return Math.min(times * 50, 2000);
        }
    });

    redis.on('error', (err) => {
        // Suppress unhandled error events
        console.warn('Redis error (using memory cache):', err.message);
    });
}

/**
 * Get a cached value by key.
 * @param {string} key
 * @returns {Promise<string|null>}
 */
async function getCache(key) {
    if (redis && redis.status === 'ready') {
        try {
            return await redis.get(key);
        } catch (err) {
            // Fallback to memory
        }
    }
    return memoryCache.get(key) || null;
}

/**
 * Set a cached value with optional TTL (seconds).
 * @param {string} key
 * @param {string} value
 * @param {number} ttlSeconds
 */
async function setCache(key, value, ttlSeconds = 0) {
    if (redis && redis.status === 'ready') {
        try {
            if (ttlSeconds > 0) {
                await redis.set(key, value, 'EX', ttlSeconds);
            } else {
                await redis.set(key, value);
            }
            return;
        } catch (err) {
            // Fallback
        }
    }

    memoryCache.set(key, value);
    if (ttlSeconds > 0) {
        setTimeout(() => memoryCache.delete(key), ttlSeconds * 1000);
    }
}

module.exports = { getCache, setCache };
