document.addEventListener('DOMContentLoaded', () => {
  const btn = document.querySelector('.menu-btn');
  const nav = document.querySelector('.nav-links');
  if (btn && nav) btn.addEventListener('click', () => nav.classList.toggle('open'));
  const io = new IntersectionObserver((entries) => entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
  }), {threshold:.12});
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));
  document.querySelectorAll('[data-product-link]').forEach(a => {
    const p = a.getAttribute('data-product-link');
    a.href = 'demo.html?product=' + encodeURIComponent(p);
  });
  const params = new URLSearchParams(location.search);
  const product = params.get('product');
  const select = document.getElementById('product');
  if (product && select) {
    for (const opt of select.options) if (opt.value === product) opt.selected = true;
  }
  const form = document.getElementById('demoForm');
  if (form) form.addEventListener('submit', (ev) => {
    ev.preventDefault();
    const data = new FormData(form);
    const lines = [
      'FredNova demo request', '',
      'Name: ' + (data.get('name') || ''),
      'Institution: ' + (data.get('institution') || ''),
      'City/District: ' + (data.get('city') || ''),
      'Phone: ' + (data.get('phone') || ''),
      'Email: ' + (data.get('email') || ''),
      'Product: ' + (data.get('product') || ''),
      'Institution size: ' + (data.get('size') || ''),
      'Preferred date: ' + (data.get('date') || ''), '',
      'Message: ' + (data.get('message') || '')
    ];
    const subject = encodeURIComponent('FredNova demo request - ' + (data.get('institution') || data.get('name') || 'Website'));
    const body = encodeURIComponent(lines.join('\n'));
    window.location.href = 'mailto:mariasamy23@gmail.com?subject=' + subject + '&body=' + body;
  });
});
