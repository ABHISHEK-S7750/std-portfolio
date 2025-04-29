// Hero section animations
function animateHero() {
    const heroTitle = document.querySelector('.hero-title');
    const heroDescription = document.querySelector('.hero-description');
    const heroCta = document.querySelector('.hero-cta');
    const socialLinks = document.querySelector('.social-links');
    const heroImage = document.querySelector('.hero-image');
    
    // Add animation classes
    if (heroTitle) {
        heroTitle.classList.add('animate-slide-up');
    }
    if (heroDescription) {
        heroDescription.classList.add('animate-slide-up', 'delay-1');
    }
    if (heroCta) {
        heroCta.classList.add('animate-slide-up', 'delay-2');
    }
    if (socialLinks) {
        socialLinks.classList.add('animate-slide-up', 'delay-3');
    }
    if (heroImage) {
        heroImage.classList.add('animate-fade', 'delay-1');
    }
}

// About section animations
function animateAbout() {
    const aboutImage = document.querySelector('.about-image');
    const aboutText = document.querySelector('.about-text');
    
    if (aboutImage && aboutText) {
        aboutImage.classList.add('animate-slide-left');
        aboutText.classList.add('animate-slide-right');
    }
}

// Project card animations
function animateProjects() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        card.classList.add('animate-slide-up');
    });
}

// Initialize animations when page loads
window.addEventListener('load', () => {
    setTimeout(() => {
        animateHero();
        animateAbout();
        animateProjects();
    }, 1800); // Wait for loading screen to disappear
});
