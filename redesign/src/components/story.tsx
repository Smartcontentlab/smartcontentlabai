import { useEffect, useRef, useState, type ReactNode } from 'react';

function Chapter({ id, n, kicker, title, children, side }: { id: string; n: string; kicker: string; title: ReactNode; children: ReactNode; side: 'left' | 'right' }) {
  const ref = useRef<HTMLElement>(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setOn(true); io.disconnect(); } }, { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <section id={id} ref={ref} className={`chapter relative min-h-[100dvh] flex items-end md:items-center px-5 md:px-10 pb-28 md:pb-0 ${on ? 'in' : ''}`}>
      <span aria-hidden="true" className={`chapter-num absolute top-[14vh] md:top-[12vh] ${side === 'right' ? 'left-3 md:left-[6vw]' : 'right-3 md:right-[6vw]'}`}>{n}</span>
      <div className={`relative w-full md:w-[42vw] max-w-xl ${side === 'right' ? 'md:ml-auto md:mr-[6vw]' : 'md:ml-[6vw]'}`}>
        <p className="cr font-mono text-[11px] uppercase tracking-[0.3em] text-[hsl(var(--ember-deep))]">{kicker}</p>
        <h2 className="cr d1 mt-4 font-serif text-[clamp(2.6rem,6vw,5.4rem)] leading-[0.9] tracking-[-0.02em]">{title}</h2>
        <div className="cr d2 mt-6 text-base md:text-lg text-[hsl(345_20%_30%)] max-w-md leading-relaxed">{children}</div>
      </div>
    </section>
  );
}

export function Story() {
  return (
    <div className="story relative">
      <Chapter id="ch-land" n="01" side="right" kicker="Chapter one / The landing" title={<>Someone nearby <em className="text-[hsl(var(--primary))]">needs you.</em></>}>
        A pipe burst. A door will not lock. A dog needs a groom before Saturday. They search, they tap your name, and your homepage gets about the length of one breath to answer: can you help, and how do I reach you?
      </Chapter>
      <Chapter id="ch-hesitate" n="02" side="left" kicker="Chapter two / The hesitation" title={<>Then they <em className="text-[hsl(var(--primary))]">look around.</em></>}>
        "Welcome to our website." No area served. The phone number is in the footer. The reviews live on another tab. Nothing is broken, exactly. It just does not ask for the job.
      </Chapter>
      <Chapter id="ch-leave" n="03" side="right" kicker="Chapter three / The quiet exit" title={<>And the call goes <em className="text-[hsl(var(--primary))]">somewhere else.</em></>}>
        You never see that visitor. No missed call, no email, no record. That is what a website costs you, and why we start by showing you exactly where it happens.
        <a href="#demo" className="mt-6 inline-flex items-center gap-2 font-semibold text-[hsl(var(--primary))] underline underline-offset-4 decoration-[hsl(var(--ember))]" data-testid="link-story-demo">See what the fix looks like</a>
      </Chapter>
    </div>
  );
}
