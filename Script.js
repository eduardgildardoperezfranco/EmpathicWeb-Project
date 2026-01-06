document.addEventListener('DOMContentLoaded', () => {
  setupContactHints();
  setupGridGallery();
  setupAccessibilityFeatures();
  setupPerformanceOptimizations();
  setupAdvancedImageLoading();
});

function setupContactHints() {
  const form = document.querySelector('#contact-intake');
  if (!form) return;

  const fields = form.querySelectorAll('input, select, textarea');
  fields.forEach((field) => {
    const hint = field.closest('.input-chip, .textarea-chip')?.querySelector('.inline-hint');
    if (!hint) return;

    const messages = getHintMessages(field);
    field.addEventListener('focus', () => showHint(field, hint, messages.base));
    field.addEventListener('blur', () => validateField(field, hint, messages));
    field.addEventListener('input', () => validateField(field, hint, messages));
  });
}

function getHintMessages(field) {
  const map = {
    email: {
      base: 'Use a professional address (e.g. name@company.com).',
      missing: 'Email is required to receive the project roadmap.',
      invalid: 'Please enter a valid email format.'
    },
    name: {
      base: 'Share your full name so I can personalize the response.',
      missing: 'Please provide your full name.',
      invalid: 'At least 3 characters are recommended.'
    },
    phone: {
      base: 'Include country code if you prefer WhatsApp follow up.',
      invalid: 'Numbers, spaces, +, and - are allowed.'
    },
    country: {
      base: 'Where is your HQ or main operations located?'
    },
    company: {
      base: 'Optional – helps tailor the solution to your sector.'
    },
    service: {
      base: 'Select the service focus of your project.',
      missing: 'Please choose one service to continue.'
    },
    goal: {
      base: 'What outcome matters most for this initiative?'
    },
    timeline: {
      base: 'When would you like to launch or deliver?'
    },
    budget: {
      base: 'An estimated range keeps recommendations realistic.'
    },
    'contact-method': {
      base: 'How should I reach you with the proposal?'
    },
    message: {
      base: 'Share context, success metrics, and any inspiration.',
      missing: 'Please provide at least a short summary.'
    }
  };

  return map[field.id] || { base: 'Provide relevant details for this field.' };
}

function showHint(field, hint, message) {
  hint.innerHTML = `<i class="fas fa-info-circle"></i>${message}`;
  hint.classList.add('active');
  field.classList.remove('input-error');
}

function validateField(field, hint, messages) {
  const value = field.value.trim();
  let message = '';
  let hasError = false;

  if (field.required && !value) {
    message = messages.missing || 'This field is required.';
    hasError = true;
  } else if (field.type === 'email' && value && !isValidEmail(value)) {
    message = messages.invalid || 'Invalid email format.';
    hasError = true;
  } else if (field.id === 'phone' && value && !isValidPhone(value)) {
    message = messages.invalid || 'Use digits, spaces, + and - only.';
    hasError = true;
  } else if (field.id === 'name' && value.length < 3) {
    message = messages.invalid || 'Please enter at least 3 characters.';
    hasError = true;
  }

  if (hasError) {
    hint.innerHTML = `<i class="fas fa-lightbulb"></i>${message}`;
    hint.classList.add('active');
    field.classList.add('input-error');
  } else if (value) {
    hint.innerHTML = `<i class="fas fa-check"></i>${messages.success || 'Looks good!'}`;
    hint.classList.add('active');
    field.classList.remove('input-error');
  } else {
    hint.innerHTML = `<i class="fas fa-info-circle"></i>${messages.base}`;
    hint.classList.add('active');
    field.classList.remove('input-error');
  }
}

function isValidEmail(email) {
  return /^[\w.!#$%&'*+/=?^_`{|}~-]+@[\w-]+(\.[\w-]+)+$/.test(email.toLowerCase());
}

function isValidPhone(phone) {
  return /^[0-9+\-()\s]{6,}$/.test(phone);
}

/* ================================
   ADVANCED GALLERY FUNCTIONALITY
   ================================ */

function setupGridGallery() {
  const items = document.querySelectorAll('.gallery-item');
  
  items.forEach(item => {
    setupImageLoading(item);
    setupKeyboardNavigation(item);
    setupTouchOptimizations(item);
  });
  
  setupStaggeredAnimations();
}

function setupGridEffects() {
  const items = document.querySelectorAll('.gallery-item');
  
  items.forEach(item => {
    item.addEventListener('mouseenter', () => {
      createParticleEffect(item);
    });
  });
}

function setupImageLoading(item) {
  const img = item.querySelector('img');
  if (!img) return;
  
  img.addEventListener('load', () => {
    item.classList.add('image-loaded');
  });
  
  // Lazy loading optimization
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const image = entry.target;
          image.src = image.dataset.src || image.src;
          image.classList.remove('lazy');
          imageObserver.unobserve(image);
        }
      });
    });
    
    imageObserver.observe(img);
  }
}

function setupStaggeredAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('animate-in');
        }, index * 150);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '50px'
  });
  
  const items = document.querySelectorAll('.gallery-item');
  items.forEach(item => {
    observer.observe(item);
  });
}

function setupParallaxEffects() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '50px'
  });
  
  const parallaxElements = document.querySelectorAll('.gallery-section, .gallery-category-header');
  parallaxElements.forEach(el => observer.observe(el));
}

function setupAccessibilityFeatures() {
  const items = document.querySelectorAll('.gallery-item');
  
  items.forEach((item, index) => {
    const link = item.querySelector('a');
    if (link) {
      item.setAttribute('tabindex', '0');
      item.setAttribute('role', 'article');
      item.setAttribute('aria-label', `Gallery item ${index + 1}: ${item.querySelector('h3')?.textContent || 'Gallery item'}`);
      
      // Keyboard navigation
      item.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          link.click();
        }
      });
    }
  });
  
  // Reduced motion support
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (prefersReducedMotion.matches) {
    document.documentElement.style.setProperty('--animation-duration', '0.01s');
  }
}

function setupTouchOptimizations(card) {
  let touchStartY = 0;
  let touchStartX = 0;
  
  card.addEventListener('touchstart', (e) => {
    touchStartY = e.touches[0].clientY;
    touchStartX = e.touches[0].clientX;
  }, { passive: true });
  
  card.addEventListener('touchend', (e) => {
    const touchEndY = e.changedTouches[0].clientY;
    const touchEndX = e.changedTouches[0].clientX;
    
    const deltaY = Math.abs(touchEndY - touchStartY);
    const deltaX = Math.abs(touchEndX - touchStartX);
    
    // Prevent default for swipes (no navigation)
    if (deltaX > 30 || deltaY > 30) {
      e.preventDefault();
    }
  }, { passive: false });
}

function setupPerformanceOptimizations() {
  // Debounced resize handler
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      // Recalculate layouts if needed
      const cards = document.querySelectorAll('.gallery-card');
      cards.forEach(card => {
        card.style.transform = '';
      });
    }, 250);
  });
  
  // Preload critical images
  const criticalImages = document.querySelectorAll('.gallery-card img');
  criticalImages.forEach(img => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = img.src;
    document.head.appendChild(link);
  });
  
  // Memory cleanup for mobile
  if ('memory' in performance) {
    setInterval(() => {
      if (performance.memory.usedJSHeapSize > 50 * 1024 * 1024) { // 50MB
        // Force garbage collection in some browsers
        window.gc && window.gc();
      }
    }, 30000); // Every 30 seconds
  }
}

/* ================================
   UTILITY FUNCTIONS
   ================================ */

function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

/* ================================
   ENHANCED ANIMATIONS & EFFECTS
   ================================ */

function setupEnhancedAnimations() {
  // Staggered entrance animations
  setupStaggeredAnimations();
  
  // Particle effects
  setupParticleEffects();
  
  // Dynamic loading states
  setupLoadingStates();
  
  // Interactive tooltips
  setupInteractiveTooltips();
  
  // Smooth scroll enhancements
  setupSmoothScrollEnhancements();
}

function setupStaggeredAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('animate-in');
        }, index * 100);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '50px'
  });
  
  const cards = document.querySelectorAll('.gallery-card');
  cards.forEach((card, index) => {
    // Removed opacity: 0 - cards are now always visible
    card.style.transform = 'translateY(50px) scale(0.9)';
    card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
    observer.observe(card);
  });
  
  // Add CSS for animated state
  const style = document.createElement('style');
  style.textContent = `
    .gallery-card.animate-in {
      transform: translateY(0) scale(1) !important;
    }
  `;
  document.head.appendChild(style);
}

function setupParticleEffects() {
  const cards = document.querySelectorAll('.gallery-card');
  
  cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      createParticleEffect(card);
    });
  });
}

function createParticleEffect(card) {
  const particleContainer = document.createElement('div');
  particleContainer.className = 'particle-effect';
  particleContainer.style.cssText = `
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 1;
    border-radius: 20px;
    overflow: hidden;
  `;
  
  card.appendChild(particleContainer);
  
  // Create particles
  for (let i = 0; i < 6; i++) {
    setTimeout(() => {
      const particle = document.createElement('div');
      particle.style.cssText = `
        position: absolute;
        width: 4px;
        height: 4px;
        background: radial-gradient(circle, var(--glow-color-1), transparent);
        border-radius: 50%;
        animation: particleFloat 2s ease-out forwards;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
      `;
      particleContainer.appendChild(particle);
      
      setTimeout(() => {
        particle.remove();
      }, 2000);
    }, i * 100);
  }
  
  // Clean up
  setTimeout(() => {
    particleContainer.remove();
  }, 2500);
}

function setupLoadingStates() {
  const images = document.querySelectorAll('.gallery-card img');
  
  images.forEach(img => {
    // Add loading placeholder
    img.style.filter = 'blur(5px) brightness(0.7)';
    img.style.transition = 'filter 0.3s ease';
    
    img.addEventListener('load', () => {
      img.style.filter = 'none';
    });
    
    // Skeleton loading effect
    const skeleton = document.createElement('div');
    skeleton.className = 'image-skeleton';
    skeleton.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(
        90deg,
        rgba(255, 255, 255, 0.1) 25%,
        rgba(255, 255, 255, 0.2) 50%,
        rgba(255, 255, 255, 0.1) 75%
      );
      background-size: 200% 100%;
      animation: skeletonLoading 1.5s infinite;
      border-radius: 20px;
    `;
    
    const card = img.closest('.gallery-card-front');
    card.appendChild(skeleton);
    
    img.addEventListener('load', () => {
      skeleton.remove();
    });
  });
}

function setupInteractiveTooltips() {
  const cards = document.querySelectorAll('.gallery-card');
  
  cards.forEach(card => {
    const title = card.querySelector('h3')?.textContent;
    if (title) {
      card.setAttribute('data-tooltip', title);
      
      card.addEventListener('mouseenter', (e) => {
        showTooltip(card, title, e);
      });
      
      card.addEventListener('mouseleave', hideTooltip);
      card.addEventListener('mousemove', (e) => {
        updateTooltipPosition(e);
      });
    }
  });
}

function showTooltip(element, text, event) {
  const tooltip = document.createElement('div');
  tooltip.className = 'interactive-tooltip';
  tooltip.textContent = text;
  tooltip.style.cssText = `
    position: fixed;
    background: rgba(0, 229, 255, 0.9);
    color: white;
    padding: 8px 12px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 500;
    z-index: 10000;
    pointer-events: none;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.3);
    transform: translate(-50%, -120%);
    white-space: nowrap;
    box-shadow: 0 4px 20px rgba(0, 229, 255, 0.3);
  `;
  
  document.body.appendChild(tooltip);
  element._tooltip = tooltip;
  
  updateTooltipPosition(event);
}

function updateTooltipPosition(event) {
  const tooltip = event.target._tooltip;
  if (!tooltip) return;
  
  tooltip.style.left = event.clientX + 'px';
  tooltip.style.top = event.clientY + 'px';
}

function hideTooltip(event) {
  const element = event.target;
  if (element._tooltip) {
    element._tooltip.remove();
    element._tooltip = null;
  }
}

function setupSmoothScrollEnhancements() {
  // Smooth scroll for internal links
  const links = document.querySelectorAll('a[href^="#"]');
  
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
        
        // Add highlight effect
        target.classList.add('scroll-highlight');
        setTimeout(() => {
          target.classList.remove('scroll-highlight');
        }, 1000);
      }
    });
  });
}

/* ================================
   CSS ANIMATIONS
   ================================ */

// Add dynamic CSS animations
const dynamicStyles = document.createElement('style');
dynamicStyles.textContent = `
  @keyframes particleFloat {
    0% {
      opacity: 1;
      transform: translateY(0) scale(0);
    }
    50% {
      opacity: 0.8;
      transform: translateY(-30px) scale(1);
    }
    100% {
      opacity: 0;
      transform: translateY(-60px) scale(0);
    }
  }
  
  @keyframes skeletonLoading {
    0% {
      background-position: -200px 0;
    }
    100% {
      background-position: calc(200px + 100%) 0;
    }
  }
  
  @keyframes scrollHighlight {
    0%, 100% {
      box-shadow: 0 0 0 rgba(0, 229, 255, 0);
    }
    50% {
      box-shadow: 0 0 30px rgba(0, 229, 255, 0.5);
    }
  }
  
  .scroll-highlight {
    animation: scrollHighlight 1s ease-in-out;
  }
  
  .gallery-card-loading {
    pointer-events: none;
    opacity: 0.7;
  }
  
  .gallery-card-loading::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 40px;
    height: 40px;
    margin: -20px 0 0 -20px;
    border: 3px solid rgba(0, 229, 255, 0.3);
    border-top: 3px solid var(--glow-color-1);
    border-radius: 50%;
    animation: spin 1s linear infinite;
    z-index: 10;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;
document.head.appendChild(dynamicStyles);

/* ================================
   ADVANCED IMAGE LOADING
   ================================ */

function setupAdvancedImageLoading() {
  // Enhanced lazy loading for gallery images
  const lazyImages = document.querySelectorAll('.lazy-image');
  
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const image = entry.target;
          loadImage(image);
          observer.unobserve(image);
        }
      });
    }, {
      rootMargin: '50px',
      threshold: 0.1
    });
    
    lazyImages.forEach(image => {
      imageObserver.observe(image);
    });
  } else {
    // Fallback for browsers without IntersectionObserver
    lazyImages.forEach(image => {
      loadImage(image);
    });
  }
}

function loadImage(img) {
  const picture = img.closest('picture');
  let src = img.src;
  
  // Try WebP first if picture element exists
  if (picture) {
    const webpSource = picture.querySelector('source[srcset*=".webp"]');
    if (webpSource) {
      // Test WebP support
      const webp = new Image();
      webp.onload = webp.onerror = function () {
        if (webp.height == 0) {
          // WebP not supported, keep original
          img.classList.add('loaded');
        } else {
          // WebP supported, use it
          img.src = webpSource.srcset;
          img.classList.add('loaded');
        }
      };
      webp.src = webpSource.srcset;
      return;
    }
  }
  
  // Load regular image
  const tempImg = new Image();
  tempImg.onload = function() {
    img.classList.add('loaded');
  };
  tempImg.onerror = function() {
    // Handle image loading error with fallback
    img.classList.add('loaded', 'error');
    console.warn('Failed to load image:', src);
  };
  tempImg.src = src;
}

// Initialize enhanced animations
document.addEventListener('DOMContentLoaded', setupEnhancedAnimations);
