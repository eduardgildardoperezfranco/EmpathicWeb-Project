// Automatic Language Detection and Translation System
// This script detects user's browser language and applies appropriate translations

(function() {
    'use strict';

    // Supported languages
    const supportedLanguages = ['en', 'es', 'fr', 'de', 'it', 'pt', 'ru', 'zh', 'ja', 'ko'];

    // Default language (fallback)
    const defaultLanguage = 'en';

    /**
     * Detect user's browser language preference
     * @returns {string} Detected language code
     */
    function detectBrowserLanguage() {
        // Check localStorage first (user's previous preference)
        const storedLang = localStorage.getItem('empathicweb-language');
        if (storedLang && supportedLanguages.includes(storedLang)) {
            return storedLang;
        }

        // Detect from browser settings
        const browserLang = navigator.language || navigator.userLanguage;

        // Extract primary language code (e.g., 'en' from 'en-US')
        const primaryLang = browserLang.split('-')[0];

        // Check if primary language is supported
        if (supportedLanguages.includes(primaryLang)) {
            return primaryLang;
        }

        // Check for specific regional variants
        const regionalVariants = {
            'es': ['es-ES', 'es-CO', 'es-MX', 'es-AR'],
            'en': ['en-US', 'en-GB', 'en-CA', 'en-AU'],
            'fr': ['fr-FR', 'fr-CA', 'fr-BE'],
            'de': ['de-DE', 'de-AT', 'de-CH'],
            'pt': ['pt-BR', 'pt-PT'],
            'zh': ['zh-CN', 'zh-TW', 'zh-HK'],
            'ja': ['ja-JP'],
            'ko': ['ko-KR'],
            'ru': ['ru-RU', 'ru-UA', 'ru-BY']
        };

        for (const [lang, variants] of Object.entries(regionalVariants)) {
            if (variants.includes(browserLang)) {
                return lang;
            }
        }

        // Fallback to default language
        return defaultLanguage;
    }

    /**
     * Update HTML lang attribute
     * @param {string} lang - Language code
     */
    function updateLanguageAttribute(lang) {
        document.documentElement.lang = lang;
        document.documentElement.setAttribute('data-i18n-lang', lang);
    }

    /**
     * Apply translations to elements with data-i18n attribute
     * @param {string} lang - Language code
     */
    function applyTranslations(lang) {
        if (typeof translations === 'undefined' || !translations[lang]) {
            console.warn(`Translations for language '${lang}' not found`);
            return;
        }

        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = translations[lang][key];

            if (translation) {
                if (Array.isArray(translation)) {
                    // Handle list translations
                    const parent = element.parentElement;
                    if (element.tagName === 'UL' || element.tagName === 'OL') {
                        // Clear existing list items
                        while (element.firstChild) {
                            element.removeChild(element.firstChild);
                        }
                        // Add new list items
                        translation.forEach(item => {
                            const li = document.createElement('li');
                            li.textContent = item;
                            element.appendChild(li);
                        });
                    }
                } else {
                    // Handle regular translations
                    element.innerHTML = translation;
                }
            }
        });
    }

    /**
     * Initialize language detection and apply translations
     */
    function initializeLanguage() {
        const detectedLang = detectBrowserLanguage();

        // Store detected language
        localStorage.setItem('empathicweb-language', detectedLang);

        // Update HTML attributes
        updateLanguageAttribute(detectedLang);

        // Apply translations
        applyTranslations(detectedLang);

        // Dispatch custom event for other scripts
        document.dispatchEvent(new CustomEvent('languageChanged', {
            detail: { language: detectedLang }
        }));
    }

    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeLanguage);
    } else {
        initializeLanguage();
    }

    // Expose function for manual language switching
    window.switchLanguage = function(lang) {
        if (supportedLanguages.includes(lang)) {
            localStorage.setItem('empathicweb-language', lang);
            updateLanguageAttribute(lang);
            applyTranslations(lang);

            // Dispatch custom event
            document.dispatchEvent(new CustomEvent('languageChanged', {
                detail: { language: lang }
            }));
        } else {
            console.warn(`Language '${lang}' is not supported`);
        }
    };

    // Expose current language
    window.getCurrentLanguage = function() {
        return localStorage.getItem('empathicweb-language') || defaultLanguage;
    };

})();
