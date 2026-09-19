"""Build the testimonial preview from editable demonstration content."""
from pathlib import Path
from html import escape
import json

ROOT = Path(__file__).resolve().parent
testimonials = json.loads((ROOT / '16-testimonials.json').read_text())
assert len({item['id'] for item in testimonials}) == len(testimonials)
assert all(item['status'] == 'demo' for item in testimonials), 'This preview requires explicitly fictional content.'
source = (ROOT / '15-geo-ai-search.html').read_text().replace('Signal — SEO, GEO and AI Search', 'Signal — Testimonials')
css = '''
.testimonials{padding:clamp(64px,9vw,128px) 0;border-bottom:1px solid #2B2B32}.testimonials>h2{font-size:clamp(2rem,1.25rem + 3vw,4rem);line-height:1.12;letter-spacing:-.035em;margin:20px 0 24px}.testimonials-intro{max-width:70ch;margin-bottom:36px}.testimonial-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:20px;padding:0;list-style:none;margin:0}.testimonial-card{height:100%;margin:0;padding:clamp(24px,3vw,36px);border:1px solid #2B2B32;border-radius:12px;background:#111114;display:flex;flex-direction:column;min-width:0}.testimonial-card blockquote{margin:28px 0;font-size:clamp(1.125rem,1rem + .4vw,1.375rem);font-weight:500;line-height:1.6;letter-spacing:-.01em}.testimonial-card blockquote p{font:inherit;color:#F7F7F7;margin:0}.testimonial-card figcaption{margin-top:auto}.testimonial-name{font-size:1rem;font-weight:700;display:block}.testimonial-role{display:block;color:#9B9B9B;font-size:.875rem;line-height:1.6;margin-top:6px}.testimonial-result{font-size:.875rem;line-height:1.6;border-top:1px solid #2B2B32;padding-top:20px;margin:24px 0 0;color:#C6F564}.testimonial-video{width:100%;margin-top:24px;border-radius:8px;background:#0B0B0D}.testimonial-transcript{margin-top:16px}.testimonial-transcript summary{justify-content:flex-start;text-decoration:underline;text-underline-offset:4px}.testimonial-transcript p{font-size:.875rem}.video-placeholder{margin-top:24px;border:1px dashed #73737D;border-radius:12px;padding:28px;display:flex;align-items:center;gap:24px;background:#111114}.video-placeholder span{font-size:.75rem;letter-spacing:.12em;text-transform:uppercase;color:#C6F564}.video-placeholder h3{font-size:1.25rem;line-height:1.4;margin:8px 0}.video-placeholder p{font-size:.875rem;margin:0;max-width:70ch}.testimonial-cta{margin-top:28px;display:flex;justify-content:flex-end}.testimonial-cta .button{min-height:52px}
@media(max-width:63.999rem){.testimonial-grid{grid-template-columns:1fr}}@media(max-width:47.999rem){.testimonial-cta .button{width:100%}.video-placeholder{padding:24px}}
'''
cards = []
for item in testimonials:
    video_html = ''
    if item.get('video'):
        video = item['video']
        # Local assets only; require captions and transcript before rendering a player.
        for key in ('src', 'captions'):
            asset = (ROOT / video[key]).resolve()
            assert asset.is_relative_to(ROOT) and asset.is_file(), f'Missing or non-local video asset: {key}'
        assert video['transcript'].strip() and video['language'].strip()
        video_html = f'''<video class="testimonial-video" controls playsinline preload="none" aria-label="Demonstration video — {escape(item['name'], quote=True)}"><source src="{escape(video['src'], quote=True)}" type="video/mp4"><track kind="captions" src="{escape(video['captions'], quote=True)}" srclang="{escape(video['language'], quote=True)}" label="Captions" default>Your browser does not support this video.</video><details class="testimonial-transcript"><summary>Read the transcript</summary><p>{escape(video['transcript'])}</p></details>'''
    cards.append(f'''<li><figure class="testimonial-card" id="{escape(item['id'], quote=True)}"><span class="demo-badge">Fictional testimonial · Demo</span><blockquote><p>“{escape(item['quote'])}”</p></blockquote><figcaption><span class="testimonial-name">{escape(item['name'])}</span><span class="testimonial-role">{escape(item['role'])}<br>{escape(item['company'])}</span></figcaption><p class="testimonial-result">{escape(item['result'])}</p>{video_html}</figure></li>''')
section = '''<section class="testimonials" id="testimonials" lang="en" aria-labelledby="testimonials-title"><div class="label">11 / Client perspectives</div><h2 id="testimonials-title">What our clients say.</h2><p class="testimonials-intro">Demo layout: the quotes, identities and outcomes below are fictional placeholders. Verified client testimonials will replace them before publication.</p><ul class="testimonial-grid">''' + '\n'.join(cards) + '''</ul><aside class="video-placeholder" aria-labelledby="video-placeholder-title"><div><span>Video format preview</span><h3 id="video-placeholder-title">A client story, in their own words.</h3><p>No video supplied yet. This space can host an approved recording with captions and a transcript.</p></div></aside><div class="testimonial-cta"><a class="button" href="#call">Book a Strategy Call <span aria-hidden="true">&nbsp;↗</span></a></div></section>
'''
source = source.replace('</style>', css + '\n</style>')
source = source.replace('<section class="preview-notes">', section + '<section class="preview-notes">')
(ROOT / '16-testimonials.html').write_text(source)
