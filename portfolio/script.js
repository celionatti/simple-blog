/**
 * ============================================================================
 * PORTFOLIO - Interactivity & Animations
 * ============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {

    // --- Scroll Reveal Animation ---
    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // stop observing once it's visible if you only want it to reveal once
                // observer.unobserve(entry.target);
            }
        });
    };

    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver(revealCallback, revealOptions);

    const revealElements = document.querySelectorAll('.reveal-up, section');
    revealElements.forEach(el => observer.observe(el));


    // --- Smooth Scrolling for Navigation ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100, // Offset for fixed header
                    behavior: 'smooth'
                });
            }
        });
    });


    // --- Header Background Transition on Scroll ---
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.padding = '1rem 0';
            header.style.boxShadow = '0 10px 30px oklch(0% 0 0 / 0.05)';
        } else {
            header.style.padding = '1.5rem 0';
            header.style.boxShadow = 'none';
        }
    });


    // --- Magnetic Hover Effect for Buttons (Subtle) ---
    const btns = document.querySelectorAll('.btn');
    btns.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = `translate(0px, 0px)`;
        });
    });


    // --- Active Section Tracking for Navigation ---
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.mobile-nav-item');

    const activeObserverOptions = {
        threshold: 0.3,
        rootMargin: "-20% 0px -20% 0px"
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

});
