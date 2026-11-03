import { useEffect, useRef, useState, type FormEvent, type ReactNode } from 'react';
import { ArrowUpRight, Menu, X, MoveHorizontal, Phone, Mail, CalendarDays, Check, ChevronDown, Star } from 'lucide-react';
import { CursorStage } from '@/components/cursor/cursor-stage';
import { ConceptCarousel } from '@/components/concept-carousel';
import { Story } from '@/components/story';

const EMAIL = 'adminsmartcontent@atomicmail.io';
const CAL = 'https://cal.com/smartcontentlab';
const BASE = import.meta.env.BASE_URL;

const reduced = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function Reveal({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setOn(true); io.disconnect(); } }, { threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return <div ref={ref} className={`rise ${on ? 'in' : ''} ${className}`} style={{ transitionDelay: `${delay}ms` }}>{children}</div>;
}

/* Scroll-linked tilt: frame lies back while approaching, stands up when centered. */
function useScrollTilt<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || reduced()) return;
    let raf = 0;
    const run = () => { raf = 0; const r = el.getBoundingClientRect(); const c = (r.top + r.height / 2 - window.innerHeight / 2) / window.innerHeight; el.style.setProperty('--s', Math.max(0, Math.min(1, c * 1.4)).toFixed(3)); };
    const q = () => { if (!raf) raf = requestAnimationFrame(run); };
    run();
    window.addEventListener('scroll', q, { passive: true });
    return () => { window.removeEventListener('scroll', q); cancelAnimationFrame(raf); };
  }, []);
  return ref;
}

const NAV = [['Story', '#ch-land'], ['Demo', '#demo'], ['Services', '#services'], ['Pricing', '#pricing'], ['Process', '#process']];

function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed top-0 inset-x-0 z-50 hx" style={{ ['--d' as string]: '0ms' }}>
      <div className="mx-3 mt-3 md:mx-6 rounded-full bg-[hsl(var(--wine)/0.78)] backdrop-blur-md text-[hsl(var(--cream))] flex items-center justify-between pl-5 pr-2 py-2 border border-[hsl(var(--ember)/0.2)]">
        <a href="#top" className="font-serif text-xl tracking-tight" data-testid="link-logo">SmartContent <em className="text-[hsl(var(--ember))]">Lab</em></a>
        <nav className="hidden md:flex gap-7 text-sm" aria-label="Primary">
          {NAV.map(([l, h]) => <a key={h} href={h} className="opacity-75 hover:opacity-100 transition-opacity" data-testid={`link-nav-${l.toLowerCase()}`}>{l}</a>)}
        </nav>
        <a href="#audit" className="hidden md:inline-flex items-center gap-1 rounded-full gild text-[hsl(var(--wine))] font-semibold px-4 py-2 text-sm hover:-translate-y-0.5 transition-transform" data-testid="link-nav-audit">Get my free audit <ArrowUpRight size={16} /></a>
        <button className="md:hidden p-2" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen(!open)} data-testid="button-menu">{open ? <X /> : <Menu />}</button>
      </div>
      {open && (
        <nav className="md:hidden mx-3 mt-2 rounded-3xl bg-[hsl(var(--wine))] text-[hsl(var(--cream))] p-6 flex flex-col gap-4 font-serif text-3xl" aria-label="Mobile">
          {NAV.map(([l, h]) => <a key={h} href={h} onClick={() => setOpen(false)}>{l}</a>)}
          <a href="#audit" onClick={() => setOpen(false)} className="text-[hsl(var(--ember))] italic">Get my free audit</a>
        </nav>
      )}
    </header>
  );
}

function MobileBar() {
  return (
    <div className="md:hidden fixed bottom-0 inset-x-0 z-40 p-3 bg-[hsl(var(--wine)/0.92)] backdrop-blur-md border-t border-[hsl(var(--ember)/0.25)] flex gap-2" style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))' }}>
      <a href="#audit" className="flex-1 rounded-full gild text-[hsl(var(--wine))] font-semibold py-3 text-center text-sm" data-testid="link-mobilebar-audit">Get my free audit</a>
      <a href={CAL} target="_blank" rel="noreferrer" className="rounded-full border border-[hsl(var(--cream)/0.35)] text-[hsl(var(--cream))] px-4 py-3 text-sm inline-flex items-center gap-1.5" data-testid="link-mobilebar-book"><CalendarDays size={16} /> Book</a>
    </div>
  );
}

function Hero() {
  return (
    <section id="top" className="relative md:min-h-[100dvh] bg-[hsl(var(--cream))] text-[hsl(var(--wine))] overflow-hidden pt-20 md:pt-28 pb-8 md:pb-10 flex flex-col">
      <div className="relative z-10 max-w-5xl mx-auto px-5 text-center">
        <p className="hx font-mono text-[11px] tracking-[0.3em] uppercase text-[hsl(345_30%_35%)]" style={{ ['--d' as string]: '100ms' }}>San Francisco website studio</p>
        <h1 className="mt-3 md:mt-4 font-sans font-bold tracking-[-0.045em] leading-[0.92] text-[clamp(2.2rem,6.2vw,5.6rem)]">
          <span className="hx-blur block" style={{ ['--d' as string]: '160ms' }}>Your website should be</span>
          <span className="hx-blur block" style={{ ['--d' as string]: '240ms' }}>your <em className="font-serif font-normal italic tracking-[-0.02em] text-[hsl(345_55%_28%)]">best salesperson.</em></span>
        </h1>
        <p className="hx mt-3 md:mt-5 text-base md:text-xl text-[hsl(345_20%_32%)] max-w-xl mx-auto" style={{ ['--d' as string]: '320ms' }}>We show you what your website is costing you, then fix it.</p>
      </div>
      <div className="relative mt-3 md:mt-2 hx" style={{ ['--d' as string]: '400ms' }}><ConceptCarousel /></div>
      <div className="relative z-10 mt-5 md:mt-6 flex flex-col items-center gap-3 md:gap-4 px-5">
        <div className="hx-pop relative" style={{ ['--d' as string]: '500ms' }}>
          <span className="cta-ring" aria-hidden="true" />
          <a href="#audit" className="relative rounded-full bg-[hsl(var(--wine))] text-[hsl(var(--cream))] px-8 py-4 font-semibold inline-flex items-center gap-2 hover:-translate-y-0.5 transition-transform" data-testid="link-hero-audit">Get my free audit <ArrowUpRight size={18} /></a>
        </div>
        <a href="#demo" className="hx text-sm text-center text-[hsl(345_20%_35%)] underline underline-offset-4 decoration-[hsl(var(--ember))]" style={{ ['--d' as string]: '600ms' }} data-testid="link-hero-demo">Plain-English report in about 48 hours. Or see a before and after.</a>
      </div>
    </section>
  );
}

function Industries() {
  const items = ['Locksmiths', 'Painters', 'Electricians', 'Handymen', 'HVAC', 'Groomers', 'Cleaners', 'Massage', 'Gardeners'];
  const row = [...items, ...items];
  return (
    <div className="bg-[hsl(var(--ember))] text-[hsl(var(--wine))] py-5 overflow-hidden" aria-label="Built for San Francisco local service businesses">
      <div className="marquee flex w-max gap-10 font-serif text-2xl md:text-3xl">
        {row.map((t, i) => <span key={i} className="flex items-center gap-10 whitespace-nowrap">{t}<Star size={14} className="opacity-50" /></span>)}
      </div>
    </div>
  );
}

function Demo() {
  const [pos, setPos] = useState(50);
  const box = useRef<HTMLDivElement>(null);
  const drag = useRef(false);
  const tilt = useScrollTilt<HTMLDivElement>();
  const move = (x: number) => { const r = box.current!.getBoundingClientRect(); setPos(Math.min(100, Math.max(0, ((x - r.left) / r.width) * 100))); };
  return (
    <section id="demo" className="py-24 md:py-36 px-5 md:px-10 max-w-7xl mx-auto">
      <Reveal className="grid md:grid-cols-2 gap-8 items-end mb-12">
        <h2 className="font-serif text-[clamp(2.6rem,6vw,5.5rem)] leading-[0.92] tracking-tight">Same business.<br /><em className="text-primary">Different phone call.</em></h2>
        <p className="text-muted-foreground max-w-md md:justify-self-end">Drag the handle, or use your arrow keys. This painting company is made up. It shows the kind of changes we make, built from problems we see on real local sites.</p>
      </Reveal>
      <div ref={tilt} className="tilt origin-bottom">
        <div ref={box} className="relative aspect-[4/5] sm:aspect-[16/10] rounded-[1.75rem] overflow-hidden border-[6px] border-[hsl(var(--wine))] shadow-[0_60px_120px_-30px_hsl(345_55%_11%/0.6)] select-none touch-none"
          onPointerDown={(e) => { drag.current = true; move(e.clientX); }} onPointerMove={(e) => drag.current && move(e.clientX)} onPointerUp={() => (drag.current = false)} onPointerLeave={() => (drag.current = false)}>
          <div className="absolute inset-0 bg-[hsl(var(--wine))] text-[hsl(var(--cream))] p-6 sm:p-10 flex flex-col">
            <img src={`${BASE}hero.jpg`} alt="" className="absolute inset-0 w-full h-full object-cover opacity-30" />
            <div className="relative flex justify-between items-center text-sm"><span className="font-serif text-lg">Fogline Painting</span><span className="rounded-full gild text-[hsl(var(--wine))] px-3 py-1.5 font-semibold inline-flex items-center gap-1"><Phone size={14} /> Call now</span></div>
            <div className="relative mt-auto max-w-xl ml-auto text-right">
              <p className="font-mono text-[11px] uppercase tracking-widest opacity-70">Residential painting / Sunset and Richmond</p>
              <p className="font-serif text-[clamp(1.8rem,4.5vw,4rem)] leading-[0.95] mt-3">Victorians repainted <em className="text-[hsl(var(--ember))]">without the guesswork.</em></p>
              <div className="mt-5 flex flex-wrap gap-2 justify-end text-sm"><span className="rounded-full bg-[hsl(var(--cream))] text-[hsl(var(--wine))] px-4 py-2 font-semibold">Get a free estimate</span><span className="rounded-full border border-white/30 px-4 py-2">See recent projects</span></div>
              <p className="mt-4 text-xs opacity-60">Reviews, licensing and service area sit right here.</p>
            </div>
          </div>
          <div className="absolute inset-0 bg-[#e9e6df] text-[#555] p-6 sm:p-10 font-[Times_New_Roman,serif]" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
            <div className="flex justify-between text-xs border-b border-[#bbb] pb-2"><span className="font-bold text-[#335]">FOGLINE PAINTING CO.</span><span className="hidden sm:inline">Home | About Us | Services | Gallery | Contact | Links</span></div>
            <p className="mt-8 text-2xl text-[#335]">Welcome to our Website!</p>
            <p className="mt-3 text-sm max-w-md leading-snug">We have been providing quality services for many years. We offer interior, exterior, commercial, residential, and much more. Please browse our site to learn more about our company and what we can do for you...</p>
            <div className="mt-5 h-28 w-48 bg-[#c9c5bc] grid place-items-center text-xs">[ photo ]</div>
            <p className="mt-5 text-xs">For inquiries please fill out the form on the Contact page.</p>
          </div>
          <div className="absolute inset-y-0 w-0.5 bg-[hsl(var(--ember))]" style={{ left: `${pos}%` }}>
            <button role="slider" aria-label="Before and after comparison" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(pos)}
              onKeyDown={(e) => { if (e.key === 'ArrowLeft') setPos((p) => Math.max(0, p - 5)); if (e.key === 'ArrowRight') setPos((p) => Math.min(100, p + 5)); }}
              className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 h-14 w-14 rounded-full gild text-[hsl(var(--wine))] grid place-items-center shadow-xl focus:outline-none focus-visible:ring-4 ring-[hsl(var(--cream))] cursor-ew-resize" data-testid="slider-demo"><MoveHorizontal /></button>
          </div>
        </div>
      </div>
      <div className="mt-10 grid sm:grid-cols-3 gap-6 text-sm">
        {[['Headline', 'From "Welcome" to what you do, where, and for whom.'], ['Call to action', 'A buried contact page becomes a tap to call button.'], ['Proof', 'Trust signals move up to where people decide.']].map(([a, b], i) => (
          <Reveal key={a} delay={i * 100} className="border-t border-foreground/20 pt-4"><p className="font-mono text-xs uppercase tracking-widest text-primary">{a}</p><p className="mt-2">{b}</p></Reveal>
        ))}
      </div>
    </section>
  );
}

function Services() {
  const s = [['Redesign', 'Your outdated site, rebuilt mobile first, with copy that sells the job before the call.'], ['Local SEO', 'Service pages, Google Business Profile and the basics that help people nearby find you.'], ['Intake and follow-up', 'Clear forms and email follow-up so no quote request goes cold.'], ['Redesign previews', 'See what your new homepage could look like before you commit to anything.']];
  return (
    <section id="services" className="bg-[hsl(var(--wine))] text-[hsl(var(--cream))] py-24 md:py-36 px-5 md:px-10 rounded-t-[2.5rem] md:rounded-t-[4rem]">
      <div className="max-w-7xl mx-auto">
        <Reveal><h2 className="font-serif text-[clamp(3rem,8vw,7.5rem)] leading-[0.88] tracking-tight">Find the leaks.<br /><em className="text-[hsl(var(--ember))]">Fix the site.</em></h2></Reveal>
        <div className="mt-16 [perspective:1200px]">
          {s.map(([t, d], i) => (
            <Reveal key={t} delay={i * 80}>
              <div className="group grid md:grid-cols-[80px_1fr_1fr] gap-4 py-8 border-t border-white/15 items-baseline transition-transform duration-500 hover:[transform:translateZ(40px)_rotateX(4deg)] motion-reduce:hover:transform-none">
                <span className="font-mono text-sm text-[hsl(var(--ember))]">0{i + 1}</span>
                <h3 className="font-serif text-4xl md:text-5xl group-hover:italic">{t}</h3>
                <p className="opacity-75 max-w-md">{d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  const [open, setOpen] = useState(false);
  const plans = [
    { n: 'Site Care', p: '$99', d: 'Hosting, security, backups and a monthly health report.' },
    { n: 'Growth System', p: '$249', d: 'Everything in Site Care, plus content, Google Business Profile and a monthly SEO report.', rec: true },
    { n: 'Full Stack Partner', p: '$499', d: 'Everything in Growth, plus a chatbot, email follow-up, social posting and a monthly strategy call.' },
  ];
  const build = ['Homepage and key service sections', 'Conversion copy', 'Review and proof blocks', 'SEO and analytics basics', 'Launch and handover walkthrough'];
  return (
    <section id="pricing" className="py-24 md:py-36 px-5 md:px-10 max-w-7xl mx-auto">
      <Reveal><p className="font-mono text-xs uppercase tracking-[0.3em] text-primary">Pricing</p><h2 className="font-serif text-[clamp(2.6rem,6vw,5.5rem)] leading-[0.92] mt-4 max-w-3xl">Start with the free audit. <em>Build when it makes sense.</em></h2></Reveal>
      <div className="mt-16 grid lg:grid-cols-[1fr_1.5fr] gap-5 items-stretch">
        <Reveal>
          <article className="rounded-[2rem] p-8 border border-foreground/10 bg-card h-full flex flex-col" data-testid="card-offer-audit">
            <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Step one</p>
            <h3 className="mt-3 text-2xl font-semibold">Website Leak Report</h3>
            <p className="font-serif italic text-6xl mt-4 text-primary">Free</p>
            <p className="mt-4 text-muted-foreground flex-1">Your biggest trust, mobile and conversion issues, ranked, with a priority fix list. Plain English, delivered in about 48 hours.</p>
            <a href="#audit" className="mt-8 rounded-full bg-primary text-primary-foreground px-6 py-3.5 font-semibold inline-flex items-center justify-center gap-2" data-testid="link-offer-audit">Get my free audit <ArrowUpRight size={18} /></a>
          </article>
        </Reveal>
        <Reveal delay={120}>
          <article className="relative rounded-[2rem] p-8 md:p-10 bg-[hsl(var(--wine))] text-[hsl(var(--cream))] h-full overflow-hidden shadow-[0_50px_100px_-30px_hsl(345_55%_11%/0.6)]" data-testid="card-offer-build">
            <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full gild opacity-20 blur-3xl" aria-hidden="true" />
            <p className="font-mono text-xs uppercase tracking-widest text-[hsl(var(--ember))]">Featured</p>
            <h3 className="mt-3 font-serif text-4xl md:text-5xl">Conversion Site Build</h3>
            <p className="mt-4"><span className="text-sm opacity-70">From </span><span className="font-serif text-6xl text-[hsl(var(--ember))]">$1,500</span><span className="text-sm opacity-70"> one time</span></p>
            <p className="mt-4 opacity-80 max-w-lg">A fast, mobile-first site with sharper copy, proof sections and a clear call to action on every screen.</p>
            <ul className="mt-6 grid sm:grid-cols-2 gap-x-6 gap-y-2">{build.map((it) => <li key={it} className="flex gap-2"><Check size={18} className="shrink-0 mt-0.5 text-[hsl(var(--ember))]" />{it}</li>)}</ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#audit" className="rounded-full gild text-[hsl(var(--wine))] px-6 py-3.5 font-semibold inline-flex items-center gap-2" data-testid="link-build-audit">Start with the free audit <ArrowUpRight size={18} /></a>
              <a href={CAL} target="_blank" rel="noreferrer" className="rounded-full border border-white/30 px-6 py-3.5 inline-flex items-center gap-2" data-testid="link-build-book">Book a call <CalendarDays size={18} /></a>
            </div>
          </article>
        </Reveal>
      </div>
      <Reveal className="mt-5">
        <div className="rounded-[2rem] bg-secondary">
          <button onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="plans-panel" className="w-full flex items-center justify-between gap-4 p-7 md:px-10 text-left" data-testid="button-toggle-plans">
            <span><span className="font-serif text-3xl">Optional monthly plans</span><span className="block text-sm text-muted-foreground mt-1">After launch, if you want us to keep it running and growing. From $99 a month.</span></span>
            <ChevronDown className={`shrink-0 transition-transform duration-500 ${open ? 'rotate-180' : ''}`} />
          </button>
          <div id="plans-panel" hidden={!open} className="px-7 md:px-10 pb-8">
            {plans.map((p, i) => (
              <div key={p.n} className={`grid grid-cols-[1fr_auto] gap-x-6 py-6 border-t border-foreground/15 ${p.rec ? 'relative' : ''}`} data-testid={`row-plan-${i}`}>
                <h3 className="font-serif text-3xl flex flex-wrap items-center gap-3">{p.n}{p.rec && <span className="font-mono text-[10px] uppercase tracking-widest gild text-[hsl(var(--wine))] rounded-full px-2.5 py-1">Recommended</span>}</h3>
                <p className="font-serif text-4xl text-primary">{p.p}<span className="text-sm font-sans text-muted-foreground">/mo</span></p>
                <p className="col-span-2 mt-2 text-muted-foreground max-w-xl">{p.d}</p>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function Process() {
  const s = [['Free audit', 'A plain-English report on what your site is costing you, in about 48 hours.'], ['Redesign preview', 'See a concept of your new homepage before you decide anything.'], ['Build and launch', 'Mobile-first build with conversion copy, proof, SEO and analytics basics.'], ['Keep it growing', 'Optional monthly care, content and local SEO.']];
  return (
    <section id="process" className="bg-secondary/60 py-24 md:py-36 px-5 md:px-10">
      <div className="max-w-7xl mx-auto">
        <Reveal><h2 className="font-serif text-[clamp(2.6rem,6vw,5.5rem)] leading-[0.92]">How it <em className="text-primary">actually</em> goes.</h2></Reveal>
        <ol className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {s.map(([t, d], i) => (
            <Reveal key={t} delay={i * 100}>
              <li className="list-none"><span className="font-serif italic text-[7rem] leading-none text-[hsl(36_45%_48%)]">{i + 1}</span><h3 className="text-xl font-semibold mt-2">{t}</h3><p className="text-muted-foreground mt-2">{d}</p></li>
            </Reveal>
          ))}
        </ol>
        <Reveal className="mt-16 border-t border-foreground/15 pt-8 max-w-2xl">
          <p className="font-serif text-2xl">No invented reviews. No borrowed logos.</p>
          <p className="mt-2 text-muted-foreground">We are a new San Francisco studio. Our approach is built around the problems we see on real local websites.</p>
        </Reveal>
      </div>
    </section>
  );
}

function Audit() {
  const [url, setUrl] = useState('');
  const [name, setName] = useState('');
  const [biz, setBiz] = useState('');
  const [draft, setDraft] = useState('');
  const [err, setErr] = useState('');
  const submit = (e: FormEvent) => {
    e.preventDefault();
    const u = url.trim();
    if (!/^(https?:\/\/)?[\w-]+(\.[\w-]+)+/.test(u)) { setErr('Please enter a valid website address, like yourbusiness.com'); return; }
    setErr('');
    const body = `Hi SmartContent Lab,\n\nI'd like a free Website Leak Report.\n\nWebsite: ${u}\nName: ${name || '-'}\nBusiness type: ${biz || '-'}\n\nThanks!`;
    const href = `mailto:${EMAIL}?subject=${encodeURIComponent('Free Website Leak Report request')}&body=${encodeURIComponent(body)}`;
    setDraft(href);
    window.location.href = href;
  };
  const field = 'w-full bg-transparent border-b-2 border-[hsl(var(--cream)/0.3)] focus:border-[hsl(var(--ember))] outline-none py-3 text-lg placeholder:text-[hsl(var(--cream)/0.4)] transition-colors';
  return (
    <section id="audit" className="bg-[hsl(var(--wine))] text-[hsl(var(--cream))] py-24 md:py-36 px-5 md:px-10">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-[hsl(var(--ember))]">Free Website Leak Report</p>
          <h2 className="font-serif text-[clamp(3rem,7vw,6.5rem)] leading-[0.88] mt-5">What is your site <em className="text-[hsl(var(--ember))]">costing you?</em></h2>
          <p className="mt-6 opacity-80 max-w-md">Send us your URL. You get your biggest trust, mobile and conversion issues, ranked, with a priority fix list. Plain English, in about 48 hours.</p>
          <div className="mt-10 flex flex-col gap-3 text-sm">
            <a href={`mailto:${EMAIL}`} className="inline-flex items-center gap-2 hover:text-[hsl(var(--ember))]" data-testid="link-email"><Mail size={16} />{EMAIL}</a>
            <a href={CAL} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 hover:text-[hsl(var(--ember))]" data-testid="link-cal"><CalendarDays size={16} />cal.com/smartcontentlab</a>
          </div>
        </Reveal>
        <Reveal delay={150}>
          <form onSubmit={submit} className="rounded-[2rem] border border-[hsl(var(--ember)/0.25)] bg-white/[0.03] p-7 md:p-10 space-y-6" noValidate>
            <label className="block"><span className="font-mono text-xs uppercase tracking-widest opacity-70">Website URL *</span>
              <input className={field} value={url} onChange={(e) => setUrl(e.target.value)} placeholder="yourbusiness.com" inputMode="url" required aria-invalid={!!err} aria-describedby="url-err" data-testid="input-url" /></label>
            {err && <p id="url-err" className="text-[hsl(var(--ember))] text-sm" role="alert">{err}</p>}
            <label className="block"><span className="font-mono text-xs uppercase tracking-widest opacity-70">Your name</span>
              <input className={field} value={name} onChange={(e) => setName(e.target.value)} placeholder="Optional" data-testid="input-name" /></label>
            <label className="block"><span className="font-mono text-xs uppercase tracking-widest opacity-70">Business type</span>
              <input className={field} value={biz} onChange={(e) => setBiz(e.target.value)} placeholder="Painter, groomer, locksmith..." data-testid="input-business" /></label>
            <button type="submit" className="w-full rounded-full gild text-[hsl(var(--wine))] font-semibold py-4 inline-flex justify-center items-center gap-2 hover:-translate-y-0.5 transition-transform" data-testid="button-audit">Open my email draft <Mail size={18} /></button>
            <p className="text-xs opacity-60" aria-live="polite" data-testid="text-audit-status">
              {draft ? <>Your email app should now show a prefilled draft. Nothing is sent until you press send there. <a href={draft} className="underline">Open it again</a>.</> : 'This opens a prefilled draft in your email app. Nothing is sent automatically.'}
            </p>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer id="footer" className="bg-[hsl(var(--wine))] text-[hsl(var(--cream))] px-5 md:px-10 pb-28 md:pb-10 overflow-hidden">
      <p className="font-serif font-light text-[18vw] leading-[0.8] tracking-[-0.05em] opacity-90 -ml-2">Smart<em className="text-[hsl(var(--ember))]">Content</em></p>
      <div className="mt-8 flex flex-wrap justify-between gap-4 text-sm opacity-70 border-t border-white/15 pt-6">
        <span>SmartContent Lab, San Francisco</span>
        <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
        <a href="#top">Back to top</a>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <main>
      <CursorStage />
      <Nav />
      <Hero />
      <Industries />
      <Story />
      <Demo />
      <Services />
      <Pricing />
      <Process />
      <Audit />
      <Footer />
      <MobileBar />
    </main>
  );
}
