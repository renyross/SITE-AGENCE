'use client';
import site from '../content/site.json';
import { usePathname } from 'next/navigation';
import { useRef, useState, useEffect } from 'react';

const serviceGroups = [
  {title:'Visibilité & acquisition',items:[
    {label:'SEO & croissance organique',desc:'Être trouvé sur les recherches utiles',href:'/services/referencement-naturel-croissance-organique'},
    {label:'GEO & recherche IA',desc:'Travailler votre présence dans les réponses IA',href:'/services/recherche-geo-ia'},
    {label:'Publicité en ligne',desc:'Attirer des demandes qualifiées',href:'/services/medias-payants-ppc'},
    {label:'Réseaux sociaux',desc:'Toucher les audiences pertinentes',href:'/services/marketing-reseaux-sociaux'},
  ]},
  {title:'Marque & contenus',items:[
    {label:'Stratégie & conseil',desc:'Choisir les priorités de croissance',href:'/services/strategie-conseil'},
    {label:'Identité & création',desc:'Clarifier ce qui vous distingue',href:'/services/image-de-marque-creation'},
    {label:'Marketing de contenu',desc:'Répondre aux questions des acheteurs',href:'/services/marketing-de-contenu'},
    {label:'Vidéo & multimédia',desc:'Expliquer votre offre en images',href:'/services/video-multimedia'},
  ]},
  {title:'Web & automatisation',items:[
    {label:'Conception & développement web',desc:'Faciliter la prise de contact',href:'/services/conception-developpement-web'},
    {label:'Automatisation marketing',desc:'Simplifier le suivi des prospects',href:'/services/automatisation-emails-marketing'},
    {label:'Conversion & analytique',desc:'Mesurer et améliorer les parcours',href:'/services/cro-analytique'},
  ]},
];

const links = [
  ['Services', '/services'],
  ['Solutions', '/services#solutions'],
  ['Industries', '/industries'],
  ['Études de cas', '/case-studies'],
  ['Outils', '/tools'],
  ['Ressources', '/blog']
];

export default function Header() {
  const path = usePathname();
  const menu = useRef<HTMLDetailsElement>(null);
  const [megaOpen, setMegaOpen] = useState(false);
  const megaRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (megaRef.current && !megaRef.current.contains(e.target as Node)) {
        setMegaOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isServicesActive = path === '/services' || path.startsWith('/services/');

  return (
    <>
      <a className="skip" href="#content">Aller au contenu</a>
      <header
        className="app-header"
        onKeyDown={e => {
          if (e.key === 'Escape') {
            if (megaOpen) { setMegaOpen(false); triggerRef.current?.focus(); }
            if (menu.current?.open) {
              menu.current.open = false;
              menu.current.querySelector('summary')?.focus();
            }
          }
        }}
      >
        <div className="app-header-row">
          <a className="app-brand" href="/" aria-label="ALTEORIA — accueil">
            <span className="app-brand-badge" aria-hidden="true">↗</span>
            <span className="app-brand-info">
              <span className="app-brand-name">{site.name || 'ALTEORIA'}</span>
              <span className="app-brand-tag">MARKETING &amp; IA</span>
            </span>
          </a>

          <nav className="app-desktop-nav" aria-label="Navigation principale">
            <div
              className="nav-item-dropdown"
              ref={megaRef}
              onMouseEnter={() => setMegaOpen(true)}
              onMouseLeave={() => { if (!megaRef.current?.contains(document.activeElement)) setMegaOpen(false); }}
              onBlur={e => { if (!e.currentTarget.contains(e.relatedTarget)) setMegaOpen(false); }}
            >
              <button
                type="button"
                ref={triggerRef}
                onClick={() => setMegaOpen(open => !open)}
                onKeyDown={e => {
                  if (e.key === 'ArrowDown') {
                    e.preventDefault(); setMegaOpen(true);
                    requestAnimationFrame(() => megaRef.current?.querySelector<HTMLAnchorElement>('.mm-item')?.focus());
                  }
                }}
                className={`nav-dropdown-trigger ${isServicesActive ? 'active' : ''}`}
                aria-expanded={megaOpen}
                aria-controls="services-mega-menu"
              >
                Services <span className="nav-dropdown-caret" aria-hidden="true">▾</span>
              </button>

              <div
                className={`mega-menu-overlay ${megaOpen ? 'is-open' : ''}`}
                id="services-mega-menu"
                hidden={!megaOpen}
                role="region"
                aria-label="Menu détaillé des services"
              >
                <div className="mega-menu-card">
                  <div className="mm-grid">

                    {/* 3 colonnes services */}
                    {serviceGroups.map(group => (
                      <div key={group.title} className="mm-col-group">
                        <div className="mm-col-title">{group.title}</div>
                        <ul className="mm-item-list">
                          {group.items.map(s => (
                            <li key={s.href}>
                              <a
                                href={s.href}
                                className="mm-item"
                                onClick={() => setMegaOpen(false)}
                                aria-current={path === s.href ? 'page' : undefined}
                              >
                                <span className="mm-item-body">
                                  <span className="mm-item-label">{s.label}</span>
                                  <span className="mm-item-desc">{s.desc}</span>
                                </span>
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}

                    {/* CTA card */}
                    <div className="mm-cta">
                      <span className="mm-cta-badge">★ Sans engagement</span>
                      <h3 className="mm-cta-title">Votre prochaine priorité</h3>
                      <p className="mm-cta-desc">Identifiez les points à examiner sur votre site et vos canaux d’acquisition.</p>
                      <a href="/free-ai-visibility-audit" className="mm-cta-btn" onClick={() => setMegaOpen(false)}>
                        Demander mon audit gratuit ↗
                      </a>
                    </div>

                  </div>

                  <div className="mm-footer">
                    <a href="/services" className="mm-footer-link" onClick={() => setMegaOpen(false)}>
                      Voir tous nos services →
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {links.slice(1).map(([label, href]) => (
              <a
                key={label}
                href={href}
                aria-current={!href.includes('#') && (path === href || path.startsWith(href + '/')) ? 'page' : undefined}
              >
                {label}
              </a>
            ))}
          </nav>

          <div className="app-header-actions">
            <a className="button primary" href="/book-call">
              <span className="full-audit">Réservez un appel stratégique gratuit</span>
              <span className="short-audit">Appel stratégique</span>
            </a>
            <a className="button desktop-call" href="/free-ai-visibility-audit">Audit de visibilité IA</a>
          </div>

          <details className="app-menu" ref={menu}>
            <summary className="app-menu-btn" aria-label="Menu de navigation">
              <span className="hamburger-box" aria-hidden="true">
                <span className="hamburger-bar"></span>
                <span className="hamburger-bar"></span>
                <span className="hamburger-bar"></span>
              </span>
            </summary>
            <div className="app-menu-panel">
              <nav aria-label="Navigation mobile">
                <details className="mobile-services-dropdown">
                  <summary className="mobile-services-summary">
                    Services <span aria-hidden="true">▾</span>
                  </summary>
                  <div className="mobile-services-links">
                    {serviceGroups.map(group => <div className="mobile-service-group" key={group.title}>
                      <p className="mobile-service-title">{group.title}</p>
                      {group.items.map(s => <a key={s.href} href={s.href}
                        onClick={() => { if (menu.current) menu.current.open = false; }}
                        aria-current={path === s.href ? 'page' : undefined}>{s.label}</a>)}
                    </div>)}
                    <a className="mobile-services-all" href="/services" onClick={() => { if (menu.current) menu.current.open = false; }}>
                      Voir tous les services →
                    </a>
                  </div>
                </details>
                {links.slice(1).map(([label, href]) => (
                  <a
                    key={label}
                    href={href}
                    onClick={() => { if (menu.current) menu.current.open = false; }}
                    aria-current={!href.includes('#') && (path === href || path.startsWith(href + '/')) ? 'page' : undefined}
                  >
                    {label}
                  </a>
                ))}
              </nav>
              <a className="button primary" href="/book-call">Réservez un appel stratégique gratuit</a>
              <a className="button" href="/free-ai-visibility-audit">Audit de visibilité IA</a>
            </div>
          </details>
        </div>
      </header>
    </>
  );
}
