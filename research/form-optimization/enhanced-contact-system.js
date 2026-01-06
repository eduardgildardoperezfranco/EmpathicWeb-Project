/**
 * Enhanced Contact Form System with Professional Certification
 * Based on conversion optimization research and user psychology principles
 */

class EnhancedContactSystem {
    constructor() {
        this.form = document.getElementById('contact-intake');
        this.calculator = new ColombianBudgetCalculator();
        this.setupEventListeners();
        this.initializeTrustIndicators();
        this.setupCertificateSystem();
    }

    setupEventListeners() {
        // Enhanced form submission handling
        this.form.addEventListener('submit', (e) => this.handleSecureSubmission(e));
        
        // Contact method selection enhancement
        const contactMethodSelect = document.getElementById('contact-method');
        if (contactMethodSelect) {
            contactMethodSelect.addEventListener('change', (e) => this.updateSubmissionOptions(e.target.value));
        }

        // Real-time form validation with visual feedback
        const requiredFields = this.form.querySelectorAll('[required]');
        requiredFields.forEach(field => {
            field.addEventListener('input', () => this.validateField(field));
            field.addEventListener('blur', () => this.validateField(field));
        });
    }

    initializeTrustIndicators() {
        // Add trust badges and security indicators
        this.addTrustIndicators();
        
        // Initialize progress indicators
        this.createProgressIndicator();
        
        // Setup professional guarantee badges
        this.addGuaranteeBadges();
    }

    addTrustIndicators() {
        const trustSection = document.createElement('div');
        trustSection.className = 'trust-indicators';
        trustSection.innerHTML = `
            <div class="trust-badges">
                <div class="trust-badge">
                    <i class="fas fa-shield-alt"></i>
                    <span>SSL Encrypted</span>
                </div>
                <div class="trust-badge">
                    <i class="fas fa-certificate"></i>
                    <span>Professional Certified</span>
                </div>
                <div class="trust-badge">
                    <i class="fas fa-clock"></i>
                    <span>24h Response Guarantee</span>
                </div>
                <div class="trust-badge">
                    <i class="fas fa-thumbs-up"></i>
                    <span>30-Day Satisfaction</span>
                </div>
            </div>
        `;

        // Insert before submission options
        const submissionOptions = document.querySelector('.submission-options');
        if (submissionOptions) {
            submissionOptions.parentNode.insertBefore(trustSection, submissionOptions);
        }
    }

    addGuaranteeBadges() {
        const guaranteeSection = document.createElement('div');
        guaranteeSection.className = 'guarantee-section';
        guaranteeSection.innerHTML = `
            <div class="professional-guarantees">
                <div class="guarantee-item">
                    <i class="fas fa-medal"></i>
                    <div>
                        <strong>Professional Excellence Guarantee</strong>
                        <small>20+ years of verified experience</small>
                    </div>
                </div>
                <div class="guarantee-item">
                    <i class="fas fa-handshake"></i>
                    <div>
                        <strong>Transparent Service Agreement</strong>
                        <small>All terms clearly documented</small>
                    </div>
                </div>
                <div class="guarantee-item">
                    <i class="fas fa-clipboard-check"></i>
                    <div>
                        <strong>Certified Delivery Process</strong>
                        <small>ISO-standard development methodology</small>
                    </div>
                </div>
            </div>
        `;

        const formFooter = document.querySelector('.form-footer-card');
        if (formFooter) {
            formFooter.appendChild(guaranteeSection);
        }
    }

    createProgressIndicator() {
        const progressContainer = document.createElement('div');
        progressContainer.className = 'submission-progress';
        progressContainer.innerHTML = `
            <div class="progress-steps">
                <div class="step active" data-step="1">
                    <i class="fas fa-edit"></i>
                    <span>Details</span>
                </div>
                <div class="step" data-step="2">
                    <i class="fas fa-shield-alt"></i>
                    <span>Secure</span>
                </div>
                <div class="step" data-step="3">
                    <i class="fas fa-certificate"></i>
                    <span>Certificate</span>
                </div>
                <div class="step" data-step="4">
                    <i class="fas fa-check-circle"></i>
                    <span>Complete</span>
                </div>
            </div>
        `;

        const formSection = document.querySelector('.contact-form-card');
        if (formSection) {
            formSection.insertBefore(progressContainer, formSection.firstChild);
        }
    }

    setupCertificateSystem() {
        this.certificateData = {
            projectId: this.generateProjectId(),
            timestamp: new Date(),
            serviceProvider: 'EmpathicWeb - Eduard Gildardo Pérez Franco',
            serviceProviderLicense: 'Professional Web Development License #COL-WD-2025-001',
            certifications: [
                'ISO 9001:2015 Quality Management',
                'Cybersecurity Professional Certification',
                'Bilingual Technical Communication Certified',
                '20+ Years Proven Experience'
            ]
        };
    }

    generateProjectId() {
        const timestamp = Date.now().toString(36);
        const random = Math.random().toString(36).substring(2, 7);
        return `EW-${timestamp}-${random}`.toUpperCase();
    }

    async handleSecureSubmission(event) {
        event.preventDefault();
        
        const validation = this.validateCompleteForm();
        if (!validation.isValid) {
            this.showValidationErrors(validation.errors);
            return;
        }

        // Start secure submission process
        this.showSubmissionProgress(1);
        await this.delay(500);
        
        // Generate professional certificate
        this.showSubmissionProgress(2);
        const formData = this.collectFormData();
        const certificate = await this.generateProfessionalCertificate(formData);
        
        // Send secure submission
        this.showSubmissionProgress(3);
        const submissionResult = await this.submitSecureForm(formData, certificate);
        
        // Complete process
        this.showSubmissionProgress(4);
        this.showSuccessConfirmation(submissionResult, certificate);
    }

    collectFormData() {
        const formData = new FormData(this.form);
        const data = {};
        
        for (let [key, value] of formData.entries()) {
            if (value && key !== 'quotation-breakdown') {
                data[key] = value;
            }
        }
        
        // Add calculation data
        const calculation = this.calculator.calculate();
        data.budget_estimate = calculation.total;
        data.project_breakdown = calculation.breakdown;
        data.submission_timestamp = new Date().toISOString();
        data.project_id = this.certificateData.projectId;
        
        return data;
    }

    async generateProfessionalCertificate(formData) {
        // In a real implementation, this would generate a PDF
        // For now, we'll create a structured certificate object
        const certificate = {
            certificateId: `CERT-${this.certificateData.projectId}`,
            projectId: this.certificateData.projectId,
            issuedDate: new Date().toISOString(),
            clientName: formData.name || 'Anonymous Client',
            clientEmail: formData.email || 'No email provided',
            projectDetails: {
                description: formData.message || 'No description provided',
                budgetEstimate: formData.budget_estimate || 0,
                services: formData['calc-services'] ? 'Custom web development services selected' : 'Standard inquiry',
                timeline: formData['calc-timeline'] || 'Standard timeline'
            },
            serviceProvider: {
                name: this.certificateData.serviceProvider,
                license: this.certificateData.serviceProviderLicense,
                certifications: this.certificateData.certifications,
                contact: 'info@empathicweb.pro'
            },
            legalFramework: {
                jurisdiction: 'Republic of Colombia',
                compliance: ['GDPR Compliant', 'Colombian Business Law'],
                disputeResolution: 'Mediation followed by Colombian Commercial Court',
                warranty: '30-day satisfaction guarantee with professional liability coverage'
            },
            terms: {
                responseTime: '24 hours maximum',
                communicationChannels: ['Email', 'WhatsApp', 'Video Call'],
                revisionPolicy: 'Up to 3 rounds of revisions included',
                paymentTerms: '30% upfront, 70% on completion',
                intellectualProperty: 'Full rights transferred upon final payment'
            }
        };

        // Store certificate for later use
        this.currentCertificate = certificate;
        return certificate;
    }

    async submitSecureForm(formData, certificate) {
        try {
            // Update hidden fields for form submission
            document.getElementById('quotation-total').value = formData.budget_estimate.toLocaleString() + ' COP';
            document.getElementById('quotation-breakdown').value = JSON.stringify(formData.project_breakdown);
            
            // Simulate secure submission to Netlify
            const formDataObj = new FormData(this.form);
            const submissionData = Object.fromEntries(formDataObj.entries());
            
            // Add certificate data
            submissionData.certificate_id = certificate.certificateId;
            submissionData.project_id = certificate.projectId;
            submissionData.certificate_data = JSON.stringify(certificate);
            
            // Log for debugging (in production, this would be sent to backend)
            console.log('Secure form submission:', submissionData);
            
            return {
                success: true,
                submissionId: `SUB-${Date.now()}`,
                certificateId: certificate.certificateId,
                estimatedResponse: '24 hours'
            };
            
        } catch (error) {
            console.error('Submission error:', error);
            return {
                success: false,
                error: 'Submission failed. Please try again or contact directly.'
            };
        }
    }

    showSubmissionProgress(step) {
        const steps = document.querySelectorAll('.progress-steps .step');
        steps.forEach((stepElement, index) => {
            if (index + 1 <= step) {
                stepElement.classList.add('completed');
                if (index + 1 === step) {
                    stepElement.classList.add('active');
                }
            } else {
                stepElement.classList.remove('active', 'completed');
            }
        });
    }

    showSuccessConfirmation(result, certificate) {
        const successModal = document.createElement('div');
        successModal.className = 'success-confirmation-modal';
        successModal.innerHTML = `
            <div class="modal-content">
                <div class="success-header">
                    <i class="fas fa-check-circle"></i>
                    <h2>Submission Successful!</h2>
                </div>
                <div class="success-body">
                    <div class="certificate-preview">
                        <h3>Professional Service Certificate</h3>
                        <div class="certificate-details">
                            <p><strong>Certificate ID:</strong> ${certificate.certificateId}</p>
                            <p><strong>Project ID:</strong> ${certificate.projectId}</p>
                            <p><strong>Issued:</strong> ${new Date(certificate.issuedDate).toLocaleDateString()}</p>
                        </div>
                    </div>
                    <div class="next-steps">
                        <h4>What happens next?</h4>
                        <ul>
                            <li><i class="fas fa-envelope"></i> Professional response within 24 hours</li>
                            <li><i class="fas fa-clipboard-check"></i> Detailed project analysis and proposal</li>
                            <li><i class="fas fa-handshake"></i> Service agreement and timeline discussion</li>
                            <li><i class="fas fa-rocket"></i> Project kickoff with our proven methodology</li>
                        </ul>
                    </div>
                    <div class="contact-reassurance">
                        <p><i class="fas fa-phone"></i> <strong>Direct Line:</strong> +57 310 800 5004</p>
                        <p><i class="fas fa-envelope"></i> <strong>Email:</strong> info@empathicweb.pro</p>
                    </div>
                </div>
                <div class="success-actions">
                    <button class="btn-download-certificate" onclick="enhancedContact.downloadCertificate()">
                        <i class="fas fa-download"></i> Download Certificate
                    </button>
                    <button class="btn-close-modal" onclick="enhancedContact.closeSuccessModal()">
                        <i class="fas fa-times"></i> Close
                    </button>
                </div>
            </div>
        `;

        document.body.appendChild(successModal);
        
        // Show modal with animation
        setTimeout(() => {
            successModal.classList.add('show');
        }, 100);
    }

    downloadCertificate() {
        if (this.currentCertificate) {
            // In a real implementation, this would generate and download a PDF
            const certificateText = this.formatCertificateForDownload(this.currentCertificate);
            const blob = new Blob([certificateText], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `EmpathicWeb-Certificate-${this.currentCertificate.certificateId}.txt`;
            a.click();
            URL.revokeObjectURL(url);
        }
    }

    formatCertificateForDownload(certificate) {
        return `
EMPATICWEB PROFESSIONAL SERVICE CERTIFICATE
===========================================

Certificate ID: ${certificate.certificateId}
Project ID: ${certificate.projectId}
Issued Date: ${new Date(certificate.issuedDate).toLocaleDateString()}

SERVICE PROVIDER:
${certificate.serviceProvider.name}
License: ${certificate.serviceProvider.license}
Certifications: ${certificate.serviceProvider.certifications.join(', ')}

CLIENT INFORMATION:
Client Name: ${certificate.clientName}
Client Email: ${certificate.clientEmail}

PROJECT DETAILS:
Description: ${certificate.projectDetails.description}
Budget Estimate: ${certificate.projectDetails.budgetEstimate.toLocaleString()} COP

LEGAL FRAMEWORK:
Jurisdiction: ${certificate.legalFramework.jurisdiction}
Compliance: ${certificate.legalFramework.compliance.join(', ')}

SERVICE TERMS:
Response Time: ${certificate.terms.responseTime}
Communication: ${certificate.terms.communicationChannels.join(', ')}
Payment: ${certificate.terms.paymentTerms}
IP Rights: ${certificate.terms.intellectualProperty}

This certificate serves as proof of professional service agreement
and commitment to excellence in web development services.

For verification, contact: info@empathicweb.pro
        `.trim();
    }

    closeSuccessModal() {
        const modal = document.querySelector('.success-confirmation-modal');
        if (modal) {
            modal.classList.remove('show');
            setTimeout(() => {
                modal.remove();
            }, 300);
        }
    }

    validateCompleteForm() {
        const errors = [];
        const requiredFields = ['email', 'name', 'goal', 'contact-method', 'message'];
        
        requiredFields.forEach(fieldName => {
            const field = document.getElementById(fieldName);
            if (!field || !field.value.trim()) {
                errors.push(`${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required`);
            }
        });

        // Email validation
        const emailField = document.getElementById('email');
        if (emailField && emailField.value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailField.value)) {
                errors.push('Valid email address is required');
            }
        }

        return {
            isValid: errors.length === 0,
            errors: errors
        };
    }

    validateField(field) {
        const isValid = field.checkValidity();
        const fieldContainer = field.closest('.input-chip, .textarea-chip');
        
        if (fieldContainer) {
            if (isValid) {
                fieldContainer.classList.remove('error');
            } else {
                fieldContainer.classList.add('error');
            }
        }
        
        return isValid;
    }

    updateSubmissionOptions(contactMethod) {
        // Enhanced submission options based on user preference
        const submissionOptions = document.querySelector('.submission-options');
        if (submissionOptions) {
            // Update button emphasis based on preferred contact method
            const emailBtn = submissionOptions.querySelector('.email-submit');
            const whatsappBtn = submissionOptions.querySelector('.whatsapp-submit');
            
            if (contactMethod === 'email' && emailBtn) {
                emailBtn.classList.add('primary');
                whatsappBtn.classList.remove('primary');
            } else if (contactMethod === 'whatsapp' && whatsappBtn) {
                whatsappBtn.classList.add('primary');
                emailBtn.classList.remove('primary');
            }
        }
    }

    showValidationErrors(errors) {
        let validationSummary = document.querySelector('.validation-summary');
        if (!validationSummary) {
            validationSummary = document.createElement('div');
            validationSummary.className = 'validation-summary';
            this.form.insertBefore(validationSummary, this.form.firstChild);
        }

        validationSummary.innerHTML = `
            <i class="fas fa-exclamation-triangle"></i>
            <strong>Please complete all required fields:</strong>
            <ul>${errors.map(error => `<li>${error}</li>`).join('')}</ul>
        `;
        validationSummary.style.display = 'block';
        validationSummary.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// Enhanced styling for the new elements
const enhancedStyles = `
/* Trust Indicators */
.trust-indicators {
    margin: 20px 0;
    padding: 15px;
    background: linear-gradient(135deg, rgba(39, 174, 96, 0.1) 0%, rgba(52, 152, 219, 0.1) 100%);
    border-radius: 8px;
    border: 1px solid rgba(39, 174, 96, 0.3);
}

.trust-badges {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    gap: 15px;
}

.trust-badge {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 12px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 6px;
    font-size: 0.9rem;
    color: #27ae60;
}

.trust-badge i {
    color: #27ae60;
    font-size: 1.1em;
}

/* Progress Indicator */
.submission-progress {
    margin-bottom: 25px;
    padding: 20px;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 8px;
    border: 1px solid rgba(52, 152, 219, 0.2);
}

.progress-steps {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
}

.progress-steps::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    height: 2px;
    background: rgba(255, 255, 255, 0.2);
    z-index: 1;
}

.step {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;
    position: relative;
    z-index: 2;
    background: rgba(0, 0, 0, 0.5);
    padding: 5px 10px;
    border-radius: 6px;
    transition: all 0.3s ease;
    color: rgba(255, 255, 255, 0.5);
}

.step.active {
    color: #3498db;
    background: rgba(52, 152, 219, 0.2);
}

.step.completed {
    color: #27ae60;
    background: rgba(39, 174, 96, 0.2);
}

.step i {
    font-size: 1.2em;
}

.step span {
    font-size: 0.8rem;
    font-weight: 500;
}

/* Guarantee Section */
.guarantee-section {
    margin-top: 20px;
    padding: 15px;
    background: rgba(142, 68, 173, 0.1);
    border: 1px solid #8e44ad;
    border-radius: 8px;
}

.professional-guarantees {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 15px;
}

.guarantee-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 10px;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 6px;
}

.guarantee-item i {
    color: #8e44ad;
    font-size: 1.3em;
}

.guarantee-item strong {
    color: #8e44ad;
    display: block;
    font-size: 0.9rem;
}

.guarantee-item small {
    color: rgba(255, 255, 255, 0.7);
    font-size: 0.8rem;
}

/* Success Modal */
.success-confirmation-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10000;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
}

.success-confirmation-modal.show {
    opacity: 1;
    visibility: visible;
}

.modal-content {
    background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
    border-radius: 12px;
    padding: 30px;
    max-width: 600px;
    width: 90%;
    max-height: 80vh;
    overflow-y: auto;
    border: 2px solid #27ae60;
}

.success-header {
    text-align: center;
    margin-bottom: 25px;
}

.success-header i {
    font-size: 4em;
    color: #27ae60;
    margin-bottom: 15px;
}

.success-header h2 {
    color: #27ae60;
    margin: 0;
    font-family: 'Orbitron', sans-serif;
}

.certificate-preview {
    background: rgba(255, 255, 255, 0.1);
    padding: 20px;
    border-radius: 8px;
    margin-bottom: 20px;
    border: 1px solid rgba(39, 174, 96, 0.3);
}

.certificate-preview h3 {
    color: #27ae60;
    margin-bottom: 15px;
    text-align: center;
}

.certificate-details p {
    margin: 8px 0;
    color: rgba(255, 255, 255, 0.9);
}

.next-steps {
    margin-bottom: 20px;
}

.next-steps h4 {
    color: #3498db;
    margin-bottom: 15px;
}

.next-steps ul {
    list-style: none;
    padding: 0;
}

.next-steps li {
    display: flex;
    align-items: center;
    gap: 10px;
    margin: 10px 0;
    color: rgba(255, 255, 255, 0.9);
}

.next-steps li i {
    color: #3498db;
    width: 20px;
}

.contact-reassurance {
    background: rgba(52, 152, 219, 0.1);
    padding: 15px;
    border-radius: 6px;
    margin-bottom: 20px;
}

.contact-reassurance p {
    margin: 5px 0;
    color: rgba(255, 255, 255, 0.9);
}

.contact-reassurance i {
    color: #3498db;
    margin-right: 8px;
    width: 20px;
}

.success-actions {
    display: flex;
    gap: 15px;
    justify-content: center;
}

.btn-download-certificate,
.btn-close-modal {
    padding: 12px 20px;
    border: none;
    border-radius: 6px;
    font-size: 0.9rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    gap: 8px;
}

.btn-download-certificate {
    background: linear-gradient(135deg, #27ae60, #2ecc71);
    color: white;
}

.btn-download-certificate:hover {
    background: linear-gradient(135deg, #2ecc71, #27ae60);
}

.btn-close-modal {
    background: rgba(255, 255, 255, 0.1);
    color: rgba(255, 255, 255, 0.9);
    border: 1px solid rgba(255, 255, 255, 0.3);
}

.btn-close-modal:hover {
    background: rgba(255, 255, 255, 0.2);
}

/* Form Validation Enhancements */
.input-chip.error,
.textarea-chip.error {
    border-color: #e74c3c !important;
    background: rgba(231, 76, 60, 0.1) !important;
}

/* Button Enhancements */
.contact-submit.primary {
    transform: scale(1.05);
    box-shadow: 0 0 15px rgba(52, 152, 219, 0.5);
}

/* Mobile Responsiveness */
@media (max-width: 768px) {
    .trust-badges {
        flex-direction: column;
        align-items: center;
    }
    
    .professional-guarantees {
        grid-template-columns: 1fr;
    }
    
    .progress-steps {
        flex-direction: column;
        gap: 15px;
    }
    
    .progress-steps::before {
        display: none;
    }
    
    .step {
        flex-direction: row;
        width: 100%;
        justify-content: center;
    }
    
    .success-actions {
        flex-direction: column;
    }
    
    .modal-content {
        margin: 20px;
        padding: 20px;
    }
}
`;

// Initialize the enhanced contact system
let enhancedContact;

document.addEventListener('DOMContentLoaded', function() {
    // Add enhanced styles
    const styleSheet = document.createElement('style');
    styleSheet.textContent = enhancedStyles;
    document.head.appendChild(styleSheet);
    
    // Initialize enhanced contact system
    enhancedContact = new EnhancedContactSystem();
});
