(() => {
  const root = document.documentElement;
  const themeControl = document.getElementById('theme-toggle');
  const printControl = document.getElementById('print-button');
  const progress = document.getElementById('reading-progress');
  const setTheme = (dark) => {
    root.dataset.theme = dark ? 'dark' : 'light';
    themeControl.setAttribute('aria-pressed', String(dark));
    themeControl.textContent = dark ? 'Light theme' : 'Dark theme';
  };
  if (themeControl) {
    themeControl.hidden = false;
    setTheme(window.matchMedia('(prefers-color-scheme: dark)').matches);
    themeControl.addEventListener('click', () => setTheme(root.dataset.theme !== 'dark'));
  }
  if (printControl) {
    printControl.hidden = false;
    printControl.addEventListener('click', () => window.print());
  }
  if (progress) {
    progress.hidden = false;
    let scheduled = false;
    const update = () => {
      const available = document.documentElement.scrollHeight - window.innerHeight;
      progress.value = available > 0 ? Math.min(100, window.scrollY / available * 100) : 100;
      scheduled = false;
    };
    window.addEventListener('scroll', () => {
      if (!scheduled) { scheduled = true; window.requestAnimationFrame(update); }
    }, { passive: true });
    window.addEventListener('resize', update);
    update();
  }
  if ('IntersectionObserver' in window) {
    const links = [...document.querySelectorAll('.contents-panel nav a')];
    const observer = new IntersectionObserver((entries) => {
      for (const section of entries) {
        if (!section.isIntersecting) continue;
        links.forEach((link) => {
          if (link.hash === '#' + section.target.id) link.setAttribute('aria-current', 'true');
          else link.removeAttribute('aria-current');
        });
      }
    }, { rootMargin: '-8% 0px -65% 0px', threshold: 0 });
    document.querySelectorAll('.policy-section').forEach((section) => observer.observe(section));
  }
})();
