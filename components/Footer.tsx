import { FooterClock, FooterWidgets } from './FooterWidgets';

const planDuSite = [
  { label: 'Services', href: '/services' },
  { label: 'Industries', href: '/industries' },
  { label: 'Études de cas', href: '/case-studies' },
  { label: 'Marchés accompagnés', href: '/industries' },
  { label: 'Notre approche', href: '/about' },
  { label: 'Contact', href: '/#contact' }
];

const services = [
  { label: 'Stratégie et conseil', href: '/services/strategie-conseil' },
  { label: 'Image de marque et création', href: '/services/image-de-marque-creation' },
  { label: 'Conception et développement web', href: '/services/conception-developpement-web' },
  { label: 'Référencement naturel et croissance organique', href: '/services/referencement-naturel-croissance-organique' },
  { label: 'Recherche GEO et IA', href: '/services/recherche-geo-ia' },
  { label: 'Médias payants (PPC)', href: '/services/medias-payants-ppc' },
  { label: 'Marketing de contenu', href: '/services/marketing-de-contenu' },
  { label: 'Marketing sur les réseaux sociaux', href: '/services/marketing-reseaux-sociaux' },
  { label: 'Vidéo et multimédia', href: '/services/video-multimedia' },
  { label: 'Automatisation des e-mails et du marketing', href: '/services/automatisation-emails-marketing' },
  { label: 'CRO et analytique', href: '/services/cro-analytique' }
];

const ressources = [
  { label: 'Audit gratuit', href: '/free-ai-visibility-audit' },
  { label: 'Glossaire', href: '/glossary' },
  { label: 'Comparatifs', href: '/comparisons' },
  { label: 'Annuaire', href: '/industries' },
  { label: 'Outils gratuits', href: '/#growth-calculator' },
  { label: 'Lexique', href: '/glossary' },
  { label: 'Nos expertises', href: '/services' },
  { label: 'Blog', href: '/blog' }
];

const entreprise = [
  { label: 'À propos de nous', href: '/about' },
  { label: 'Équipe', href: '/about' },
  { label: 'Processus', href: '/#methodology' },
  { label: 'Réservez un appel', href: '/book-call' },
  { label: 'Informations agence', href: '/about' },
  { label: 'Notre méthode', href: '/about' }
];

export default function Footer() {
  return (
    <footer className="site-footer-modern" id="site-footer">
      <div className="footer-main-grid">
        {/* Colonne 1: Marque & Description & Réseaux */}
        <div className="footer-brand-col">
          <a href="/" className="footer-logo" aria-label="ALTEORIA — Accueil">
            ALTEORIA<span className="footer-logo-dot">.</span>
          </a>
          <p className="footer-mission-text">
            Référencement, contenu et automatisation pour aider vos prochains clients à vous trouver et à prendre contact.
          </p>

          <div className="footer-social-squares" aria-label="Réseaux sociaux">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-square" aria-label="X (Twitter)">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-square" aria-label="LinkedIn">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.24a1.66 1.66 0 1 0 0 3.32 1.66 1.66 0 0 0 0-3.32z"/>
              </svg>
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-square" aria-label="Facebook">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
                <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95C18.05 21.45 22 17.19 22 12z"/>
              </svg>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-square" aria-label="Instagram">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a3.999 3.999 0 1 1 0-7.998 3.999 3.999 0 0 1 0 7.998zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
              </svg>
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="social-square" aria-label="YouTube">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Colonne 2: PLAN DU SITE */}
        <div className="footer-links-col">
          <div className="footer-col-header">PLAN DU SITE</div>
          <ul className="footer-links-list">
            {planDuSite.map(link => (
              <li key={link.label}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Colonne 3: SERVICES */}
        <div className="footer-links-col">
          <div className="footer-col-header">SERVICES</div>
          <ul className="footer-links-list">
            {services.map(link => (
              <li key={link.label}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Colonne 4: RESSOURCES */}
        <div className="footer-links-col">
          <div className="footer-col-header">RESSOURCES</div>
          <ul className="footer-links-list">
            {ressources.map(link => (
              <li key={link.label}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Colonne 5: ENTREPRISE */}
        <div className="footer-links-col">
          <div className="footer-col-header">ENTREPRISE</div>
          <ul className="footer-links-list">
            {entreprise.map(link => (
              <li key={link.label}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Barre inférieure : Copyright · Villes · Statut système */}
      <div className="footer-bottom-bar">
        <div className="footer-bottom-left">
          © {new Date().getFullYear()} ALTEORIA
        </div>
        <div className="footer-bottom-cities">
          VISIBILITÉ · CONVERSION · MESURE
        </div>
        <div className="footer-bottom-status">
          <span className="status-live-dot" aria-hidden="true"></span>
          <FooterClock/>
        </div>
      </div>

      <FooterWidgets/>
    </footer>
  );
}
