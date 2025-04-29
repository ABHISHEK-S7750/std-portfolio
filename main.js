/**
 * Main JavaScript File - Portfolio Loading System
 * Handles loading screen, navigation, and core functionality
 */

// Wait for DOM to be fully parsed
document.addEventListener('DOMContentLoaded', function() {
    // Initialize loading screen system
    initLoadingScreen();
    
    // Initialize other core functionality
    initNavigation();
    initSkillBars();
    initBackToTop();
    initContactForm();
});

/**
 * Robust Loading Screen System
 * - Minimum 1.5s display time
 * - Handles successful loads
 * - Fallback timeout
 * - Error recovery
 */
function initLoadingScreen() {
    const loadingScreen = document.querySelector('.loading-screen');
    
    // If no loading screen exists, abort
    if (!loadingScreen) {
        console.warn('No loading screen element found');
        return;
    }

    let isLoaded = false;
    let minDisplayTimeMet = false;
    const MIN_DISPLAY_TIME = 1500; // 1.5 seconds
    const MAX_WAIT_TIME = 4000;    // 4 seconds max wait

    // Set minimum display time
    setTimeout(() => {
        minDisplayTimeMet = true;
        tryHideLoadingScreen();
    }, MIN_DISPLAY_TIME);

    // Main load event listener
    window.addEventListener('load', () => {
        isLoaded = true;
        tryHideLoadingScreen();
    });

    // Fallback timeout in case load never fires
    const fallbackTimeout = setTimeout(() => {
        console.log('Fallback loading screen hide triggered');
        isLoaded = true;
        minDisplayTimeMet = true;
        tryHideLoadingScreen();
    }, MAX_WAIT_TIME);

    // Image preloader to help detect when images are done
    preloadImages().then(() => {
        console.log('All images preloaded');
    }).catch(error => {
        console.log('Image preloading completed with some errors', error);
    });

    function tryHideLoadingScreen() {
        // Only proceed if both conditions are met
        if (!isLoaded || !minDisplayTimeMet) return;
        
        // Clear the fallback timeout
        clearTimeout(fallbackTimeout);
        
        // Start fade out animation
        loadingScreen.style.opacity = '0';
        loadingScreen.style.pointerEvents = 'none';
        
        // Remove element after animation completes
        setTimeout(() => {
            loadingScreen.style.display = 'none';
            console.log('Loading screen hidden successfully');
        }, 500); // Match this with CSS transition duration
    }
}

/**
 * Preload images to help with load detection
 */
function preloadImages() {
    return new Promise((resolve) => {
        const images = document.querySelectorAll('img');
        let loadedCount = 0;
        const totalImages = images.length;

        // If no images, resolve immediately
        if (totalImages === 0) {
            resolve();
            return;
        }

        const imageLoaded = () => {
            loadedCount++;
            if (loadedCount === totalImages) {
                resolve();
            }
        };

        images.forEach(img => {
            if (img.complete) {
                imageLoaded();
            } else {
                img.addEventListener('load', imageLoaded);
                img.addEventListener('error', imageLoaded); // Count even if error
            }
        });
    });
}

/**
 * Navigation System
 * - Mobile menu toggle
 * - Active link highlighting
 * - Smooth scrolling
 */
function initNavigation() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-link');
    const navIndicator = document.querySelector('.nav-indicator');

    // Mobile menu toggle
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }

    // Update nav indicator position
    function updateNavIndicator(el) {
        if (navIndicator) {
            navIndicator.style.width = `${el.offsetWidth}px`;
            navIndicator.style.left = `${el.offsetLeft}px`;
        }
    }

    // Set initial active nav item
    const activeNavItem = document.querySelector('.nav-link.active');
    if (activeNavItem && navIndicator) {
        updateNavIndicator(activeNavItem);
    }

    // Nav item click events
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            navItems.forEach(navItem => {
                navItem.classList.remove('active');
            });
            
            e.currentTarget.classList.add('active');
            updateNavIndicator(e.currentTarget);
            
            // Close mobile menu if open
            if (navLinks && navLinks.classList.contains('active')) {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
    });
}

/**
 * Animate skill bars on scroll
 */
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-level');
    
    function animateSkillBars() {
        skillBars.forEach(bar => {
            const rect = bar.getBoundingClientRect();
            if (rect.top <= window.innerHeight - 100) {
                const level = bar.getAttribute('data-level') || bar.dataset.level;
                bar.style.width = `${level}%`;
            }
        });
    }

    // Run once on load and then on scroll
    animateSkillBars();
    window.addEventListener('scroll', animateSkillBars);
}

/**
 * Back to top button functionality
 */
function initBackToTop() {
    const backToTop = document.querySelector('.back-to-top');
    
    if (backToTop) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTop.classList.add('show');
            } else {
                backToTop.classList.remove('show');
            }
        });

        backToTop.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

/**
 * Contact form handling
 */
function initContactForm() {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Basic form validation
            const name = contactForm.querySelector('input[type="text"]');
            const email = contactForm.querySelector('input[type="email"]');
            const message = contactForm.querySelector('textarea');
            
            if (!name.value || !email.value || !message.value) {
                alert('Please fill in all fields');
                return;
            }
            
            // Here you would typically send the form data to a server
            alert('Thank you for your message! I will get back to you soon.');
            contactForm.reset();
        });
    }
}

/**
 * Scroll reveal animations
 */
function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal');
    
    function scrollReveal() {
        reveals.forEach(reveal => {
            const windowHeight = window.innerHeight;
            const revealTop = reveal.getBoundingClientRect().top;
            const revealPoint = 150;
            
            if (revealTop < windowHeight - revealPoint) {
                reveal.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', scrollReveal);
    scrollReveal(); // Initialize on load
}

// Initialize scroll reveal if elements exist
if (document.querySelector('.reveal')) {
    initScrollReveal();
}
