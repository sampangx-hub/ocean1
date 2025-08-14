// Presentation Application JavaScript
class PresentationApp {
    constructor() {
        this.currentSlide = 1;
        this.totalSlides = 14;
        this.slides = document.querySelectorAll('.slide');
        this.charts = {};
        
        this.initializeApp();
    }

    initializeApp() {
        this.setupEventListeners();
        this.updatePageIndicator();
        this.updateNavigationButtons();
        this.initializeCharts();
    }

    setupEventListeners() {
        // Wait for DOM to be fully ready
        setTimeout(() => {
            // Keyboard navigation
            document.addEventListener('keydown', (e) => {
                switch(e.key) {
                    case 'ArrowRight':
                    case ' ':
                        e.preventDefault();
                        this.nextSlide();
                        break;
                    case 'ArrowLeft':
                        e.preventDefault();
                        this.prevSlide();
                        break;
                    case 'Home':
                        e.preventDefault();
                        this.goToSlide(1);
                        break;
                    case 'End':
                        e.preventDefault();
                        this.goToSlide(this.totalSlides);
                        break;
                }
            });

            // Navigation button listeners with proper error handling
            const nextBtn = document.getElementById('nextSlide');
            const prevBtn = document.getElementById('prevSlide');
            const firstBtn = document.getElementById('firstSlide');
            const lastBtn = document.getElementById('lastSlide');

            if (nextBtn) {
                nextBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    this.nextSlide();
                });
            }

            if (prevBtn) {
                prevBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    this.prevSlide();
                });
            }

            if (firstBtn) {
                firstBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    this.goToSlide(1);
                });
            }

            if (lastBtn) {
                lastBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    this.goToSlide(this.totalSlides);
                });
            }

            // Click area listeners with proper targeting
            const leftClick = document.getElementById('leftClick');
            const rightClick = document.getElementById('rightClick');

            if (leftClick) {
                leftClick.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    this.prevSlide();
                });
            }

            if (rightClick) {
                rightClick.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    this.nextSlide();
                });
            }

            // Prevent event bubbling on navigation elements
            const navControls = document.querySelector('.navigation-controls');
            const pageIndicator = document.querySelector('.page-indicator');

            if (navControls) {
                navControls.addEventListener('click', (e) => {
                    e.stopPropagation();
                });
            }

            if (pageIndicator) {
                pageIndicator.addEventListener('click', (e) => {
                    e.stopPropagation();
                });
            }

            // Prevent chart interaction from triggering navigation
            document.addEventListener('click', (e) => {
                if (e.target.closest('.chart-container') || 
                    e.target.closest('.navigation-controls') || 
                    e.target.closest('.page-indicator')) {
                    e.stopPropagation();
                }
            });

        }, 100);
    }

    nextSlide() {
        if (this.currentSlide < this.totalSlides) {
            this.goToSlide(this.currentSlide + 1);
        }
    }

    prevSlide() {
        if (this.currentSlide > 1) {
            this.goToSlide(this.currentSlide - 1);
        }
    }

    goToSlide(slideNumber) {
        if (slideNumber >= 1 && slideNumber <= this.totalSlides && slideNumber !== this.currentSlide) {
            // Remove active class from current slide
            if (this.slides[this.currentSlide - 1]) {
                this.slides[this.currentSlide - 1].classList.remove('active');
            }
            
            // Update current slide
            this.currentSlide = slideNumber;
            
            // Add active class to new slide
            if (this.slides[this.currentSlide - 1]) {
                this.slides[this.currentSlide - 1].classList.add('active');
            }
            
            // Update UI
            this.updatePageIndicator();
            this.updateNavigationButtons();
            
            // Initialize charts for the current slide if needed
            setTimeout(() => {
                this.initializeSlideCharts(slideNumber);
            }, 300);
        }
    }

    updatePageIndicator() {
        const currentPageEl = document.getElementById('currentPage');
        const totalPagesEl = document.getElementById('totalPages');
        
        if (currentPageEl) currentPageEl.textContent = this.currentSlide;
        if (totalPagesEl) totalPagesEl.textContent = this.totalSlides;
    }

    updateNavigationButtons() {
        const prevBtn = document.getElementById('prevSlide');
        const nextBtn = document.getElementById('nextSlide');
        const firstBtn = document.getElementById('firstSlide');
        const lastBtn = document.getElementById('lastSlide');

        if (prevBtn) prevBtn.disabled = this.currentSlide === 1;
        if (firstBtn) firstBtn.disabled = this.currentSlide === 1;
        if (nextBtn) nextBtn.disabled = this.currentSlide === this.totalSlides;
        if (lastBtn) lastBtn.disabled = this.currentSlide === this.totalSlides;
    }

    initializeCharts() {
        // Initialize charts that should be ready immediately
        this.initializeSlideCharts(this.currentSlide);
    }

    initializeSlideCharts(slideNumber) {
        switch(slideNumber) {
            case 3:
                setTimeout(() => this.createMarketGrowthChart(), 100);
                break;
            case 5:
                setTimeout(() => this.createRevenueDistributionChart(), 100);
                break;
            case 8:
                setTimeout(() => this.createStartupCostsChart(), 100);
                break;
        }
    }

    createMarketGrowthChart() {
        const ctx = document.getElementById('marketGrowthChart');
        if (!ctx || this.charts.marketGrowth) return;

        const marketData = [
            {"year": "2023", "value": 6.35},
            {"year": "2024", "value": 6.76},
            {"year": "2025", "value": 7.19},
            {"year": "2026", "value": 7.65},
            {"year": "2027", "value": 8.14},
            {"year": "2028", "value": 8.66},
            {"year": "2029", "value": 9.21},
            {"year": "2030", "value": 9.79}
        ];

        try {
            this.charts.marketGrowth = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: marketData.map(item => item.year),
                    datasets: [{
                        label: '市场规模 (十亿美元)',
                        data: marketData.map(item => item.value),
                        borderColor: '#1FB8CD',
                        backgroundColor: 'rgba(31, 184, 205, 0.1)',
                        borderWidth: 3,
                        fill: true,
                        tension: 0.4,
                        pointBackgroundColor: '#1FB8CD',
                        pointBorderColor: '#ffffff',
                        pointBorderWidth: 2,
                        pointRadius: 6,
                        pointHoverRadius: 8
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        title: {
                            display: true,
                            text: '马来西亚海鲜市场增长预测',
                            font: {
                                size: 16,
                                weight: 'bold'
                            },
                            color: '#1FB8CD'
                        },
                        legend: {
                            display: true,
                            position: 'bottom'
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: false,
                            min: 6,
                            max: 10,
                            title: {
                                display: true,
                                text: '市场规模 (十亿美元)'
                            },
                            grid: {
                                color: 'rgba(0, 0, 0, 0.1)'
                            }
                        },
                        x: {
                            title: {
                                display: true,
                                text: '年份'
                            },
                            grid: {
                                color: 'rgba(0, 0, 0, 0.1)'
                            }
                        }
                    },
                    interaction: {
                        intersect: false,
                        mode: 'index'
                    }
                }
            });
        } catch (error) {
            console.error('Error creating market growth chart:', error);
        }
    }

    createRevenueDistributionChart() {
        const ctx = document.getElementById('revenueDistributionChart');
        if (!ctx || this.charts.revenueDistribution) return;

        const revenueData = [
            {"time": "晚餐档 (18:00-22:00)", "percentage": 30},
            {"time": "午餐档 (12:00-14:00)", "percentage": 25},
            {"time": "早餐档 (06:00-10:00)", "percentage": 12},
            {"time": "夜宵档 (22:00-02:00)", "percentage": 12},
            {"time": "上午档 (10:00-12:00)", "percentage": 8},
            {"time": "下午档 (14:00-18:00)", "percentage": 10},
            {"time": "深夜档 (02:00-06:00)", "percentage": 3}
        ];

        const colors = ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5', '#5D878F', '#DB4545', '#D2BA4C'];

        try {
            this.charts.revenueDistribution = new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: revenueData.map(item => item.time),
                    datasets: [{
                        data: revenueData.map(item => item.percentage),
                        backgroundColor: colors,
                        borderWidth: 2,
                        borderColor: '#ffffff',
                        hoverBorderWidth: 3
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        title: {
                            display: true,
                            text: '24小时营业收益分布',
                            font: {
                                size: 16,
                                weight: 'bold'
                            },
                            color: '#1FB8CD'
                        },
                        legend: {
                            display: true,
                            position: 'right',
                            labels: {
                                usePointStyle: true,
                                padding: 15,
                                font: {
                                    size: 11
                                }
                            }
                        },
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    return context.label + ': ' + context.parsed + '%';
                                }
                            }
                        }
                    },
                    cutout: '40%',
                    interaction: {
                        intersect: false
                    }
                }
            });
        } catch (error) {
            console.error('Error creating revenue distribution chart:', error);
        }
    }

    createStartupCostsChart() {
        const ctx = document.getElementById('startupCostsChart');
        if (!ctx || this.charts.startupCosts) return;

        const costsData = [
            {"category": "场地设施", "amount": 350000, "percentage": 50},
            {"category": "车辆设备", "amount": 180000, "percentage": 26},
            {"category": "技术开发", "amount": 80000, "percentage": 11},
            {"category": "初期库存", "amount": 60000, "percentage": 9},
            {"category": "运营资金", "amount": 30000, "percentage": 4}
        ];

        const colors = ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5', '#5D878F'];

        try {
            this.charts.startupCosts = new Chart(ctx, {
                type: 'pie',
                data: {
                    labels: costsData.map(item => item.category),
                    datasets: [{
                        data: costsData.map(item => item.percentage),
                        backgroundColor: colors,
                        borderWidth: 2,
                        borderColor: '#ffffff',
                        hoverBorderWidth: 3
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        title: {
                            display: true,
                            text: '启动资金分配',
                            font: {
                                size: 16,
                                weight: 'bold'
                            },
                            color: '#1FB8CD'
                        },
                        legend: {
                            display: true,
                            position: 'bottom',
                            labels: {
                                usePointStyle: true,
                                padding: 15
                            }
                        },
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    const category = context.label;
                                    const percentage = context.parsed;
                                    const amount = costsData[context.dataIndex].amount;
                                    return [
                                        category + ': ' + percentage + '%',
                                        '金额: ' + (amount/1000).toFixed(0) + 'K 令吉'
                                    ];
                                }
                            }
                        }
                    },
                    interaction: {
                        intersect: false
                    }
                }
            });
        } catch (error) {
            console.error('Error creating startup costs chart:', error);
        }
    }

    // Method to handle window resize
    handleResize() {
        Object.values(this.charts).forEach(chart => {
            if (chart && typeof chart.resize === 'function') {
                try {
                    chart.resize();
                } catch (error) {
                    console.error('Error resizing chart:', error);
                }
            }
        });
    }

    // Method to destroy charts when needed
    destroyCharts() {
        Object.values(this.charts).forEach(chart => {
            if (chart && typeof chart.destroy === 'function') {
                try {
                    chart.destroy();
                } catch (error) {
                    console.error('Error destroying chart:', error);
                }
            }
        });
        this.charts = {};
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Create the main presentation app
    const presentationApp = new PresentationApp();
    
    // Handle window resize for charts
    window.addEventListener('resize', debounce(() => {
        presentationApp.handleResize();
    }, 250));

    // Global error handling
    window.addEventListener('error', (e) => {
        console.error('Presentation error:', e.error);
    });

    // Optional: Add touch/swipe support for mobile
    let startX = null;
    let startY = null;
    let isTouch = false;

    document.addEventListener('touchstart', (e) => {
        isTouch = true;
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
    }, { passive: true });

    document.addEventListener('touchend', (e) => {
        if (!startX || !startY || !isTouch) return;

        let endX = e.changedTouches[0].clientX;
        let endY = e.changedTouches[0].clientY;

        let diffX = startX - endX;
        let diffY = startY - endY;

        // Only handle horizontal swipes
        if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
            e.preventDefault();
            if (diffX > 0) {
                // Swipe left - next slide
                presentationApp.nextSlide();
            } else {
                // Swipe right - previous slide
                presentationApp.prevSlide();
            }
        }

        startX = null;
        startY = null;
        isTouch = false;
    }, { passive: false });

    // Prevent default touch behaviors that might interfere
    document.addEventListener('touchmove', (e) => {
        // Allow scrolling within chart containers
        if (!e.target.closest('.chart-container')) {
            e.preventDefault();
        }
    }, { passive: false });

    // Expose app to global scope for debugging
    window.presentationApp = presentationApp;
});

// Utility functions
const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

const formatCurrency = (amount, currency = '令吉') => {
    if (amount >= 1000000) {
        return `${(amount / 1000000).toFixed(1)}M ${currency}`;
    } else if (amount >= 1000) {
        return `${(amount / 1000).toFixed(0)}K ${currency}`;
    }
    return `${amount} ${currency}`;
};

const formatPercentage = (value, decimals = 1) => {
    return `${value.toFixed(decimals)}%`;
};