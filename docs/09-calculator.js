(function () {
  'use strict';
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
  const form = document.getElementById('growth-inputs');
  const keys = ['traffic', 'conversion', 'value', 'visibility', 'organic'];
  const fields = keys.map(key => document.getElementById('calc-' + key));
  const outputs = ['traffic', 'leads', 'revenue'].map(key => document.getElementById('result-' + key));
  const toggle = document.getElementById('report-toggle');
  const report = document.getElementById('report-form');
  const status = document.getElementById('report-status');
  const download = document.getElementById('report-download');
  const number = new Intl.NumberFormat('en-GB', {maximumFractionDigits: 0});
  const currency = new Intl.NumberFormat('en-GB', {style:'currency', currency:'EUR', maximumFractionDigits:0});
  let current = null, url = null, announcement;
  function clearReport() {
    if (url) URL.revokeObjectURL(url);
    url = null; download.hidden = true; download.removeAttribute('href'); status.textContent = '';
  }
  function update() {
    clearReport(); clearTimeout(announcement);
    const valid = fields.every(field => field.value.trim() !== '' && field.validity.valid);
    fields.forEach(field => field.setAttribute('aria-invalid', String(!field.validity.valid || field.value.trim() === '')));
    document.getElementById('calc-error').textContent = valid ? '' : 'Enter all five values within the limits shown. Percentages and the score must be between 0 and 100.';
    toggle.disabled = !valid;
    if (!valid) {
      current = null; outputs.forEach(output => {output.textContent = '—';});
      document.getElementById('calc-announcement').textContent = 'Estimates unavailable until the inputs are valid.';
      return;
    }
    const inputs = Object.fromEntries(keys.map((key, index) => [key, fields[index].valueAsNumber]));
    current = {inputs, results:calculateGrowth(inputs)};
    const {missedTraffic, leads, revenue} = current.results;
    outputs[0].textContent = number.format(missedTraffic);
    outputs[1].textContent = number.format(leads);
    outputs[2].textContent = currency.format(revenue);
    announcement = setTimeout(() => {
      document.getElementById('calc-announcement').textContent = `Monthly scenario: ${number.format(missedTraffic)} additional visits, ${number.format(leads)} additional conversions, ${currency.format(revenue)} potential revenue.`;
    }, 400);
  }
  form.addEventListener('input', update);
  form.addEventListener('submit', event => {event.preventDefault(); update();});
  toggle.addEventListener('click', () => {
    report.hidden = !report.hidden;
    toggle.setAttribute('aria-expanded', String(!report.hidden));
    if (!report.hidden) document.getElementById('report-email').focus();
  });
  report.addEventListener('submit', event => {
    event.preventDefault();
    if (!current) {status.textContent = 'Correct the calculator inputs before preparing your report.'; return;}
    if (!report.reportValidity()) return;
    clearReport();
    const {inputs:i, results:r} = current;
    const text = [
      'ILLUSTRATIVE MONTHLY GROWTH SCENARIO — EUR',
      'Hypothetical model. Not measured losses, a forecast or guaranteed growth.',
      '', 'INPUTS', `Monthly visits: ${i.traffic}`, `Customer conversion rate: ${i.conversion}%`,
      `Average customer value: EUR ${i.value}`, `AI visibility score: ${i.visibility}/100`, `Organic share: ${i.organic}%`,
      '', 'RESULTS (rounded for display)', `Additional visits: ${number.format(r.missedTraffic)}`,
      `Additional conversions: ${number.format(r.leads)}`, `Revenue opportunity: ${currency.format(r.revenue)}`,
      '', 'METHOD', 'Traffic × organic share × (1 − visibility / 100) × 20%.',
      'The 20% factor and score-to-traffic relationship are hypothetical assumptions, not benchmarks.',
      'Conversions = additional traffic × conversion rate. Revenue = unrounded conversions × customer value.',
      'If conversion rate represents leads, use average revenue per lead instead of customer value.',
      'This prototype does not measure AI visibility or send email. No email address is included in this file.'
    ].join('\n');
    url = URL.createObjectURL(new Blob([text], {type:'text/plain;charset=utf-8'}));
    download.href = url; download.hidden = false;
    status.textContent = 'Report ready to download. No email has been sent.';
  });
  window.addEventListener('pagehide', clearReport);
  update();
}());
