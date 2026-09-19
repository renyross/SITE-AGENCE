"""Regenerate the static case-study prototype from editable JSON."""
from pathlib import Path
from html import escape
import json

ROOT = Path(__file__).resolve().parent
cases = json.loads((ROOT / '11-case-studies.json').read_text())
assert len({case['slug'] for case in cases}) == len(cases), 'Slugs must be unique'
assert all(case['status'] == 'demo' for case in cases), 'This prototype only renders fictional examples'
source = (ROOT / '10-methodologie.html').read_text().replace('Signal — How we grow', 'Signal — Case studies')
css = '''
.case-section{padding:clamp(64px,9vw,128px) 0;border-bottom:1px solid #2B2B32;scroll-margin-top:1rem}.case-section>h2{font-size:clamp(2rem,1.25rem + 3vw,4rem);line-height:1.12;letter-spacing:-.035em;margin:20px 0 24px}.case-intro{max-width:65ch;margin-bottom:36px}.case-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:20px;list-style:none;padding:0;margin:0}.case-card{height:100%;display:flex;flex-direction:column;padding:clamp(20px,2.5vw,32px);border:1px solid #2B2B32;border-radius:12px;background:#111114;min-width:0;transition:background .22s,border-color .22s}.case-card:hover,.case-card:focus-within{background:#19191E;border-color:#73737D}.case-category{font-size:.75rem;letter-spacing:.08em;text-transform:uppercase;color:#C6F564;margin:20px 0 12px}.case-card h3{font-size:1.5rem;line-height:1.2;letter-spacing:-.025em;margin:0 0 20px}.case-client{font-size:.875rem;color:#9B9B9B;margin:20px 0 0}.case-metrics{margin:auto 0 24px}.case-metrics>div{display:flex;flex-direction:column-reverse;gap:8px;border-top:1px solid #2B2B32;padding-top:20px;margin-top:20px}.case-metrics dt{font-size:.875rem;line-height:1.5;color:#9B9B9B}.case-metrics dd{font-size:clamp(2rem,1.5rem + 2vw,3.5rem);letter-spacing:-.035em;font-weight:700;line-height:1.1;margin:0;color:#C6F564;font-variant-numeric:tabular-nums}.case-card>.button{margin-top:8px;min-height:48px}.case-details{margin-top:24px;border:1px solid #2B2B32;border-radius:12px;padding:clamp(20px,3vw,36px);scroll-margin-top:1rem}.case-details:target{border-color:#C6F564}.case-details>summary{justify-content:space-between;gap:16px;font-size:1.125rem;font-weight:600;text-align:left;min-height:48px}.case-details>summary::after{content:'+';color:#C6F564}.case-details[open]>summary::after{content:'−'}.case-detail-grid{display:grid;grid-template-columns:1fr 1fr;gap:24px 40px;margin-top:28px}.case-detail-grid h4{font-size:1rem;margin:0 0 12px}.case-detail-grid p{font-size:1rem;margin:0}.case-evidence{margin-top:24px;padding-top:20px;border-top:1px solid #2B2B32;font-size:.875rem}.case-details .button{margin-top:16px;min-height:48px}
@media(max-width:63.999rem){.case-grid{grid-template-columns:1fr}.case-metrics{display:flex;flex-wrap:wrap;gap:24px;margin-top:0}.case-metrics>div{flex:1 1 140px}}@media(max-width:47.999rem){.case-detail-grid{grid-template-columns:1fr}}@media(prefers-reduced-motion:reduce){.case-card{transition:none}}
'''
cards, details = [], []
for case in cases:
    slug = escape(case['slug'], quote=True)
    client, title = escape(case['client']), escape(case['title'])
    metrics = ''.join('<div><dt>' + escape(m['label']) + '</dt><dd>' + escape(m['value']) + '</dd></div>' for m in case['metrics'])
    cards.append(f'''<li><article class="case-card" aria-labelledby="title-{slug}"><span class="demo-badge">Fictional case · Demo</span><p class="case-client">{client}</p><div class="case-category">{escape(case['category'])}</div><h3 id="title-{slug}">{title}</h3><dl class="case-metrics">{metrics}</dl><a class="button case-link" href="#{slug}" aria-label="View case study — {client}">View case study <span aria-hidden="true">&nbsp;↗</span></a></article></li>''')
    blocks = ''.join(f'<div><h4>{label}</h4><p>{escape(case[key])}</p></div>' for key, label in [('context','Context'),('problem','Problem'),('strategy','Strategy'),('results','Illustrative results')])
    details.append(f'''<details class="case-details" id="{slug}"><summary>{client} — {escape(case['category'])}<span class="sr-only"> — fictional example</span></summary><p class="demo-badge">Fictional scenario and results — not a client reference.</p><div class="case-detail-grid">{blocks}</div><p class="case-evidence">{escape(case['measurementNotes'])}</p><a class="button primary" href="#call">Discuss a similar challenge <span aria-hidden="true">&nbsp;↗</span></a></details>''')
section = '''<section class="case-section" id="case-studies" tabindex="-1" lang="en" aria-labelledby="cases-title"><div class="label">06 / Case study previews</div><h2 id="cases-title">Proof, not promises.</h2><p class="case-intro">Demo content: the following scenarios and figures are fictional examples of how future, verified client stories will be presented.</p><ul class="case-grid">''' + '\n'.join(cards) + '</ul>' + '\n'.join(details) + '</section>\n'
source = source.replace('</style>', css + '\n</style>')
source = source.replace('<section class="preview-notes">', section + '<section class="preview-notes">')
source = source.replace('<section class="demo" id="case-studies" tabindex="-1"><h2>Case Studies</h2><div class="route">/case-studies</div><p>Destination prévue pour les études de cas documentées.</p></section>', '')
source = source.replace('</body>', '<script src="11-case-studies.js"></script>\n</body>')
(ROOT / '11-case-studies.html').write_text(source)
