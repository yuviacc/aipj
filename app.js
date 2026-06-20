/* ═══════════════════════════════════════
   AUTO HUB — app.js
═══════════════════════════════════════ */

// ─── SIDEBAR NAVIGATION ───────────────
const sidebar   = document.getElementById('sidebar');
const hamburger = document.getElementById('hamburger');
const overlay   = document.getElementById('overlay');
const navLinks  = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', toggleSidebar);
overlay.addEventListener('click', closeSidebar);

function toggleSidebar() {
  sidebar.classList.toggle('open');
  overlay.classList.toggle('show');
}

function closeSidebar() {
  sidebar.classList.remove('open');
  overlay.classList.remove('show');
}

// Close sidebar on nav link click (mobile)
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    if (window.innerWidth < 768) closeSidebar();
  });
});

// ─── ACTIVE NAV ON SCROLL ─────────────
const sections = document.querySelectorAll('.section');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navLinks.forEach(link => {
        link.classList.toggle('active', link.dataset.section === id);
      });
    }
  });
}, { threshold: 0.3 });

sections.forEach(s => observer.observe(s));

// ─── CAR FILTER ───────────────────────
const filterBtns = document.querySelectorAll('.filter-btn');
const carCards   = document.querySelectorAll('.car-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;

    carCards.forEach(card => {
      if (filter === 'all' || card.dataset.type === filter) {
        card.classList.remove('hidden');
        card.style.animation = 'none';
        void card.offsetWidth;
        card.style.animation = 'fadeIn 0.3s ease';
      } else {
        card.classList.add('hidden');
      }
    });
  });
});

// ─── SCROLL TO BOOKING WITH PRESELECT ─
function scrollToBooking(carType) {
  document.getElementById('booking').scrollIntoView({ behavior: 'smooth' });
  setTimeout(() => {
    const select = document.getElementById('carType');
    for (let i = 0; i < select.options.length; i++) {
      if (select.options[i].value === carType) {
        select.selectedIndex = i;
        break;
      }
    }
  }, 600);
}

// ─── SET MIN DATE ─────────────────────
const dateInput = document.getElementById('testDriveDate');
if (dateInput) {
  const today = new Date();
  today.setDate(today.getDate() + 1);
  dateInput.min = today.toISOString().split('T')[0];
}

// ─── BOOKING FORM SUBMIT ──────────────
function submitBooking(e) {
  e.preventDefault();
  const name    = document.getElementById('fullName').value;
  const carType = document.getElementById('carType').value;
  const date    = document.getElementById('testDriveDate').value;
  const slot    = document.querySelector('input[name="slot"]:checked');

  const dateFormatted = new Date(date).toLocaleDateString('en-IN', {
    day: 'numeric', month: 'long', year: 'numeric'
  });

  const slotLabel = slot ? ` at ${slot.value}` : '';

  showToast(`✅ Booking confirmed for ${name}!\n${carType} test drive on ${dateFormatted}${slotLabel}. We'll call you to confirm.`);

  e.target.reset();
}

// ─── CONTACT FORM SUBMIT ──────────────
function submitContact(e) {
  e.preventDefault();
  showToast('✅ Message sent! Our team will get back to you within 24 hours.');
  e.target.reset();
}

// ─── TOAST NOTIFICATION ───────────────
function showToast(message) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 4500);
}

// ─── ANIMATE BARS ON SCROLL ───────────
const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.bar').forEach(bar => {
        const h = bar.style.height;
        bar.style.height = '0%';
        setTimeout(() => { bar.style.height = h; }, 100);
      });
      barObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll('.bar-chart').forEach(chart => barObserver.observe(chart));

// ─── CSS FADE-IN ANIMATION ───────────
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(12px); }
    to   { opacity: 1; transform: translateY(0); }
  }
`;
document.head.appendChild(style);

// ─── SMOOTH NAV LINKS ─────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});
