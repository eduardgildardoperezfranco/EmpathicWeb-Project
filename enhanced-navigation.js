/* ============================================
   ENHANCED NAVIGATION JAVASCRIPT
   Dropdown functionality with accessibility compliance
   ============================================ */

(function() {
    'use strict';

    // Cache DOM elements for better performance
    let cachedElements = {
        navbar: null,
        hamburger: null,
        navMenu: null,
        navLinks: null,
        dropdownItems: null,
        skipLink: null
    };
    
    let isInitialized = false;
    let lastScrollY = 0;
    let activeDropdown = null;

    /**
     * Initialize enhanced navigation
     */
    function initEnhancedNavigation() {
        if (isInitialized) return;

        // Cache elements
        cachedElements.navbar = document.querySelector('.navbar');
        cachedElements.hamburger = document.getElementById('hamburger');
        cachedElements.navMenu = document.getElementById('nav-menu');
        cachedElements.navLinks = document.querySelectorAll('.nav-link');
        cachedElements.dropdownItems = document.querySelectorAll('.nav-item.has-dropdown');
        cachedElements.skipLink = document.querySelector('.skip-to-content');

        if (!cachedElements.navbar || !cachedElements.navMenu) {
            console.warn('Enhanced navigation: Required elements not found');
            return;
        }

        // Setup all functionality
        setupScrollEffects();
        setupMobileMenu();
        setupDropdownMenus();
        setupKeyboardNavigation();
        setupAccessibilityFeatures();
        setupTouchOptimizations();
        setupFocusManagement();

        isInitialized = true;
        console.log('Enhanced navigation initialized successfully');
    }

    /**
     * Setup scroll effects for navbar
     */
    function setupScrollEffects() {
        if (!cachedElements.navbar) return;

        let ticking = false;

        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    handleScroll();
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });

        function handleScroll() {
            const currentScrollY = window.pageYOffset || document.documentElement.scrollTop;
            
            // Add/remove scrolled class
            if (currentScrollY > 50) {
                cachedElements.navbar.classList.add('scrolled');
            } else {
                cachedElements.navbar.classList.remove('scrolled');
            }

            // Hide/show navbar on scroll direction
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                cachedElements.navbar.style.transform = 'translateY(-100%)';
            } else {
                cachedElements.navbar.style.transform = 'translateY(0)';
            }

            lastScrollY = currentScrollY;
        }
    }

    /**
     * Setup mobile menu functionality
     */
    function setupMobileMenu() {
        if (!cachedElements.hamburger || !cachedElements.navMenu) return;

        // Toggle mobile menu
        cachedElements.hamburger.addEventListener('click', toggleMobileMenu);
        
        // Close menu when clicking outside
        document.addEventListener('click', handleOutsideClick);
        
        // Close menu when clicking a link
        cachedElements.navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    closeMobileMenu();
                }
            });
        });

        // Handle window resize
        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                if (window.innerWidth > 768) {
                    closeMobileMenu();
                }
            }, 250);
        });
    }

    /**
     * Toggle mobile menu
     */
    function toggleMobileMenu() {
        const isActive = cachedElements.hamburger.classList.contains('active');
        
        if (isActive) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    }

    /**
     * Open mobile menu
     */
    function openMobileMenu() {
        cachedElements.hamburger.classList.add('active');
        cachedElements.navMenu.classList.add('active');
        cachedElements.hamburger.setAttribute('aria-expanded', 'true');
        
        // Focus first link for accessibility
        setTimeout(() => {
            const firstLink = cachedElements.navMenu.querySelector('.nav-link');
            if (firstLink) {
                firstLink.focus();
            }
        }, 100);
        
        // Prevent body scroll
        document.body.style.overflow = 'hidden';
    }

    /**
     * Close mobile menu
     */
    function closeMobileMenu() {
        cachedElements.hamburger.classList.remove('active');
        cachedElements.navMenu.classList.remove('active');
        cachedElements.hamburger.setAttribute('aria-expanded', 'false');
        
        // Restore body scroll
        document.body.style.overflow = '';
        
        // Close all dropdowns
        closeAllDropdowns();
    }

    /**
     * Handle clicks outside the menu
     */
    function handleOutsideClick(event) {
        if (!cachedElements.hamburger || !cachedElements.navMenu) return;

        const isClickInsideMenu = cachedElements.navMenu.contains(event.target);
        const isClickOnHamburger = cachedElements.hamburger.contains(event.target);

        if (!isClickInsideMenu && !isClickOnHamburger) {
            closeMobileMenu();
        }
    }

    /**
     * Setup dropdown menu functionality
     */
    function setupDropdownMenus() {
        if (!cachedElements.dropdownItems || cachedElements.dropdownItems.length === 0) return;

        cachedElements.dropdownItems.forEach(item => {
            const link = item.querySelector('.nav-link');
            const dropdown = item.querySelector('.dropdown-menu');
            
            if (!link || !dropdown) return;

            // Desktop: hover to open
            item.addEventListener('mouseenter', () => {
                if (window.innerWidth > 768) {
                    openDropdown(item);
                }
            });

            item.addEventListener('mouseleave', () => {
                if (window.innerWidth > 768) {
                    closeDropdown(item);
                }
            });

            // Mobile: click to toggle
            link.addEventListener('click', (e) => {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    toggleMobileDropdown(item);
                }
            });

            // Keyboard navigation
            link.addEventListener('keydown', (e) => {
                handleDropdownKeyboard(e, item, dropdown);
            });
        });
    }

    /**
     * Open dropdown menu
     */
    function openDropdown(item) {
        // Close other dropdowns
        cachedElements.dropdownItems.forEach(otherItem => {
            if (otherItem !== item) {
                closeDropdown(otherItem);
            }
        });

        item.classList.add('dropdown-open');
        activeDropdown = item;

        // Set ARIA attributes
        const link = item.querySelector('.nav-link');
        const dropdown = item.querySelector('.dropdown-menu');
        if (link && dropdown) {
            link.setAttribute('aria-expanded', 'true');
            dropdown.setAttribute('aria-hidden', 'false');
        }
    }

    /**
     * Close dropdown menu
     */
    function closeDropdown(item) {
        item.classList.remove('dropdown-open');
        
        // Reset ARIA attributes
        const link = item.querySelector('.nav-link');
        const dropdown = item.querySelector('.dropdown-menu');
        if (link && dropdown) {
            link.setAttribute('aria-expanded', 'false');
            dropdown.setAttribute('aria-hidden', 'true');
        }
    }

    /**
     * Close all dropdowns
     */
    function closeAllDropdowns() {
        if (!cachedElements.dropdownItems) return;

        cachedElements.dropdownItems.forEach(item => {
            closeDropdown(item);
            item.classList.remove('expanded');
        });
        
        activeDropdown = null;
    }

    /**
     * Toggle mobile dropdown
     */
    function toggleMobileDropdown(item) {
        const isExpanded = item.classList.contains('expanded');
        
        // Close other dropdowns
        cachedElements.dropdownItems.forEach(otherItem => {
            if (otherItem !== item) {
                otherItem.classList.remove('expanded');
            }
        });

        if (isExpanded) {
            item.classList.remove('expanded');
        } else {
            item.classList.add('expanded');
        }
        
        // Update ARIA attributes for mobile dropdown
        const link = item.querySelector('.nav-link');
        const dropdown = item.querySelector('.dropdown-menu');
        if (link && dropdown) {
            const isNowExpanded = item.classList.contains('expanded');
            link.setAttribute('aria-expanded', isNowExpanded ? 'true' : 'false');
            dropdown.setAttribute('aria-hidden', isNowExpanded ? 'false' : 'true');
        }
    }

    /**
     * Handle dropdown keyboard navigation
     */
    function handleDropdownKeyboard(e, item, dropdown) {
        const dropdownLinks = dropdown.querySelectorAll('.dropdown-link');
        
        switch (e.key) {
            case 'Enter':
            case ' ':
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    toggleMobileDropdown(item);
                }
                break;
                
            case 'Escape':
                e.preventDefault();
                closeDropdown(item);
                item.querySelector('.nav-link').focus();
                break;
                
            case 'ArrowDown':
                if (item.classList.contains('dropdown-open') && dropdownLinks.length > 0) {
                    e.preventDefault();
                    dropdownLinks[0].focus();
                }
                break;
        }
    }

    /**
     * Setup keyboard navigation
     */
    function setupKeyboardNavigation() {
        if (!cachedElements.navLinks) return;

        cachedElements.navLinks.forEach((link, index) => {
            link.addEventListener('keydown', (e) => {
                const links = Array.from(cachedElements.navLinks);
                
                switch (e.key) {
                    case 'ArrowRight':
                        e.preventDefault();
                        const nextLink = links[(index + 1) % links.length];
                        nextLink.focus();
                        break;
                        
                    case 'ArrowLeft':
                        e.preventDefault();
                        const prevLink = links[(index - 1 + links.length) % links.length];
                        prevLink.focus();
                        break;
                        
                    case 'Home':
                        e.preventDefault();
                        links[0].focus();
                        break;
                        
                    case 'End':
                        e.preventDefault();
                        links[links.length - 1].focus();
                        break;
                }
            });
        });

        // Handle dropdown link navigation
        const dropdownLinks = document.querySelectorAll('.dropdown-link');
        dropdownLinks.forEach((link, index) => {
            link.addEventListener('keydown', (e) => {
                const links = Array.from(dropdownLinks);
                
                switch (e.key) {
                    case 'ArrowDown':
                        e.preventDefault();
                        const nextLink = links[(index + 1) % links.length];
                        nextLink.focus();
                        break;
                        
                    case 'ArrowUp':
                        e.preventDefault();
                        const prevLink = links[(index - 1 + links.length) % links.length];
                        prevLink.focus();
                        break;
                        
                    case 'Escape':
                        e.preventDefault();
                        const parentItem = link.closest('.nav-item.has-dropdown');
                        if (parentItem) {
                            closeDropdown(parentItem);
                            parentItem.querySelector('.nav-link').focus();
                        }
                        break;
                }
            });
        });
    }

    /**
     * Setup accessibility features
     */
    function setupAccessibilityFeatures() {
        // Skip to content link
        if (cachedElements.skipLink) {
            cachedElements.skipLink.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = cachedElements.skipLink.getAttribute('href');
                if (targetId) {
                    const target = document.querySelector(targetId);
                    if (target) {
                        target.focus();
                        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                }
            });
        }

        // Handle reduced motion preference
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
        if (prefersReducedMotion.matches) {
            document.documentElement.style.setProperty('--animation-duration', '0.01s');
        }

        // Handle focus visible for keyboard users
        document.body.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                document.body.classList.add('keyboard-navigation');
            }
        });

        document.body.addEventListener('mousedown', () => {
            document.body.classList.remove('keyboard-navigation');
        });
    }

    /**
     * Setup touch optimizations
     */
    function setupTouchOptimizations() {
        if (!cachedElements.navMenu) return;

        let touchStartY = 0;
        let touchStartX = 0;

        cachedElements.navMenu.addEventListener('touchstart', (e) => {
            touchStartY = e.touches[0].clientY;
            touchStartX = e.touches[0].clientX;
        }, { passive: true });

        cachedElements.navMenu.addEventListener('touchend', (e) => {
            const touchEndY = e.changedTouches[0].clientY;
            const touchEndX = e.changedTouches[0].clientX;
            
            const deltaY = Math.abs(touchEndY - touchStartY);
            const deltaX = Math.abs(touchEndX - touchStartX);
            
            // Prevent default for swipes
            if (deltaX > 30 || deltaY > 30) {
                e.preventDefault();
            }
        }, { passive: false });
    }

    /**
     * Setup focus management
     */
    function setupFocusManagement() {
        // Trap focus in mobile menu when open
        cachedElements.hamburger.addEventListener('click', () => {
            if (cachedElements.hamburger.classList.contains('active')) {
                trapFocus(cachedElements.navMenu);
            }
        });

        // Handle escape key to close menu
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                if (cachedElements.hamburger.classList.contains('active')) {
                    closeMobileMenu();
                    cachedElements.hamburger.focus();
                }
                closeAllDropdowns();
            }
        });
    }

    /**
     * Trap focus within an element
     */
    function trapFocus(element) {
        const focusableElements = element.querySelectorAll(
            'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        element.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                if (e.shiftKey) {
                    // Shift + Tab
                    if (document.activeElement === firstElement) {
                        e.preventDefault();
                        lastElement.focus();
                    }
                } else {
                    // Tab
                    if (document.activeElement === lastElement) {
                        e.preventDefault();
                        firstElement.focus();
                    }
                }
            }
        });
    }

    /**
     * Highlight current page in navigation
     */
    function highlightCurrentPage() {
        if (!cachedElements.navLinks) return;

        const currentPath = window.location.pathname;

        // Remove active class from all links
        cachedElements.navLinks.forEach(link => {
            link.classList.remove('active');
        });

        // Find and highlight current page
        let foundActive = false;
        for (let i = 0; i < cachedElements.navLinks.length; i++) {
            const link = cachedElements.navLinks[i];
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
                    for (let i = 0; i < cachedElements.navLinks.length; i++) {
                        const link = cachedElements.navLinks[i];
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

    /**
     * Update on page navigation
     */
    window.addEventListener('popstate', highlightCurrentPage);

    /**
     * Initialize on DOM ready
     */
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            initEnhancedNavigation();
            highlightCurrentPage();
        });
    } else {
        initEnhancedNavigation();
        highlightCurrentPage();
    }

    // Export for external use
    window.EnhancedNavigation = {
        init: initEnhancedNavigation,
        openMenu: openMobileMenu,
        closeMenu: closeMobileMenu,
        toggleMenu: toggleMobileMenu
    };

})();
