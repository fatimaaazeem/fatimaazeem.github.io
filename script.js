// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const nav = document.getElementById('nav');
navToggle.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('is-open');
  navToggle.setAttribute('aria-expanded', isOpen);
});
nav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => nav.classList.remove('is-open'));
});

// Light rail: brighten once we've scrolled past the hero
const rail = document.getElementById('rail');
const brightenRail = () => {
  if (window.scrollY > window.innerHeight * 0.6) {
    rail.classList.add('is-lit');
  } else {
    rail.classList.remove('is-lit');
  }
};
brightenRail();
window.addEventListener('scroll', brightenRail, { passive: true });

// Chapter tint: the page's own accent colour tracks whichever chapter
// of the day is in view — brass everywhere, cooling to green only for
// the Conditioning Bay chapter, echoing that room's real light.
const TINTS = {
  brass: { tint: '#c9a15a', bright: '#e6c47f', dim: 'rgba(201, 161, 90, 0.35)', wash: 'rgba(201, 161, 90, 0.05)' },
  green: { tint: '#7fae86', bright: '#a4d1ab', dim: 'rgba(127, 174, 134, 0.35)', wash: 'rgba(127, 174, 134, 0.06)' }
};

const root = document.documentElement;
const applyTint = (name) => {
  const t = TINTS[name] || TINTS.brass;
  root.style.setProperty('--tint', t.tint);
  root.style.setProperty('--tint-bright', t.bright);
  root.style.setProperty('--tint-dim', t.dim);
  root.style.setProperty('--tint-wash', t.wash);
};

const chapters = document.querySelectorAll('.chapter');
const chapterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      applyTint(entry.target.dataset.tint);
    }
  });
}, { threshold: 0.5 });
chapters.forEach(ch => chapterObserver.observe(ch));

// Reveal-on-scroll for method image/content and ledger rows
const revealTargets = document.querySelectorAll('.method__image, .method__content, .ledger__row:not(.ledger__row--head)');
revealTargets.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
revealTargets.forEach(el => revealObserver.observe(el));

// Contact form (static site — simulate a submission)
const form = document.getElementById('accessForm');
const formNote = document.getElementById('formNote');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  formNote.textContent = `Thanks${name ? ', ' + name.split(' ')[0] : ''} — a coach will call you shortly to arrange your walkthrough.`;
  form.reset();
});
