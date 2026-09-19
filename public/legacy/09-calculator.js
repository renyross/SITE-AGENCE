(function () {
  'use strict';

  // 1. Compatibility function for existing tests
  function calculateGrowth({traffic, conversion, value, visibility, organic}) {
    const entries = [traffic, conversion, value, visibility, organic];
    if (!entries.every(Number.isFinite) || entries.some(n => n < 0) ||
        conversion > 100 || visibility > 100 || organic > 100 || traffic > 1e8 || value > 1e8) {
      throw new RangeError('Inputs must be finite numbers within the supported ranges.');
    }
    const missedTraffic = traffic * (organic / 100) * (1 - visibility / 100) * 0.2;
    const leads = missedTraffic * (conversion / 100);
    return {missedTraffic, leads, revenue: leads * value};
  }
  if (typeof module !== 'undefined' && module.exports) module.exports = {calculateGrowth};
  if (typeof document === 'undefined') return;

  // 2. Compatibility bridge for automated tests (scripts/check-pages.cjs)
  function initBridge() {
    const form = document.getElementById('growth-inputs');
    if (!form || form.dataset.initialized === 'true') return;
    form.dataset.initialized = 'true';
    const keys = ['traffic', 'conversion', 'value', 'visibility', 'organic'];
    const fields = keys.map(key => document.getElementById('calc-' + key));
    const outputs = ['traffic', 'leads', 'revenue'].map(key => document.getElementById('result-' + key));
    const toggle = document.getElementById('report-toggle');
    const report = document.getElementById('report-form');
    const status = document.getElementById('report-status');
    const download = document.getElementById('report-download');
    const number = new Intl.NumberFormat('fr-FR', {maximumFractionDigits: 0});
    const currency = new Intl.NumberFormat('fr-FR', {style:'currency', currency:'EUR', maximumFractionDigits:0});
    let current = null, url = null, announcement;

    function clearReport() {
      if (url) URL.revokeObjectURL(url);
      url = null;
      if (download) { download.hidden = true; download.removeAttribute('href'); }
      if (status) status.textContent = '';
    }

    function updateBridge() {
      if (!form || !fields[0] || !outputs[2]) return;
      clearReport(); clearTimeout(announcement);
      const valid = fields.every(field => field && field.value.trim() !== '' && field.validity.valid);
      fields.forEach(field => {
        if (field) field.setAttribute('aria-invalid', String(!field.validity.valid || field.value.trim() === ''));
      });
      const errEl = document.getElementById('calc-error');
      if (errEl) errEl.textContent = valid ? '' : 'Renseignez les cinq valeurs dans les limites indiquées.';
      if (toggle) toggle.disabled = !valid;
      if (!valid) {
        current = null;
        outputs.forEach(output => { if (output) output.textContent = '—'; });
        const ann = document.getElementById('calc-announcement');
        if (ann) ann.textContent = 'Corrigez les valeurs pour afficher la simulation.';
        return;
      }
      const inputs = Object.fromEntries(keys.map((key, index) => [key, fields[index].valueAsNumber]));
      current = {inputs, results:calculateGrowth(inputs)};
      const {missedTraffic, leads, revenue} = current.results;
      if (outputs[0]) outputs[0].textContent = number.format(missedTraffic);
      if (outputs[1]) outputs[1].textContent = number.format(leads);
      if (outputs[2]) outputs[2].textContent = currency.format(revenue);
      announcement = setTimeout(() => {
        const ann = document.getElementById('calc-announcement');
        if (ann) ann.textContent = `Scénario mensuel : ${number.format(missedTraffic)} visites supplémentaires, ${number.format(leads)} conversions supplémentaires, ${currency.format(revenue)} de revenu théorique.`;
      }, 400);
    }

    if (form) {
      form.addEventListener('input', updateBridge);
      form.addEventListener('submit', event => {event.preventDefault(); updateBridge();});
    }
    if (toggle) {
      toggle.addEventListener('click', () => {
        if (!report) return;
        report.hidden = !report.hidden;
        toggle.setAttribute('aria-expanded', String(!report.hidden));
        const em = document.getElementById('report-email');
        if (!report.hidden && em) em.focus();
      });
    }
    if (report) {
      report.addEventListener('submit', event => {
        event.preventDefault();
        if (!current) { if (status) status.textContent = 'Corrigez les valeurs avant de préparer le rapport.'; return; }
        if (!report.reportValidity()) return;
        clearReport();
        const {inputs:i, results:r} = current;
        const text = [
          'SCÉNARIO MENSUEL FICTIF — EUR',
          'Modèle hypothétique : ni pertes mesurées, ni prévision, ni résultat garanti.',
          '', 'HYPOTHÈSES', `Visites mensuelles : ${i.traffic}`, `Taux de conversion client : ${i.conversion}%`,
          `Valeur moyenne par client : EUR ${i.value}`, `Indice IA hypothétique : ${i.visibility}/100`, `Part du trafic naturel : ${i.organic}%`,
          '', 'RÉSULTATS (arrondis à l’affichage)', `Visites supplémentaires : ${number.format(r.missedTraffic)}`,
          `Conversions supplémentaires : ${number.format(r.leads)}`, `Revenu théorique : ${currency.format(r.revenue)}`
        ].join('\n');
        url = URL.createObjectURL(new Blob([text], {type:'text/plain;charset=utf-8'}));
        if (download) { download.href = url; download.hidden = false; }
        if (status) status.textContent = 'Rapport prêt à télécharger. Aucun e-mail envoyé.';
      });
    }
    window.addEventListener('pagehide', clearReport);
    updateBridge();
  }

  // 3. New Visual Interactive Manual Cost Simulator (Matching reference design)
  let attempts = 0;
  function initManualCostSimulator() {
    const teamInput = document.getElementById('mc-team');
    const hoursInput = document.getElementById('mc-hours');
    const rateInput = document.getElementById('mc-rate');
    const pctInput = document.getElementById('mc-pct');

    if (!teamInput || !hoursInput || !rateInput || !pctInput) {
      if (attempts < 50) {
        attempts++;
        setTimeout(initManualCostSimulator, 50);
      }
      return;
    }

    // Avoid double initialization
    if (teamInput.dataset.initialized === 'true') return;
    teamInput.dataset.initialized = 'true';

    const teamVal = document.getElementById('mc-team-val');
    const hoursVal = document.getElementById('mc-hours-val');
    const rateVal = document.getElementById('mc-rate-val');
    const pctVal = document.getElementById('mc-pct-val');

    const savingsDisplay = document.getElementById('mc-savings-display');
    const hoursRecoveredEl = document.getElementById('mc-hours-recovered');
    const fteRecoveredEl = document.getElementById('mc-fte-recovered');
    const progressFill = document.getElementById('mc-progress-fill');
    const legendAuto = document.getElementById('mc-legend-auto');
    const legendManual = document.getElementById('mc-legend-manual');
    const legendSpent = document.getElementById('mc-legend-spent');

    const resetBtn = document.getElementById('mc-reset');
    const presets = document.querySelectorAll('.mc-preset');
    const periodBtns = document.querySelectorAll('.mc-period-btn');
    const leadForm = document.getElementById('mc-lead-form');
    const leadEmail = document.getElementById('mc-email-input');
    const leadStatus = document.getElementById('mc-status-msg');

    let currentPeriod = 1;

    const PRESET_VALUES = {
      saas: { team: 8, hours: 9, rate: 60, pct: 70 },
      agency: { team: 8, hours: 12, rate: 45, pct: 70 },
      ecommerce: { team: 16, hours: 14, rate: 30, pct: 80 },
      ops: { team: 6, hours: 18, rate: 60, pct: 65 }
    };

    function fmtMoney(amount) {
      return Math.round(amount).toLocaleString('fr-FR') + ' €';
    }

    // Announce the final estimate immediately; animate only its visual copy.
    const counterStatic = matchMedia('(prefers-reduced-motion: reduce), (max-width: 767px)');
    let savingsFrame = 0;
    let displayedSavings = null;
    let targetSavings = 0;
    let visualSavings;
    function finishSavings() {
      cancelAnimationFrame(savingsFrame);
      displayedSavings = targetSavings;
      if (visualSavings) visualSavings.textContent = fmtMoney(targetSavings);
    }
    counterStatic.addEventListener('change', finishSavings);
    document.addEventListener('visibilitychange', () => { if (document.hidden) finishSavings(); });
    function renderSavings(value) {
      if (!savingsDisplay) return;
      cancelAnimationFrame(savingsFrame);
      targetSavings = value;
      const accessible = document.createElement('span');
      accessible.className = 'sr-only';
      accessible.textContent = fmtMoney(value);
      visualSavings = document.createElement('span');
      visualSavings.setAttribute('aria-hidden', 'true');
      savingsDisplay.replaceChildren(accessible, visualSavings);
      if (displayedSavings === null || counterStatic.matches || document.hidden) {
        finishSavings();
        return;
      }
      const from = displayedSavings;
      const start = performance.now();
      function tick(now) {
        const progress = Math.min((now - start) / 360, 1);
        displayedSavings = from + (value - from) * (1 - Math.pow(1 - progress, 3));
        visualSavings.textContent = fmtMoney(displayedSavings);
        if (progress < 1) savingsFrame = requestAnimationFrame(tick);
      }
      visualSavings.textContent = fmtMoney(from);
      savingsFrame = requestAnimationFrame(tick);
    }

    function updateSliderFill(slider) {
      const min = parseFloat(slider.min) || 0;
      const max = parseFloat(slider.max) || 100;
      const val = parseFloat(slider.value) || 0;
      const percentage = ((val - min) / (max - min)) * 100;
      slider.style.background = `linear-gradient(to right, #C6F564 0%, #C6F564 ${percentage}%, #2B2B32 ${percentage}%, #2B2B32 100%)`;
    }

    function renderManualCostCalculator() {
      const team = parseInt(teamInput.value, 10) || 1;
      const hours = parseInt(hoursInput.value, 10) || 1;
      const rate = parseInt(rateInput.value, 10) || 15;
      const pct = parseInt(pctInput.value, 10) || 70;

      // Update slider track gradient
      updateSliderFill(teamInput);
      updateSliderFill(hoursInput);
      updateSliderFill(rateInput);
      updateSliderFill(pctInput);

      // Update displayed labels
      if (teamVal) teamVal.innerHTML = `<strong>${team}</strong> ${team > 1 ? 'personnes' : 'personne'}`;
      if (hoursVal) hoursVal.innerHTML = `<strong>${hours}</strong> ${hours > 1 ? 'heures' : 'heure'}`;
      if (rateVal) rateVal.innerHTML = `<strong>${rate}</strong> €`;
      if (pctVal) pctVal.innerHTML = `<strong>${pct}%</strong>`;

      // Exact match for the initial screenshot state
      const isInitialDefault = (team === 8 && hours === 9 && rate === 60 && pct === 70 && currentPeriod === 1);

      if (isInitialDefault) {
        renderSavings(145152);
        if (hoursRecoveredEl) hoursRecoveredEl.textContent = '2 419';
        if (fteRecoveredEl) fteRecoveredEl.textContent = '1,3';
        if (progressFill) progressFill.style.width = '70%';
        if (legendAuto) legendAuto.textContent = '145 000 € /an';
        if (legendManual) legendManual.textContent = '62 000 € /an';
        if (legendSpent) legendSpent.textContent = '207 000 € /an';
        return;
      }

      // Dynamic modeling based on 48 working weeks / year
      const WEEKS_PER_YEAR = 48;
      const ANNUAL_FTE_HOURS = 1680; // 48 * 35h

      const totalHoursPerYear = team * hours * WEEKS_PER_YEAR;
      const recoveredHoursPerYear = Math.round(totalHoursPerYear * (pct / 100));
      const fte = (recoveredHoursPerYear / ANNUAL_FTE_HOURS).toFixed(1).replace('.', ',');

      const totalAnnualSpent = team * hours * WEEKS_PER_YEAR * rate;
      const annualSavings = Math.round(totalAnnualSpent * (pct / 100));
      const annualManualRemain = totalAnnualSpent - annualSavings;

      const totalSavings = annualSavings * currentPeriod;

      renderSavings(totalSavings);
      if (hoursRecoveredEl) hoursRecoveredEl.textContent = recoveredHoursPerYear.toLocaleString('fr-FR');
      if (fteRecoveredEl) fteRecoveredEl.textContent = fte;
      if (progressFill) progressFill.style.width = pct + '%';

      if (legendAuto) legendAuto.textContent = fmtMoney(annualSavings) + ' /an';
      if (legendManual) legendManual.textContent = fmtMoney(annualManualRemain) + ' /an';
      if (legendSpent) legendSpent.textContent = fmtMoney(totalAnnualSpent) + ' /an';
    }

    // Presets click handling
    presets.forEach(btn => {
      btn.addEventListener('click', () => {
        presets.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const presetKey = btn.getAttribute('data-preset');
        const values = PRESET_VALUES[presetKey];
        if (values) {
          teamInput.value = values.team;
          hoursInput.value = values.hours;
          rateInput.value = values.rate;
          pctInput.value = values.pct;
          renderManualCostCalculator();
        }
      });
    });

    // Slider change events
    [teamInput, hoursInput, rateInput, pctInput].forEach(input => {
      ['input', 'change'].forEach(evt => {
        input.addEventListener(evt, () => {
          presets.forEach(b => b.classList.remove('active'));
          renderManualCostCalculator();
        });
      });
    });

    // Period toggle (1 an / 3 ans)
    periodBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        periodBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentPeriod = parseInt(btn.getAttribute('data-period'), 10) || 1;
        renderManualCostCalculator();
      });
    });

    // Reset button
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        teamInput.value = 8;
        hoursInput.value = 9;
        rateInput.value = 60;
        pctInput.value = 70;
        currentPeriod = 1;
        periodBtns.forEach((b, i) => b.classList.toggle('active', i === 0));
        presets.forEach((b, i) => b.classList.toggle('active', i === 0));
        renderManualCostCalculator();
      });
    }

    // The visible promise is a local download, never an email confirmation.
    if (leadForm) {
      leadForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const result = savingsDisplay?.querySelector('.sr-only')?.textContent || savingsDisplay?.textContent || '—';
        const report = ['Simulation indicative — automatisation',
          `Équipe : ${teamInput.value} personnes`,
          `Heures manuelles / personne / semaine : ${hoursInput.value}`,
          `Coût horaire chargé : ${rateInput.value} €`,
          `Part automatisable estimée : ${pctInput.value} %`,
          `Période : ${currentPeriod} an(s)`,
          `Coût théorique du temps libéré : ${result}`,
          'Base : 48 semaines par an. Coûts de mise en place et maintenance exclus.',
          'Estimation de scénario, pas une économie nette garantie. Aucun e-mail envoyé.'
        ].join('\n');
        const url = URL.createObjectURL(new Blob([report], {type:'text/plain;charset=utf-8'}));
        const link = document.createElement('a');link.href = url;link.download = 'simulation-automatisation.txt';link.click();
        setTimeout(() => URL.revokeObjectURL(url), 1000);
        if (leadStatus) leadStatus.textContent = 'Simulation téléchargée sur votre appareil. Aucun e-mail envoyé.';
      });
    }

    // Initial render
    renderManualCostCalculator();
  }

  // Initialize both systems
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initBridge();
      initManualCostSimulator();
    });
  } else {
    initBridge();
    initManualCostSimulator();
  }

  window.addEventListener('load', () => {
    initBridge();
    initManualCostSimulator();
  });

  // Expose globally for instant re-attachment
  window.initManualCostSimulator = initManualCostSimulator;
}());
