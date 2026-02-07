// Navbar Active Page Highlighter - Simplified Version
(function() {
    'use strict';

    // Cache DOM elements for better performance
    let cachedNavLinks = null;
    let isInitialized = false;

    // Initialize navbar functionality
    function initNavbar() {
        if (isInitialized) return;

        // Cache elements
        cachedNavLinks = document.querySelectorAll('.nav-link');

        if (!cachedNavLinks || cachedNavLinks.length === 0) {
            return;
        }

        // Highlight current page
        highlightCurrentPage();

        isInitialized = true;
    }

    // Highlight current page function
    function highlightCurrentPage() {
        if (!cachedNavLinks) return;

        const currentPath = window.location.pathname;

        // Remove active class from all links in one pass
        for (let i = 0; i < cachedNavLinks.length; i++) {
            cachedNavLinks[i].classList.remove('active');
        }

        // Find and highlight current page
        let foundActive = false;
        for (let i = 0; i < cachedNavLinks.length; i++) {
            const link = cachedNavLinks[i];
            const href = link.getAttribute('href');

            if (href && currentPath.includes(href)) {
                link.classList.add('active');
                foundActive = true;
                break;
            }
        }

        // Fallback: check data-i18n attribute
        if (!foundActive) {
            const pageMappings = {
                '/index.html': 'nav.home',
                '/about/about.html': 'nav.about',
                '/Projects/projects.html': 'nav.projects',
                '/services-catalog.html': 'nav.services',
                '/contact.html': 'nav.contact',
                '/': 'nav.home'
            };

            for (const [path, page] of Object.entries(pageMappings)) {
                if (currentPath.includes(path)) {
                    for (let i = 0; i < cachedNavLinks.length; i++) {
                        const link = cachedNavLinks[i];
                        const linkText = link.getAttribute('data-i18n');
                        if (linkText === page) {
                            link.classList.add('active');
                            break;
                        }
                    }
                    break;
                }
            }
        }
    }

    // Initialize on DOMContentLoaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initNavbar);
    } else {
        initNavbar();
    }

    // Optional: Update on page navigation (for SPA-like behavior)
    window.addEventListener('popstate', highlightCurrentPage);
})();
