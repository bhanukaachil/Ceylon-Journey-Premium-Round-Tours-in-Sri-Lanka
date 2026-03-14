// script.js - Form handling via AJAX
document.addEventListener('DOMContentLoaded', () => {
    const travelPlanForm = document.getElementById('travelPlanForm');
    const formMessage = document.getElementById('formMessage');

    if (travelPlanForm) {
        travelPlanForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const formData = new FormData(this);

            // Fetch request for process.php
            fetch(this.action, {
                method: 'POST',
                body: formData
            })
                .then(response => response.text())
                .then(data => {
                    formMessage.innerHTML = `<div class="alert alert-success py-2 small border-0">${data}</div>`;
                    this.reset();
                    setTimeout(() => { formMessage.innerHTML = ''; }, 5000);
                })
                .catch(error => {
                    formMessage.innerHTML = `<div class="alert alert-danger py-2 small border-0">Form submission failed.</div>`;
                });
        });
    }
});
