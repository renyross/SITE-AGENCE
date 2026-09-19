(function () {
  'use strict';
  function revealCase(hash, focus) {
    const target = document.getElementById(hash.slice(1));
    if (!target || !target.classList.contains('case-details')) return;
    target.open = true;
    if (focus) target.querySelector('summary').focus({preventScroll:true});
    target.scrollIntoView({block:'start'});
  }
  document.querySelectorAll('.case-link').forEach(link => {
    link.addEventListener('click', () => revealCase(link.hash, true));
  });
  window.addEventListener('hashchange', () => revealCase(location.hash, false));
  revealCase(location.hash, false);
}());
