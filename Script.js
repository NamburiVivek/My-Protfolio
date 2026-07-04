document.addEventListener('DOMContentLoaded', () => {
  // Force the page to always open scrolled to the very top
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }
  window.scrollTo(0, 0);

  const navButtons = document.querySelectorAll('.topnav button');
  const pages = document.querySelectorAll('.page');

  function showPage(id) {
    pages.forEach(p => p.classList.toggle('active', p.id === id));
    navButtons.forEach(b => b.classList.toggle('active', b.dataset.target === id));
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  navButtons.forEach(btn => {
    btn.addEventListener('click', () => showPage(btn.dataset.target));
  });

  const sidebarResumeBtn = document.getElementById('sidebar-resume-btn');
  if (sidebarResumeBtn) {
    sidebarResumeBtn.addEventListener('click', () => showPage('resume'));
  }

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