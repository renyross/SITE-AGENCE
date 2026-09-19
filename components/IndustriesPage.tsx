import React from 'react';

interface Industry {
  slug: string;
  title: string;
  intro: string;
  description: string;
  focus: string[];
  painPoints?: string[];
  verticals?: string[];
}

interface Service {
  slug: string;
  title: string;
  intro: string;
}

interface Props {
  industries: Industry[];
  services: Service[];
}

export default function IndustriesPage({ industries, services }: Props) {
  return (
    <div className="industries-page-wrapper">
      {/* Hero Section */}
      <header className="industries-hero">
        <div className="industries-hero-eyebrow">
          <span className="hero-signal-mark" aria-hidden="true"></span>
          <span>Secteurs d’activité · Croissance & Ingénierie IA</span>
        </div>

        <h1 className="industries-hero-title">
          Marketing de croissance & IA adaptés à votre secteur d’activité.
        </h1>

        <p className="industries-hero-lead">
          Nous concevons des écosystèmes d’acquisition, de visibilité IA et d’automatisation calibrés selon vos cycles de vente, vos contraintes réglementaires, la dynamique de marché et vos impératifs de rentabilité.
        </p>

        {/* 3 Strategic Pillars */}
        <div className="industries-pillars-grid">
          <div className="ind-pillar-card">
            <div className="ind-pillar-num">01</div>
            <h2 className="ind-pillar-title">Cartographie 360° du parcours d’achat</h2>
            <p className="ind-pillar-desc">
              Chaque page sectorielle structure vos points de friction, vos métiers verticaux, vos cas d’usage réels, vos services dédiés et vos parcours de décision en un ensemble cohérent et actionnable.
            </p>
          </div>

          <div className="ind-pillar-card">
            <div className="ind-pillar-num">02</div>
            <h2 className="ind-pillar-title">Demande qualifiée & ROI mesuré</h2>
            <p className="ind-pillar-desc">
              Nous ciblons la rentabilité mesurée et la conversion de décideurs (fondateurs, directeurs généraux, directeurs marketing et équipes commerciales), loin du trafic de vanité.
            </p>
          </div>

          <div className="ind-pillar-card">
            <div className="ind-pillar-num">03</div>
            <h2 className="ind-pillar-title">Visibilité omnicanale & Moteurs IA</h2>
            <p className="ind-pillar-desc">
              Un maillage stratégique vers vos expertises, outils et études de cas pour maximiser votre visibilité et vos citations sur Google, Bing et les moteurs IA (ChatGPT, Claude, Gemini, Perplexity).
            </p>
          </div>
        </div>
      </header>

      {/* Core Services Across Industries */}
      <section className="industries-services-bar" aria-labelledby="core-services-heading">
        <div className="ind-services-header">
          <div className="ind-services-label">
            <span className="hero-signal-mark" aria-hidden="true"></span>
            <span>Expertises transversales</span>
          </div>
          <h2 id="core-services-heading" className="ind-services-title">
            Services transversaux mobilisés dans chaque secteur
          </h2>
          <p className="ind-services-subtitle">
            Nos 11 expertises modulaires s’interconnectent pour bâtir l’avantage concurrentiel de votre entreprise :
          </p>
        </div>

        <div className="ind-services-pills-row">
          {services.map(s => (
            <a key={s.slug} href={`/services/${s.slug}`} className="ind-service-pill" title={s.intro}>
              <span className="ind-service-pill-dot" aria-hidden="true">+</span>
              <span className="ind-service-pill-name">{s.title}</span>
            </a>
          ))}
        </div>
      </section>

      {/* 11 Sectors Main Grid */}
      <section className="industries-sectors-section" aria-labelledby="sectors-grid-heading">
        <div className="sectors-section-intro">
          <div className="sectors-section-badge">
            <span className="hero-signal-mark" aria-hidden="true"></span>
            <span>Écosystèmes sectoriels</span>
          </div>
          <h2 id="sectors-grid-heading" className="sectors-section-title">
            Explorez les stratégies conçues pour votre industrie
          </h2>
          <p className="sectors-section-lead">
            Chaque secteur dispose de ses propres réalités de prospection, de conformité et d’acquisition. Cliquez sur un secteur pour explorer sa matrice stratégique détaillée.
          </p>
        </div>

        <div className="industries-master-grid">
          {industries.map((ind, idx) => {
            const indexFormatted = String(idx + 1).padStart(2, '0');
            return (
              <article key={ind.slug} className="sector-master-card" id={`sector-${ind.slug}`}>
                <div className="sector-card-header">
                  <div className="sector-index-badge">
                    <span className="sector-index-mark" aria-hidden="true"></span>
                    <span>SECTEUR {indexFormatted} / {String(industries.length).padStart(2, '0')}</span>
                  </div>
                  <h3 className="sector-card-title">{ind.title}</h3>
                </div>

                <p className="sector-card-intro">{ind.intro}</p>

                {/* Pain Points */}
                {ind.painPoints && ind.painPoints.length > 0 && (
                  <div className="sector-pain-wrapper">
                    <div className="sector-block-label">DÉFIS SECTORIELS MAJEURS</div>
                    <div className="sector-pain-list">
                      {ind.painPoints.map((pain, pIdx) => (
                        <div key={pIdx} className="sector-pain-tag">
                          <span className="pain-icon" aria-hidden="true">−</span>
                          <span>{pain}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Specialist Verticals */}
                {ind.verticals && ind.verticals.length > 0 && (
                  <div className="sector-verticals-wrapper">
                    <div className="sector-block-label">MÉTIERS & VERTICALES SPÉCIALISÉES</div>
                    <div className="sector-verticals-grid">
                      {ind.verticals.map((vert, vIdx) => (
                        <div key={vIdx} className="sector-vertical-pill">
                          <span className="vert-check" aria-hidden="true">✓</span>
                          <span>{vert}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Card Action */}
                <div className="sector-card-footer">
                  <a href={`/industries/${ind.slug}`} className="button sector-action-btn">
                    <span>Découvrir la stratégie sectorielle</span>
                    <span className="arrow" aria-hidden="true">→</span>
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Need a Market-Specific Plan? Final Dedicated CTA Card */}
      <section className="industries-custom-cta" aria-labelledby="custom-cta-heading">
        <div className="custom-cta-card">
          <div className="custom-cta-badge">
            <span className="hero-signal-mark" aria-hidden="true"></span>
            <span>Accompagnement sur-mesure</span>
          </div>
          <h2 id="custom-cta-heading" className="custom-cta-title">
            Besoin d’un plan d’acquisition adapté à votre marché ?
          </h2>
          <p className="custom-cta-text">
            Présentez-nous votre secteur, votre zone géographique, votre offre, la durée de votre cycle de vente et vos performances actuelles. Nous modéliserons l’architecture d’acquisition et d’automatisation la plus directe et la plus rentable vers des demandes qualifiées.
          </p>
          <div className="custom-cta-actions">
            <a href="/free-ai-visibility-audit" className="button primary">
              Demander mon audit gratuit <span aria-hidden="true">↗</span>
            </a>
            <a href="/contact" className="button">
              Échanger avec un expert <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
