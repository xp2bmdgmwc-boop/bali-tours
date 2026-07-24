document.addEventListener('DOMContentLoaded', () => {
  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });

  // Simple form handling
  const form = document.getElementById('call-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const btn = form.querySelector('button[type="submit"]');
      const originalText = btn.textContent;
      
      btn.textContent = 'Запрос отправлен';
      btn.style.background = 'var(--ink)';
      
      form.reset();
      
      setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = 'var(--accent)';
      }, 3000);
    });
  }
});
