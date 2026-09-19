(function () {
  'use strict';
  const form = document.getElementById('newsletter-form');
  const email = document.getElementById('newsletter-email');
  const status = document.getElementById('newsletter-status');
  document.getElementById('newsletter-submit').disabled = false;
  email.addEventListener('input', () => {status.textContent = '';});
  form.addEventListener('submit', event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    status.textContent = 'Email format validated. Demo only: no subscription was created and no email was sent.';
  });
}());
