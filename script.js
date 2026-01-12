console.log("JavaScript connected!");

const form = document.getElementById("contactForm");
const button = document.getElementById("submitBtn");

form.addEventListener("submit", function (event) {
  event.preventDefault();
  alert("Thank you! Your message has been received.");
});

// ===== SECTION FADE-IN ON SCROLL =====

const sections = document.querySelectorAll('.section-hidden');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('section-show');
      }
    });
  },
  {
    threshold: 0.15
  }
);

sections.forEach(section => observer.observe(section));

// ===== SMART NAV (FIXED LOGIC) =====
const isMobile = window.innerWidth <= 768;
const navWrapper = document.querySelector('.nav-wrapper');
const navButtons = document.querySelectorAll('.hero-buttons a');

let hideTimer = null;
let locked = false; // 👈 NEW

function showNav() {
  if (locked) return; // 👈 do not interrupt auto-hide

  navWrapper.classList.remove('hidden');
  navWrapper.classList.add('visible');
}

function hideNav(delay = 3000) {
  locked = true;

  hideTimer = setTimeout(() => {
    navWrapper.classList.remove('visible');
    navWrapper.classList.add('hidden');

    // reset buttons
    navButtons.forEach(btn => btn.classList.remove('hide'));

    locked = false;
  }, delay);
}

// Click behavior
navButtons.forEach(button => {
  button.addEventListener('click', () => {

    // Always show nav on click
    navWrapper.classList.remove('hidden');
    navWrapper.classList.add('visible');

    // Hide all except clicked
    navButtons.forEach(btn => btn.classList.add('hide'));
    button.classList.remove('hide');

    // Auto-hide after 3s (mobile + desktop)
    hideNav(3000);
  });
});

// ===== SCROLL DIRECTION NAV (FIXED FOR HERO) =====

const hero = document.querySelector('.hero');
const heroHeight = hero.offsetHeight;

let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
  const currentScrollY = window.scrollY;

  // Always show nav inside hero
  if (currentScrollY < heroHeight - 50) {
    navWrapper.classList.remove('hidden');
    navWrapper.classList.add('visible');
    lastScrollY = currentScrollY;
    return;
  }

  // Mobile & desktop: scroll direction logic
  if (currentScrollY > lastScrollY) {
    // scrolling down
    navWrapper.classList.remove('visible');
    navWrapper.classList.add('hidden');
  } else {
    // scrolling up
    navWrapper.classList.remove('hidden');
    navWrapper.classList.add('visible');
  }

  lastScrollY = currentScrollY;
});

// ===== MOBILE SWIPE NAV (CHATGPT STYLE) =====
if (window.innerWidth <= 768) {

  let startX = 0;
  const swipeNav = document.querySelector('.mobile-swipe-nav');
  const swipeOverlay = document.querySelector('.mobile-swipe-overlay');

  document.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
  });

  document.addEventListener('touchend', (e) => {
    const endX = e.changedTouches[0].clientX;

    // swipe from left edge to open
    if (startX < 40 && endX - startX > 60) {
      swipeNav.classList.add('open');
      swipeOverlay.classList.add('show');
    }

    // swipe left to close
    if (startX > 200 && startX - endX > 60) {
      swipeNav.classList.remove('open');
      swipeOverlay.classList.remove('show');
    }
  });

  // tap outside to close
  swipeOverlay.addEventListener('click', () => {
    swipeNav.classList.remove('open');
    swipeOverlay.classList.remove('show');
  });

  // close after clicking a link
  swipeNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      swipeNav.classList.remove('open');
      swipeOverlay.classList.remove('show');
    });
  });
}
