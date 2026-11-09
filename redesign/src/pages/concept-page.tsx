import { useEffect, useState, type CSSProperties } from 'react';
import { useParams } from 'wouter';
import {
  ArrowDownRight,
  ArrowLeft,
  ArrowUpRight,
  Check,
  ChevronDown,
  Flower2,
  Menu,
  MoveHorizontal,
  PawPrint,
  Scissors,
  Settings2,
  ShoppingBag,
  Sparkles,
  Wrench,
  X,
} from 'lucide-react';
import { getProspectConcept } from '@/data/prospect-concepts';
import './concept-page.css';

const CATEGORY_LABELS = {
  bakery: 'Bakery',
  florist: 'Florist',
  auto: 'Automotive',
  barber: 'Barbershop',
  pet: 'Pet care',
  tailor: 'Tailoring',
};

const CATEGORY_ICONS = {
  bakery: ShoppingBag,
  florist: Flower2,
  auto: Settings2,
  barber: Scissors,
  pet: PawPrint,
  tailor: Sparkles,
};

const PALETTES = {
  bakery: { paper: '#f3eee2', ink: '#30261f', accent: '#b95d42', wash: '#dfc8a3', dark: '#37271f' },
  florist: { paper: '#eff0e6', ink: '#27372d', accent: '#a35357', wash: '#d9c4bd', dark: '#26392f' },
  auto: { paper: '#e9ece9', ink: '#202e2d', accent: '#bd623c', wash: '#c3ceca', dark: '#1c302f' },
  barber: { paper: '#f0e9dc', ink: '#312b24', accent: '#aa623f', wash: '#d2c0a1', dark: '#302a24' },
  pet: { paper: '#f0ece5', ink: '#30352e', accent: '#6e7861', wash: '#d6c9b8', dark: '#343a31' },
  tailor: { paper: '#ede9e0', ink: '#302f2b', accent: '#a35542', wash: '#c9c0ad', dark: '#292c29' },
};

const CATEGORY_COPY = {
  bakery: ['Made for the moment.', 'A good thing, simply found.', 'A little room for the details.'],
  florist: ['A study in color and feeling.', 'Thoughtful, from the first glance.', 'Let the arrangement lead.'],
  auto: ['Clear information. A considered first step.', 'A steadier way to get started.', 'The next step, made visible.'],
  barber: ['The details, in their right place.', 'A good first impression, without the fuss.', 'An easy place to begin.'],
  pet: ['Care, made easier to discover.', 'A calmer way to get acquainted.', 'Good information, at a gentler pace.'],
  tailor: ['Considered down to the last detail.', 'A first step toward a better fit.', 'Make space for what matters.'],
};

function useConceptMeta(name: string) {
  useEffect(() => {
    const previousTitle = document.title;
    const description = document.querySelector('meta[name="description"]');
    const robots = document.querySelector('meta[name="robots"]') ?? document.createElement('meta');
    const hadRobots = Boolean(robots.parentNode);
    if (!hadRobots) {
      robots.setAttribute('name', 'robots');
      document.head.appendChild(robots);
    }
    const previousRobots = robots.getAttribute('content');
    const previousDescription = description?.getAttribute('content');
    document.title = `${name} — Independent website concept | SmartContent Lab`;
    robots.setAttribute('content', 'noindex, nofollow');
    description?.setAttribute('content', `An independent, uncommissioned website concept for ${name}, presented by SmartContent Lab.`);
    return () => {
      document.title = previousTitle;
      if (previousRobots === null) robots.removeAttribute('content');
      else robots.setAttribute('content', previousRobots);
      if (!hadRobots) robots.remove();
      if (description && previousDescription !== null && previousDescription !== undefined) description.setAttribute('content', previousDescription);
    };
  }, [name]);
}

function BrandMark({ category }: { category: keyof typeof CATEGORY_LABELS }) {
  const Icon = CATEGORY_ICONS[category];
  return <span className="cp-mark" aria-hidden="true"><Icon size={18} strokeWidth={1.5} /></span>;
}

function SiteArtwork({ category }: { category: keyof typeof CATEGORY_LABELS }) {
  return (
    <div className={`cp-art cp-art-${category}`} aria-hidden="true">
      <div className="cp-art-orbit cp-art-orbit-one" />
      <div className="cp-art-orbit cp-art-orbit-two" />
      {category === 'florist' && <div className="cp-flower-stem"><i /><i /><i /><b /></div>}
      {category === 'bakery' && <div className="cp-bread-shape"><span /></div>}
      {category === 'auto' && <div className="cp-auto-lines"><span /><span /><span /></div>}
      {category === 'barber' && <div className="cp-pole"><i /></div>}
      {category === 'pet' && <div className="cp-paw-art"><PawPrint size={124} strokeWidth={0.7} /></div>}
      {category === 'tailor' && <div className="cp-thread-art"><span /><i /></div>}
      <span className="cp-art-caption">A CONCEPT IN PROGRESS</span>
    </div>
  );
}

function PreviewSite({
  concept,
  compact,
  menuOpen,
  onToggleMenu,
}: {
  concept: NonNullable<ReturnType<typeof getProspectConcept>>;
  compact: boolean;
  menuOpen: boolean;
  onToggleMenu: () => void;
}) {
  const palette = PALETTES[concept.category];
  const CategoryIcon = CATEGORY_ICONS[concept.category];
  return (
    <div className={`cp-preview-site ${compact ? 'is-compact' : ''}`} style={{ '--site-paper': palette.paper, '--site-ink': palette.ink, '--site-accent': palette.accent, '--site-wash': palette.wash, '--site-dark': palette.dark } as CSSProperties} data-testid="preview-site">
      <div className="cp-site-nav">
        <div className="cp-site-brand"><BrandMark category={concept.category} /><span>{concept.name}</span></div>
        <div className={`cp-site-navlinks ${menuOpen ? 'is-open' : ''}`}>
          <span>Introduction</span><span>Explore</span><span>Details</span>
        </div>
        <button className="cp-site-menu" onClick={onToggleMenu} aria-label={menuOpen ? 'Close preview menu' : 'Open preview menu'} aria-expanded={menuOpen} data-testid="button-preview-menu">
          {menuOpen ? <X size={17} /> : <Menu size={17} />}
        </button>
        <span className="cp-site-action">Explore <ArrowUpRight size={13} /></span>
      </div>
      <div className="cp-site-hero">
        <div className="cp-site-copy">
          <span className="cp-site-kicker"><CategoryIcon size={14} /> {CATEGORY_LABELS[concept.category]} / Independent concept</span>
          <h3>{concept.headline}</h3>
          <p>{concept.subhead}</p>
          <button type="button" className="cp-preview-cta" data-testid="button-demo-action" onClick={onToggleMenu}>See the next step <ArrowUpRight size={15} /></button>
          <span className="cp-preview-demo-note">Demonstration only · no request is sent</span>
        </div>
        <SiteArtwork category={concept.category} />
      </div>
      <div className="cp-site-lower">
        <div><span className="cp-lower-index">01 / A clearer journey</span><p>{CATEGORY_COPY[concept.category][0]}</p></div>
        <div><span className="cp-lower-index">02 / Designed around people</span><p>{CATEGORY_COPY[concept.category][1]}</p></div>
        <div className="cp-lower-scroll">Scroll to explore <ArrowDownRight size={15} /></div>
      </div>
    </div>
  );
}

function DeviceFrame({
  concept,
  device,
  menuOpen,
  onToggleMenu,
}: {
  concept: NonNullable<ReturnType<typeof getProspectConcept>>;
  device: 'desktop' | 'mobile';
  menuOpen: boolean;
  onToggleMenu: () => void;
}) {
  return (
    <div className={`cp-device cp-device-${device}`} data-testid={`device-frame-${device}`}>
      {device === 'mobile' && <div className="cp-device-notch" aria-hidden="true" />}
      <PreviewSite concept={concept} compact={device === 'mobile'} menuOpen={menuOpen} onToggleMenu={onToggleMenu} />
    </div>
  );
}

function DemoNotice({ onClose }: { onClose: () => void }) {
  return (
    <div className="cp-demo-toast" role="status" data-testid="status-demo-only">
      <span className="cp-demo-toast-icon"><Check size={15} /></span>
      <span><strong>Just a preview.</strong> Demo actions do not contact the business.</span>
      <button type="button" aria-label="Dismiss demo notice" onClick={onClose} data-testid="button-dismiss-demo-notice"><X size={15} /></button>
    </div>
  );
}

export default function ConceptPage() {
  const { slug } = useParams<{ slug: string }>();
  const concept = getProspectConcept(slug);
  const [device, setDevice] = useState<'desktop' | 'mobile'>('desktop');
  const [menuOpen, setMenuOpen] = useState(false);
  const [showDemoNotice, setShowDemoNotice] = useState(false);
  const [activeFocus, setActiveFocus] = useState(0);

  useConceptMeta(concept?.name ?? 'Concept not found');
  if (!concept) {
    return <main className="cp-not-found"><span className="cp-studio-mark">S / C</span><p>CONCEPT INDEX</p><h1>This concept isn’t here.</h1><a href="/">Return to SmartContent Lab <ArrowUpRight size={16} /></a></main>;
  }

  const category = concept.category;
  const palette = PALETTES[category];

  return (
    <main className={`concept-page cp-${category}`} style={{ '--cp-paper': palette.paper, '--cp-ink': palette.ink, '--cp-accent': palette.accent, '--cp-wash': palette.wash, '--cp-dark': palette.dark } as CSSProperties} data-testid={`concept-page-${concept.slug}`}>
      <div className="cp-topline">
        <a href="/" className="cp-lab-lockup" aria-label="SmartContent Lab home" data-testid="link-back-home"><span className="cp-lab-monogram">S<span>·</span>C</span><span>SmartContent <em>Lab</em><small>San Francisco website studio</small></span></a>
        <div className="cp-top-right"><span className="cp-project-index">CONCEPT / SF — 0{(concept.slug.length % 9) + 1}</span><a href="/" className="cp-back-link"><ArrowLeft size={15} /> Lab home</a></div>
      </div>

      <section className="cp-intro">
        <div className="cp-intro-meta"><span className="cp-status-dot" /> Independent, uncommissioned concept <span className="cp-meta-rule" /> {CATEGORY_LABELS[category]}</div>
        <p className="cp-eyebrow">{concept.label}</p>
        <h1>{concept.headline}</h1>
        <p className="cp-subhead">{concept.subhead}</p>
        <div className="cp-intro-bottom"><span>01 — THE CONCEPT</span><span>Scroll to explore <ArrowDownRight size={15} /></span></div>
      </section>

      <section className="cp-preview-section" aria-labelledby="cp-preview-heading">
        <div className="cp-preview-heading-row">
          <div><span className="cp-section-label">A RESPONSIVE SITE STUDY</span><h2 id="cp-preview-heading">A possible first impression.</h2></div>
          <div className="cp-device-toggle" role="group" aria-label="Choose preview device" data-testid="device-toggle">
            <button type="button" className={device === 'desktop' ? 'is-active' : ''} aria-pressed={device === 'desktop'} onClick={() => setDevice('desktop')} data-testid="button-device-desktop">Desktop</button>
            <button type="button" className={device === 'mobile' ? 'is-active' : ''} aria-pressed={device === 'mobile'} onClick={() => setDevice('mobile')} data-testid="button-device-mobile">Mobile</button>
          </div>
        </div>
        <div className="cp-preview-wrap">
          <div className="cp-preview-toolbar"><span className="cp-window-controls"><i /><i /><i /></span><span className="cp-url-chip">concept / {concept.slug}</span><span className="cp-preview-mode"><span /> Preview mode</span></div>
          <div className={`cp-device-stage ${device === 'mobile' ? 'is-mobile' : ''}`}>
            <DeviceFrame concept={concept} device={device} menuOpen={menuOpen} onToggleMenu={() => setMenuOpen((open) => !open)} />
          </div>
        </div>
        <p className="cp-under-preview"><span><MoveHorizontal size={15} /> Preview controls are interactive</span><span>Concept content only · details require verification</span></p>
      </section>

      <section className="cp-intention-section">
        <div className="cp-intention-aside"><span className="cp-section-label">02 — DESIGN INTENT</span><div className="cp-asterisk" aria-hidden="true">✳</div><p>A direction, not a claim.<br />A starting point for discussion.</p></div>
        <div className="cp-intention-main">
          <h2>Make the next step feel <em>natural.</em></h2>
          <p className="cp-intention-lead">This concept explores how a more considered digital introduction might help visitors find their way. Every line below is a design hypothesis—not verified business information.</p>
          <div className="cp-focus-list" role="tablist" aria-label="Concept focus areas">
            {concept.focus.map((item, index) => (
              <button key={item} type="button" role="tab" aria-selected={activeFocus === index} className={`cp-focus-row ${activeFocus === index ? 'is-active' : ''}`} onClick={() => setActiveFocus(index)} data-testid={`tab-focus-${index}`}>
                <span className="cp-focus-number">0{index + 1}</span><span className="cp-focus-title">{item}</span><span className="cp-focus-symbol">{activeFocus === index ? <Check size={16} /> : <ArrowUpRight size={16} />}</span>
              </button>
            ))}
          </div>
          <div className="cp-focus-detail" role="tabpanel" data-testid="panel-focus-detail">
            <span>SELECTED DIRECTION</span><p>{CATEGORY_COPY[category][activeFocus]}</p>
          </div>
        </div>
      </section>

      <section className="cp-craft-section">
        <div className="cp-craft-title"><span className="cp-section-label">03 — A SMALL INTERACTION</span><h2>Tap into<br /><em>the details.</em></h2></div>
        <div className="cp-interaction-card">
          <div className="cp-interaction-top"><BrandMark category={category} /><span>DEMO COMPONENT / 01</span><ChevronDown size={16} /></div>
          <h3>{category === 'bakery' ? 'What are you here to explore?' : category === 'florist' ? 'What would you like to discover?' : category === 'auto' ? 'What would you like to do next?' : category === 'barber' ? 'Where would you like to begin?' : category === 'pet' ? 'What would help you get started?' : 'What would you like to know?'}</h3>
          <p>This control demonstrates a possible browsing path. It does not submit a booking, order, or inquiry.</p>
          <div className="cp-choice-list">
            {['Explore the introduction', 'Find the next step', 'Review the essentials'].map((choice, i) => (
              <button key={choice} type="button" onClick={() => setActiveFocus(i)} className={activeFocus === i ? 'is-selected' : ''} data-testid={`button-demo-choice-${i}`}>
                <span><i>{String(i + 1).padStart(2, '0')}</i>{choice}</span><ArrowUpRight size={16} />
              </button>
            ))}
          </div>
          <span className="cp-demo-only-label"><span /> DEMO ONLY — NO BUSINESS CONTACT</span>
        </div>
      </section>

      <section className="cp-verify-strip">
        <span className="cp-verify-icon"><Check size={18} /></span>
        <div><strong>Before anything goes live</strong><p>All details, services, contact information, availability, and any action paths must be supplied and verified by the business.</p></div>
        <span className="cp-verify-stamp">HYPOTHESIS<br />NOT A FACT</span>
      </section>

      <footer className="cp-footer">
        <div className="cp-footer-left"><a href="/" className="cp-footer-logo">SmartContent <em>Lab</em></a><span>Independent concept · San Francisco</span></div>
        <p>Not an official website. No affiliation or commission is implied.</p>
        <a href="/" className="cp-footer-back">Return to the studio <ArrowUpRight size={15} /></a>
      </footer>

      <div className="cp-persistent-notice" data-testid="notice-verify-details"><span className="cp-status-dot" /> Concept only · Details and availability must be verified.</div>
      {showDemoNotice && <DemoNotice onClose={() => setShowDemoNotice(false)} />}
    </main>
  );
}
