(function(){
const dataEl = document.getElementById('problem-stat-data');
const statList = document.getElementById('problem-stats');
if (dataEl && statList) {
  const statData = JSON.parse(dataEl.textContent);
  const counters = [];
  for (const stat of statData) {
    const card = document.createElement('li'); card.className = 'stat';
    const status = document.createElement('div'); status.className = 'stat-status';
    status.textContent = stat.status === 'demo' ? 'Illustrative figure' : 'Awaiting source';
    const number = document.createElement('div'); number.className = 'stat-value'; number.setAttribute('aria-hidden', 'true');
    const format = value => stat.prefix + (value === null ? '—' : String(value)) + stat.suffix;
    number.textContent = format(stat.value);
    const accessible = document.createElement('span'); accessible.className = 'sr-only'; accessible.textContent = stat.value === null ? 'Value awaiting validation. ' : format(stat.value) + '. ';
    const label = document.createElement('h3'); label.textContent = stat.label;
    const note = document.createElement('p'); note.textContent = stat.note;
    card.append(status, number, accessible, label, note); statList.append(card);
    if (Number.isFinite(stat.value)) counters.push({number, value:stat.value, format});
  }
  const motionPreference = matchMedia('(prefers-reduced-motion: reduce), (max-width: 767px)');
  if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(([entry]) => {
    if (!entry.isIntersecting) return;
    observer.disconnect();
    if (motionPreference.matches) return;
    const started = performance.now();
    function tick(now) {
      const progress = motionPreference.matches ? 1 : Math.min((now - started) / 900, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      counters.forEach(counter => {counter.number.textContent = counter.format(Math.round(counter.value * eased));});
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }, {threshold:0.15});
  observer.observe(statList);
  }
}

// Reusable Carousel Navigation Handler with DOM readiness and retry
function setupCarousel(trackId, prevId, nextId, counterId, slideClass) {
  let attempts = 0;
  function init() {
    try {
      const track = document.getElementById(trackId);
      const prevBtn = document.getElementById(prevId);
      const nextBtn = document.getElementById(nextId);
      const counter = document.getElementById(counterId);

      if (!track || !prevBtn || !nextBtn) {
        if (attempts < 50) {
          attempts++;
          setTimeout(init, 100);
        }
        return;
      }

      if (track.dataset.carouselInitialized === 'true') return;
      track.dataset.carouselInitialized = 'true';

      const slides = track.querySelectorAll(slideClass);
      const total = slides.length;

      const updateNav = function() {
        const scrollLeft = track.scrollLeft;
        const maxScroll = track.scrollWidth - track.clientWidth;
        prevBtn.disabled = scrollLeft <= 8;
        nextBtn.disabled = scrollLeft >= maxScroll - 8;

        const slide = track.querySelector(slideClass);
        const slideWidth = slide ? slide.offsetWidth : 350;
        const gap = 24;
        const current = Math.min(total, Math.max(1, Math.round(scrollLeft / (slideWidth + gap)) + 1));
        if (counter) {
          counter.textContent = String(current).padStart(2, '0') + ' / ' + String(total).padStart(2, '0');
        }
      };

      const getScrollAmount = function() {
        const slide = track.querySelector(slideClass);
        const slideWidth = slide ? slide.offsetWidth : 350;
        return slideWidth + 24;
      };

      prevBtn.addEventListener('click', function(e) {
        e.preventDefault();
        track.scrollBy({ left: -getScrollAmount(), behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
      });

      nextBtn.addEventListener('click', function(e) {
        e.preventDefault();
        track.scrollBy({ left: getScrollAmount(), behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
      });

      track.addEventListener('scroll', updateNav, { passive: true });
      window.addEventListener('resize', updateNav);
      updateNav();
    } catch (err) {
      console.warn('Carousel init error:', err);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
}

setupCarousel('services-track', 'services-prev', 'services-next', 'services-counter', '.service-carousel-slide');
setupCarousel('industries-track', 'industries-prev', 'industries-next', 'industries-counter', '.industry-carousel-slide');

// Interactive Contact Form Handling
function setupContactForm() {
  function init() {
    var form = document.getElementById('agency-contact-form');
    if (!form) return;
    const btn = form.querySelector('button[type="submit"]');
    const feedback = document.getElementById('contact-form-feedback');
    let enabled = false;
    if (btn) btn.disabled = true;
    if (feedback) feedback.textContent = 'Envoi non connecté : aucune donnée n’est transmise.';
    fetch('/api/leads').then(r => r.json()).then(config => {
      enabled = config.enabled === true;
      if (btn) btn.disabled = !enabled;
      if (feedback && enabled) feedback.textContent = '';
    }).catch(() => {});
    form.addEventListener('submit', async function(e) {
      e.preventDefault();
      if (!enabled || !btn || btn.disabled) return;
      btn.disabled = true;
      const fields = Object.fromEntries(new FormData(form));
      try {
        const response = await fetch('/api/leads', {method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({...fields,kind:'contact'})});
        const result = await response.json();
        if (feedback) feedback.textContent = response.ok ? result.message : result.error || 'Envoi indisponible.';
      } catch (_) {
        if (feedback) feedback.textContent = 'La transmission n’a pas pu être confirmée.';
      } finally { btn.disabled = false; }
    });
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
}
setupContactForm();

// Floating Scroll-to-Top Button Handler
function setupScrollToTop() {
  function init() {
    var btn = document.getElementById('scroll-to-top-btn');
    if (!btn) return;
    function checkScroll() {
      if (window.scrollY > 250) {
        btn.classList.add('is-visible');
      } else {
        btn.classList.remove('is-visible');
      }
    }
    window.addEventListener('scroll', checkScroll, { passive: true });
    checkScroll();
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
    });
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
}
setupScrollToTop();

}());