// Mobile menu toggle
const mobileToggle = document.getElementById('mobileToggle');
const navMenu = document.getElementById('navMenu');

if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        const icon = mobileToggle.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
    });
}

document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        if (mobileToggle) {
            const icon = mobileToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
});

// Hero Slider
class HeroSlider {
    constructor() {
        this.slides = document.querySelectorAll('.slide');
        this.dotsContainer = document.querySelector('.slider-dots');
        this.prevBtn = document.querySelector('.prev');
        this.nextBtn = document.querySelector('.next');
        this.current = 0;
        this.total = this.slides.length;
        if(this.slides.length > 0) {
            this.initDots();
            this.initEvents();
            this.startAutoPlay();
        }
    }

    initDots() {
        this.slides.forEach((_, i) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => this.goToSlide(i));
            this.dotsContainer.appendChild(dot);
        });
        this.dots = document.querySelectorAll('.dot');
    }

    goToSlide(index) {
        this.slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
            if (this.dots) this.dots[i].classList.toggle('active', i === index);
        });
        this.current = index;
        this.resetAutoPlay();
    }

    next() { this.goToSlide((this.current + 1) % this.total); }
    prev() { this.goToSlide((this.current - 1 + this.total) % this.total); }

    initEvents() {
        if (this.prevBtn) this.prevBtn.addEventListener('click', () => this.prev());
        if (this.nextBtn) this.nextBtn.addEventListener('click', () => this.next());
    }

    startAutoPlay() { this.interval = setInterval(() => this.next(), 5000); }
    resetAutoPlay() { clearInterval(this.interval); this.startAutoPlay(); }
}

// Counter Animation
const counters = document.querySelectorAll('.stat-number');

const startCounter = (counter) => {
    const target = parseInt(counter.getAttribute('data-target'));
    let current = 0;
    const increment = target / 50;
    const updateCounter = () => {
        current += increment;
        if (current < target) {
            counter.innerText = Math.ceil(current);
            setTimeout(updateCounter, 25);
        } else {
            counter.innerText = target;
        }
    };
    updateCounter();
};

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            startCounter(entry.target);
            counterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

counters.forEach(counter => counterObserver.observe(counter));

// Scroll Animations for Mapped Sections
const animateElements = document.querySelectorAll('.service-card, .vision-card, .mission-card, .split-text, .split-img, .gallery-item');
const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('reveal');
    });
}, { threshold: 0.15 });

animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(25px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    scrollObserver.observe(el);
});

const style = document.createElement('style');
style.textContent = '.reveal { opacity: 1 !important; transform: translateY(0) !important; }';
document.head.appendChild(style);

document.addEventListener('DOMContentLoaded', () => {
    new HeroSlider();
});