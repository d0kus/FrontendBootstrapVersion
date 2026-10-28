/**
 * 404 Cinema - Interactive JavaScript
 * Assignment 5: Advanced JS & DOM Manipulation
 * Group: SE-2507
 */

document.addEventListener('DOMContentLoaded', () => {

  // ==========================================================================
  // 1. Web Audio Sound Engine (Part 1.3: Play Sounds)
  // ==========================================================================
  let audioCtx = null;

  function playUiSound(freq = 580) {
    try {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextClass) return;
      if (!audioCtx) audioCtx = new AudioContextClass();
      if (audioCtx.state === 'suspended') audioCtx.resume();

      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.15);

      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.15);
    } catch (e) {
      console.warn('Audio not available', e);
    }
  }

  // Sound Button in Utility Bar
  const soundBtn = document.getElementById('soundBtn');
  if (soundBtn) {
    soundBtn.addEventListener('click', () => {
      playUiSound(660);
      soundBtn.style.transform = 'scale(1.1)';
      setTimeout(() => { soundBtn.style.transform = 'scale(1)'; }, 150);
    });
  }


  // ==========================================================================
  // 2. Live Dynamic Clock (Part 1.2: Event Listeners & Time)
  // ==========================================================================
  const clockElement = document.getElementById('clockText');
  function updateClock() {
    if (!clockElement) return;
    const now = new Date();
    clockElement.textContent = now.toLocaleDateString('en-US', {
      year: 'numeric', month: 'long', day: 'numeric',
      hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false
    });
  }
  updateClock();
  setInterval(updateClock, 1000);


  // ==========================================================================
  // 3. Theme Switcher (Part 1.1: Dynamic Style Changes - style.backgroundColor)
  // ==========================================================================
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
      playUiSound(500);
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


  // ==========================================================================
  // 4. Keyboard Navigation for Menu (Part 1.2: keydown & switch statement)
  // ==========================================================================
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
  let currentNavIndex = 0;

  window.addEventListener('keydown', (e) => {
    // Skip if typing in an input field
    if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement?.tagName)) return;

    let targetIdx = null;

    // Switch statement controlling logic based on key press
    switch (e.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        targetIdx = (currentNavIndex + 1) % navLinks.length;
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
        targetIdx = (currentNavIndex - 1 + navLinks.length) % navLinks.length;
        break;
    }

    if (targetIdx !== null && navLinks[targetIdx]) {
      e.preventDefault();
      currentNavIndex = targetIdx;
      navLinks[targetIdx].focus();
      playUiSound(440);

      const navNotice = document.getElementById('keyboardNavNotice');
      if (navNotice) {
        navNotice.textContent = `Keyboard focus: ${navLinks[targetIdx].textContent.trim()}`;
        navNotice.classList.remove('d-none');
        clearTimeout(navNotice._timer);
        navNotice._timer = setTimeout(() => navNotice.classList.add('d-none'), 2000);
      }
    }
  });


  // ==========================================================================
  // 5. Format Filter with Switch Statement (Part 1.2: Switch Statements)
  // ==========================================================================
  const filterBtns = document.querySelectorAll('.format-filter-btn');
  const movieCards = document.querySelectorAll('.movie-card-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      playUiSound(540);
      filterBtns.forEach(b => {
        b.classList.remove('btn-warning', 'active', 'text-white');
        b.classList.add('btn-outline-secondary', 'text-light');
      });
      btn.classList.remove('btn-outline-secondary', 'text-light');
      btn.classList.add('btn-warning', 'active', 'text-white');

      const filterType = btn.getAttribute('data-filter');
      let targetCategory = '';

      // Switch statement controlling filtering logic
      switch (filterType) {
        case 'imax':
          targetCategory = 'imax';
          break;
        case 'dolby':
          targetCategory = 'dolby';
          break;
        case 'standard':
          targetCategory = 'standard';
          break;
        case 'all':
        default:
          targetCategory = 'all';
          break;
      }

      // DOM manipulation: style.display
      movieCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (targetCategory === 'all' || category === targetCategory) {
          card.style.display = ''; // Restore default grid layout
        } else {
          card.style.display = 'none'; // Hide filtered out card
        }
      });
    });
  });


  // ==========================================================================
  // 6. Star Rating Component (Part 1.1: Manipulating Attributes & querySelectorAll)
  // ==========================================================================
  const stars = document.querySelectorAll('#cinemaStarRating .star-item');
  const ratingText = document.getElementById('ratingFeedback');

  stars.forEach(star => {
    star.addEventListener('click', () => {
      const val = parseInt(star.getAttribute('data-value'), 10) || 1;
      playUiSound(720);

      // Manipulate attributes and styles on star collection
      stars.forEach(s => {
        const sVal = parseInt(s.getAttribute('data-value'), 10);
        if (sVal <= val) {
          s.classList.add('active');
          s.style.color = '#f59e0b';
        } else {
          s.classList.remove('active');
          s.style.color = '#64748b';
        }
      });

      // Event-triggered animation
      star.style.transform = 'scale(1.35)';
      setTimeout(() => { star.style.transform = 'scale(1)'; }, 180);

      // Dynamic text modification
      if (ratingText) {
        ratingText.textContent = `★ You rated this experience ${val} / 5 stars! Thank you!`;
        ratingText.style.color = '#f97316';
      }
    });
  });


  // ==========================================================================
  // 7. Objects, Methods, Arrays & Loops (Part 1.3: JavaScript Advanced Concepts)
  // ==========================================================================
  const cinemaInfo = {
    name: "404 Cinema",
    highlights: ["4K Dual-Laser IMAX", "Dolby Atmos 64-Ch", "VIP Electric Recliners"],
    // Object Method
    getInfo() {
      return `${this.name} features ${this.highlights.length} premium tech halls`;
    }
  };

  const highlightsContainer = document.getElementById('dynamicHighlights');
  if (highlightsContainer) {
    // Array iteration using standard for loop
    for (let i = 0; i < cinemaInfo.highlights.length; i++) {
      const badge = document.createElement('span');
      badge.className = 'badge bg-dark border border-secondary text-warning';
      badge.textContent = `✔ ${cinemaInfo.highlights[i]}`;
      highlightsContainer.appendChild(badge);
    }
  }

  const summaryElement = document.getElementById('cinemaInfoSummary');
  if (summaryElement) {
    summaryElement.textContent = cinemaInfo.getInfo();
  }

  // Higher-Order Function demo (filter)
  const filteredHighlights = cinemaInfo.highlights.filter(h => h.includes('IMAX'));


  // ==========================================================================
  // 8. Responding to Events with Callbacks & Reset Button (Part 1.2)
  // ==========================================================================
  function fakeAsyncBooking(data, callback) {
    // Simulating async submission with callback function
    setTimeout(() => {
      callback({
        success: true,
        code: 'CINEMA-' + Math.floor(1000 + Math.random() * 9000),
        email: data.email
      });
    }, 300);
  }

  // Strict Email Regex (letters/digits before @, valid domain, at least 2-letter TLD)
  const strictEmailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const bookingForm = document.getElementById('booking-form');
  if (bookingForm) {
    const bName = document.getElementById('fullname');
    const bEmail = document.getElementById('email');
    const bMovie = document.getElementById('movie');

    // Live validation on email input
    if (bEmail) {
      bEmail.addEventListener('input', () => {
        const val = bEmail.value.trim();
        if (strictEmailRegex.test(val)) {
          bEmail.classList.remove('is-invalid');
          bEmail.classList.add('is-valid');
        } else {
          bEmail.classList.remove('is-valid');
        }
      });
    }

    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;

      if (!bName || !bName.value.trim() || bName.value.trim().length < 3) {
        if (bName) bName.classList.add('is-invalid');
        isValid = false;
      } else {
        bName.classList.remove('is-invalid');
      }

      if (!bEmail || !strictEmailRegex.test(bEmail.value.trim())) {
        if (bEmail) {
          bEmail.classList.remove('is-valid');
          bEmail.classList.add('is-invalid');
        }
        isValid = false;
      } else {
        bEmail.classList.remove('is-invalid');
        bEmail.classList.add('is-valid');
      }

      if (isValid) {
        // Callback function usage
        fakeAsyncBooking({ name: bName.value, email: bEmail.value }, (res) => {
          playUiSound(750);
          let alertBox = document.getElementById('bookingSuccessAlert');
          if (!alertBox) {
            alertBox = document.createElement('div');
            alertBox.id = 'bookingSuccessAlert';
            alertBox.className = 'alert alert-success alert-dismissible fade show mt-3';
            alertBox.role = 'alert';
            bookingForm.prepend(alertBox);
          }
          alertBox.innerHTML = `<strong>🎟️ Booking Confirmed! [Code: ${res.code}]</strong> Voucher sent to <u>${res.email}</u>.`;
          bookingForm.reset();
        });
      }
    });

    // Reset button clears all inputs using querySelectorAll
    const resetBtn = document.getElementById('resetBookingBtn');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        playUiSound(400);
        document.querySelectorAll('#booking-form input, #booking-form select, #booking-form textarea').forEach(input => {
          if (input.type === 'checkbox' || input.type === 'radio') {
            input.checked = input.defaultChecked;
          } else {
            input.value = '';
          }
          input.classList.remove('is-valid', 'is-invalid');
        });
        const alertBox = document.getElementById('bookingSuccessAlert');
        if (alertBox) alertBox.remove();
      });
    }
  }


  // ==========================================================================
  // 9. FAQ Accordion & VIP Modal (Pre-existing Features)
  // ==========================================================================
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

  if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeModal();
    });
  }
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay && modalOverlay.classList.contains('show')) {
      closeModal();
    }
  });


  // ==========================================================================
  // 10. VIP Club Form Validation (Pre-existing Feature)
  // ==========================================================================
  const clubForm = document.getElementById('clubRegistrationForm');
  if (clubForm) {
    const nameInput = document.getElementById('regName');
    const emailInput = document.getElementById('regEmail');
    const passwordInput = document.getElementById('regPassword');
    const confirmPasswordInput = document.getElementById('regConfirmPassword');
    const termsInput = document.getElementById('regTerms');
    const formAlert = document.getElementById('formSuccessAlert');

    // Live validation for VIP modal email
    if (emailInput) {
      emailInput.addEventListener('input', () => {
        const val = emailInput.value.trim();
        if (strictEmailRegex.test(val)) {
          emailInput.classList.remove('is-invalid');
          emailInput.classList.add('is-valid');
        } else {
          emailInput.classList.remove('is-valid');
        }
      });
    }

    clubForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let valid = true;
      if (!nameInput.value.trim()) { nameInput.classList.add('is-invalid'); valid = false; } else { nameInput.classList.remove('is-invalid'); }
      if (!emailInput.value.trim() || !strictEmailRegex.test(emailInput.value.trim())) {
        emailInput.classList.remove('is-valid');
        emailInput.classList.add('is-invalid');
        const fb = emailInput.parentElement?.querySelector('.invalid-feedback');
        if (fb) fb.textContent = 'Please enter a valid email (e.g. name@domain.com)';
        valid = false;
      } else {
        emailInput.classList.remove('is-invalid');
        emailInput.classList.add('is-valid');
      }
      if (passwordInput.value.length < 8) { passwordInput.classList.add('is-invalid'); valid = false; } else { passwordInput.classList.remove('is-invalid'); }
      if (confirmPasswordInput.value !== passwordInput.value || !confirmPasswordInput.value) { confirmPasswordInput.classList.add('is-invalid'); valid = false; } else { confirmPasswordInput.classList.remove('is-invalid'); }
      if (!termsInput.checked) { termsInput.classList.add('is-invalid'); valid = false; } else { termsInput.classList.remove('is-invalid'); }

      if (valid) {
        playUiSound(700);
        if (formAlert) {
          formAlert.classList.remove('d-none');
          formAlert.textContent = `🎉 Welcome, ${nameInput.value.trim()}! Membership registered.`;
        }
        setTimeout(() => { clubForm.reset(); }, 1500);
      }
    });
  }

});
