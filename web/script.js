// Mobile Menu Functionality
function showMenu() {
    const navLinks = document.getElementById('navLinks');
    navLinks.style.right = '0';
}

function hideMenu() {
    const navLinks = document.getElementById('navLinks');
    navLinks.style.right = '-200px';
}

// Smooth Scrolling for Navigation Links
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('nav a, .hero-buttons a, .user-type-card a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Only apply to links that start with #
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    // Close mobile menu if open
                    hideMenu();
                    
                    // Scroll to the target element
                    window.scrollTo({
                        top: targetElement.offsetTop - 70, // Adjust for header height
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});

// Form Submission
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('.contact-form form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const userType = this.querySelector('select').value;
            const message = this.querySelector('textarea').value;
            
            // Simple validation
            if (!name || !email || !message) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Simulate form submission
            alert('Thank you for your message! We will get back to you soon.');
            
            // Reset form
            this.reset();
        });
    }
});

// Scroll Animation for Features and User Type Cards
document.addEventListener('DOMContentLoaded', function() {
    const featureCards = document.querySelectorAll('.feature-card');
    const userTypeCards = document.querySelectorAll('.user-type-card');
    const testimonials = document.querySelectorAll('.testimonial');
    
    // Function to check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
    
    // Function to add animation class when element is in viewport
    function animateOnScroll() {
        // Animate feature cards
        featureCards.forEach(card => {
            if (isInViewport(card)) {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }
        });
        
        // Animate user type cards
        userTypeCards.forEach(card => {
            if (isInViewport(card)) {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }
        });
        
        // Animate testimonials
        testimonials.forEach(testimonial => {
            if (isInViewport(testimonial)) {
                testimonial.style.opacity = '1';
                testimonial.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Set initial styles
    featureCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    userTypeCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    testimonials.forEach(testimonial => {
        testimonial.style.opacity = '0';
        testimonial.style.transform = 'translateY(20px)';
        testimonial.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Run on load
    animateOnScroll();
    
    // Run on scroll
    window.addEventListener('scroll', animateOnScroll);
});
