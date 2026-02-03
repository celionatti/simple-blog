/**
 * ============================================================================
 * PORTFOLIO - Interactivity & Professional Logic
 * ============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {

    // --- Page Loader Logic ---
    const loader = document.getElementById('loader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.classList.add('fade-out');
        }, 1000); // Small delay for aesthetic purposes
    });


    // --- Dark/Light Mode Toggle Logic ---
    const themeToggle = document.getElementById('theme-toggle');
    const root = document.documentElement;

    themeToggle.addEventListener('click', () => {
        const currentTheme = root.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        root.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });


    // --- Scroll Reveal Animation ---
    const revealCallback = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    };

    const revealOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver(revealCallback, revealOptions);
    const revealElements = document.querySelectorAll('.reveal-up, section');
    revealElements.forEach(el => revealObserver.observe(el));


    // --- Smooth Scrolling ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const headerOffset = 100;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });


    // --- Active Section Tracking ---
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.mobile-nav-item');

    const activeObserverOptions = {
        threshold: 0.4,
        rootMargin: "-10% 0px -10% 0px"
    };

    const activeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navItems.forEach(item => {
                    item.classList.toggle('active', item.getAttribute('data-section') === id);
                });
            }
        });
    }, activeObserverOptions);

    sections.forEach(section => activeObserver.observe(section));


    // --- Header Background Transition ---
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.padding = '0.8rem 0';
            header.style.boxShadow = '0 10px 30px rgba(0,0,0,0.05)';
        } else {
            header.style.padding = '1.5rem 0';
            header.style.boxShadow = 'none';
        }
    });


    // --- Magnetic Hover Effect (Refined) ---
    const interactables = document.querySelectorAll('.btn, .nav-cv, .theme-toggle');
    interactables.forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            el.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
        });

        el.addEventListener('mouseleave', () => {
            el.style.transform = `translate(0px, 0px)`;
        });
    });

});
