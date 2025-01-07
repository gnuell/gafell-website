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

// Form handling with reCAPTCHA v3
document.querySelector('.contact__form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const submitButton = document.getElementById('submit-button');
    const currentText = submitButton.textContent;
    
    submitButton.disabled = true;
    submitButton.textContent = currentText === '發送訊息' ? '發送中...' : 'Sending...';

    try {
        // Execute reCAPTCHA with form submit action
        const token = await grecaptcha.execute('6LdSdq8qAAAAABgTDGLPePsCVOva-M4lOyDoZyz4', {action: 'submit'});
        
        // Add the token to the form
        document.getElementById('g-recaptcha-response').value = token;
        
        const form = event.target;
        const formData = new FormData(form);

        const response = await fetch(form.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });

        if (response.ok) {
            form.reset();
            submitButton.textContent = currentText === '發送訊息' ? '訊息已發送！' : 'Message Sent!';
            setTimeout(() => {
                submitButton.textContent = currentText;
                submitButton.disabled = false;
            }, 3000);
        } else {
            throw new Error('Form submission failed');
        }
    } catch (error) {
        submitButton.textContent = currentText === '發送訊息' ? '發送失敗！' : 'Error! Try Again';
        submitButton.disabled = false;
        setTimeout(() => {
            submitButton.textContent = currentText;
        }, 3000);
    }
});
