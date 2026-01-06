// Enhanced Budget Calculator with Colombian Market Pricing
// Research-based comprehensive calculator for EmpathicWeb

class ColombianBudgetCalculator {
    constructor() {
        this.basePrices = {
            // Basic Web Services
            'basic-web': { name: 'Basic Website', price: 1500000, category: 'web' },
            'business-web': { name: 'Business Website', price: 2500000, category: 'web' },
            'ecommerce': { name: 'E-commerce Platform', price: 4000000, category: 'web' },
            'cms': { name: 'Custom CMS Development', price: 3500000, category: 'web' },
            
            // 3D Design Services
            '3d-logo': { name: '3D Logo Design & Animation', price: 1200000, category: '3d' },
            '3d-simple': { name: 'Simple 3D Models', price: 800000, category: '3d' },
            '3d-icons': { name: '3D Icons & Graphics', price: 600000, category: '3d' },
            '3d-animation': { name: 'Basic 3D Animation', price: 1000000, category: '3d' },
            '3d-interactive': { name: 'Interactive 3D Elements', price: 2000000, category: '3d' },
            '3d-product': { name: '3D Product Visualization', price: 2500000, category: '3d' },
            '3d-navigation': { name: 'Interactive 3D Navigation', price: 3000000, category: '3d' },
            '3d-ui': { name: '3D User Interface Components', price: 2800000, category: '3d' },
            '3d-gallery': { name: 'Immersive 3D Galleries', price: 3500000, category: '3d' },
            '3d-environment': { name: 'Full 3D Website Environment', price: 8000000, category: '3d' },
            '3d-showroom': { name: '3D Virtual Showroom', price: 6000000, category: '3d' },
            '3d-game': { name: '3D Game Integration', price: 12000000, category: '3d' },
            '3d-collaboration': { name: 'Real-time 3D Collaboration', price: 10000000, category: '3d' },
            '3d-engine': { name: 'Custom 3D Engine Development', price: 15000000, category: '3d' },
            '3d-vr-ar': { name: 'VR/AR Web Experience', price: 18000000, category: '3d' },
            '3d-visualization': { name: '3D Data Visualization', price: 8000000, category: '3d' },
            '3d-multiplatform': { name: 'Multi-platform 3D Applications', price: 20000000, category: '3d' },
            
            // Additional Services
            'maintenance': { name: 'Website Management', price: 500000, category: 'service', recurring: true },
            'cybersecurity': { name: 'Cybersecurity Consulting', price: 1000000, category: 'service' },
            'security': { name: 'Personal Security Services', price: 300000, category: 'service', recurring: true },
            'training': { name: 'Empathy Training', price: 800000, category: 'service' },
            
            // Advanced Features
            'advanced-seo': { name: 'Advanced SEO Optimization', price: 300000, category: 'feature' },
            'ecommerce-integration': { name: 'E-commerce Integration', price: 600000, category: 'feature' },
            'multilingual': { name: 'Multilingual Support', price: 350000, category: 'feature' },
            'analytics': { name: 'Analytics Integration', price: 200000, category: 'feature' },
            'social-integration': { name: 'Social Media Integration', price: 250000, category: 'feature' },
            'advanced-security': { name: 'Advanced Security Features', price: 450000, category: 'feature' },
            'performance': { name: 'Performance Optimization', price: 300000, category: 'feature' },
            'mobile-first': { name: 'Mobile-First Design', price: 200000, category: 'feature' },
            'ai-integration': { name: 'AI Integration & Chatbots', price: 1200000, category: 'feature' },
            'blockchain': { name: 'Blockchain Integration', price: 2500000, category: 'feature' },
            'iot-integration': { name: 'IoT Device Integration', price: 1800000, category: 'feature' }
        };

        this.timelineMultipliers = {
            'asap': { label: 'ASAP (Rush - 24h)', multiplier: 2.5, description: 'Emergency delivery within 24 hours' },
            '1-week': { label: '1 Week (Urgent)', multiplier: 2.0, description: 'Urgent delivery within 1 week' },
            '2-weeks': { label: '2 Weeks (High Priority)', multiplier: 1.5, description: 'High priority delivery' },
            '1-month': { label: '1 Month (Compressed)', multiplier: 1.25, description: 'Compressed timeline' },
            '2-3-months': { label: '2-3 Months (Standard)', multiplier: 1.0, description: 'Optimal development timeline' },
            '4-6-months': { label: '4-6 Months (Planned)', multiplier: 0.9, description: 'Well-planned project' },
            '6-months': { label: '6+ Months (Long-term)', multiplier: 0.85, description: 'Long-term strategic project' }
        };

        this.urgencyMultipliers = {
            'emergency': { label: 'Emergency (24h)', multiplier: 2.0, description: 'Critical business need' },
            'urgent': { label: 'Urgent (1 week)', multiplier: 1.5, description: 'High priority project' },
            'high': { label: 'High (2-4 weeks)', multiplier: 1.25, description: 'Time-sensitive project' },
            'normal': { label: 'Normal (1-3 months)', multiplier: 1.0, description: 'Standard project timeline' },
            'planning': { label: 'Planning ahead (3+ months)', multiplier: 0.95, description: 'Early planning discount' }
        };

        this.complexityMultipliers = {
            'basic': { label: 'Basic (Standard web technologies)', multiplier: 1.0 },
            'intermediate': { label: 'Intermediate (Custom integrations)', multiplier: 1.3 },
            'advanced': { label: 'Advanced (Complex 3D, AI)', multiplier: 1.6 },
            'expert': { label: 'Expert (Cutting-edge tech)', multiplier: 2.0 }
        };

        this.scaleMultipliers = {
            'small': { label: 'Small (1-5 pages)', multiplier: 1.0, pages: '1-5 pages' },
            'medium': { label: 'Medium (6-20 pages)', multiplier: 1.2, pages: '6-20 pages' },
            'large': { label: 'Large (21-50 pages)', multiplier: 1.5, pages: '21-50 pages' },
            'enterprise': { label: 'Enterprise (50+ pages)', multiplier: 2.0, pages: '50+ pages' },
            'platform': { label: 'Custom Platform (Unlimited)', multiplier: 2.5, pages: 'Unlimited/Platform' }
        };

        this.currentCalculation = {
            baseServices: [],
            features: [],
            timeline: null,
            urgency: null,
            complexity: null,
            scale: null,
            recurring: {},
            subtotal: 0,
            multipliers: {},
            total: 0,
            breakdown: []
        };
    }

    // Calculate total with all factors
    calculate() {
        this.currentCalculation = {
            baseServices: [],
            features: [],
            timeline: null,
            urgency: null,
            complexity: null,
            scale: null,
            recurring: {},
            subtotal: 0,
            multipliers: {},
            total: 0,
            breakdown: []
        };

        // Get selected services
        const services = this.getSelectedServices();
        const features = this.getSelectedFeatures();
        
        // Calculate base costs
        this.calculateBaseCosts(services, features);
        
        // Apply recurring costs
        this.calculateRecurringCosts(services);
        
        // Apply multipliers
        this.applyMultipliers();
        
        // Calculate final total
        this.calculateFinalTotal();
        
        return this.currentCalculation;
    }

    getSelectedServices() {
        const checkboxes = document.querySelectorAll('input[name="calc-services"]:checked');
        return Array.from(checkboxes).map(cb => cb.value);
    }

    getSelectedFeatures() {
        const checkboxes = document.querySelectorAll('input[name="calc-features"]:checked');
        return Array.from(checkboxes).map(cb => cb.value);
    }

    calculateBaseCosts(services, features) {
        let subtotal = 0;

        // Calculate base services
        services.forEach(serviceId => {
            const service = this.basePrices[serviceId];
            if (service) {
                const price = this.calculateServicePrice(service);
                this.currentCalculation.baseServices.push({
                    id: serviceId,
                    name: service.name,
                    price: price,
                    category: service.category,
                    isRecurring: service.recurring || false
                });
                subtotal += price;
            }
        });

        // Calculate features
        features.forEach(featureId => {
            const feature = this.basePrices[featureId];
            if (feature) {
                const price = this.calculateServicePrice(feature);
                this.currentCalculation.features.push({
                    id: featureId,
                    name: feature.name,
                    price: price,
                    category: feature.category
                });
                subtotal += price;
            }
        });

        this.currentCalculation.subtotal = subtotal;
    }

    calculateServicePrice(service) {
        let price = service.price;

        // Apply category-specific adjustments
        if (service.category === '3d') {
            // 3D services get premium pricing in Colombian market
            price *= 1.1;
        }

        // Apply currency exchange volatility factor (±5%)
        const exchangeFactor = 0.95 + (Math.random() * 0.1); // Simulate market fluctuation
        price *= exchangeFactor;

        return Math.round(price);
    }

    calculateRecurringCosts(services) {
        const maintenanceMonths = parseInt(document.getElementById('calc-maintenance-months')?.value || 0);
        const securityDays = parseInt(document.getElementById('calc-security-days')?.value || 0);

        if (maintenanceMonths > 0 && services.includes('maintenance')) {
            this.currentCalculation.recurring.maintenance = {
                months: maintenanceMonths,
                price: 500000 * maintenanceMonths
            };
        }

        if (securityDays > 0 && services.includes('security')) {
            this.currentCalculation.recurring.security = {
                days: securityDays,
                price: 300000 * securityDays
            };
        }
    }

    applyMultipliers() {
        // Timeline multiplier
        const timelineSelect = document.getElementById('calc-timeline');
        if (timelineSelect && timelineSelect.value) {
            const timeline = this.timelineMultipliers[timelineSelect.value];
            if (timeline) {
                this.currentCalculation.multipliers.timeline = timeline;
            }
        }

        // Urgency multiplier
        const urgencySelect = document.getElementById('calc-urgency');
        if (urgencySelect && urgencySelect.value) {
            const urgency = this.urgencyMultipliers[urgencySelect.value];
            if (urgency) {
                this.currentCalculation.multipliers.urgency = urgency;
            }
        }

        // Complexity multiplier
        const complexitySelect = document.getElementById('calc-complexity');
        if (complexitySelect && complexitySelect.value) {
            const complexity = this.complexityMultipliers[complexitySelect.value];
            if (complexity) {
                this.currentCalculation.multipliers.complexity = complexity;
            }
        }

        // Scale multiplier
        const scaleSelect = document.getElementById('calc-scale');
        if (scaleSelect && scaleSelect.value) {
            const scale = this.scaleMultipliers[scaleSelect.value];
            if (scale) {
                this.currentCalculation.multipliers.scale = scale;
            }
        }
    }

    calculateFinalTotal() {
        let total = this.currentCalculation.subtotal;
        const breakdown = [];

        // Add recurring costs
        Object.values(this.currentCalculation.recurring).forEach(recurring => {
            total += recurring.price;
        });

        // Apply multipliers
        let cumulativeMultiplier = 1.0;
        Object.values(this.currentCalculation.multipliers).forEach(multiplier => {
            cumulativeMultiplier *= multiplier.multiplier;
            breakdown.push(`${multiplier.label}: x${multiplier.multiplier}`);
        });

        this.currentCalculation.total = Math.round(total * cumulativeMultiplier);
        this.currentCalculation.cumulativeMultiplier = cumulativeMultiplier;
        this.currentCalculation.multiplierImpact = this.currentCalculation.total - total;
        this.currentCalculation.breakdown = breakdown;
    }

    // Generate detailed breakdown HTML
    generateBreakdownHTML() {
        const calc = this.currentCalculation;
        let html = '';

        // Base services
        if (calc.baseServices.length > 0) {
            html += '<div class="breakdown-section"><strong>Base Services:</strong><br>';
            calc.baseServices.forEach(service => {
                html += `• ${service.name}: ${service.price.toLocaleString()} COP<br>`;
            });
            html += '</div>';
        }

        // Features
        if (calc.features.length > 0) {
            html += '<div class="breakdown-section"><strong>Additional Features:</strong><br>';
            calc.features.forEach(feature => {
                html += `• ${feature.name}: ${feature.price.toLocaleString()} COP<br>`;
            });
            html += '</div>';
        }

        // Recurring costs
        if (Object.keys(calc.recurring).length > 0) {
            html += '<div class="breakdown-section"><strong>Recurring Services:</strong><br>';
            Object.values(calc.recurring).forEach(recurring => {
                const duration = recurring.months ? `${recurring.months} months` : `${recurring.days} days`;
                html += `• Extended Service (${duration}): ${recurring.price.toLocaleString()} COP<br>`;
            });
            html += '</div>';
        }

        // Subtotal
        html += `<div class="breakdown-section"><strong>Subtotal: ${calc.subtotal.toLocaleString()} COP</strong><br></div>`;

        // Multipliers
        if (calc.breakdown.length > 0) {
            html += '<div class="breakdown-section"><strong>Pricing Adjustments:</strong><br>';
            calc.breakdown.forEach(adjustment => {
                html += `• ${adjustment}<br>`;
            });
            html += `• Cumulative Multiplier: x${calc.cumulativeMultiplier.toFixed(2)}<br>`;
            html += `• Adjustment Impact: ${calc.multiplierImpact > 0 ? '+' : ''}${calc.multiplierImpact.toLocaleString()} COP<br>`;
            html += '</div>';
        }

        // Final total
        html += `<div class="breakdown-section final-total"><strong>Final Investment: ${calc.total.toLocaleString()} COP</strong><br></div>`;

        return html;
    }

    // Generate recommendations based on selections
    generateRecommendations() {
        const recommendations = [];
        const has3DServices = this.currentCalculation.baseServices.some(s => s.category === '3d');
        const hasEcommerce = this.currentCalculation.baseServices.some(s => s.id === 'ecommerce');
        const hasAdvancedFeatures = this.currentCalculation.features.length > 3;

        if (has3DServices) {
            recommendations.push({
                type: 'upgrade',
                title: '3D Performance Optimization',
                description: 'Consider adding performance optimization for your 3D elements (+300k COP)',
                savings: null,
                value: 'Essential for smooth 3D experiences'
            });
        }

        if (hasEcommerce) {
            recommendations.push({
                type: 'security',
                title: 'Enhanced E-commerce Security',
                description: 'Add advanced security features for your online store (+450k COP)',
                savings: null,
                value: 'Protect customer data and transactions'
            });
        }

        if (hasAdvancedFeatures) {
            recommendations.push({
                type: 'maintenance',
                title: 'Comprehensive Maintenance Package',
                description: '12-month maintenance plan with priority support (+4.8M COP)',
                savings: { original: 6000000, discounted: 4800000 },
                value: 'Ongoing support and updates'
            });
        }

        return recommendations;
    }

    // Format currency in Colombian style
    formatCOP(amount) {
        return new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: 'COP',
            minimumFractionDigits: 0
        }).format(amount);
    }
}

// Initialize calculator
const budgetCalculator = new ColombianBudgetCalculator();

// Real-time calculation setup
function setupRealTimeCalculator() {
    const calculator = budgetCalculator;
    
    // Update display function
    function updateDisplay() {
        const calculation = calculator.calculate();
        const totalElement = document.getElementById('calculated-total');
        const breakdownElement = document.getElementById('breakdown');
        
        if (totalElement) {
            totalElement.textContent = calculation.total.toLocaleString() + ' COP';
        }
        
        if (breakdownElement) {
            breakdownElement.innerHTML = calculator.generateBreakdownHTML();
        }
        
        // Update recommendations if element exists
        updateRecommendations(calculator.generateRecommendations());
    }

    // Add event listeners to all form elements
    const formElements = document.querySelectorAll('input[name="calc-services"], input[name="calc-features"], select[name="calc-timeline"], select[name="calc-urgency"], select[name="calc-complexity"], select[name="calc-scale"], #calc-maintenance-months, #calc-security-days');
    
    formElements.forEach(element => {
        element.addEventListener('change', updateDisplay);
        element.addEventListener('input', updateDisplay);
    });

    // Show/hide recurring inputs
    document.querySelectorAll('input[name="calc-services"]').forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const maintenanceSection = document.getElementById('maintenance-months');
            const securitySection = document.getElementById('security-days');
            
            if (this.value === 'maintenance' && this.checked) {
                maintenanceSection.style.display = 'block';
            } else if (this.value === 'maintenance' && !this.checked) {
                maintenanceSection.style.display = 'none';
            }
            
            if (this.value === 'security' && this.checked) {
                securitySection.style.display = 'block';
            } else if (this.value === 'security' && !this.checked) {
                securitySection.style.display = 'none';
            }
        });
    });

    // Initial calculation
    updateDisplay();
}

// Update recommendations display
function updateRecommendations(recommendations) {
    const recommendationsContainer = document.getElementById('calculator-recommendations');
    if (!recommendationsContainer || recommendations.length === 0) return;

    let html = '<div class="recommendations-section"><h5><i class="fas fa-lightbulb"></i> Smart Recommendations</h5>';
    
    recommendations.forEach(rec => {
        const savingsText = rec.savings ? 
            `<br><span class="savings">Save ${(rec.savings.original - rec.savings.discounted).toLocaleString()} COP</span>` : '';
        
        html += `
            <div class="recommendation-item">
                <div class="rec-header">
                    <span class="rec-icon">${rec.type === 'upgrade' ? '🚀' : rec.type === 'security' ? '🔒' : '💡'}</span>
                    <strong>${rec.title}</strong>
                </div>
                <p>${rec.description}${savingsText}</p>
                <small>Value: ${rec.value}</small>
            </div>
        `;
    });
    
    html += '</div>';
    recommendationsContainer.innerHTML = html;
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', setupRealTimeCalculator);

// Export for use in forms
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ColombianBudgetCalculator, budgetCalculator };
}