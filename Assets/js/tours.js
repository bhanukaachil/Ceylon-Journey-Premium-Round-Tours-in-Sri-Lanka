/* =========================================================
   tours.js — Ceylon Journey Tours Page JavaScript
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

    // -----------------------------------------------------------
    // 1.  SCROLL REVEAL
    // -----------------------------------------------------------
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));


    // -----------------------------------------------------------
    // 2.  STICKY NAVBAR — frosted-glass on scroll
    // -----------------------------------------------------------
    const navbar = document.getElementById('toursNavbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 60) {
                navbar.style.boxShadow    = '0 4px 20px rgba(0,0,0,0.10)';
                navbar.style.background   = 'rgba(255,255,255,0.96)';
                navbar.style.backdropFilter = 'blur(10px)';
            } else {
                navbar.style.boxShadow    = '';
                navbar.style.background   = '';
                navbar.style.backdropFilter = '';
            }
        }, { passive: true });
    }


    // -----------------------------------------------------------
    // 3.  SMOOTH ANCHOR SCROLLING
    // -----------------------------------------------------------
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });


    // -----------------------------------------------------------
    // 4.  QUICK-SELECT CHIPS — append value to linked textarea
    // -----------------------------------------------------------
    document.querySelectorAll('.tours-chip').forEach(chip => {
        chip.addEventListener('click', () => {
            const targetId = chip.dataset.target;
            const value    = chip.dataset.value;
            const textarea = document.getElementById(targetId);

            chip.classList.toggle('selected');

            if (textarea) {
                // Rebuild textarea content from all selected chips for this target
                const allChips = document.querySelectorAll(`.tours-chip[data-target="${targetId}"]`);
                const selected = [];
                allChips.forEach(c => { if (c.classList.contains('selected')) selected.push(c.dataset.value); });
                // Keep any manually typed content that isn't a chip value
                const manual = textarea.value
                    .split(',')
                    .map(v => v.trim())
                    .filter(v => v && !Array.from(allChips).map(c => c.dataset.value).includes(v));
                const combined = [...selected, ...manual].join(', ');
                textarea.value = combined;
                textarea.dispatchEvent(new Event('input'));
            }
        });
    });


    // -----------------------------------------------------------
    // 5.  TRAVEL STYLE CARD SELECTION
    // -----------------------------------------------------------
    document.querySelectorAll('.tours-style-card').forEach(card => {
        const radio = card.querySelector('input[type="radio"]');
        card.addEventListener('click', () => {
            // Remove selected from all
            document.querySelectorAll('.tours-style-card').forEach(c => c.classList.remove('selected'));
            card.classList.add('selected');
            if (radio) radio.checked = true;
        });
    });


    // -----------------------------------------------------------
    // 6.  FORM VALIDATION & SUBMISSION
    // -----------------------------------------------------------
    const form       = document.getElementById('createTourForm');
    const submitBtn  = document.getElementById('submitTourBtn');
    const formResult = document.getElementById('formResult');

    // Fields that require validation
    const requiredFields = [
        { id: 'fullName',     errId: 'err-fullName',     msg: 'Please enter your full name.' },
        { id: 'whatsapp',     errId: 'err-whatsapp',     msg: 'Please enter a valid WhatsApp number.' },
        { id: 'guests',       errId: 'err-guests',       msg: 'Please enter the number of guests (min 1).' },
        { id: 'arrivalDate',  errId: 'err-arrivalDate',  msg: 'Please select your arrival date.' },
        { id: 'numDays',      errId: 'err-numDays',      msg: 'Please enter the number of days (min 1).' },
        { id: 'destinations', errId: 'err-destinations', msg: 'Please list the destinations you\'d like to visit.' },
        { id: 'activities',   errId: 'err-activities',   msg: 'Please describe the activities you\'re interested in.' },
    ];

    // Live validation — mark success on blur after value entered
    requiredFields.forEach(({ id }) => {
        const el = document.getElementById(id);
        if (!el) return;
        el.addEventListener('blur', () => validateField(id));
        el.addEventListener('input', () => {
            if (el.value.trim()) clearError(id);
        });
    });

    function validateField(id) {
        const el    = document.getElementById(id);
        const field = requiredFields.find(f => f.id === id);
        if (!el || !field) return true;

        if (!el.value.trim()) {
            showError(id, field.msg);
            return false;
        } else {
            clearError(id);
            return true;
        }
    }

    function showError(id, msg) {
        const el    = document.getElementById(id);
        const errEl = document.getElementById(`err-${id}`);
        if (el)    el.classList.add('is-error'),    el.classList.remove('is-success');
        if (errEl) { errEl.textContent = msg; errEl.classList.add('visible'); }
    }

    function clearError(id) {
        const el    = document.getElementById(id);
        const errEl = document.getElementById(`err-${id}`);
        if (el)    el.classList.remove('is-error'), el.classList.add('is-success');
        if (errEl) errEl.classList.remove('visible');
    }

    // Validate arrival date >= today
    function validateDate() {
        const dateEl = document.getElementById('arrivalDate');
        if (!dateEl || !dateEl.value) return;
        const today    = new Date(); today.setHours(0,0,0,0);
        const selected = new Date(dateEl.value);
        if (selected < today) {
            showError('arrivalDate', 'Arrival date must be today or a future date.');
            return false;
        }
        clearError('arrivalDate');
        return true;
    }
    document.getElementById('arrivalDate')?.addEventListener('change', validateDate);

    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();

            // Run all validations
            let isValid = true;
            requiredFields.forEach(({ id }) => {
                if (!validateField(id)) isValid = false;
            });
            if (!validateDate()) isValid = false;

            if (!isValid) {
                // Scroll to first error
                const firstError = form.querySelector('.tours-input.is-error');
                if (firstError) firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                return;
            }

            // ---- Show loading state ----
            submitBtn.classList.add('loading');
            submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin me-2"></i>Sending…';

            // Simulate submission (replace with real fetch to process.php)
            setTimeout(() => {
                submitBtn.classList.remove('loading');
                submitBtn.innerHTML = '<i class="fa-solid fa-paper-plane me-2"></i>Submit My Tour Request';

                formResult.innerHTML = `
                    <div class="alert alert-success d-flex align-items-start gap-3">
                        <i class="fa-solid fa-circle-check fa-lg mt-1 text-success"></i>
                        <div>
                            <strong>Thank you! Your tour request has been received.</strong><br>
                            <span class="text-muted small">Our team will contact you via WhatsApp within 24 hours with a personalised itinerary. 🌴</span>
                        </div>
                    </div>
                `;
                form.reset();
                // Clear all chip selections
                document.querySelectorAll('.tours-chip.selected').forEach(c => c.classList.remove('selected'));
                // Clear all style card selections
                document.querySelectorAll('.tours-style-card.selected').forEach(c => c.classList.remove('selected'));
                // Clear all success states
                document.querySelectorAll('.tours-input.is-success').forEach(i => i.classList.remove('is-success'));
                // Scroll to result
                formResult.scrollIntoView({ behavior: 'smooth', block: 'center' });
                setTimeout(() => { formResult.innerHTML = ''; }, 8000);

            }, 1800);

            /* ---- Real fetch (uncomment when process.php is ready) ----
            const formData = new FormData(this);
            fetch(this.action, { method: 'POST', body: formData })
                .then(res => res.text())
                .then(data => {
                    submitBtn.classList.remove('loading');
                    submitBtn.innerHTML = '<i class="fa-solid fa-paper-plane me-2"></i>Submit My Tour Request';
                    formResult.innerHTML = `<div class="alert alert-success">${data}</div>`;
                    form.reset();
                })
                .catch(() => {
                    submitBtn.classList.remove('loading');
                    submitBtn.innerHTML = '<i class="fa-solid fa-paper-plane me-2"></i>Submit My Tour Request';
                    formResult.innerHTML = `<div class="alert alert-danger">Something went wrong. Please try again.</div>`;
                });
            */
        });
    }


    // -----------------------------------------------------------
    // 7.  RESET BUTTON — also clear chips & cards
    // -----------------------------------------------------------
    document.getElementById('resetFormBtn')?.addEventListener('click', () => {
        document.querySelectorAll('.tours-chip.selected').forEach(c => c.classList.remove('selected'));
        document.querySelectorAll('.tours-style-card.selected').forEach(c => c.classList.remove('selected'));
        document.querySelectorAll('.tours-input').forEach(el => {
            el.classList.remove('is-error', 'is-success');
        });
        document.querySelectorAll('.tours-error.visible').forEach(e => e.classList.remove('visible'));
        if (formResult) formResult.innerHTML = '';
    });


    // -----------------------------------------------------------
    // 8.  DATE INPUT — set minimum to today
    // -----------------------------------------------------------
    const arrivalInput = document.getElementById('arrivalDate');
    if (arrivalInput) {
        const today = new Date();
        const yyyy  = today.getFullYear();
        const mm    = String(today.getMonth() + 1).padStart(2, '0');
        const dd    = String(today.getDate()).padStart(2, '0');
        arrivalInput.min = `${yyyy}-${mm}-${dd}`;
    }


    // -----------------------------------------------------------
    // 9.  WHY-CARD HOVER TILT
    // -----------------------------------------------------------
    document.querySelectorAll('.tours-why-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const dx   = (e.clientX - rect.left - rect.width  / 2) / (rect.width  / 2);
            const dy   = (e.clientY - rect.top  - rect.height / 2) / (rect.height / 2);
            card.style.transform  = `perspective(800px) rotateY(${dx * 4}deg) rotateX(${-dy * 4}deg) translateY(-8px)`;
            card.style.transition = 'transform 0.1s ease';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform  = '';
            card.style.transition = 'transform 0.45s ease, box-shadow 0.35s ease';
        });
    });

});
