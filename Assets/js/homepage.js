/* =========================================================
   homepage.js — Ceylon Journey Homepage Premium Interactions
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

    // 1. Scroll Reveal Animation System
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { 
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));


    // 2. Navbar Dynamic Styling on Scroll
    const navbar = document.querySelector('.custom-navbar');
    const handleNavbarScroll = () => {
        if (window.scrollY > 60) {
            navbar.classList.add('navbar-scrolled');
            // Adding frosted effect via JS if not in CSS
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
            navbar.style.backdropFilter = 'blur(15px)';
            navbar.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
        } else {
            navbar.classList.remove('navbar-scrolled');
            navbar.style.backgroundColor = 'white';
            navbar.style.backdropFilter = 'none';
            navbar.style.boxShadow = 'none';
        }
    };

    window.addEventListener('scroll', handleNavbarScroll);
    handleNavbarScroll(); // Initial check

    // 3. Hero Carousel Interactive Controls
    const heroCarouselEl = document.getElementById('heroBannerCarousel');
    if (heroCarouselEl) {
        const heroCarousel = new bootstrap.Carousel(heroCarouselEl, {
            interval: 5000,
            pause: 'hover'
        });

        // Add progress bar if needed in future
    }

    // 4. Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const navHeight = document.querySelector('.custom-navbar').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 5. 3D Tilt Effect for Package Cards
    const cards = document.querySelectorAll('.hp-package-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            if (window.innerWidth < 992) return; // Disable on tablets/phones

            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });

    // 6. Interactive "Create Your Own Tour" Pulse
    const ctaButton = document.querySelector('.hp-btn-hover-pulse');
    if (ctaButton) {
        // Simple logic to ensure pulse starts after page load reveal
        setTimeout(() => {
            ctaButton.classList.add('pulse-active');
        }, 2000);
    }

    // 7. Counter Animation for Experience Card
    const counterEl = document.querySelector('.experience-card h4');
    if (counterEl) {
        let count = 0;
        const target = parseInt(counterEl.innerText);
        const updateCounter = () => {
            const step = Math.ceil(target / 50);
            if (count < target) {
                count += step;
                if (count > target) count = target;
                counterEl.innerText = count + '+';
                setTimeout(updateCounter, 30);
            }
        };

        const counterObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                updateCounter();
                counterObserver.unobserve(counterEl);
            }
        }, { threshold: 1 });
        
        counterObserver.observe(counterEl);
    }

});
