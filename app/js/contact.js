document.addEventListener('DOMContentLoaded', () => {
  updateCartBadge();

  const form = document.getElementById('contact-form');
  const successBanner = document.getElementById('form-success');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    // BUG: message field is never read. The form "succeeds" even if the
    // message textarea is completely empty. There is no validation on it,
    // and its value is never captured or sent anywhere.
    // A user filling out name + email but leaving message blank gets a
    // success response with no indication that their message wasn't sent.

    if (!name || !email) {
      return; // basic validation only covers name and email
    }

    // Simulate a network request
    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    setTimeout(() => {
      form.classList.add('hidden');
      successBanner.classList.remove('hidden');
    }, 800);
  });
});
