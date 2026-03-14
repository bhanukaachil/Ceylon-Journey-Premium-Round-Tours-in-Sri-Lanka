/* =========================================================
   gallery.js — Ceylon Journey Improved Gallery Logic
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

    // 1. Scroll Reveal Animation
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { 
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));


    // 2. Lightbox Functionality
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');

    // Global function to open lightbox (called from HTML)
    window.openLightbox = (src) => {
        if (!lightbox || !lightboxImg) return;
        
        lightboxImg.src = src;
        lightbox.style.display = 'flex';
        lightbox.style.alignItems = 'center';
        lightbox.style.justifyContent = 'center';
        
        // Prevent background scrolling
        document.body.style.overflow = 'hidden';
    };

    // Close lightbox when clicking outside the image
    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target !== lightboxImg) {
                lightbox.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }


    // 3. Filter Tab Interactions (Mock logic for premium feel)
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active state
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Add a quick refresh animation to the grid
            const grid = document.querySelector('.gallery-grid');
            if (grid) {
                grid.style.opacity = '0';
                grid.style.transform = 'translateY(10px)';
                
                setTimeout(() => {
                    grid.style.transition = 'all 0.5s ease';
                    grid.style.opacity = '1';
                    grid.style.transform = 'translateY(0)';
                }, 300);
            }
        });
    });


    // 4. Preloader Logic
    const preloader = document.getElementById('preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                preloader.style.opacity = '0';
                setTimeout(() => {
                    preloader.style.display = 'none';
                }, 500);
            }, 500);
        });
    }

});
