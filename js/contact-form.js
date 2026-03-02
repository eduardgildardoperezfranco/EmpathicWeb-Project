/**
 * EmpathicWeb - Modern Contact Form System
 * Streamlined, Performance-Optimized, User-Friendly
 * @version 2.0.0
 */

(function() {
    'use strict';

    // ============================================
    // Configuration
    // ============================================
    const CONFIG = {
        email: 'eduardgildardoperezfranco@empathicweb.online',
        whatsapp: '573108005004',
        cooldown: 30000, // 30 seconds between submissions
        minMessageLength: 10,
        maxMessageLength: 5000
    };

    // ============================================
    // Service Pricing Data (in USD - base currency)
    // ============================================
    const SERVICE_PRICES = {
        // Web Development
        'landing-page': { name: 'Landing Page', price: 150, category: 'web' },
        'business-web': { name: 'Business Website', price: 350, category: 'web' },
        'ecommerce': { name: 'Online Store', price: 800, category: 'web' },

        // Design & Branding
        'logo-branding': { name: 'Logo & Branding', price: 100, category: 'design' },
        '3d-design': { name: '3D Design', price: 200, category: 'design' },
        'social-content': { name: 'Social Content (10 posts)', price: 80, category: 'design' },

        // Digital Marketing
        'social-management': { name: 'Social Media Management', price: 280, category: 'marketing', recurring: true },
        'seo': { name: 'SEO Positioning', price: 200, category: 'marketing', recurring: true },
        'google-ads': { name: 'Google Ads Management', price: 160, category: 'marketing', recurring: true },
        'email-marketing': { name: 'Email Marketing Setup', price: 120, category: 'marketing' },

        // Support & Security
        'maintenance': { name: 'Website Maintenance', price: 60, category: 'support', recurring: true },
        'security-audit': { name: 'Security Audit', price: 120, category: 'support' },
        'training': { name: 'Training & Consulting', price: 50, category: 'support' },
        'copywriting': { name: 'Copywriting', price: 40, category: 'support' },
        'audio-production': { name: 'Audio Production', price: 100, category: 'support' },

        // Add-ons (category: 'features' to match HTML name="features")
        'extra-pages': { name: 'Extra Pages', price: 30, category: 'features' },
        'extra-products': { name: 'Extra Products (10)', price: 20, category: 'features' },
        'priority-support': { name: 'Priority Support', price: 50, category: 'features', recurring: true },
        'rush-delivery': { name: 'Rush Delivery', price: 100, category: 'features' },
        'source-files': { name: 'Source Files', price: 50, category: 'features' }
    };

    // Currency conversion
    const EXCHANGE_RATE = 4000; // 1 USD = 4000 COP
    const STORAGE_KEY = 'preferredCurrency';

    function formatPrice(usdAmount, currency) {
        if (currency === 'USD') {
            return `$${usdAmount} USD`;
        } else {
            const copAmount = Math.round(usdAmount * EXCHANGE_RATE / 1000) * 1000;
            return `${copAmount.toLocaleString('es-CO')} COP`;
        }
    }

    function getCurrentCurrency() {
        return localStorage.getItem(STORAGE_KEY) || 'USD';
    }

    // Timeline multipliers
    const TIMELINE_MULTIPLIERS = {
        'asap': 2.5,
        '1-week': 2.0,
        '2-weeks': 1.5,
        '1-month': 1.25,
        '2-3-months': 1.0,
        '4-6-months': 0.9,
        '6-months': 0.85
    };

    // ============================================
    // State Management
    // ============================================
    let state = {
        lastSubmission: 0,
        selectedServices: [],
        selectedFeatures: [],
        timeline: '',
        complexity: '',
        total: 0
    };

    // ============================================
    // DOM Elements
    // ============================================
    let elements = {};

    function initElements() {
        elements = {
            form: document.getElementById('contact-form'),
            progressSteps: document.querySelectorAll('.progress-step'),
            
            // Input fields
            email: document.getElementById('email'),
            name: document.getElementById('name'),
            phone: document.getElementById('phone'),
            country: document.getElementById('country'),
            company: document.getElementById('company'),
            goal: document.getElementById('goal'),
            contactMethod: document.getElementById('contact-method'),
            message: document.getElementById('message'),
            
            // Service tabs and panels
            serviceTabs: document.querySelectorAll('.service-tab'),
            servicePanels: document.querySelectorAll('.service-panel'),
            serviceOptions: document.querySelectorAll('.service-option input'),
            
            // Timeline and complexity
            timeline: document.getElementById('timeline'),
            complexity: document.getElementById('complexity'),
            
            // Budget display
            budgetAmount: document.getElementById('budget-amount'),
            budgetBreakdown: document.getElementById('budget-breakdown'),
            
            // Buttons
            emailBtn: document.getElementById('email-submit'),
            whatsappBtn: document.getElementById('whatsapp-submit'),
            
            // Messages
            validationMessage: document.getElementById('validation-message'),
            successOverlay: document.getElementById('success-overlay'),
            successModal: document.getElementById('success-modal')
        };
    }

    // ============================================
    // Initialization
    // ============================================
    function init() {
        initElements();
        setupEventListeners();
        setupServiceTabs();
        updateProgress(1);
        console.log('✅ Contact Form System Initialized');
    }

    // ============================================
    // Event Listeners
    // ============================================
    function setupEventListeners() {
        // Service options
        elements.serviceOptions.forEach(input => {
            input.addEventListener('change', handleServiceChange);
        });

        // Timeline and complexity
        if (elements.timeline) {
            elements.timeline.addEventListener('change', handleTimelineChange);
        }
        if (elements.complexity) {
            elements.complexity.addEventListener('change', handleComplexityChange);
        }

        // Submission buttons
        if (elements.emailBtn) {
            elements.emailBtn.addEventListener('click', handleEmailSubmit);
        }
        if (elements.whatsappBtn) {
            elements.whatsappBtn.addEventListener('click', handleWhatsAppSubmit);
        }

        // Real-time validation
        const requiredFields = [elements.email, elements.name, elements.goal, elements.contactMethod, elements.message];
        requiredFields.forEach(field => {
            if (field) {
                field.addEventListener('blur', () => validateField(field));
                field.addEventListener('input', () => clearFieldError(field));
            }
        });

        // Close success modal
        const closeBtn = document.querySelector('.close-success-btn');
        if (closeBtn) {
            closeBtn.addEventListener('click', closeSuccessModal);
        }
        if (elements.successOverlay) {
            elements.successOverlay.addEventListener('click', (e) => {
                if (e.target === elements.successOverlay) {
                    closeSuccessModal();
                }
            });
        }
    }

    // ============================================
    // Service Tabs
    // ============================================
    function setupServiceTabs() {
        elements.serviceTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const targetPanel = tab.dataset.tab;
                
                // Update active states
                elements.serviceTabs.forEach(t => t.classList.remove('active'));
                elements.servicePanels.forEach(p => p.classList.remove('active'));
                
                tab.classList.add('active');
                const panel = document.getElementById(`panel-${targetPanel}`);
                if (panel) {
                    panel.classList.add('active');
                }
            });
        });
    }

    // ============================================
    // Service Selection
    // ============================================
    function handleServiceChange(e) {
        const input = e.target;
        const value = input.value;
        const option = input.closest('.service-option');
        
        if (input.checked) {
            option.classList.add('selected');
            if (SERVICE_PRICES[value]?.category === 'features') {
                state.selectedFeatures.push(value);
            } else {
                state.selectedServices.push(value);
            }
        } else {
            option.classList.remove('selected');
            if (SERVICE_PRICES[value]?.category === 'features') {
                state.selectedFeatures = state.selectedFeatures.filter(s => s !== value);
            } else {
                state.selectedServices = state.selectedServices.filter(s => s !== value);
            }
        }
        
        calculateTotal();
        updateProgress(2);
    }

    function handleTimelineChange(e) {
        state.timeline = e.target.value;
        calculateTotal();
    }

    function handleComplexityChange(e) {
        state.complexity = e.target.value;
        calculateTotal();
    }

    // ============================================
    // Budget Calculation
    // ============================================
    function calculateTotal() {
        let subtotal = 0;
        const breakdown = [];

        // Calculate services (prices are in USD)
        state.selectedServices.forEach(serviceId => {
            const service = SERVICE_PRICES[serviceId];
            if (service) {
                subtotal += service.price;
                breakdown.push({ name: service.name, usdPrice: service.price });
            }
        });

        // Calculate features (prices are in USD)
        state.selectedFeatures.forEach(featureId => {
            const feature = SERVICE_PRICES[featureId];
            if (feature) {
                subtotal += feature.price;
                breakdown.push({ name: feature.name, usdPrice: feature.price });
            }
        });

        // Apply timeline multiplier
        let multiplier = 1;
        if (state.timeline && TIMELINE_MULTIPLIERS[state.timeline]) {
            multiplier = TIMELINE_MULTIPLIERS[state.timeline];
        }

        // Store total in USD
        state.total = Math.round(subtotal * multiplier);
        state.breakdown = breakdown;
        state.multiplier = multiplier;

        // Update display
        updateBudgetDisplay();
    }

    function updateBudgetDisplay() {
        const currency = getCurrentCurrency();
        const breakdown = state.breakdown || [];
        const multiplier = state.multiplier || 1;

        if (elements.budgetAmount) {
            elements.budgetAmount.textContent = formatPrice(state.total, currency);
        }

        if (elements.budgetBreakdown && breakdown.length > 0) {
            let html = breakdown.map(item => `
                <div class="budget-item">
                    <span>${item.name}</span>
                    <span>${formatPrice(item.usdPrice, currency)}</span>
                </div>
            `).join('');

            if (multiplier !== 1) {
                html += `
                    <div class="budget-item" style="color: #f39c12;">
                        <span>Timeline Adjustment (x${multiplier})</span>
                        <span>+${Math.round((multiplier - 1) * 100)}%</span>
                    </div>
                `;
            }

            elements.budgetBreakdown.innerHTML = html;
        } else if (elements.budgetBreakdown) {
            elements.budgetBreakdown.innerHTML = '<p style="text-align: center; opacity: 0.6;">Select services to see estimate</p>';
        }
    }

    // Refresh display when currency changes
    window.refreshBudgetDisplay = updateBudgetDisplay;

    // ============================================
    // Validation
    // ============================================
    function validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        let errorMessage = '';

        if (field.required && !value) {
            isValid = false;
            errorMessage = 'This field is required';
        } else if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid email address';
            }
        } else if (field.id === 'message' && value) {
            if (value.length < CONFIG.minMessageLength) {
                isValid = false;
                errorMessage = `Message must be at least ${CONFIG.minMessageLength} characters`;
            } else if (value.length > CONFIG.maxMessageLength) {
                isValid = false;
                errorMessage = `Message must not exceed ${CONFIG.maxMessageLength} characters`;
            }
        }

        const group = field.closest('.input-group');
        if (group) {
            group.classList.toggle('error', !isValid);
            const existingError = group.querySelector('.error-text');
            if (existingError) {
                existingError.remove();
            }
            if (!isValid && errorMessage) {
                const errorEl = document.createElement('span');
                errorEl.className = 'error-text';
                errorEl.textContent = errorMessage;
                group.appendChild(errorEl);
            }
        }

        return isValid;
    }

    function clearFieldError(field) {
        const group = field.closest('.input-group');
        if (group) {
            group.classList.remove('error');
            const errorEl = group.querySelector('.error-text');
            if (errorEl) {
                errorEl.remove();
            }
        }
    }

    function validateForm() {
        const requiredFields = [elements.email, elements.name, elements.goal, elements.contactMethod, elements.message];
        let isValid = true;
        const errors = [];

        requiredFields.forEach(field => {
            if (field && !validateField(field)) {
                isValid = false;
                const label = field.previousElementSibling?.textContent?.replace(' *', '') || field.id;
                errors.push(label);
            }
        });

        // Rate limiting
        const now = Date.now();
        if (now - state.lastSubmission < CONFIG.cooldown) {
            showValidationMessage('Please wait a moment before submitting again.');
            return false;
        }

        if (!isValid) {
            showValidationMessage(`Please complete: ${errors.join(', ')}`);
            updateProgress(1);
        }

        return isValid;
    }

    function showValidationMessage(message) {
        if (elements.validationMessage) {
            elements.validationMessage.innerHTML = `<i class="fas fa-exclamation-triangle"></i> ${message}`;
            elements.validationMessage.classList.add('show');
            
            setTimeout(() => {
                elements.validationMessage.classList.remove('show');
            }, 5000);
        }
    }

    // ============================================
    // Progress Tracking
    // ============================================
    function updateProgress(step) {
        elements.progressSteps.forEach((el, index) => {
            el.classList.remove('active', 'completed');
            if (index + 1 < step) {
                el.classList.add('completed');
            } else if (index + 1 === step) {
                el.classList.add('active');
            }
        });
    }

    // ============================================
    // Submission Handlers
    // ============================================
    function handleEmailSubmit() {
        if (!validateForm()) return;

        const btn = elements.emailBtn;
        const originalContent = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Preparing...';
        btn.disabled = true;

        try {
            const projectId = generateProjectId();
            const subject = `EmpathicWeb Inquiry - ${elements.name.value} (${projectId})`;
            const body = buildEmailBody(projectId);

            const mailtoUrl = `mailto:${CONFIG.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}&cc=${encodeURIComponent(elements.email.value)}`;
            
            state.lastSubmission = Date.now();
            showSuccessModal('email', projectId);
            window.location.href = mailtoUrl;

        } catch (error) {
            console.error('Email submission error:', error);
            showValidationMessage('Failed to prepare email. Please try again.');
        } finally {
            btn.innerHTML = originalContent;
            btn.disabled = false;
        }
    }

    function handleWhatsAppSubmit() {
        if (!validateForm()) return;

        const phone = elements.phone?.value?.trim();
        if (!phone) {
            showValidationMessage('Please provide your phone number for WhatsApp communication.');
            if (elements.phone) {
                elements.phone.closest('.input-group').classList.add('error');
            }
            return;
        }

        const btn = elements.whatsappBtn;
        const originalContent = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Preparing...';
        btn.disabled = true;

        try {
            const projectId = generateProjectId();
            const message = buildWhatsAppMessage(projectId);

            const whatsappUrl = `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(message)}`;
            
            state.lastSubmission = Date.now();
            showSuccessModal('whatsapp', projectId);
            window.open(whatsappUrl, '_blank');

        } catch (error) {
            console.error('WhatsApp submission error:', error);
            showValidationMessage('Failed to prepare WhatsApp message. Please try again.');
        } finally {
            btn.innerHTML = originalContent;
            btn.disabled = false;
        }
    }

    // ============================================
    // Message Builders
    // ============================================
    function buildEmailBody(projectId) {
        const services = state.selectedServices.map(id => SERVICE_PRICES[id]?.name).filter(Boolean);
        const features = state.selectedFeatures.map(id => SERVICE_PRICES[id]?.name).filter(Boolean);

        return `Dear EmpathicWeb Team,

I'm reaching out regarding a potential project collaboration.

PROJECT ID: ${projectId}

CONTACT INFORMATION:
- Name: ${elements.name.value}
- Email: ${elements.email.value}
- Phone: ${elements.phone?.value || 'Not provided'}
- Country: ${elements.country?.value || 'Not provided'}
- Company: ${elements.company?.value || 'Not provided'}

PROJECT DETAILS:
- Primary Goal: ${elements.goal.value}
- Preferred Contact Method: ${elements.contactMethod.value}

SELECTED SERVICES:
${services.length > 0 ? services.map(s => `• ${s}`).join('\n') : '• General inquiry - services to be discussed'}

${features.length > 0 ? `\nADDITIONAL FEATURES:\n${features.map(f => `• ${f}`).join('\n')}` : ''}

${state.total > 0 ? `\nESTIMATED BUDGET: $${state.total} USD (~${(state.total * EXCHANGE_RATE).toLocaleString('es-CO')} COP)` : ''}

PROJECT DESCRIPTION:
${elements.message.value}

---
This inquiry was submitted via the EmpathicWeb contact form.
Expected response time: 24 hours`;
    }

    function buildWhatsAppMessage(projectId) {
        const services = state.selectedServices.map(id => SERVICE_PRICES[id]?.name).filter(Boolean);

        return `*EMPATHICWEB INQUIRY*

Hello! I'm interested in discussing a project.

*Project ID:* ${projectId}

*Contact:*
👤 ${elements.name.value}
📧 ${elements.email.value}
📱 ${elements.phone?.value || 'Not provided'}

*Project Goal:* ${elements.goal.value}

${services.length > 0 ? `*Selected Services:*\n${services.map(s => `• ${s}`).join('\n')}` : '*Inquiry Type:* General consultation'}

${state.total > 0 ? `*Estimated Budget:* $${state.total} USD (~${(state.total * EXCHANGE_RATE).toLocaleString('es-CO')} COP)` : ''}

*Message:*
${elements.message.value}

---
_I look forward to your response within 24 hours._`;
    }

    // ============================================
    // Success Modal
    // ============================================
    function showSuccessModal(method, projectId) {
        if (!elements.successOverlay || !elements.successModal) return;

        const methodDetails = {
            email: {
                icon: 'fa-envelope',
                title: 'Email Prepared!',
                message: 'Your email client should open with your message ready to send.',
                responseTime: '24 hours'
            },
            whatsapp: {
                icon: 'fa-whatsapp',
                title: 'WhatsApp Ready!',
                message: 'WhatsApp should open with your message ready to send.',
                responseTime: '2-4 hours'
            }
        };

        const details = methodDetails[method];
        
        elements.successModal.innerHTML = `
            <div class="success-icon">
                <i class="fas ${details.icon}"></i>
            </div>
            <h3>${details.title}</h3>
            <p>${details.message}</p>
            <div class="success-details">
                <div class="success-detail-item">
                    <strong>Project ID:</strong>
                    <span>${projectId}</span>
                </div>
                <div class="success-detail-item">
                    <strong>Response Time:</strong>
                    <span>${details.responseTime}</span>
                </div>
                <div class="success-detail-item">
                    <strong>Sent to:</strong>
                    <span>${method === 'email' ? CONFIG.email : '+' + CONFIG.whatsapp}</span>
                </div>
            </div>
            <button class="close-success-btn" onclick="this.closest('#success-overlay').classList.remove('show')">
                <i class="fas fa-check"></i> Done
            </button>
        `;

        elements.successOverlay.classList.add('show');
        updateProgress(4);
    }

    function closeSuccessModal() {
        if (elements.successOverlay) {
            elements.successOverlay.classList.remove('show');
        }
    }

    // ============================================
    // Utilities
    // ============================================
    function generateProjectId() {
        const timestamp = Date.now().toString(36).toUpperCase();
        const random = Math.random().toString(36).substring(2, 6).toUpperCase();
        return `EMW-${timestamp}-${random}`;
    }

    // ============================================
    // Initialize on DOM Ready
    // ============================================
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
