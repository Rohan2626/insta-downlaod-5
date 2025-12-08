// src/controllers/seoController.js
// Simple in-memory or static SEO configuration for now. 
// Can be extended to fetch from DB if needed.

const defaultSeo = {
    title: 'Instagram Video Downloader',
    description: 'Download Instagram videos, reels, and stories for free.',
    keywords: ['instagram', 'downloader', 'video', 'reels'],
};

async function getSeoConfig(page = 'home') {
    // Return specific SEO for pages or default
    // This is a placeholder for dynamic SEO logic
    if (page === 'home') {
        return defaultSeo;
    }
    return { ...defaultSeo, title: `${page} - ${defaultSeo.title}` };
}

module.exports = { getSeoConfig };
