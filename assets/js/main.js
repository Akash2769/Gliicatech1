/* ================================================================
   GLIICATECH — MASTER JAVASCRIPT
   Handles: navbar scroll, mobile menu, smooth scroll,
            EmailJS contact form, service worker
   ================================================================ */

(function () {
  'use strict';

  /* ── 1. NAVBAR SCROLL BEHAVIOUR ─────────────────────────────── */
  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 40);
    }, { passive: true });
  }

  /* ── 2. MOBILE MENU TOGGLE ───────────────────────────────────── */
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const mobileMenu   = document.getElementById('mobileMenu');
  if (hamburgerBtn && mobileMenu) {
    hamburgerBtn.addEventListener('click', () => {
      const open = mobileMenu.classList.toggle('open');
      hamburgerBtn.setAttribute('aria-expanded', String(open));
    });
    // Close on any link click
    mobileMenu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        hamburgerBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ── 3. SMOOTH SCROLL FOR HASH LINKS ────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ── 4. EMAILJS CONTACT FORM ─────────────────────────────────── */
  window.addEventListener('load', () => {
    if (typeof emailjs === 'undefined') return;

    emailjs.init({ publicKey: '5g8Q-MDz-81GVpQvj' });

    const form = document.getElementById('contactForm');
    const msg  = document.getElementById('formMessage');
    if (!form) return;

    form.addEventListener('submit', e => {
      e.preventDefault();
      const submitBtn = form.querySelector('button[type="submit"]');
      submitBtn.textContent = 'Sending…';
      submitBtn.disabled = true;

      emailjs.send('service_5gdt4a6', 'template_3c9bvvf', {
        name:    form.name.value,
        email:   form.email.value,
        phone:   form.phone.value,
        subject: form.subject.value,
        message: form.message.value,
      }).then(() => {
        msg.textContent  = '✅ Message sent! We\'ll be in touch within 24 hours.';
        msg.style.color  = '#16a34a';
        form.reset();
        submitBtn.textContent = 'Send Message';
        submitBtn.disabled    = false;
      }, () => {
        msg.textContent  = '❌ Failed to send. Please call us directly at +91 9112232075.';
        msg.style.color  = '#dc2626';
        submitBtn.textContent = 'Send Message';
        submitBtn.disabled    = false;
      });
    });
  });

  /* ── 5. SERVICE WORKER ───────────────────────────────────────── */
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('assets/js/sw.js');
  }

})();
