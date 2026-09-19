/* Progressive enhancement: content is visible before, during and without JS. */
(function () {
  'use strict';
  const main = document.getElementById('content');
  if (!main || main.dataset.motionReady) return;
  main.dataset.motionReady = 'true';
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const desktop = matchMedia('(min-width: 768px) and (hover: hover) and (pointer: fine)');
  const active = new Set();
  const seen = new WeakSet();
  let observer;
  let frame = 0;
  const hero = main.querySelector('.hero');
  const backdrop = main.querySelector('.hero-video-backdrop');
  const ticker = main.querySelector('.multilingual-ticker-wrap');
  let toggle;
  let playing = false;

  if (ticker) {
    // Keep decorative text hidden from assistive technology, not its control.
    ticker.removeAttribute('aria-hidden');
    ticker.querySelector('.multilingual-ticker-track')?.setAttribute('aria-hidden', 'true');
    toggle = document.createElement('button');
    toggle.type = 'button';
    toggle.className = 'motion-toggle';
    toggle.textContent = 'Animer le bandeau';
    toggle.setAttribute('aria-pressed', 'false');
    toggle.addEventListener('click', () => {
      playing = !playing;
      updateTicker();
    });
    ticker.append(toggle);
  }

  function updateTicker() {
    const allowed = desktop.matches && !reduced.matches;
    if (!allowed) playing = false;
    ticker?.classList.toggle('motion-playing', allowed && playing && !document.hidden);
    if (toggle) {
      toggle.hidden = !allowed;
      toggle.textContent = playing ? 'Mettre le bandeau en pause' : 'Animer le bandeau';
      toggle.setAttribute('aria-pressed', String(playing));
    }
  }

  function resetPointer() {
    cancelAnimationFrame(frame);
    frame = 0;
    if (backdrop) backdrop.style.translate = '';
  }
  hero?.addEventListener('pointermove', event => {
    if (!desktop.matches || reduced.matches || frame || !backdrop) return;
    const x = event.clientX;
    const y = event.clientY;
    frame = requestAnimationFrame(() => {
      frame = 0;
      const rect = hero.getBoundingClientRect();
      const dx = Math.max(-3, Math.min(3, (x - rect.left - rect.width / 2) / rect.width * 6));
      const dy = Math.max(-3, Math.min(3, (y - rect.top - rect.height / 2) / rect.height * 6));
      backdrop.style.translate = `${dx}px ${dy}px`;
    });
  }, {passive: true});
  hero?.addEventListener('pointerleave', resetPointer);

  function configure() {
    observer?.disconnect();
    active.forEach(animation => animation.cancel());
    active.clear();
    resetPointer();
    updateTicker();
    if (reduced.matches || !('IntersectionObserver' in window) || !Element.prototype.animate) return;
    observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting || seen.has(entry.target)) continue;
        seen.add(entry.target);
        observer.unobserve(entry.target);
        // Never conceal an already focused control or animate layout dimensions.
        if (entry.target.contains(document.activeElement)) continue;
        const animation = entry.target.animate([
          {opacity: .65, transform: desktop.matches ? 'translateY(12px)' : 'none'},
          {opacity: 1, transform: 'none'}
        ], {duration: desktop.matches ? 420 : 180, easing: 'cubic-bezier(.2,.7,.2,1)'});
        active.add(animation);
        animation.onfinish = () => active.delete(animation);
      }
    }, {threshold: .08});
    main.querySelectorAll('.services-heading,.industries-heading,.method-step,.case-card,.contact-header-centered,.ai-engine-card').forEach(element => {
      if (!seen.has(element)) observer.observe(element);
    });
  }
  main.addEventListener('focusin', () => {
    active.forEach(animation => animation.cancel());
    active.clear();
  });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      active.forEach(animation => animation.cancel());
      active.clear();
      resetPointer();
    }
    updateTicker();
  });
  reduced.addEventListener('change', configure);
  desktop.addEventListener('change', configure);
  configure();
}());
