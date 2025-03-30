// Initialize on document load
document.addEventListener('DOMContentLoaded', function() {
    // Show modal when page loads
    const modal = document.getElementById('welcome-modal');
    modal.style.display = 'block';

    // Handle form submission
    const form = document.getElementById('visitor-form');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const visitorName = document.getElementById('visitorName').value;
        const howDidYouKnow = document.getElementById('howDidYouKnow').value;
        
        // Save visitor info
        localStorage.setItem('visitorName', visitorName);
        
        // Close modal
        modal.style.display = 'none';
        
        // Show welcome message
        alert(`Welcome ${visitorName}! Thank you for visiting my portfolio.`);
    });

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.2
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);

    // Observe sections
    const sections = document.querySelectorAll('.about-content, .contact-content');
    sections.forEach(section => {
        observer.observe(section);
    });

    // Smooth scroll for navigation
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            targetSection.scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Initialize AOS
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100
    });

    // Initialize tilt effect
    VanillaTilt.init(document.querySelectorAll(".tech-item"), {
        max: 10,
        speed: 400,
        glare: true,
        "max-glare": 0.2,
    });

    initDarkMode();
    initTypingEffect();
    initScrollProgress();
    initSkillLevels();
    initContactValidation();
});

// Add some interactive effects
document.addEventListener('mousemove', function(e) {
    const shapes = document.querySelectorAll('.shape');
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;

    shapes.forEach(shape => {
        const shapeOffset = shape.getAttribute('data-offset') || 1;
        const x = (mouseX - 0.5) * 20 * shapeOffset;
        const y = (mouseY - 0.5) * 20 * shapeOffset;
        
        shape.style.transform = `translate(${x}px, ${y}px)`;
    });
});

// Add loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});

// Add dark mode functionality
function initDarkMode() {
    const darkModeToggle = document.createElement('button');
    darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    darkModeToggle.className = 'theme-toggle';
    document.body.appendChild(darkModeToggle);

    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const icon = darkModeToggle.querySelector('i');
        icon.classList.toggle('fa-moon');
        icon.classList.toggle('fa-sun');
        localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
    });

    // Check for saved dark mode preference
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
        darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
}

// Add typing animation to bio
function initTypingEffect() {
    const bioText = document.querySelector('.bio-section p:first-child');
    const originalText = bioText.textContent;
    bioText.textContent = '';
    let charIndex = 0;

    function typeText() {
        if (charIndex < originalText.length) {
            bioText.textContent += originalText.charAt(charIndex);
            charIndex++;
            setTimeout(typeText, 30);
        }
    }

    // Start typing when bio section is in view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                typeText();
                observer.unobserve(entry.target);
            }
        });
    });

    observer.observe(bioText);
}

// Add scroll progress indicator
function initScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (window.scrollY / windowHeight) * 100;
        progressBar.style.width = `${progress}%`;
    });
}

// Add skill level indicators
function initSkillLevels() {
    const techItems = document.querySelectorAll('.tech-item');
    techItems.forEach(item => {
        const skillLevel = document.createElement('div');
        skillLevel.className = 'skill-level';
        // Add random skill level for demonstration
        const level = Math.floor(Math.random() * 30) + 70; // 70-100%
        skillLevel.style.setProperty('--level', `${level}%`);
        item.appendChild(skillLevel);
    });
}

// Add contact form validation
function initContactValidation() {
    const form = document.getElementById('visitor-form');
    const nameInput = document.getElementById('visitorName');

    nameInput.addEventListener('input', (e) => {
        const value = e.target.value;
        if (value.length < 2) {
            nameInput.classList.add('invalid');
        } else {
            nameInput.classList.remove('invalid');
        }
    });
} 