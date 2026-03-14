/* =========================================================
   about.js — Ceylon Journey About Page JavaScript
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

    // -----------------------------------------------------------
    // 1.  SCROLL REVEAL ANIMATION
    // -----------------------------------------------------------
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // unobserve after animate to improve performance
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));


    // -----------------------------------------------------------
    // 2.  ANIMATED STAT COUNTER
    // -----------------------------------------------------------
    const countObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                countObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.stat-number').forEach(el => countObserver.observe(el));

    function animateCounter(el) {
        const target = parseInt(el.getAttribute('data-target'), 10);
        const duration = 1800;
        const step = target / (duration / 16);
        let current = 0;

        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                el.textContent = target;
                clearInterval(timer);
            } else {
                el.textContent = Math.floor(current);
            }
        }, 16);
    }


    // -----------------------------------------------------------
    // 3.  STICKY NAVBAR SCROLL EFFECT
    // -----------------------------------------------------------
    const navbar = document.querySelector('.custom-navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 60) {
                navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.12)';
                navbar.style.background = 'rgba(255,255,255,0.96)';
                navbar.style.backdropFilter = 'blur(10px)';
            } else {
                navbar.style.boxShadow = '';
                navbar.style.background = '';
                navbar.style.backdropFilter = '';
            }
        }, { passive: true });
    }


    // -----------------------------------------------------------
    // 4.  SMOOTH ANCHOR SCROLL  (#who-we-are etc.)
    // -----------------------------------------------------------
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });


    // -----------------------------------------------------------
    // 5.  FLEET CARD: LIGHT TILT ON MOUSE MOVE
    // -----------------------------------------------------------
    document.querySelectorAll('.fleet-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect   = card.getBoundingClientRect();
            const cx     = rect.left + rect.width / 2;
            const cy     = rect.top  + rect.height / 2;
            const dx     = (e.clientX - cx) / (rect.width / 2);
            const dy     = (e.clientY - cy) / (rect.height / 2);
            card.style.transform = `perspective(800px) rotateY(${dx * 4}deg) rotateX(${-dy * 4}deg) translateY(-8px)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
            card.style.transition = 'transform 0.45s ease, box-shadow 0.35s ease';
        });
    });


    // -----------------------------------------------------------
    // 6.  SCROLL-INDICATOR HIDE ON SCROLL
    // -----------------------------------------------------------
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        window.addEventListener('scroll', () => {
            scrollIndicator.style.opacity = window.scrollY > 100 ? '0' : '1';
        }, { passive: true });
    }

});
