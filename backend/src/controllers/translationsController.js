// src/controllers/translationsController.js

// Simple static translations
const translations = {
    en: {
        title: 'Instagram Downloader',
        downloadBtn: 'Download',
    },
    es: {
        title: 'Descargador de Instagram',
        downloadBtn: 'Descargar',
    },
    fr: {
        title: 'Téléchargeur Instagram',
        downloadBtn: 'Télécharger',
    }
};

async function getTranslations(lang = 'en') {
    return translations[lang] || translations['en'];
}

module.exports = { getTranslations };
