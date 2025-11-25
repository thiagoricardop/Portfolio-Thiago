// ===========================
// Smooth Scrolling & Navigation
// ===========================

// Mobile menu toggle
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        const icon = mobileMenuToggle.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
    });
}

// Close mobile menu when clicking a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const icon = mobileMenuToggle?.querySelector('i');
        if (icon) {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
});

// Active navigation highlighting and navbar scroll effect
let lastScrollTop = 0;
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    // Active section highlighting
    let current = '';
    const sections = document.querySelectorAll('section[id]');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });

    // Navbar background on scroll
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ===========================
// QR Code Generation
// ===========================

function generateQRCode() {
    // Get the full URL for the CV - will work both locally and when deployed
    const baseUrl = window.location.origin + window.location.pathname.replace('index.html', '');
    const cvUrl = baseUrl + 'assets/CV_Thiago.pdf';
    
    const qrCodeContainer = document.getElementById('qrcode');
    
    if (qrCodeContainer && typeof QRious !== 'undefined') {
        try {
            // Create QR code with professional styling
            const qr = new QRious({
                element: document.createElement('canvas'),
                value: cvUrl,
                size: 220,
                level: 'H', // High error correction
                foreground: '#0066cc',
                background: '#ffffff',
                padding: 10
            });
            
            // Clear existing content and append the QR code
            qrCodeContainer.innerHTML = '';
            qrCodeContainer.appendChild(qr.canvas);
            
            console.log('✓ QR Code generated successfully');
            console.log('CV URL:', cvUrl);
        } catch (error) {
            console.error('Error generating QR code:', error);
            qrCodeContainer.innerHTML = '<p style="color: #999;">QR code will be generated when hosted</p>';
        }
    } else {
        console.warn('QRious library not loaded or container not found');
    }
}

// Generate QR code when page loads
window.addEventListener('load', generateQRCode);

// ===========================
// Intersection Observer for Animations
// ===========================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -80px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all elements with fade-in-up class
document.addEventListener('DOMContentLoaded', () => {
    const fadeElements = document.querySelectorAll('.fade-in-up');
    fadeElements.forEach(element => {
        observer.observe(element);
    });
});

// ===========================
// Language Progress Bars Animation
// ===========================

function animateLanguageBars() {
    const languageProgressBars = document.querySelectorAll('.language-progress');
    
    const languageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const targetWidth = bar.style.width;
                bar.style.width = '0';
                
                // Animate to target width
                setTimeout(() => {
                    bar.style.width = targetWidth;
                }, 200);
                
                languageObserver.unobserve(bar);
            }
        });
    }, { threshold: 0.5 });
    
    languageProgressBars.forEach(bar => {
        languageObserver.observe(bar);
    });
}

window.addEventListener('load', animateLanguageBars);

// ===========================
// Scroll to Top Button
// ===========================

function createScrollToTopButton() {
    const button = document.createElement('button');
    button.innerHTML = '<i class="fas fa-arrow-up"></i>';
    button.className = 'scroll-to-top';
    button.setAttribute('aria-label', 'Scroll to top');
    
    button.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    document.body.appendChild(button);
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            button.classList.add('visible');
        } else {
            button.classList.remove('visible');
        }
    });
}

createScrollToTopButton();

// ===========================
// Dynamic Year in Footer
// ===========================

document.addEventListener('DOMContentLoaded', () => {
    const yearElements = document.querySelectorAll('.footer p');
    if (yearElements.length > 0) {
        const currentYear = new Date().getFullYear();
        yearElements.forEach(el => {
            if (el.textContent.includes('2025')) {
                el.textContent = el.textContent.replace('2025', currentYear);
            }
        });
    }
});

// ===========================
// Enhanced Skill Items Interaction
// ===========================

const skillItems = document.querySelectorAll('.skill-item, .interest-item');
skillItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    });
});

// ===========================
// Performance Optimization
// ===========================

// Throttle scroll events for better performance
function throttle(func, wait) {
    let context, args, result;
    let timeout = null;
    let previous = 0;
    
    const later = function() {
        previous = Date.now();
        timeout = null;
        result = func.apply(context, args);
        if (!timeout) context = args = null;
    };
    
    return function() {
        const now = Date.now();
        const remaining = wait - (now - previous);
        context = this;
        args = arguments;
        
        if (remaining <= 0 || remaining > wait) {
            if (timeout) {
                clearTimeout(timeout);
                timeout = null;
            }
            previous = now;
            result = func.apply(context, args);
            if (!timeout) context = args = null;
        } else if (!timeout) {
            timeout = setTimeout(later, remaining);
        }
        return result;
    };
}

// Apply throttling to scroll event
const handleScroll = throttle(() => {
    // Scroll handling logic is already in the main scroll listener
}, 100);

// ===========================
// Lazy load images if any are added
// ===========================

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            }
        });
    });

    const images = document.querySelectorAll('img[data-src]');
    images.forEach(img => imageObserver.observe(img));
}

// ===========================
// Enhanced Download CV Button Analytics
// ===========================

document.querySelectorAll('a[download]').forEach(link => {
    link.addEventListener('click', () => {
        console.log('CV download initiated');
        // You can add analytics tracking here if needed
    });
});

// ===========================
// Smooth scroll for anchor links
// ===========================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        e.preventDefault();
        const target = document.querySelector(targetId);
        
        if (target) {
            const offsetTop = target.offsetTop - 70; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===========================
// Detect if user prefers reduced motion
// ===========================

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (prefersReducedMotion.matches) {
    // Disable animations for users who prefer reduced motion
    document.documentElement.style.setProperty('--transition-fast', '0s');
    document.documentElement.style.setProperty('--transition-normal', '0s');
    document.documentElement.style.setProperty('--transition-slow', '0s');
}

// ===========================
// Print Functionality
// ===========================

window.addEventListener('beforeprint', () => {
    console.log('Preparing to print...');
    // Expand all sections if needed
});

window.addEventListener('afterprint', () => {
    console.log('Print completed or cancelled');
});

// ===========================
// Service Worker Registration (for PWA if needed)
// ===========================

if ('serviceWorker' in navigator) {
    // Uncomment to enable PWA functionality
    // window.addEventListener('load', () => {
    //     navigator.serviceWorker.register('/sw.js')
    //         .then(reg => console.log('Service Worker registered'))
    //         .catch(err => console.log('Service Worker registration failed'));
    // });
}

// ===========================
// Console Welcome Message
// ===========================

console.log('%c🚀 Welcome to Thiago Ricardo\'s Portfolio', 'color: #0066cc; font-size: 18px; font-weight: bold; padding: 10px;');
console.log('%c🔒 Cybersecurity Engineer | Automotive Security Specialist', 'color: #00bfa5; font-size: 14px; padding: 5px;');
console.log('%c📧 t.ricardooliveira08@gmail.com', 'color: #718096; font-size: 12px; padding: 5px;');
console.log('%c\n💡 Interested in the code? This portfolio is built with vanilla HTML, CSS, and JavaScript for optimal performance and security.\n', 'color: #6366f1; font-size: 11px;');

// ===========================
// Error Handling
// ===========================

window.addEventListener('error', (e) => {
    console.error('An error occurred:', e.error);
});

// ===========================
// Page Load Performance Logging
// ===========================

window.addEventListener('load', () => {
    if (window.performance && window.performance.timing) {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log(`⚡ Page loaded in ${pageLoadTime}ms`);
    }
});
