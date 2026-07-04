document.addEventListener('DOMContentLoaded', () => {
  // Force the page to always open scrolled to the very top
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }
  window.scrollTo(0, 0);

  // Preloader — show the signature animation for a minimum time,
  // then reveal the site once the page has fully loaded.
  const preloader = document.getElementById('preloader');
  const MIN_DISPLAY_MS = 2200;
  const loadStart = Date.now();

  function hidePreloader() {
    const elapsed = Date.now() - loadStart;
    const remaining = Math.max(MIN_DISPLAY_MS - elapsed, 0);
    setTimeout(() => {
      if (preloader) preloader.classList.add('hidden');
      document.body.classList.remove('is-loading');
      setTimeout(() => { if (preloader) preloader.remove(); }, 700);
    }, remaining);
  }

  if (document.readyState === 'complete') {
    hidePreloader();
  } else {
    window.addEventListener('load', hidePreloader);
  }

  const navButtons = document.querySelectorAll('.topnav button');
  const pages = document.querySelectorAll('.page');

  // Collapsible profile card (mobile) — tap the chevron to expand/collapse
  const sidebarToggle = document.getElementById('sidebar-toggle');
  const sidebarDetails = document.getElementById('sidebar-details');
  if (sidebarToggle && sidebarDetails) {
    sidebarToggle.addEventListener('click', () => {
      const isOpen = sidebarDetails.classList.toggle('open');
      sidebarToggle.classList.toggle('open', isOpen);
      sidebarToggle.setAttribute('aria-expanded', String(isOpen));
    });
  }

  function showPage(id) {
    pages.forEach(p => p.classList.toggle('active', p.id === id));
    navButtons.forEach(b => b.classList.toggle('active', b.dataset.target === id));
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'instant', block: 'start' });
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }

  navButtons.forEach(btn => {
    btn.addEventListener('click', () => showPage(btn.dataset.target));
  });

  // Always start on the About page — no URL hash is used, so there's
  // nothing for the browser to auto-scroll to on load.
  showPage('about');

  // Work page filters
  const filterBtns = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.work-card');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      cards.forEach(card => {
        const show = filter === 'all' || card.dataset.category === filter;
        card.style.display = show ? '' : 'none';
      });
    });
  });

  // Contact form -> opens the visitor's email client with the message prefilled
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('cf-name').value.trim();
      const email = document.getElementById('cf-email').value.trim();
      const message = document.getElementById('cf-message').value.trim();
      const subject = encodeURIComponent(`Portfolio contact from ${name || 'a visitor'}`);
      const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
      window.location.href = `mailto:viveknamburi95@gmail.com?subject=${subject}&body=${body}`;
    });
  }
});
