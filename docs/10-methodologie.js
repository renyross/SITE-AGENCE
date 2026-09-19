(function () {
  'use strict';
  const list = document.getElementById('method-steps');
  if (!list || !('IntersectionObserver' in window)) return;
  const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
  const steps = Array.from(list.querySelectorAll('.method-step'));
  let observer;
  function configure() {
    if (observer) observer.disconnect();
    list.classList.remove('is-enhanced');
    if (preference.matches) return;
    observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-seen');
        observer.unobserve(entry.target);
      });
    }, {threshold: 0, rootMargin: '0px 0px -12% 0px'});
    list.classList.add('is-enhanced');
    steps.filter(step => !step.classList.contains('is-seen')).forEach(step => observer.observe(step));
  }
  preference.addEventListener('change', configure);
  configure();
}());
