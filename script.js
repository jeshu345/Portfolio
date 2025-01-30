const phrases = [
    'Machine Learning Expert',
	'Data Analytics Specialist',
	'AI Developer',
	'Cloud Computing',
	'Real-Time Problem Solver'
];

class TypingAnimation {
    constructor(elementId, phrases, options = {}) {
        this.element = document.getElementById(elementId);
        this.phrases = phrases;
        this.phraseIndex = 0;
        this.charIndex = 0;
        this.isDeleting = false;
        this.isWaiting = false;
        
        // Animation speeds
        this.typeSpeed = options.typeSpeed || 80;
        this.deleteSpeed = options.deleteSpeed || 40;
        this.pauseTime = options.pauseTime || 1500;
    }

    type() {
        const currentPhrase = this.phrases[this.phraseIndex];
        
        if (!this.isDeleting && this.charIndex <= currentPhrase.length) {
            // Typing forward
            this.element.textContent = currentPhrase.substring(0, this.charIndex);
            this.charIndex++;
            
            // Random speed variation for more natural typing
            const speedVariation = Math.random() * 50 - 25;
            setTimeout(() => this.type(), this.typeSpeed + speedVariation);
        } else if (this.isDeleting && this.charIndex >= 0) {
            // Deleting
            this.element.textContent = currentPhrase.substring(0, this.charIndex);
            this.charIndex--;
            setTimeout(() => this.type(), this.deleteSpeed);
        } else if (!this.isWaiting) {
            // Pause between phrases
            this.isWaiting = true;
            setTimeout(() => {
                this.isDeleting = !this.isDeleting;
                if (!this.isDeleting) {
                    this.phraseIndex = (this.phraseIndex + 1) % this.phrases.length;
                }
                this.isWaiting = false;
                this.type();
            }, this.pauseTime);
        }
    }

    start() {
        this.type();
    }
}

// Initialize the animation when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const typingAnimation = new TypingAnimation('dynamic-text', phrases, {
        typeSpeed: 80,
        deleteSpeed: 40,
        pauseTime: 1500
    });
    typingAnimation.start();
});


document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        const loader = document.querySelector('.loading-screen');
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }, 2000);
});


document.getElementById('navToggle').addEventListener('click', () => {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    const isExpanded = navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
    navToggle.setAttribute('aria-expanded', isExpanded);
});

// Close menu when clicking a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        const navToggle = document.getElementById('navToggle');
        const navMenu = document.getElementById('navMenu');
        
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
    }
});

// Close menu with escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const navToggle = document.getElementById('navToggle');
        const navMenu = document.getElementById('navMenu');
        
        if (navMenu.classList.contains('active')) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
        }
    }
});
