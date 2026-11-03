import { useEffect, useRef, useState } from 'react';
import type { Anchor } from './scene';

/* The flight path. Desktop parks the cursor in the empty half of each chapter;
   mobile keeps it small and tucked into corners so it never sits on copy. */
export const ANCHORS: Anchor[] = [
  { id: 'top', d: { x: 0.52, y: -0.06, s: 0, rz: 8, ry: -24, rx: 6, click: 1 }, m: { x: 0.5, y: 0.6, s: 0, rz: 10, ry: -20, rx: 4, click: 1 } },
  { id: 'ch-land', d: { x: -0.5, y: 0.0, s: 0.34, rz: -18, ry: 30, rx: 10 }, m: { x: 0.55, y: 0.62, s: 0.13, rz: -18, ry: 30, rx: 8 } },
  { id: 'ch-hesitate', d: { x: 0.5, y: 0.08, s: 0.3, rz: 40, ry: -60, rx: -8 }, m: { x: -0.55, y: 0.62, s: 0.12, rz: 40, ry: -50, rx: -6 } },
  { id: 'ch-leave', d: { x: 0.62, y: 0.55, s: 0.12, rz: 150, ry: 140, rx: 20 }, m: { x: 0.7, y: 0.72, s: 0.06, rz: 150, ry: 140, rx: 20 } },
  { id: 'demo', d: { x: 0.8, y: 0.62, s: 0.14, rz: -10, ry: 20, rx: 4 }, m: { x: 0.72, y: 0.7, s: 0.07, rz: -10, ry: 20, rx: 4 } },
  { id: 'services', d: { x: 0.62, y: 0.02, s: 0.36, rz: 20, ry: -200, rx: 12 }, m: { x: 0.62, y: 0.7, s: 0.1, rz: 20, ry: -190, rx: 10 } },
  { id: 'pricing', d: { x: -0.74, y: 0.62, s: 0.12, rz: -30, ry: 30, rx: 0 }, m: { x: 0.72, y: 0.74, s: 0.0, rz: -30, ry: 30, rx: 0 } },
  { id: 'process', d: { x: 0.74, y: 0.58, s: 0.14, rz: 10, ry: -30, rx: 6 }, m: { x: 0.72, y: 0.74, s: 0.0, rz: 10, ry: -30, rx: 6 } },
  { id: 'audit', d: { x: -0.36, y: -0.48, s: 0.24, rz: 2, ry: -12, rx: 8, click: 1 }, m: { x: 0.7, y: 0.74, s: 0.0, rz: 2, ry: -12, rx: 8 } },
  { id: 'footer', d: { x: 0.56, y: 0.2, s: 0.3, rz: 6, ry: -380, rx: 4 }, m: { x: 0.55, y: 0.5, s: 0.14, rz: 6, ry: -370, rx: 4 } },
];

function webglOk() {
  try { const c = document.createElement('canvas'); return !!(c.getContext('webgl2') || c.getContext('webgl')); } catch { return false; }
}

export function CursorStage() {
  const ref = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas || !webglOk()) return;
    let dispose: (() => void) | undefined;
    let dead = false;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    // lazy chunk: page renders and stays usable while three.js streams in
    import('./scene')
      .then(({ createCursorScene }) => {
        if (dead) return;
        dispose = createCursorScene(canvas, ANCHORS, reduced);
        requestAnimationFrame(() => setReady(true));
      })
      .catch(() => { /* no 3D, the page reads fine without it */ });
    return () => { dead = true; dispose?.(); };
  }, []);
  return <canvas ref={ref} aria-hidden="true" className={`cursor-stage ${ready ? 'ready' : ''}`} />;
}
