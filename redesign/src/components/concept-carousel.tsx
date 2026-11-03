import { useEffect, useRef, useState, type ReactNode } from 'react';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import './concept-carousel.css';

const BASE = import.meta.env.BASE_URL;

/* Five original miniature site concepts, each with its own composition. Units are em (1em = 10 frame units). */
const CONCEPTS: { key: string; name: string; node: ReactNode }[] = [
  {
    key: 'paint', name: 'Fogline Painting, house painter',
    node: (
      <div className="absolute inset-0 bg-[#f2ebdf] text-[#3d0f1a] flex flex-col">
        <div className="flex justify-between items-center px-[1em] pt-[1em] text-[.8em] font-semibold"><span className="font-serif text-[1.3em]">Fogline</span><span className="rounded-full bg-[#3d0f1a] text-[#f2ebdf] px-[.7em] py-[.25em]">Estimate</span></div>
        <p className="font-serif px-[1em] mt-[.9em] text-[2em] leading-[.95]">Victorians, <em>repainted.</em></p>
        <img src={`${BASE}concepts/paint.jpg`} alt="" className="mt-auto h-[58%] w-full object-cover" />
      </div>
    ),
  },
  {
    key: 'groom', name: 'Tidy Paws, dog grooming',
    node: (
      <div className="absolute inset-0 bg-[#f4d77c] text-[#2a1d08] flex flex-col items-center text-center">
        <p className="mt-[1.3em] font-sans font-bold uppercase text-[.75em] tracking-[.2em]">Tidy Paws</p>
        <div className="mt-[1em] w-[72%] aspect-square rounded-full overflow-hidden ring-[.4em] ring-[#fff6dc]"><img src={`${BASE}concepts/groom.jpg`} alt="" className="h-full w-full object-cover" /></div>
        <p className="mt-[.8em] font-sans font-extrabold text-[2.1em] leading-[.9] tracking-tight">Fresh cuts.<br />Calm pups.</p>
        <span className="mt-[.7em] rounded-full bg-[#2a1d08] text-[#f4d77c] text-[.8em] font-semibold px-[1em] py-[.4em]">Book a groom</span>
      </div>
    ),
  },
  {
    key: 'salon', name: 'Hush Room, massage and wellness',
    node: (
      <div className="absolute inset-0 text-[#f3efe6]">
        <img src={`${BASE}concepts/salon.jpg`} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#24352b] via-[#24352b]/40 to-transparent" />
        <p className="absolute top-[1em] left-0 right-0 text-center font-serif italic text-[1.2em]">hush room</p>
        <div className="absolute left-[1em] right-[1em] bottom-[3.6em]">
          <p className="font-serif text-[2.1em] leading-[.95]">An hour that is only yours.</p>
          <p className="text-[.8em] mt-[.5em] opacity-80 border-t border-white/30 pt-[.5em]">Massage / Facials / Inner Sunset</p>
        </div>
      </div>
    ),
  },
  {
    key: 'garden', name: 'Fern and Fog, garden care',
    node: (
      <div className="absolute inset-0 bg-[#1f3a2c] text-[#e7f0d8] flex flex-col">
        <p className="px-[1em] pt-[1.1em] font-mono text-[.7em] tracking-widest uppercase opacity-70">Fern &amp; Fog Gardens</p>
        <p className="px-[1em] mt-[.4em] font-sans font-bold text-[2.6em] leading-[.85] tracking-[-.04em]">Yards that love the fog.</p>
        <div className="mt-auto mx-[.8em] mb-[.8em] h-[46%] rounded-[1em] overflow-hidden"><img src={`${BASE}concepts/garden.jpg`} alt="" className="h-full w-full object-cover" /></div>
      </div>
    ),
  },
  {
    key: 'electric', name: 'Bright Line Electric, electrician',
    node: (
      <div className="absolute inset-0 bg-[#16213a] text-[#f3ecda] flex flex-col">
        <div className="h-[.6em] bg-[#e8b84a]" />
        <p className="px-[1em] pt-[1em] font-sans font-extrabold uppercase text-[.85em] tracking-[.08em] text-[#e8b84a]">Bright Line Electric</p>
        <img src={`${BASE}concepts/electric.jpg`} alt="" className="mt-[.8em] h-[40%] w-full object-cover" />
        <p className="px-[1em] mt-[.8em] font-sans font-bold text-[1.9em] leading-[.95]">Panels, lighting, EV chargers.</p>
        <p className="px-[1em] mt-[.4em] text-[.75em] opacity-70">Licensed. Clear quotes before work starts.</p>
      </div>
    ),
  },
];

const CARDS = Array.from({ length: 10 }, (_, i) => CONCEPTS[i % 5]);
const PITCH = 196;
const SPEED = 50;

function cardPath(w: number, ytl: number, ybl: number, ytr: number, ybr: number, r: number) {
  const k = (ytr - ytl) / w, kb = (ybr - ybl) / w;
  const f = (n: number) => n.toFixed(1);
  return `path('M0,${f(ytl + r)} Q0,${f(ytl)} ${f(r)},${f(ytl + r * k)} L${f(w - r)},${f(ytr - r * k)} Q${f(w)},${f(ytr)} ${f(w)},${f(ytr + r)} L${f(w)},${f(ybr - r)} Q${f(w)},${f(ybr)} ${f(w - r)},${f(ybr - r * kb)} L${f(r)},${f(ybl + r * kb)} Q0,${f(ybl)} 0,${f(ybl - r)} Z')`;
}

export function ConceptCarousel() {
  const band = useRef<HTMLDivElement>(null);
  const cards = useRef<(HTMLDivElement | null)[]>([]);
  const [paused, setPaused] = useState(false);
  const [reduced] = useState(() => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const st = useRef({ o: 0, v: 0, pending: 0, paused: false, drag: false, render: () => {} });
  st.current.paused = paused || reduced;

  useEffect(() => {
    const el = band.current!;
    const s = st.current;
    let W = 0, H = 0, u = 1, frameU = 1440;
    const measure = () => {
      W = el.clientWidth;
      const mobile = W <= 820;
      frameU = mobile ? 640 : 1440;
      u = W / frameU;
      H = mobile ? 250 : Math.min(420 * u, 440);
      if (mobile) u = Math.min(u, 250 / 380);
      el.style.height = `${H}px`;
      el.style.setProperty('--u', String(u));
    };
    const render = () => {
      const Cu = W / u / 2;
      const half = Cu - 14;
      const L = CARDS.length * PITCH;
      const cyBase = H / 2 / u;
      CARDS.forEach((_, i) => {
        const c = cards.current[i];
        if (!c) return;
        const raw = i * PITCH - s.o;
        const t = (((raw % L) + L) % L) - L / 2;
        const x = Cu + t * (1 + 0.083 * (t / half) ** 2);
        const d = Math.min(1.6, Math.abs(x - Cu) / half);
        const w = 170 + 48 * d * d;
        const xl = x - w / 2, xr = x + w / 2;
        const ql = Math.min(1.6, Math.abs(xl - Cu) / half), qr = Math.min(1.6, Math.abs(xr - Cu) / half);
        const hl = 280 + 92 * ql ** 2.6, hr = 280 + 92 * qr ** 2.6;
        const bh = Math.max(hl, hr);
        const cy = cyBase + 6 - 12 * d * d;
        const pw = w * u, ph = bh * u;
        c.style.width = `${pw}px`;
        c.style.height = `${ph}px`;
        c.style.transform = `translate3d(${(xl * u).toFixed(1)}px,${((cy - bh / 2) * u).toFixed(1)}px,0)`;
        c.style.clipPath = cardPath(pw, (ph - hl * u) / 2, (ph + hl * u) / 2, (ph - hr * u) / 2, (ph + hr * u) / 2, 15 * u);
        c.style.visibility = xr < -40 || xl > Cu * 2 + 40 ? 'hidden' : 'visible';
      });
    };
    s.render = render;
    measure();
    render();

    let raf = 0, last = 0, visible = true;
    const tick = (now: number) => {
      raf = 0;
      const dt = last ? Math.min(0.05, (now - last) / 1000) : 0;
      last = now;
      if (!s.drag) {
        if (Math.abs(s.v) > 2) { s.o += s.v * dt; s.v *= Math.pow(0.05, dt); }
        else { s.v = 0; if (!s.paused) s.o += SPEED * dt; }
        if (s.pending) { const step = s.pending * (1 - Math.exp(-dt * 9)); s.o += step; s.pending -= step; if (Math.abs(s.pending) < 0.3) { s.o += s.pending; s.pending = 0; } }
      }
      render();
      start();
    };
    const start = () => { if (!raf && visible && !document.hidden && !reduced) raf = requestAnimationFrame(tick); };
    const stop = () => { if (raf) cancelAnimationFrame(raf); raf = 0; last = 0; };
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible) start(); else stop(); });
    io.observe(el);
    const onVis = () => (document.hidden ? stop() : start());
    document.addEventListener('visibilitychange', onVis);
    const ro = new ResizeObserver(() => { measure(); render(); });
    ro.observe(el);

    /* Drag: horizontal intent only, so vertical page scroll on touch keeps working. */
    let sx = 0, sy = 0, lx = 0, lt = 0, id = -1, decided = false;
    const down = (e: PointerEvent) => { id = e.pointerId; sx = lx = e.clientX; sy = e.clientY; lt = performance.now(); decided = false; s.v = 0; };
    const move = (e: PointerEvent) => {
      if (e.pointerId !== id) return;
      if (!decided) {
        const dx = Math.abs(e.clientX - sx), dy = Math.abs(e.clientY - sy);
        if (dx < 6 && dy < 6) return;
        decided = true;
        if (dy > dx) { id = -1; return; }
        s.drag = true; s.pending = 0;
        el.setPointerCapture(e.pointerId);
        el.classList.add('is-dragging');
      }
      if (!s.drag) return;
      const now = performance.now();
      const delta = (e.clientX - lx) / u;
      s.o -= delta;
      const dt = Math.max(1, now - lt) / 1000;
      s.v = 0.8 * (-delta / dt) + 0.2 * s.v;
      lx = e.clientX; lt = now;
      if (reduced) render();
    };
    const up = (e: PointerEvent) => {
      if (e.pointerId !== id) return;
      id = -1;
      if (s.drag) { s.drag = false; el.classList.remove('is-dragging'); if (performance.now() - lt > 80) s.v = 0; if (reduced) s.v = 0; }
    };
    el.addEventListener('pointerdown', down);
    el.addEventListener('pointermove', move);
    el.addEventListener('pointerup', up);
    el.addEventListener('pointercancel', up);
    start();
    return () => {
      stop(); io.disconnect(); ro.disconnect();
      document.removeEventListener('visibilitychange', onVis);
      el.removeEventListener('pointerdown', down); el.removeEventListener('pointermove', move);
      el.removeEventListener('pointerup', up); el.removeEventListener('pointercancel', up);
    };
  }, [reduced]);

  const step = (dir: 1 | -1) => {
    const s = st.current;
    if (reduced) { s.o += dir * PITCH; s.render(); }
    else s.pending += dir * PITCH;
  };

  return (
    <div className="relative">
      <div
        ref={band}
        className="cc-band"
        role="region"
        aria-roledescription="carousel"
        aria-label="Website concepts for local businesses. Each is a concept, not a client."
        tabIndex={0}
        onKeyDown={(e) => { if (e.key === 'ArrowRight') { e.preventDefault(); step(1); } if (e.key === 'ArrowLeft') { e.preventDefault(); step(-1); } }}
        data-testid="carousel-concepts"
      >
        {CARDS.map((c, i) => (
          <div key={i} ref={(n) => { cards.current[i] = n; }} className="cc-card" aria-hidden={i >= 5} role="group" aria-label={c.name}>
            <div className="cc-inner">{c.node}</div>
          </div>
        ))}
      </div>
      <div className="cc-controls mt-3 flex justify-center gap-2" aria-label="Carousel controls">
        <button type="button" onClick={() => step(-1)} aria-label="Previous concept" data-testid="button-carousel-prev"><ChevronLeft size={18} /></button>
        {!reduced && (
          <button type="button" onClick={() => setPaused((p) => !p)} aria-label={paused ? 'Play carousel' : 'Pause carousel'} aria-pressed={paused} data-testid="button-carousel-pause">{paused ? <Play size={16} /> : <Pause size={16} />}</button>
        )}
        <button type="button" onClick={() => step(1)} aria-label="Next concept" data-testid="button-carousel-next"><ChevronRight size={18} /></button>
      </div>
    </div>
  );
}
