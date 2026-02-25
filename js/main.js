document.addEventListener('DOMContentLoaded', function () {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });
  }
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function (e) {
      const id = this.getAttribute('href');
      if (id.length > 1) {
        const el = document.querySelector(id);
        if (el) {
          e.preventDefault();
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });
  const bubble = document.createElement('div');
  bubble.className = 'tooltip-bubble';
  bubble.style.display = 'none';
  document.body.appendChild(bubble);
  function showTooltip(e) {
    const text = e.currentTarget.getAttribute('data-tooltip');
    if (!text) return;
    bubble.textContent = text;
    bubble.style.display = 'block';
    const rect = e.currentTarget.getBoundingClientRect();
    const top = rect.top + window.scrollY - bubble.offsetHeight - 8;
    const left = rect.left + window.scrollX + rect.width / 2 - bubble.offsetWidth / 2;
    bubble.style.top = Math.max(8, top) + 'px';
    bubble.style.left = Math.max(8, left) + 'px';
  }
  function hideTooltip() {
    bubble.style.display = 'none';
  }
  document.querySelectorAll('.tooltip-term').forEach(el => {
    el.addEventListener('mouseenter', showTooltip);
    el.addEventListener('mouseleave', hideTooltip);
    el.addEventListener('focus', showTooltip);
    el.addEventListener('blur', hideTooltip);
  });
  document.querySelectorAll('details.collapsible').forEach(col => {
    col.addEventListener('toggle', () => {
      if (!col.open) return;
      const group = col.parentElement || document;
      group.querySelectorAll('details.collapsible[open]').forEach(other => {
        if (other !== col) other.open = false;
      });
    });
  });
  const lb = document.createElement('div');
  lb.className = 'lightbox';
  lb.innerHTML = '<img alt=""><button aria-label="Close" style="position:absolute;top:1rem;right:1rem;background:#111827;color:#fff;border:1px solid #374151;border-radius:.5rem;padding:.4rem .6rem">Close</button>';
  document.body.appendChild(lb);
  const lbImg = lb.querySelector('img');
  function closeLightbox() {
    lb.classList.remove('open');
    document.body.style.overflow = '';
  }
  lb.addEventListener('click', e => {
    if (e.target === lb || e.target.tagName === 'BUTTON') closeLightbox();
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && lb.classList.contains('open')) closeLightbox();
  });
  document.querySelectorAll('[data-lightbox="image"]').forEach(img => {
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', () => {
      if (lbImg) {
        lbImg.src = img.getAttribute('data-full') || img.src;
        lbImg.alt = img.alt || '';
      }
      lb.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });
  document.querySelectorAll('[data-tabs]').forEach(container => {
    const buttons = Array.from(container.querySelectorAll('.tab-list button'));
    const panels = Array.from(container.querySelectorAll('.tab-panels .panel'));
    function activate(idx) {
      buttons.forEach((b, i) => b.classList.toggle('active', i === idx));
      panels.forEach((p, i) => p.classList.toggle('active', i === idx));
    }
    buttons.forEach((btn, i) => btn.addEventListener('click', () => activate(i)));
    if (buttons.length) activate(0);
  });
});
