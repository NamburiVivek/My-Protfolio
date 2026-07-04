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
      // Re-pin to the top once the preloader is gone. Late-loading images/
      // fonts can shift layout while the preloader still covers the screen;
      // snapping back to (0,0) here stops that shift from showing up as a
      // "jump" right after the site becomes visible (mainly noticeable on mobile).
      window.scrollTo(0, 0);
      setTimeout(() => { if (preloader) preloader.remove(); }, 700);
    }, remaining);
  }
  if (document.readyState === 'complete') {
    hidePreloader();
  } else {
    window.addEventListener('load', hidePreloader);
  }
  // Collapsible profile card (mobile) — tap the chevron to hide/show
  // email, phone, location, socials, and the resume button, so "About me"
  // sits higher on small screens without needing to scroll past it.
  const sidebar = document.querySelector('.sidebar');
  const sidebarToggle = document.getElementById('sidebar-toggle');
  if (sidebar && sidebarToggle) {
    sidebarToggle.addEventListener('click', () => {
      const isCollapsed = sidebar.classList.toggle('collapsed');
      sidebarToggle.setAttribute('aria-expanded', String(!isCollapsed));
    });
  }

  const navButtons = document.querySelectorAll('.topnav button');
  const pages = document.querySelectorAll('.page');
  let isInitialShow = true;
  function showPage(id) {
    pages.forEach(p => p.classList.toggle('active', p.id === id));
    navButtons.forEach(b => b.classList.toggle('active', b.dataset.target === id));
    // Just swap which page is visible — no scrolling at all. Scrolling here
    // (even "instant") caused a visible jump/movement every time a nav
    // button was clicked, since the sticky topnav and differing page
    // heights meant the browser had to reposition the viewport.
    if (isInitialShow) {
      isInitialShow = false;
      window.scrollTo(0, 0);
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
