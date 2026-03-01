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
    // Service Pricing Data
    // ============================================
    const SERVICE_PRICES = {
        // Web Development
        'basic-web': { name: 'Basic Website', price: 1500000, category: 'web' },
        'business-web': { name: 'Business Website', price: 2500000, category: 'web' },
        'ecommerce': { name: 'E-commerce Platform', price: 4000000, category: 'web' },
        'cms': { name: 'Custom CMS', price: 3500000, category: 'web' },
        
        // 3D Design - Basic
        '3d-logo': { name: '3D Logo Design', price: 1200000, category: '3d-basic' },
        '3d-simple': { name: 'Simple 3D Models', price: 800000, category: '3d-basic' },
        '3d-icons': { name: '3D Icons & Graphics', price: 600000, category: '3d-basic' },
        '3d-animation': { name: 'Basic 3D Animation', price: 1000000, category: '3d-basic' },
        
        // 3D Design - Interactive
        '3d-interactive': { name: 'Interactive 3D Elements', price: 2000000, category: '3d-interactive' },
        '3d-product': { name: '3D Product Visualization', price: 2500000, category: '3d-interactive' },
        '3d-navigation': { name: 'Interactive 3D Navigation', price: 3000000, category: '3d-interactive' },
        '3d-ui': { name: '3D UI Components', price: 2800000, category: '3d-interactive' },
        '3d-gallery': { name: 'Immersive 3D Galleries', price: 3500000, category: '3d-interactive' },
        
        // 3D Design - Advanced
        '3d-environment': { name: 'Full 3D Environment', price: 8000000, category: '3d-advanced' },
        '3d-showroom': { name: '3D Virtual Showroom', price: 6000000, category: '3d-advanced' },
        '3d-game': { name: '3D Game Integration', price: 12000000, category: '3d-advanced' },
        '3d-vr-ar': { name: 'VR/AR Experience', price: 18000000, category: '3d-advanced' },
        
        // Additional Services
        'maintenance': { name: 'Website Maintenance', price: 500000, category: 'services', recurring: true },
        'cybersecurity': { name: 'Cybersecurity Consulting', price: 1000000, category: 'services' },
        'security': { name: 'Personal Security', price: 300000, category: 'services', recurring: true },
        'training': { name: 'Empathy Training', price: 800000, category: 'services' },
        
        // Features
        'advanced-seo': { name: 'Advanced SEO', price: 300000, category: 'features' },
        'performance': { name: 'Performance Optimization', price: 300000, category: 'features' },
        'ai-integration': { name: 'AI Integration', price: 1200000, category: 'features' },
        'multilingual': { name: 'Multilingual Support', price: 350000, category: 'features' },
        'analytics': { name: 'Analytics Integration', price: 200000, category: 'features' }
    };

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

        // Calculate services
        state.selectedServices.forEach(serviceId => {
            const service = SERVICE_PRICES[serviceId];
            if (service) {
                subtotal += service.price;
                breakdown.push({ name: service.name, price: service.price });
            }
        });

        // Calculate features
        state.selectedFeatures.forEach(featureId => {
            const feature = SERVICE_PRICES[featureId];
            if (feature) {
                subtotal += feature.price;
                breakdown.push({ name: feature.name, price: feature.price });
            }
        });

        // Apply timeline multiplier
        let multiplier = 1;
        if (state.timeline && TIMELINE_MULTIPLIERS[state.timeline]) {
            multiplier = TIMELINE_MULTIPLIERS[state.timeline];
        }

        state.total = Math.round(subtotal * multiplier);

        // Update display
        updateBudgetDisplay(breakdown, multiplier);
    }

    function updateBudgetDisplay(breakdown, multiplier) {
        if (elements.budgetAmount) {
            elements.budgetAmount.textContent = state.total.toLocaleString() + ' COP';
        }

        if (elements.budgetBreakdown && breakdown.length > 0) {
            let html = breakdown.map(item => `
                <div class="budget-item">
                    <span>${item.name}</span>
                    <span>${item.price.toLocaleString()} COP</span>
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

${state.total > 0 ? `\nESTIMATED BUDGET: ${state.total.toLocaleString()} COP` : ''}

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

${state.total > 0 ? `*Estimated Budget:* ${state.total.toLocaleString()} COP` : ''}

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
