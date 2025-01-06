document.addEventListener('DOMContentLoaded', () => {
    // Language switching
    const langSwitch = document.querySelector('.lang-switch');
    const langElements = document.querySelectorAll('[data-en][data-zh]');
    let currentLang = 'en';

    function toggleLanguage() {
        currentLang = currentLang === 'en' ? 'zh' : 'en';
        langSwitch.textContent = currentLang === 'en' ? '中文' : 'English';
        langSwitch.setAttribute('data-lang', currentLang);
        
        langElements.forEach(element => {
            element.textContent = element.getAttribute(`data-${currentLang}`);
        });
    }

    langSwitch.addEventListener('click', toggleLanguage);

    // Mobile menu toggle
    const navToggle = document.querySelector('.nav__toggle');
    const navLinks = document.querySelector('.nav__links');

    function toggleMenu() {
        navLinks.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    }

    navToggle.addEventListener('click', toggleMenu);

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navLinks.classList.contains('active') && 
            !navLinks.contains(e.target) && 
            !navToggle.contains(e.target)) {
            navLinks.classList.remove('active');
            document.body.classList.remove('menu-open');
        }
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                // Close mobile menu if open
                navLinks.classList.remove('active');
                document.body.classList.remove('menu-open');

                // Scroll to target
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Form handling
    const contactForm = document.querySelector('.contact__form');
    
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData.entries());
        
        // Basic validation
        for (let [key, value] of Object.entries(data)) {
            if (!value.trim()) {
                alert(`Please fill in the ${key} field`);
                return;
            }
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            alert('Please enter a valid email address');
            return;
        }

        // For now, just show success message
        // In production, this would send data to a server
        alert('Thank you for your message. We will contact you soon!');
        contactForm.reset();
    });

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all sections
    document.querySelectorAll('section').forEach(section => {
        section.classList.add('fade-in');
        observer.observe(section);
    });
});
