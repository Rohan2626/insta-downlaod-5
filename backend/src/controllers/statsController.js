// src/controllers/statsController.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function getStats() {
    const [userCount, postCount, categoryCount] = await Promise.all([
        prisma.adminUser.count(),
        prisma.post.count(),
        prisma.category.count(),
    ]);

    // Mock download count for now as we don't persist downloads in DB yet
    // In a real app, we might log downloads to a table or Redis
    const downloadCount = 1234;

    return {
        users: userCount,
        posts: postCount,
        categories: categoryCount,
        downloads: downloadCount,
    };
}

module.exports = { getStats };
