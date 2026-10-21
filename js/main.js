/**
 * 404 Cinema
 * Group: SE-2507
 * Authors:
 *   - Umarov Diyar
 *   - Aibek Mukhat
 *   - Anuar Muratbay
 */

document.addEventListener('DOMContentLoaded', () => {

  // Live Clock
  const clockElement = document.getElementById('clockText');

  function updateClock() {
    if (!clockElement) return;

    const now = new Date();

    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    };

    const formattedDateTime = now.toLocaleDateString('en-US', options);
    clockElement.textContent = formattedDateTime;
  }

  updateClock();
  setInterval(updateClock, 1000);


  // Background Color Theme Switcher
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const themeNameLabel = document.getElementById('themeNameLabel');

  const cinemaThemes = [
    { name: "Obsidian Dark", bg: "#121316", surface: "#1a1c23" },
    { name: "Velvet Cinema", bg: "#1d0e17", surface: "#291421" },
    { name: "Deep IMAX Navy", bg: "#0c1728", surface: "#122038" },
    { name: "Emerald Hall",  bg: "#0a1914", surface: "#10251e" },
    { name: "Vintage Noir",   bg: "#18181b", surface: "#27272a" }
  ];

  let currentThemeIndex = 0;

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      currentThemeIndex = (currentThemeIndex + 1) % cinemaThemes.length;
      const theme = cinemaThemes[currentThemeIndex];

      document.body.style.backgroundColor = theme.bg;
      document.documentElement.style.setProperty('--cinema-bg', theme.bg);
      document.documentElement.style.setProperty('--cinema-surface', theme.surface);

      document.body.style.transition = 'background-color 0.4s ease';

      if (themeNameLabel) {
        themeNameLabel.textContent = theme.name;
      }
    });
  }


  // FAQ Accordion
  const accordionHeaders = document.querySelectorAll('.cinema-accordion-header');

  accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const item = header.parentElement;
      const body = item.querySelector('.cinema-accordion-body');
      const icon = header.querySelector('.accordion-icon');
      const isOpen = item.classList.contains('active');

      document.querySelectorAll('.cinema-accordion-item').forEach(otherItem => {
        if (otherItem !== item && otherItem.classList.contains('active')) {
          otherItem.classList.remove('active');
          const otherBody = otherItem.querySelector('.cinema-accordion-body');
          if (otherBody) otherBody.style.maxHeight = null;
          const otherIcon = otherItem.querySelector('.accordion-icon');
          if (otherIcon) otherIcon.style.transform = 'rotate(0deg)';
        }
      });

      if (isOpen) {
        item.classList.remove('active');
        body.style.maxHeight = null;
        if (icon) icon.style.transform = 'rotate(0deg)';
      } else {
        item.classList.add('active');
        body.style.maxHeight = body.scrollHeight + 'px';
        if (icon) icon.style.transform = 'rotate(180deg)';
      }
    });
  });


  // Popup Modal
  const modalOverlay = document.getElementById('cinemaModal');
  const openModalBtns = document.querySelectorAll('.js-open-modal');
  const closeModalBtn = document.getElementById('closeModalBtn');

  function openModal() {
    if (!modalOverlay) return;
    modalOverlay.classList.add('show');
    modalOverlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    if (!modalOverlay) return;
    modalOverlay.classList.remove('show');
    modalOverlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  openModalBtns.forEach(btn => btn.addEventListener('click', (e) => {
    e.preventDefault();
    openModal();
  }));

  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', closeModal);
  }

  if (modalOverlay) {
    modalOverlay.addEventListener('click', (event) => {
      if (event.target === modalOverlay) {
        closeModal();
      }
    });
  }

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modalOverlay && modalOverlay.classList.contains('show')) {
      closeModal();
    }
  });


  // VIP Club Registration Form Validation
  const clubForm = document.getElementById('clubRegistrationForm');

  if (clubForm) {
    const nameInput = document.getElementById('regName');
    const emailInput = document.getElementById('regEmail');
    const passwordInput = document.getElementById('regPassword');
    const confirmPasswordInput = document.getElementById('regConfirmPassword');
    const termsInput = document.getElementById('regTerms');
    const formAlert = document.getElementById('formSuccessAlert');

    function setError(input, message) {
      input.classList.remove('is-valid');
      input.classList.add('is-invalid');
      const errorDiv = input.parentElement.querySelector('.invalid-feedback') 
                    || input.closest('.form-check')?.querySelector('.invalid-feedback');
      if (errorDiv) {
        errorDiv.textContent = message;
      }
    }

    function setSuccess(input) {
      input.classList.remove('is-invalid');
      input.classList.add('is-valid');
      const errorDiv = input.parentElement.querySelector('.invalid-feedback')
                    || input.closest('.form-check')?.querySelector('.invalid-feedback');
      if (errorDiv) {
        errorDiv.textContent = '';
      }
    }

    function validateName() {
      const value = nameInput.value.trim();
      if (value === '') {
        setError(nameInput, 'Full name is required.');
        return false;
      } else if (value.length < 3) {
        setError(nameInput, 'Name must be at least 3 characters.');
        return false;
      }
      setSuccess(nameInput);
      return true;
    }

    function validateEmail() {
      const value = emailInput.value.trim();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (value === '') {
        setError(emailInput, 'Email address is required.');
        return false;
      } else if (!emailRegex.test(value)) {
        setError(emailInput, 'Please enter a valid email (e.g. name@domain.com).');
        return false;
      }
      setSuccess(emailInput);
      return true;
    }

    function validatePassword() {
      const value = passwordInput.value;
      if (value === '') {
        setError(passwordInput, 'Password is required.');
        return false;
      } else if (value.length < 8) {
        setError(passwordInput, 'Password must be at least 8 characters long.');
        return false;
      }
      setSuccess(passwordInput);

      if (confirmPasswordInput.value.length > 0) {
        validateConfirmPassword();
      }
      return true;
    }

    function validateConfirmPassword() {
      const password = passwordInput.value;
      const confirm = confirmPasswordInput.value;
      if (confirm === '') {
        setError(confirmPasswordInput, 'Please confirm your password.');
        return false;
      } else if (confirm !== password) {
        setError(confirmPasswordInput, 'Passwords do not match.');
        return false;
      }
      setSuccess(confirmPasswordInput);
      return true;
    }

    function validateTerms() {
      if (!termsInput.checked) {
        setError(termsInput, 'You must accept the terms to continue.');
        return false;
      }
      setSuccess(termsInput);
      return true;
    }

    nameInput.addEventListener('input', validateName);
    emailInput.addEventListener('input', validateEmail);
    passwordInput.addEventListener('input', validatePassword);
    confirmPasswordInput.addEventListener('input', validateConfirmPassword);
    termsInput.addEventListener('change', validateTerms);

    clubForm.addEventListener('submit', (event) => {
      event.preventDefault();

      const isNameValid = validateName();
      const isEmailValid = validateEmail();
      const isPasswordValid = validatePassword();
      const isConfirmValid = validateConfirmPassword();
      const isTermsValid = validateTerms();

      if (isNameValid && isEmailValid && isPasswordValid && isConfirmValid && isTermsValid) {
        if (formAlert) {
          formAlert.classList.remove('d-none');
          formAlert.textContent = `🎉 Welcome, ${nameInput.value.trim()}! Your VIP Club membership is registered. Check your email for confirmation.`;
        }

        setTimeout(() => {
          clubForm.reset();
          [nameInput, emailInput, passwordInput, confirmPasswordInput, termsInput].forEach(input => {
            input.classList.remove('is-valid');
          });
        }, 1500);
      }
    });
  }

  // Booking Form Validation
  const bookingForm = document.getElementById('booking-form');
  if (bookingForm) {
    const bName = document.getElementById('fullname');
    const bEmail = document.getElementById('email');
    const bMovie = document.getElementById('movie');
    const bTerms = document.getElementById('termsCheck');

    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!bName.value.trim() || bName.value.trim().length < 3) {
        bName.classList.add('is-invalid');
        isValid = false;
      } else {
        bName.classList.remove('is-invalid');
        bName.classList.add('is-valid');
      }

      if (!bEmail.value.trim() || !emailRegex.test(bEmail.value.trim())) {
        bEmail.classList.add('is-invalid');
        isValid = false;
      } else {
        bEmail.classList.remove('is-invalid');
        bEmail.classList.add('is-valid');
      }

      if (!bMovie.value) {
        bMovie.classList.add('is-invalid');
        isValid = false;
      } else {
        bMovie.classList.remove('is-invalid');
        bMovie.classList.add('is-valid');
      }

      if (!bTerms.checked) {
        bTerms.classList.add('is-invalid');
        isValid = false;
      } else {
        bTerms.classList.remove('is-invalid');
      }

      if (isValid) {
        let alertBox = document.getElementById('bookingSuccessAlert');
        if (!alertBox) {
          alertBox = document.createElement('div');
          alertBox.id = 'bookingSuccessAlert';
          alertBox.className = 'alert alert-success alert-dismissible fade show mt-3';
          alertBox.role = 'alert';
          bookingForm.prepend(alertBox);
        }
        alertBox.innerHTML = `<strong>🎟️ Booking Confirmed!</strong> A confirmation email with QR code has been sent to <u>${bEmail.value}</u>. See you at the movies!`;
        bookingForm.reset();
        [bName, bEmail, bMovie].forEach(el => el.classList.remove('is-valid'));
      }
    });
  }

  // URL Hash State Handler for Direct Showcase
  const hash = window.location.hash;
  if (hash === '#modal') {
    openModal();
  } else if (hash === '#validation-errors') {
    openModal();
    if (clubForm) clubForm.dispatchEvent(new Event('submit'));
  } else if (hash === '#validation-success') {
    openModal();
    const nameInput = document.getElementById('regName');
    const emailInput = document.getElementById('regEmail');
    const passwordInput = document.getElementById('regPassword');
    const confirmPasswordInput = document.getElementById('regConfirmPassword');
    const termsInput = document.getElementById('regTerms');
    if (nameInput) nameInput.value = 'Diyar Umarov';
    if (emailInput) emailInput.value = 'diyar.umarov@astanait.edu.kz';
    if (passwordInput) passwordInput.value = 'CinemaPass2026';
    if (confirmPasswordInput) confirmPasswordInput.value = 'CinemaPass2026';
    if (termsInput) termsInput.checked = true;
    if (clubForm) clubForm.dispatchEvent(new Event('submit'));
  } else if (hash === '#accordion') {
    const firstHeader = document.querySelector('.cinema-accordion-header');
    if (firstHeader) firstHeader.click();
    const faqSection = document.querySelector('.cinema-accordion');
    if (faqSection) faqSection.scrollIntoView();
  } else if (hash === '#theme') {
    if (themeToggleBtn) {
      themeToggleBtn.click();
      themeToggleBtn.click();
    }
  }

});
