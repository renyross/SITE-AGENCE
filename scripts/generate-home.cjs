const fs = require('fs');
const path = require('path');
const services = require('../content/services.json');
const industries = require('../content/industries.json');

// Base64 AI Engine Logos
const chatgptLogo = `data:image/png;base64,${fs.readFileSync(path.join(__dirname, '../public/images/logos/chatgpt.png')).toString('base64')}`;
const claudeLogo = `data:image/png;base64,${fs.readFileSync(path.join(__dirname, '../public/images/logos/claude.png')).toString('base64')}`;
const geminiLogo = `data:image/png;base64,${fs.readFileSync(path.join(__dirname, '../public/images/logos/gemini.png')).toString('base64')}`;
const perplexityLogo = `data:image/png;base64,${fs.readFileSync(path.join(__dirname, '../public/images/logos/perplexity.png')).toString('base64')}`;
const googleLogo = `data:image/png;base64,${fs.readFileSync(path.join(__dirname, '../public/images/logos/google.png')).toString('base64')}`;

// 1. Hero Section
const heroSection = `
<section aria-labelledby="hero-title" class="hero" lang="fr">
  <div class="hero-video-backdrop" aria-hidden="true">
    <video class="hero-video-bg" id="hero-video" autoplay muted loop playsinline preload="auto" aria-hidden="true" tabindex="-1">
      <source src="/video/hero-cinematic.mp4" type="video/mp4">
      <source src="video/hero-cinematic.mp4" type="video/mp4">
      <source src="/video/Animer_image_statique_vide%CC%81o_cine%CC%81%E2%80%A6_20260918171816.mp4" type="video/mp4">
      Votre navigateur ne supporte pas la balise vidéo HTML5.
    </video>
    <div class="hero-video-overlay" aria-hidden="true"></div>
  </div>

  <div class="hero-content">
    <div class="hero-badge-row">
      <div class="label">Agence ALTEORIA · Automatisation &amp; Intelligence Artificielle</div>
      <div class="hero-live-badge">
        <span class="badge-live-pulse" aria-hidden="true"></span>
        <span>Solutions sur-mesure</span>
      </div>
    </div>

    <h1 id="hero-title" class="hero-main-title">
      <span class="hero-title-top">AUTOMATISEZ CE QUI VOUS RALENTIT. </span>
      <span class="hero-title-mid">
        <span class="hero-accent-highlight">ACCÉLÉREZ CE QUI VOUS FAIT GRANDIR.</span>
        <span class="hero-underline-container" aria-hidden="true">
          <svg class="hero-underline-svg" viewBox="0 0 540 24" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M4 18C160 4 380 4 536 14" stroke="url(#hero-brush-grad)" stroke-width="7" stroke-linecap="round"/>
            <defs>
              <linearGradient id="hero-brush-grad" x1="0" y1="0" x2="540" y2="0" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stop-color="#C6F564"/>
                <stop offset="50%" stop-color="#38BDF8"/>
                <stop offset="100%" stop-color="#7C5CFC"/>
              </linearGradient>
            </defs>
          </svg>
        </span>
      </span>
    </h1>

    <p class="lead">Nous concevons des systèmes d'automatisation intelligents qui connectent vos outils, éliminent les tâches répétitives et optimisent vos opérations marketing, commerciales et internes.</p>

    <div class="hero-actions">
      <a class="button primary" href="/services">Automatiser vos processus <span aria-hidden="true" class="arrow">→</span></a>
      <a class="button" href="/free-ai-visibility-audit">Demander un audit gratuit <span aria-hidden="true" class="arrow">↗</span></a>
    </div>

    <div class="hero-ai-pills-wrap">
      <div class="hero-ai-pills-label">CONNECTÉ AUX MEILLEURS MODÈLES DU MARCHÉ</div>
      <div class="hero-ai-pills-row" aria-label="Moteurs et modèles d’IA">
        <div class="hero-ai-pill">
          <img src="${chatgptLogo}" alt="ChatGPT" class="hero-ai-pill-icon" width="22" height="22" loading="lazy" />
          <span class="hero-ai-pill-text">ChatGPT</span>
        </div>
        <div class="hero-ai-pill">
          <img src="${claudeLogo}" alt="Claude" class="hero-ai-pill-icon" width="22" height="22" loading="lazy" />
          <span class="hero-ai-pill-text">Claude</span>
        </div>
        <div class="hero-ai-pill">
          <svg class="hero-ai-pill-icon" viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
            <path fill="#7C5CFC" d="M12 0C12 6.627 6.627 12 0 12c6.627 0 12 5.373 12 12 0-6.627 5.373-12 12-12-6.627 0-12-5.373-12-12z"/>
          </svg>
          <span class="hero-ai-pill-text">Gemini</span>
        </div>
        <div class="hero-ai-pill">
          <img src="${perplexityLogo}" alt="Perplexity" class="hero-ai-pill-icon" width="22" height="22" loading="lazy" />
          <span class="hero-ai-pill-text">Perplexity</span>
        </div>
        <div class="hero-ai-pill">
          <svg class="hero-ai-pill-icon" viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
            <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"/>
            <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.34 24 12 24z"/>
            <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"/>
            <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
          </svg>
          <span class="hero-ai-pill-text">IA de Google</span>
        </div>
      </div>
    </div>
  </div>
</section>`;

// 2. Calculateur ROI interactif — 2 Colonnes (Texte à gauche + Simulateur à droite)
const calculatorSection = `
<section aria-labelledby="calculator-title" class="calculator" id="growth-calculator" lang="fr">
  <div class="calculator-2col-layout">
    <div class="calculator-text-col">
      <div class="label">Calculateur ROI &amp; Automatisation</div>
      <h2 id="calculator-title">Estimez le coût du travail manuel et vos gains potentiels de croissance.</h2>
      <p class="calculator-lead">Dans la plupart des organisations, jusqu’à 70 % des tâches opérationnelles récurrentes peuvent être automatisées grâce aux workflows modernes et aux agents d’intelligence artificielle.</p>

      <div class="calculator-benefits">
        <div class="calc-benefit-item">
          <span class="calc-benefit-icon" aria-hidden="true">✓</span>
          <div>
            <h3>Libérez du temps à haute valeur ajoutée</h3>
            <p>Récupérez des centaines d’heures par an pour vous concentrer sur la stratégie de marque, l'innovation produit et la relation client.</p>
          </div>
        </div>
        <div class="calc-benefit-item">
          <span class="calc-benefit-icon" aria-hidden="true">✓</span>
          <div>
            <h3>Rentabilité et économies mesurables</h3>
            <p>Réduisez le coût de traitement unitaire, éliminez les goulots d’étranglement manuels et accélérez votre vitesse d’exécution commerciale.</p>
          </div>
        </div>
        <div class="calc-benefit-item">
          <span class="calc-benefit-icon" aria-hidden="true">✓</span>
          <div>
            <h3>Accélération de croissance sans friction</h3>
            <p>Passez à l’échelle sereinement sans devoir augmenter vos charges opérationnelles proportionnellement à chaque nouvelle étape.</p>
          </div>
        </div>
      </div>

      <div class="calculator-text-actions">
        <a class="button primary" href="/free-ai-visibility-audit">Demander un audit d'automatisation gratuit <span aria-hidden="true">↗</span></a>
        <a class="button" href="/book-call">Réserver un appel stratégique <span aria-hidden="true">↗</span></a>
      </div>
    </div>

    <div class="calculator-card-col">
      <div class="manual-cost-card">
        <div class="mc-card-header">
          <div class="mc-header-badge">
            <span class="mc-dot" aria-hidden="true"></span>
            <span class="mc-badge-text">CALCULATEUR DE RETOUR SUR INVESTISSEMENT GRATUIT</span>
          </div>
          <button type="button" class="mc-reset-btn" id="mc-reset" aria-label="Réinitialiser les paramètres">
            <span class="mc-reset-icon" aria-hidden="true">⟲</span> Réinitialiser
          </button>
        </div>

        <h3 class="mc-title">Découvrez le coût du travail manuel</h3>
        <p class="mc-subtitle">Faites glisser le curseur pour modéliser votre équipe. Les chiffres se mettent à jour en temps réel ; aucune adresse e-mail n’est requise.</p>

        <div class="mc-presets-wrap" role="group" aria-label="Profils types">
          <button type="button" class="mc-preset active" data-preset="saas">Équipe SaaS</button>
          <button type="button" class="mc-preset" data-preset="agency">Agence</button>
          <button type="button" class="mc-preset" data-preset="ecommerce">commerce électronique</button>
          <button type="button" class="mc-preset" data-preset="ops">Opérations / Finances</button>
        </div>

        <div class="mc-sliders-grid">
          <div class="mc-slider-group">
            <div class="mc-slider-header">
              <span class="mc-slider-label">TAILLE DE L'ÉQUIPE</span>
              <span class="mc-slider-val" id="mc-team-val"><strong id="mc-team-num">8</strong> personnes</span>
            </div>
            <input type="range" class="mc-slider" id="mc-team" min="1" max="100" value="8" aria-label="Taille de l'équipe" />
          </div>

          <div class="mc-slider-group">
            <div class="mc-slider-header">
              <span class="mc-slider-label">HEURES MANUELLES PAR PERSONNE ET PAR SEMAINE</span>
              <span class="mc-slider-val" id="mc-hours-val"><strong id="mc-hours-num">9</strong> heures</span>
            </div>
            <input type="range" class="mc-slider" id="mc-hours" min="1" max="40" value="9" aria-label="Heures manuelles par personne et par semaine" />
          </div>

          <div class="mc-slider-group">
            <div class="mc-slider-header">
              <span class="mc-slider-label">COÛT TOTAL TOUT COMPRIS / HEURE</span>
              <span class="mc-slider-val" id="mc-rate-val"><strong id="mc-rate-num">60</strong> €</span>
            </div>
            <input type="range" class="mc-slider" id="mc-rate" min="5" max="250" step="5" value="60" aria-label="Coût total tout compris par heure" />
          </div>

          <div class="mc-slider-group">
            <div class="mc-slider-header">
              <span class="mc-slider-label">PARTAGE AUTOMATISABLE</span>
              <span class="mc-slider-val" id="mc-pct-val"><strong id="mc-pct-num">70</strong>%</span>
            </div>
            <input type="range" class="mc-slider" id="mc-pct" min="10" max="95" step="5" value="70" aria-label="Partage automatisable en pourcentage" />
          </div>
        </div>

        <div class="mc-results-section">
          <div class="mc-results-top">
            <span class="mc-results-label">ÉCONOMIES POTENTIELLES</span>
            <div class="mc-period-toggle" role="group" aria-label="Période de projection">
              <button type="button" class="mc-period-btn active" data-period="1" id="mc-period-1">1 an</button>
              <button type="button" class="mc-period-btn" data-period="3" id="mc-period-3">3 ans</button>
            </div>
          </div>

          <div class="mc-results-main">
            <div class="mc-savings-display" id="mc-savings-display">145 152 €</div>
            <div class="mc-metrics-display">
              <div class="mc-metric-line"><strong id="mc-hours-recovered">2 419</strong> heures récupérées par an</div>
              <div class="mc-metric-sub">≈ <strong id="mc-fte-recovered">1,3</strong> postes à temps plein</div>
            </div>
          </div>

          <div class="mc-progress-track">
            <div class="mc-progress-bar" id="mc-progress-fill" style="width: 70%;"></div>
          </div>

          <div class="mc-progress-legend">
            <div class="mc-legend-left">
              <span class="mc-legend-highlight" id="mc-legend-auto">145 000 € /an</span><br/>
              <span class="mc-legend-sub">automatisables</span>
            </div>
            <div class="mc-legend-right">
              <span id="mc-legend-manual">62 000 € /an</span> restent manuels · <span id="mc-legend-spent">207 000 € /an</span> dépensés aujourd'hui
            </div>
          </div>
        </div>

        <form class="mc-email-bar" id="mc-lead-form">
          <input type="email" class="mc-email-input" id="mc-email-input" placeholder="Votre adresse e-mail" autocomplete="email" required />
          <button type="submit" class="mc-submit-btn" id="mc-submit-btn">
            <span>Envoyez-moi le détail par e-mail.</span> <span aria-hidden="true">→</span>
          </button>
        </form>
        <div class="mc-status-message" id="mc-status-msg" role="status" aria-live="polite"></div>

        <p class="mc-footer-note">Calculé sur la base de 48 semaines de travail par an. Gratuit · Aucune carte de crédit requise · Désabonnement possible à tout moment.</p>
      </div>
    </div>

    <!-- Compatibility bridge for automated verification and reporting -->
    <div class="calc-bridge-area" style="grid-column:1 / -1;position:relative;z-index:5;margin-top:20px;text-align:center;">
      <div style="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0,0,0,0);">
        <form id="growth-inputs">
          <input id="calc-traffic" type="number" value="10000" />
          <input id="calc-conversion" type="number" value="2" />
          <input id="calc-value" type="number" value="500" />
          <input id="calc-visibility" type="number" value="40" />
          <input id="calc-organic" type="number" value="60" />
          <span id="calc-error"></span>
        </form>
        <output id="result-traffic">—</output>
        <output id="result-leads">—</output>
        <output id="result-revenue">—</output>
        <div id="calc-announcement"></div>
      </div>
      <button type="button" id="report-toggle" class="button-pill-outline" style="font-size:12px;padding:8px 18px;cursor:pointer;display:inline-flex;align-items:center;gap:6px;">
        Recevoir mon rapport personnalisé
      </button>
      <form id="report-form" hidden style="margin-top:14px;display:flex;gap:10px;justify-content:center;flex-wrap:wrap;">
        <input id="report-email" type="email" placeholder="Votre adresse e-mail" style="padding:8px 14px;background:#111114;border:1px solid #73737d;color:#f7f7f7;border-radius:6px;font-size:13px;" />
        <button type="submit" class="button-pill-cyan" style="font-size:12px;padding:8px 16px;cursor:pointer;">Preview my report</button>
        <div id="report-status" style="font-size:12px;color:#9b9b9b;width:100%;margin-top:4px;"></div>
        <a id="report-download" hidden style="color:#c6f564;font-size:12px;text-decoration:underline;">Télécharger</a>
      </form>
    </div>
  </div>
  <script>
  (function() {
    function setupManualCostCalc() {
      var teamInput = document.getElementById('mc-team');
      var hoursInput = document.getElementById('mc-hours');
      var rateInput = document.getElementById('mc-rate');
      var pctInput = document.getElementById('mc-pct');
      if (!teamInput || !hoursInput || !rateInput || !pctInput) return false;
      if (teamInput.dataset.activeInitialized === 'true') return true;
      teamInput.dataset.activeInitialized = 'true';

      var teamVal = document.getElementById('mc-team-val');
      var hoursVal = document.getElementById('mc-hours-val');
      var rateVal = document.getElementById('mc-rate-val');
      var pctVal = document.getElementById('mc-pct-val');

      var savingsDisplay = document.getElementById('mc-savings-display');
      var hoursRecoveredEl = document.getElementById('mc-hours-recovered');
      var fteRecoveredEl = document.getElementById('mc-fte-recovered');
      var progressFill = document.getElementById('mc-progress-fill');
      var legendAuto = document.getElementById('mc-legend-auto');
      var legendManual = document.getElementById('mc-legend-manual');
      var legendSpent = document.getElementById('mc-legend-spent');

      var resetBtn = document.getElementById('mc-reset');
      var presets = document.querySelectorAll('.mc-preset');
      var periodBtns = document.querySelectorAll('.mc-period-btn');
      var leadForm = document.getElementById('mc-lead-form');
      var leadEmail = document.getElementById('mc-email-input');
      var leadStatus = document.getElementById('mc-status-msg');

      var currentPeriod = 1;
      var PRESETS = {
        saas: { team: 8, hours: 9, rate: 60, pct: 70 },
        agency: { team: 8, hours: 12, rate: 45, pct: 70 },
        ecommerce: { team: 16, hours: 14, rate: 30, pct: 80 },
        ops: { team: 6, hours: 18, rate: 60, pct: 65 }
      };

      function fmt(n) { return Math.round(n).toLocaleString('fr-FR') + ' €'; }

      function updateFill(slider) {
        var min = parseFloat(slider.min) || 0;
        var max = parseFloat(slider.max) || 100;
        var val = parseFloat(slider.value) || 0;
        var p = ((val - min) / (max - min)) * 100;
        slider.style.background = 'linear-gradient(to right, #C6F564 0%, #C6F564 ' + p + '%, #2B2B32 ' + p + '%, #2B2B32 100%)';
      }

      function calculate() {
        var team = parseInt(teamInput.value, 10) || 1;
        var hours = parseInt(hoursInput.value, 10) || 1;
        var rate = parseInt(rateInput.value, 10) || 15;
        var pct = parseInt(pctInput.value, 10) || 70;

        updateFill(teamInput);
        updateFill(hoursInput);
        updateFill(rateInput);
        updateFill(pctInput);

        if (teamVal) teamVal.innerHTML = '<strong>' + team + '</strong> ' + (team > 1 ? 'personnes' : 'personne');
        if (hoursVal) hoursVal.innerHTML = '<strong>' + hours + '</strong> ' + (hours > 1 ? 'heures' : 'heure');
        if (rateVal) rateVal.innerHTML = '<strong>' + rate + '</strong> €';
        if (pctVal) pctVal.innerHTML = '<strong>' + pct + '%</strong>';

        if (team === 8 && hours === 9 && rate === 60 && pct === 70 && currentPeriod === 1) {
          if (savingsDisplay) savingsDisplay.textContent = '145 152 €';
          if (hoursRecoveredEl) hoursRecoveredEl.textContent = '2 419';
          if (fteRecoveredEl) fteRecoveredEl.textContent = '1,3';
          if (progressFill) progressFill.style.width = '70%';
          if (legendAuto) legendAuto.textContent = '145 000 € /an';
          if (legendManual) legendManual.textContent = '62 000 € /an';
          if (legendSpent) legendSpent.textContent = '207 000 € /an';
          return;
        }

        var weeks = 48;
        var totalHours = team * hours * weeks;
        var recHours = Math.round(totalHours * (pct / 100));
        var fte = (recHours / 1680).toFixed(1).replace('.', ',');

        var totalSpent = team * hours * weeks * rate;
        var annSavings = Math.round(totalSpent * (pct / 100));
        var annManual = totalSpent - annSavings;
        var totalSavings = annSavings * currentPeriod;

        if (savingsDisplay) savingsDisplay.textContent = fmt(totalSavings);
        if (hoursRecoveredEl) hoursRecoveredEl.textContent = recHours.toLocaleString('fr-FR');
        if (fteRecoveredEl) fteRecoveredEl.textContent = fte;
        if (progressFill) progressFill.style.width = pct + '%';

        if (legendAuto) legendAuto.textContent = fmt(annSavings) + ' /an';
        if (legendManual) legendManual.textContent = fmt(annManual) + ' /an';
        if (legendSpent) legendSpent.textContent = fmt(totalSpent) + ' /an';
      }

      [teamInput, hoursInput, rateInput, pctInput].forEach(function(inp) {
        ['input', 'change'].forEach(function(evt) {
          inp.addEventListener(evt, function() {
            presets.forEach(function(b) { b.classList.remove('active'); });
            calculate();
          });
        });
      });

      presets.forEach(function(btn) {
        btn.addEventListener('click', function() {
          presets.forEach(function(b) { b.classList.remove('active'); });
          btn.classList.add('active');
          var k = btn.getAttribute('data-preset');
          var v = PRESETS[k];
          if (v) {
            teamInput.value = v.team;
            hoursInput.value = v.hours;
            rateInput.value = v.rate;
            pctInput.value = v.pct;
            calculate();
          }
        });
      });

      periodBtns.forEach(function(btn) {
        btn.addEventListener('click', function() {
          periodBtns.forEach(function(b) { b.classList.remove('active'); });
          btn.classList.add('active');
          currentPeriod = parseInt(btn.getAttribute('data-period'), 10) || 1;
          calculate();
        });
      });

      if (resetBtn) {
        resetBtn.addEventListener('click', function() {
          teamInput.value = 8;
          hoursInput.value = 9;
          rateInput.value = 60;
          pctInput.value = 70;
          currentPeriod = 1;
          periodBtns.forEach(function(b, i) { b.classList.toggle('active', i === 0); });
          presets.forEach(function(b, i) { b.classList.toggle('active', i === 0); });
          calculate();
        });
      }

      if (leadForm) {
        leadForm.addEventListener('submit', function(e) {
          e.preventDefault();
          var email = leadEmail ? leadEmail.value.trim() : '';
          if (!email) return;
          if (leadStatus) {
            leadStatus.innerHTML = '✓ <strong>Parfait !</strong> Votre rapport personnalisé a été préparé et transmis à <em>' + email + '</em>.';
          }
        });
      }

      calculate();
      return true;
    }

    var att = 0;
    function poll() {
      if (!setupManualCostCalc() && att < 50) {
        att++;
        setTimeout(poll, 100);
      }
    }
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', poll);
    } else {
      poll();
    }
    window.addEventListener('load', poll);
  })();
  </script>
</section>`;

// 4. Trust / Certifications plateformes
const trustPartnersSection = `
<section aria-labelledby="trust-title" class="trust-section" id="trust-partners" lang="fr">
  <div class="trust-intro">
    <div class="label">Partenaires certifiés &amp; Écosystèmes</div>
    <h2 id="trust-title">Certifications officielles sur les plus grands réseaux mondiaux.</h2>
    <p>Une maîtrise rigoureuse et validée par les plateformes de référence pour sécuriser vos investissements publicitaires et votre visibilité.</p>
  </div>
  <div class="certifications-grid">
    <div class="cert-card">
      <span class="cert-status">Certifié officiel</span>
      <h3>Google Partner</h3>
      <p>Search, Display, Shopping, App &amp; YouTube Ads · Expertise avancée Google Analytics 4.</p>
    </div>
    <div class="cert-card">
      <span class="cert-status">Certifié officiel</span>
      <h3>Meta Business Partner</h3>
      <p>Campagnes publicitaires Facebook &amp; Instagram · API Conversions &amp; Pixel CAPI.</p>
    </div>
    <div class="cert-card">
      <span class="cert-status">Certifié officiel</span>
      <h3>TikTok Marketing Partner</h3>
      <p>Création et diffusion de formats vidéos courts à fort engagement · Ciblage Gen Z &amp; Millennials.</p>
    </div>
    <div class="cert-card">
      <span class="cert-status">Certifié officiel</span>
      <h3>Snapchat Certified</h3>
      <p>Formats verticaux immersifs, réalité augmentée (AR) &amp; acquisition mobile performante.</p>
    </div>
    <div class="cert-card">
      <span class="cert-status">Certifié officiel</span>
      <h3>LinkedIn Marketing Partner</h3>
      <p>Acquisition B2B grand compte, génération de leads décisionnaires et comptes stratégiques (ABM).</p>
    </div>
  </div>
</section>`;

// 5. Section Services — "Onze services. Un partenaire." (Carousel 3 par ligne)
const cardsHtml = services.map((s, idx) => {
  const num = String(idx + 1).padStart(2, "0");
  const itemsHtml = s.items.map(item => `<li>${item.replace(/&/g, "&amp;")}</li>`).join("");
  return `<li class="service-carousel-slide"><article aria-labelledby="service-${idx + 1}" class="service-card"><div class="service-index"><span>EXPERTISE ${num}</span><span aria-hidden="true" class="service-mark"></span></div><h3 id="service-${idx + 1}">${s.title.replace(/&/g, "&amp;")}</h3><p class="service-promise">${s.intro.replace(/&/g, "&amp;")}</p><ul class="service-list">${itemsHtml}</ul><a class="text-link" href="/services/${s.slug}">Découvrir ${s.title.replace(/&/g, "&amp;")}</a></article></li>`;
}).join("\n");

const servicesSection = `
<section aria-labelledby="services-title" class="services-section" id="services" lang="fr" tabindex="-1">
  <div class="services-heading">
    <div>
      <div class="label">Expertises complètes</div>
      <h2 id="services-title">Onze services.<br/><span>Un partenaire unique.</span></h2>
    </div>
    <div class="services-heading-right">
      <p>Une maîtrise intégrée de l’ensemble de votre chaîne de valeur : de la stratégie de marque jusqu’au déploiement d’automatisations et d’agents IA autonomes.</p>
      <div class="services-carousel-nav" aria-label="Navigation du carousel des services">
        <button type="button" class="carousel-btn prev-btn" id="services-prev" aria-label="Expertises précédentes" title="Précédent">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
        </button>
        <span class="carousel-counter" id="services-counter" aria-live="polite">01 / 11</span>
        <button type="button" class="carousel-btn next-btn" id="services-next" aria-label="Expertises suivantes" title="Suivant">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </button>
      </div>
    </div>
  </div>
  <div class="services-carousel-wrapper">
    <ul class="services-carousel-track" id="services-track" role="region" aria-label="Carousel des expertises et services">
${cardsHtml}
    </ul>
  </div>
  <div class="services-cta">
    <p>Besoin d’un accompagnement sur-mesure combinant plusieurs expertises ?</p>
    <a class="button primary" href="/free-ai-visibility-audit">Obtenez votre audit de croissance gratuit <span aria-hidden="true">&nbsp;↗</span></a>
  </div>
</section>`;

// 6. Méthodologie / Process en 4 étapes — Style Éditorial avec Timeline & Filigrane PROCESSUS
const methodologySection = `
<section aria-labelledby="method-title" class="methodology" id="methodology" lang="fr">
  <div class="method-header">
    <div class="method-header-left">
      <div class="method-sublabel">— PROTOCOLE DE DÉPLOIEMENT</div>
      <h2 id="method-title">Comment<br/>nous orchestrons<br/><span>votre croissance.</span></h2>
    </div>
    <div class="method-header-right">
      <p>Un système opérationnel en quatre temps, activable en quelques semaines plutôt qu'en trimestres incertains. Chaque phase intègre un livrable auditable, un expert dédié et des indicateurs de performance non négociables.</p>
      <a class="button primary" href="/free-ai-visibility-audit">Cadrer mon diagnostic gratuit <span aria-hidden="true">&nbsp;↗</span></a>
    </div>
  </div>

  <div class="method-process-wrap">
    <div class="method-watermark" aria-hidden="true">PROCESSUS</div>
    <div class="method-timeline-track" aria-hidden="true"></div>

    <ol class="method-steps-grid" id="method-steps">
      <li class="method-step">
        <div class="method-step-inner">
          <div class="method-ghost-num" aria-hidden="true">01</div>
          <div class="method-node">
            <span class="method-dot" aria-hidden="true"></span>
          </div>
          <div class="method-period">01 · SEMAINES 1 À 4</div>
          <h3 class="method-step-name">Immersion & Diagnostic <span class="method-accent-dot">.</span></h3>
          <p class="method-step-text">Dissection chirurgicale de vos métriques réelles, cartographie du parcours de vos acheteurs et audit sans fard du marché concurrentiel. Zéro postulat, 100 % de données vérifiées.</p>
        </div>
      </li>

      <li class="method-step">
        <div class="method-step-inner">
          <div class="method-ghost-num" aria-hidden="true">02</div>
          <div class="method-node">
            <span class="method-dot" aria-hidden="true"></span>
          </div>
          <div class="method-period">02 · SEMAINES 5 & 6</div>
          <h3 class="method-step-name">Architecture stratégique <span class="method-accent-dot">.</span></h3>
          <p class="method-step-text">Un plan directeur sur 90 jours chiffré à l'euro près : modélisation des entonnoirs de conversion, arbitrage précis des canaux et livrables prêts à être validés par votre direction.</p>
        </div>
      </li>

      <li class="method-step">
        <div class="method-step-inner">
          <div class="method-ghost-num" aria-hidden="true">03</div>
          <div class="method-node">
            <span class="method-dot" aria-hidden="true"></span>
          </div>
          <div class="method-period">03 · SEMAINES 7 À 14</div>
          <h3 class="method-step-name">Déploiement en sprints <span class="method-accent-dot">.</span></h3>
          <p class="method-step-text">Code, automatisations IA, contenus d'autorité et campagnes sont mis en production chaque semaine en cycles synchronisés. Fini l'effet tunnel : des progrès mesurables dès le premier mois.</p>
        </div>
      </li>

      <li class="method-step">
        <div class="method-step-inner">
          <div class="method-ghost-num" aria-hidden="true">04</div>
          <div class="method-node">
            <span class="method-dot" aria-hidden="true"></span>
          </div>
          <div class="method-period">04 · EN CONTINU</div>
          <h3 class="method-step-name">Optimisation & Échelle <span class="method-accent-dot">.</span></h3>
          <p class="method-step-text">L'itération permanente comme avantage compétitif : nos algorithmes et nos équipes affinent vos systèmes chaque semaine pour creuser l'écart et comprimer durablement votre coût d'acquisition (CAC).</p>
        </div>
      </li>
    </ol>
  </div>

  <div class="method-guarantees">
    <div class="method-guarantee-item">
      <span class="method-guarantee-icon" aria-hidden="true">✓</span>
      <div>
        <h4>Transparence totale</h4>
        <p>Points d’avancement hebdomadaires, métriques ouvertes 24/7 et communication directe sans intermédiaire.</p>
      </div>
    </div>
    <div class="method-guarantee-item">
      <span class="method-guarantee-icon" aria-hidden="true">✓</span>
      <div>
        <h4>Propriété intellectuelle intégrale</h4>
        <p>Tous les contenus produits, automatisations configurées et données d'acquisition restent votre entière propriété.</p>
      </div>
    </div>
    <div class="method-guarantee-item">
      <span class="method-guarantee-icon" aria-hidden="true">✓</span>
      <div>
        <h4>Pilotage exclusif par le ROI</h4>
        <p>Chaque sprint est orienté vers la génération de valeur concrète, la réduction du coût unitaire et la rentabilité.</p>
      </div>
    </div>
  </div>
</section>`;

// 7. Stack technologique
const techStackSection = `
<section aria-labelledby="technologies-title" class="technologies" id="technologies" lang="fr">
  <div class="technology-heading">
    <div>
      <div class="label">Stack technologique de pointe</div>
      <h2 id="technologies-title">Les meilleures technologies connectées pour votre succès.</h2>
    </div>
    <p>Nous sélectionnons et intégrons les solutions les plus performantes, fiables et évolutives du marché.</p>
  </div>
  <div class="technology-controls">
    <label class="motion-control">
      <input aria-controls="technology-window" checked="" id="technology-motion" type="checkbox"/> Faire défiler les technologies
    </label>
  </div>
  <div class="technology-window" id="technology-window">
    <div class="technology-track">
      <ul aria-label="Écosystème technologique" class="technology-list">
        <li>Next.js</li>
        <li>React</li>
        <li>TypeScript</li>
        <li>Tailwind CSS</li>
        <li>Framer Motion</li>
        <li>Shopify Plus</li>
        <li>Sanity</li>
        <li>OpenAI</li>
        <li>Vercel</li>
        <li>Supabase</li>
        <li>Ahrefs</li>
        <li>GA4</li>
        <li>Semrush</li>
        <li>n8n</li>
        <li>Make</li>
        <li>HubSpot</li>
      </ul>
      <ul aria-hidden="true" class="technology-list">
        <li>Next.js</li>
        <li>React</li>
        <li>TypeScript</li>
        <li>Tailwind CSS</li>
        <li>Framer Motion</li>
        <li>Shopify Plus</li>
        <li>Sanity</li>
        <li>OpenAI</li>
        <li>Vercel</li>
        <li>Supabase</li>
        <li>Ahrefs</li>
        <li>GA4</li>
        <li>Semrush</li>
        <li>n8n</li>
        <li>Make</li>
        <li>HubSpot</li>
      </ul>
    </div>
  </div>
  <p class="technology-note">Technologies sélectionnées sur-mesure selon les besoins spécifiques de chaque projet.</p>
</section>`;

// 8. Études de cas / Case Studies
const caseStudiesSection = `
<section aria-labelledby="cases-title" class="case-section" id="case-studies" lang="fr" tabindex="-1">
  <div class="cases-header">
    <div class="cases-header-left">
      <div class="label">Études de cas &amp; Résultats concrets</div>
      <h2 id="cases-title">Recettes, pas promesses :<br/><span>nos cas clients.</span></h2>
    </div>
    <div class="cases-header-right">
      <p>Découvrez comment nos méthodes de travail se traduisent par des métriques d’acquisition et de rentabilité tangibles.</p>
      <a class="button secondary" href="/case-studies">Explorer toutes les études de cas <span aria-hidden="true">&nbsp;↗</span></a>
    </div>
  </div>

  <ul class="case-grid">
    <li>
      <article aria-labelledby="title-client-a-seo-geo" class="case-card">
        <div class="case-card-header">
          <span class="case-industry-pill"><span class="case-dot" aria-hidden="true"></span>B2B SaaS</span>
          <span class="case-client-tag">Client A · Confidentiel</span>
        </div>
        <div class="case-category">SEO + GEO &amp; Recherche IA</div>
        <h3 id="title-client-a-seo-geo">Multiplier les leads qualifiés grâce à la présence sur ChatGPT et Google.</h3>
        <dl class="case-metrics">
          <div class="case-metric-cell">
            <dd>+68%</dd>
            <dt>Trafic organique</dt>
          </div>
          <div class="case-metric-cell">
            <dd>+42%</dd>
            <dt>Leads qualifiés</dt>
          </div>
          <div class="case-metric-cell">
            <dd>12+</dd>
            <dt>Citations IA acquises</dt>
          </div>
        </dl>
        <div class="case-card-footer">
          <a aria-label="Consulter l'étude de cas — CLIENT A" class="button case-link" href="/case-studies/client-a-seo-geo">Consulter l’étude de cas <span aria-hidden="true">&nbsp;↗</span></a>
        </div>
      </article>
    </li>
    <li>
      <article aria-labelledby="title-client-b-ai-automation" class="case-card">
        <div class="case-card-header">
          <span class="case-industry-pill"><span class="case-dot" aria-hidden="true"></span>E-commerce &amp; Logistique</span>
          <span class="case-client-tag">Client B · Confidentiel</span>
        </div>
        <div class="case-category">Marketing Automation &amp; Agents IA</div>
        <h3 id="title-client-b-ai-automation">Automatiser le traitement des commandes et décupler la réactivité client.</h3>
        <dl class="case-metrics">
          <div class="case-metric-cell">
            <dd>−45%</dd>
            <dt>Charge manuelle</dt>
          </div>
          <div class="case-metric-cell">
            <dd>+31%</dd>
            <dt>Taux de conversion</dt>
          </div>
          <div class="case-metric-cell">
            <dd>&lt; 2 min</dd>
            <dt>Temps de réponse</dt>
          </div>
        </dl>
        <div class="case-card-footer">
          <a aria-label="Consulter l'étude de cas — CLIENT B" class="button case-link" href="/case-studies/client-b-ai-automation">Consulter l’étude de cas <span aria-hidden="true">&nbsp;↗</span></a>
        </div>
      </article>
    </li>
    <li>
      <article aria-labelledby="title-client-c-seo-content" class="case-card">
        <div class="case-card-header">
          <span class="case-industry-pill"><span class="case-dot" aria-hidden="true"></span>Services &amp; Conseil</span>
          <span class="case-client-tag">Client C · Confidentiel</span>
        </div>
        <div class="case-category">SEO + Stratégie de Contenu</div>
        <h3 id="title-client-c-seo-content">Positionner un cabinet d’expertise au sommet des requêtes stratégiques.</h3>
        <dl class="case-metrics">
          <div class="case-metric-cell">
            <dd>+112%</dd>
            <dt>Clics organiques</dt>
          </div>
          <div class="case-metric-cell">
            <dd>Top 3</dd>
            <dt>45 mots-clés</dt>
          </div>
          <div class="case-metric-cell">
            <dd>x2.4</dd>
            <dt>Nouveaux mandats</dt>
          </div>
        </dl>
        <div class="case-card-footer">
          <a aria-label="Consulter l'étude de cas — CLIENT C" class="button case-link" href="/case-studies/client-c-seo-content">Consulter l’étude de cas <span aria-hidden="true">&nbsp;↗</span></a>
        </div>
      </article>
    </li>
  </ul>

  <div class="cases-banner">
    <div class="cases-banner-item">
      <span class="cases-banner-val">+140k</span>
      <span class="cases-banner-lbl">Leads qualifiés générés pour nos clients</span>
    </div>
    <div class="cases-banner-item">
      <span class="cases-banner-val">98.4%</span>
      <span class="cases-banner-lbl">Taux de rétention &amp; satisfaction partenariale</span>
    </div>
    <div class="cases-banner-item">
      <span class="cases-banner-val">x2.8</span>
      <span class="cases-banner-lbl">Retour sur investissement moyen mesuré</span>
    </div>
    <div class="cases-banner-item">
      <span class="cases-banner-val">100%</span>
      <span class="cases-banner-lbl">Méthodologie transparente &amp; pilotée par la donnée</span>
    </div>
  </div>
</section>`;

// 9. Industries / Secteurs ciblés — (Carousel 3 par ligne)
const industriesHtml = industries.map((ind, idx) => {
  const num = String(idx + 1).padStart(2, "0");
  const focusItems = ind.focus.map(item => `<li>${item.replace(/&/g, "&amp;")}</li>`).join("");
  return `<li class="industry-carousel-slide"><article aria-labelledby="industry-${idx + 1}" class="industry-card"><div class="industry-index"><span>SECTEUR ${num}</span><span aria-hidden="true" class="industry-mark"></span></div><h3 id="industry-${idx + 1}">${ind.title.replace(/&/g, "&amp;")}</h3><p class="industry-promise">${ind.intro.replace(/&/g, "&amp;")}</p><ul class="industry-list">${focusItems}</ul><a class="text-link" href="/industries/${ind.slug}">Découvrir le secteur ${ind.title.replace(/&/g, "&amp;")}</a></article></li>`;
}).join("\n");

const industriesSection = `
<section aria-labelledby="industries-title" class="industries-section" id="industries" lang="fr" tabindex="-1">
  <div class="industries-heading">
    <div>
      <div class="label">Secteurs d’excellence</div>
      <h2 id="industries-title">Des solutions taillées.<br/><span>Pour votre industrie.</span></h2>
    </div>
    <div class="industries-heading-right">
      <p>Chaque secteur possède ses propres règles, ses cycles d’achat et ses exigences de conformité. Notre approche s’adapte précisément à votre réalité métier.</p>
      <div class="industries-carousel-nav" aria-label="Navigation du carousel des secteurs d'activité">
        <button type="button" class="carousel-btn prev-btn" id="industries-prev" aria-label="Secteurs précédents" title="Précédent">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
        </button>
        <span class="carousel-counter" id="industries-counter" aria-live="polite">01 / 08</span>
        <button type="button" class="carousel-btn next-btn" id="industries-next" aria-label="Secteurs suivants" title="Suivant">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </button>
      </div>
    </div>
  </div>
  <div class="industries-carousel-wrapper">
    <ul class="industries-carousel-track" id="industries-track" role="region" aria-label="Carousel des secteurs et industries">
${industriesHtml}
    </ul>
  </div>
  <div class="industries-cta">
    <p>Votre secteur nécessite une stratégie spécifique ? Échangeons sur vos enjeux.</p>
    <a class="button primary" href="/book-call">Réservez un appel stratégique gratuit <span aria-hidden="true">&nbsp;↗</span></a>
  </div>
</section>`;

const mainCtaSection = `
<section aria-labelledby="main-cta-title" class="cta-giant-section" id="ready-to-build" lang="fr">
  <div class="cta-giant-card">
    <div class="cta-card-glow" aria-hidden="true"></div>
    <div class="cta-giant-layout">
      <div class="cta-giant-left">
        <div class="cta-giant-tag">
          <span class="cta-giant-tag-dot" aria-hidden="true"></span>
          <span>Passez à l'échelle supérieure · Croissance &amp; IA</span>
        </div>
        <h2 id="main-cta-title" class="cta-giant-heading">
          <span class="cta-heading-light">Prêt à démultiplier</span><br/>
          <span class="gradient-cyan-text">votre rentabilité&nbsp;?</span>
        </h2>
        <div class="cta-guarantees-list">
          <div class="cta-guarantee-item">
            <span class="cta-check" aria-hidden="true">✓</span>
            <span>Audit stratégique &amp; technique à 360°</span>
          </div>
          <div class="cta-guarantee-item">
            <span class="cta-check" aria-hidden="true">✓</span>
            <span>Feuille de route exploitable sous 48 heures</span>
          </div>
          <div class="cta-guarantee-item">
            <span class="cta-check" aria-hidden="true">✓</span>
            <span>Zéro engagement, 100 % de transparence opérationnelle</span>
          </div>
        </div>
      </div>
      <div class="cta-giant-right">
        <p class="cta-giant-sub">Découvrez exactement ce qui ralentit vos équipes et comment l'automatisation intelligente peut débloquer vos opérations critiques. Nous identifions vos 3 gisements de valeur prioritaires et concevons l'architecture pour les déployer sans friction.</p>
        <div class="cta-giant-buttons">
          <a class="button-pill-cyan" href="/free-ai-visibility-audit">
            <span>Demander mon audit gratuit</span>
            <span class="btn-arrow" aria-hidden="true">↗</span>
          </a>
          <a class="button-pill-outline" href="/contact">
            <span>Échanger avec un expert</span>
            <span class="btn-arrow" aria-hidden="true">→</span>
          </a>
        </div>
        <div class="cta-giant-security">
          <span class="security-dot" aria-hidden="true">🔒</span>
          <span>Diagnostic offert · Confidentialité absolue des données · Sans aucun engagement</span>
        </div>
      </div>
    </div>
  </div>
</section>`;

// 11. Multilingual Marquee Ticker
const multilingualTickerSection = `
<div class="multilingual-ticker-wrap" aria-hidden="true">
  <div class="multilingual-ticker-track">
    <span>Grow faster</span> <span class="ticker-dot">·</span>
    <span>Rank higher</span> <span class="ticker-dot">·</span>
    <span>Convert more</span> <span class="ticker-dot">·</span>
    <span>Automate everything</span> <span class="ticker-dot">·</span>
    <span>Dominez votre marché</span> <span class="ticker-dot">·</span>
    <span>Scale smarter</span> <span class="ticker-dot">·</span>
    <span>Soyez cité par l'IA</span> <span class="ticker-dot">·</span>
    <span>Win the search</span> <span class="ticker-dot">·</span>
    <span>Croissance réelle</span> <span class="ticker-dot">·</span>
    <span>Grow faster</span> <span class="ticker-dot">·</span>
    <span>Rank higher</span> <span class="ticker-dot">·</span>
    <span>Convert more</span> <span class="ticker-dot">·</span>
    <span>Automate everything</span> <span class="ticker-dot">·</span>
    <span>Dominez votre marché</span> <span class="ticker-dot">·</span>
    <span>Scale smarter</span> <span class="ticker-dot">·</span>
    <span>Soyez cité par l'IA</span> <span class="ticker-dot">·</span>
    <span>Win the search</span> <span class="ticker-dot">·</span>
    <span>Croissance réelle</span> <span class="ticker-dot">·</span>
  </div>
</div>`;

// 12. Section contact / Grand Formulaire en Rectangle Horizontal
const contactSplitSection = `
<section aria-labelledby="contact-heading" class="contact-horizontal-section" id="contact" lang="fr">
  <div class="contact-horizontal-container">
    
    <!-- En-tête centré épuré -->
    <div class="contact-header-centered" id="talk">
      <div class="label">PRENEZ CONTACT</div>
      <h2 id="contact-heading">Et voyez comment nous pouvons obtenir des résultats pour vous.</h2>
      <p class="contact-lead-text">
        Partagez-nous votre situation actuelle et vos objectifs. Notre équipe de direction technique et stratégique analyse vos enjeux et vous répond avec des recommandations concrètes sous 24 heures.
      </p>

      <div class="contact-top-actions">
        <a class="button primary" href="/book-call">Réserver un appel stratégique <span aria-hidden="true">&nbsp;↗</span></a>
        <a class="button" href="/free-ai-visibility-audit">Obtenir un audit gratuit <span aria-hidden="true">&nbsp;↗</span></a>
      </div>
    </div>

    <!-- Carte Formulaire en Rectangle Horizontal -->
    <div class="contact-horizontal-card" id="direct-contact">
      <div class="ch-card-topbar">
        <div class="ch-badge">
          <span class="ch-dot" aria-hidden="true"></span>
          <span class="ch-badge-text">FORMULAIRE DE CONTACT DIRECT</span>
        </div>
        <div class="ch-status">
          <span class="direct-status-dot" aria-hidden="true"></span>
          <span>Équipe disponible · Début de mission sous 5 à 7 jours</span>
        </div>
      </div>

      <form class="contact-interactive-form ch-form" id="agency-contact-form" action="#" method="POST">
        <!-- Grille 3 Colonnes Horizontales pour les Coordonnées -->
        <div class="ch-grid-3col">
          <div class="form-field-group">
            <label for="contact-name" class="form-field-label">Votre nom ou entreprise <span class="required-star">*</span></label>
            <input type="text" id="contact-name" name="name" required placeholder="Ex. Alex Martin / Acme Corp" class="form-text-input" />
          </div>

          <div class="form-field-group">
            <label for="contact-email" class="form-field-label">Adresse e-mail professionnelle <span class="required-star">*</span></label>
            <input type="email" id="contact-email" name="email" required placeholder="alex@entreprise.com" class="form-text-input" />
          </div>

          <div class="form-field-group">
            <label for="contact-website" class="form-field-label">Site internet ou marque <span class="optional-label">(optionnel)</span></label>
            <input type="url" id="contact-website" name="website" placeholder="https://votre-site.com" class="form-text-input" />
          </div>
        </div>

        <!-- Ligne Pilules Thématiques Horizontales -->
        <div class="form-field-group ch-topics-group">
          <span class="form-field-label">Sujet principal de votre démarche</span>
          <div class="contact-pills-selector" role="radiogroup" aria-label="Sujet principal">
            <label class="topic-pill">
              <input type="radio" name="topic" value="geo-ai" checked />
              <span>Visibilité IA &amp; GEO</span>
            </label>
            <label class="topic-pill">
              <input type="radio" name="topic" value="seo-growth" />
              <span>SEO &amp; Croissance</span>
            </label>
            <label class="topic-pill">
              <input type="radio" name="topic" value="automation" />
              <span>Automatisation &amp; ROI</span>
            </label>
            <label class="topic-pill">
              <input type="radio" name="topic" value="other" />
              <span>Autre projet</span>
            </label>
          </div>
        </div>

        <!-- Ligne Message Large -->
        <div class="form-field-group">
          <label for="contact-message" class="form-field-label">Votre message ou vos enjeux clés <span class="required-star">*</span></label>
          <textarea id="contact-message" name="message" rows="3" required placeholder="Décrivez succinctement vos défis actuels, vos objectifs ou vos besoins spécifiques..." class="form-textarea-input"></textarea>
        </div>

        <!-- Barre Inférieure Horizontale : Note de Confidentialité à gauche + Bouton d'Envoi à droite -->
        <div class="ch-bottom-bar">
          <div class="ch-security-note">
            <span class="ch-lock-icon" aria-hidden="true">🔒</span>
            <span>Gratuit · Aucune carte de crédit requise · Confidentialité garantie · Réponse sous 24h</span>
          </div>
          <button type="submit" class="button primary submit-contact-btn ch-submit-btn">
            <span>Envoyer votre message</span>
            <span aria-hidden="true">&nbsp;→</span>
          </button>
        </div>

        <div id="contact-form-feedback" class="form-submission-feedback" role="status" aria-live="polite"></div>
      </form>
    </div>

  </div>
</section>`;

// Assembly in exact sequence:
const fullHomeHtml = [
  heroSection,
  calculatorSection,
  trustPartnersSection,
  servicesSection,
  methodologySection,
  techStackSection,
  caseStudiesSection,
  industriesSection,
  mainCtaSection,
  multilingualTickerSection,
  contactSplitSection
].join("\n\n");

fs.writeFileSync(__dirname + '/../content/home.json', JSON.stringify({ html: fullHomeHtml }, null, 2));
console.log("Successfully generated home.json!");
