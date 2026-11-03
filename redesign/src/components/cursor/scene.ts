import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

/* One keyframe per anchor section. x/y in viewport units (-1..1), s = height share of viewport,
   rz = pointing angle (deg), ry = turn (deg), click = presses + ripples while parked here. */
export type Key = { x: number; y: number; s: number; rz: number; ry: number; rx: number; click?: number };
export type Anchor = { id: string; d: Key; m: Key };

const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));
const R = THREE.MathUtils.degToRad;

function cursorShape() {
  // classic arrow pointer, tip at origin, body hanging down-right
  const s = new THREE.Shape();
  const p: [number, number][] = [[0, 0], [0, -17.5], [4.3, -13.6], [7.4, -20.6], [10.6, -19.2], [7.6, -12.4], [13, -12.4]];
  s.moveTo(p[0][0], p[0][1]);
  p.slice(1).forEach(([x, y]) => s.lineTo(x, y));
  s.closePath();
  return s;
}

export function createCursorScene(canvas: HTMLCanvasElement, anchors: Anchor[], reduced: boolean) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
  const mobileQ = () => window.innerWidth < 768;
  const dpr = () => Math.min(window.devicePixelRatio || 1, mobileQ() ? 1.5 : 2);
  renderer.setPixelRatio(dpr());
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;

  const scene = new THREE.Scene();
  const pmrem = new THREE.PMREMGenerator(renderer);
  const env = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  scene.environment = env;
  pmrem.dispose();

  const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 100);
  camera.position.set(0, 0, 10);
  scene.add(new THREE.HemisphereLight(0xfff3e0, 0x4a1020, 1.1));
  const key = new THREE.DirectionalLight(0xffe6c2, 2.8); key.position.set(3, 5, 6); scene.add(key);
  const rim = new THREE.DirectionalLight(0xff8a6a, 2.2); rim.position.set(-5, 1, -4); scene.add(rim);

  // ---- sculpture: bevelled gold pointer with an inset wine enamel face
  const geo = new THREE.ExtrudeGeometry(cursorShape(), { depth: 2.6, bevelEnabled: true, bevelThickness: 1.1, bevelSize: 0.9, bevelSegments: 10, curveSegments: 4 });
  geo.center();
  const gold = new THREE.MeshPhysicalMaterial({ color: 0xd9ad62, metalness: 1, roughness: 0.22, clearcoat: 0.6, clearcoatRoughness: 0.18, envMapIntensity: 1.25 });
  const body = new THREE.Mesh(geo, gold);
  const inner = new THREE.ShapeGeometry(cursorShape());
  inner.center();
  const enamel = new THREE.Mesh(inner, new THREE.MeshPhysicalMaterial({ color: 0x3a0d1c, metalness: 0.2, roughness: 0.35, clearcoat: 1, clearcoatRoughness: 0.06 }));
  enamel.scale.setScalar(0.66);
  enamel.position.set(0.25, 0.6, 2.42);
  const box = new THREE.Box3().setFromObject(body);
  const size = box.getSize(new THREE.Vector3());
  // shift so the tip is the pivot: makes "pointing" and pressing read correctly
  const tip = new THREE.Vector3(box.min.x + 1.0, box.max.y - 1.0, 0);
  const sculpt = new THREE.Group();
  sculpt.add(body, enamel);
  sculpt.position.set(-tip.x, -tip.y, 0);
  const unit = 1 / Math.max(size.x, size.y);

  const pivot = new THREE.Group(); // roll/pitch
  pivot.add(sculpt);
  pivot.scale.setScalar(unit);
  const flight = new THREE.Group();
  flight.add(pivot);
  scene.add(flight);

  // ---- click ripples: thin gold torus rings emitted at the tip
  const ringGeo = new THREE.TorusGeometry(1, 0.012, 12, 96);
  const rings = Array.from({ length: 3 }, () => {
    const m = new THREE.Mesh(ringGeo, new THREE.MeshStandardMaterial({ color: 0xe8c27a, metalness: 1, roughness: 0.25, transparent: true, opacity: 0, envMapIntensity: 1.4 }));
    m.visible = false; scene.add(m);
    return { m, age: 9 };
  });
  let ringIdx = 0;

  // ---- anchor math
  const cur = { x: 0, y: 0, s: 0, rz: 0, ry: 0, rx: 0, click: 0 };
  let first = true;
  const target = () => {
    const mob = mobileQ();
    const mid = window.innerHeight * 0.5;
    const pts = anchors.map((a) => {
      const el = document.getElementById(a.id);
      if (!el) return null;
      const r = el.getBoundingClientRect();
      return { c: r.top + Math.min(r.height, window.innerHeight) * 0.5, k: mob ? a.m : a.d };
    }).filter(Boolean) as { c: number; k: Key }[];
    if (!pts.length) return { ...cur };
    if (mid <= pts[0].c) return { ...pts[0].k, click: pts[0].k.click ?? 0, dive: 0 };
    for (let i = 0; i < pts.length - 1; i++) {
      const a = pts[i], b = pts[i + 1];
      if (mid >= a.c && mid <= b.c) {
        const f = (mid - a.c) / Math.max(1, b.c - a.c);
        const t = ease(clamp((f - 0.15) / 0.7, 0, 1));
        const arc = Math.sin(t * Math.PI);
        return {
          x: lerp(a.k.x, b.k.x, t), y: lerp(a.k.y, b.k.y, t) - arc * 0.12,
          s: lerp(a.k.s, b.k.s, t) * (1 + arc * 0.1), rz: lerp(a.k.rz, b.k.rz, t) - arc * 25,
          ry: lerp(a.k.ry, b.k.ry, t) + arc * 160, rx: lerp(a.k.rx, b.k.rx, t),
          click: lerp(a.k.click ?? 0, b.k.click ?? 0, t) * (1 - arc), dive: arc,
        };
      }
    }
    const l = pts[pts.length - 1].k;
    return { ...l, click: l.click ?? 0, dive: 0 };
  };

  const mouse = { x: 0, y: 0, sx: 0, sy: 0 };
  const onMove = (e: PointerEvent) => { if (e.pointerType !== 'mouse') return; mouse.x = (e.clientX / window.innerWidth) * 2 - 1; mouse.y = -(e.clientY / window.innerHeight) * 2 + 1; };
  window.addEventListener('pointermove', onMove, { passive: true });

  const resize = () => {
    renderer.setPixelRatio(dpr());
    renderer.setSize(window.innerWidth, window.innerHeight, false);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  };
  resize();
  window.addEventListener('resize', resize);

  const clock = new THREE.Clock();
  let raf = 0, running = false, lastPress = 0, prevX = 0, prevY = 0;

  const frame = () => {
    raf = 0;
    const dt = Math.min(clock.getDelta(), 0.05);
    const t = clock.elapsedTime;
    const g = target();
    const k = reduced || first ? 1 : 1 - Math.exp(-dt * 3.4);
    const kr = reduced || first ? 1 : 1 - Math.exp(-dt * 2.6);
    first = false;
    cur.x = lerp(cur.x, g.x, k); cur.y = lerp(cur.y, g.y, k); cur.s = lerp(cur.s, g.s, k);
    cur.rz = lerp(cur.rz, g.rz, kr); cur.ry = lerp(cur.ry, g.ry, kr); cur.rx = lerp(cur.rx, g.rx, kr); cur.click = lerp(cur.click, g.click, k);
    const vx = dt ? (cur.x - prevX) / dt : 0, vy = dt ? (cur.y - prevY) / dt : 0;
    prevX = cur.x; prevY = cur.y;
    mouse.sx = lerp(mouse.sx, mouse.x, 1 - Math.exp(-dt * 2)); mouse.sy = lerp(mouse.sy, mouse.y, 1 - Math.exp(-dt * 2));

    const halfH = Math.tan(R(camera.fov / 2)) * camera.position.z;
    const halfW = halfH * camera.aspect;
    const live = reduced ? 0 : 1;
    const bob = (Math.sin(t * 1.6) * 0.05 + Math.sin(t * 2.9) * 0.015) * live;

    // press cycle: every 2.4s while parked on a click anchor
    let press = 0;
    if (!reduced && cur.click > 0.4) {
      const ph = (t % 2.4) / 2.4;
      press = ph < 0.12 ? Math.sin((ph / 0.12) * Math.PI) : 0;
      if (ph < 0.06 && t - lastPress > 1.5) {
        lastPress = t;
        const r = rings[ringIdx++ % rings.length]; r.age = 0;
      }
    }

    flight.position.set(cur.x * halfW + mouse.sx * 0.12 * live, cur.y * halfH + bob * halfH * 0.4 + mouse.sy * 0.08 * live, -press * 0.6);
    flight.scale.setScalar(Math.max(0.0001, halfH * 2 * cur.s));
    flight.visible = cur.s > 0.004;
    pivot.rotation.set(
      R(cur.rx + clamp(vy * 18, -24, 24) + Math.sin(t * 1.1) * 4 * live + mouse.sy * 8 * live + press * 18),
      R(cur.ry + Math.sin(t * 0.7) * 10 * live + mouse.sx * 14 * live),
      R(cur.rz - clamp(vx * 14, -26, 26)),
      'YXZ',
    );

    // ripples sit flat facing camera at tip position
    const tipW = new THREE.Vector3(); pivot.getWorldPosition(tipW);
    rings.forEach((r) => {
      r.age += dt;
      const on = r.age < 1.4;
      r.m.visible = on;
      if (!on) return;
      const a = r.age / 1.4;
      r.m.position.copy(tipW);
      r.m.scale.setScalar(halfH * 2 * cur.s * (0.15 + ease(a) * 0.9));
      (r.m.material as THREE.MeshStandardMaterial).opacity = (1 - a) * 0.9;
    });

    renderer.render(scene, camera);
    if (running && !reduced) raf = requestAnimationFrame(frame);
  };

  const start = () => { if (running) return; running = true; clock.getDelta(); raf = requestAnimationFrame(frame); };
  const stop = () => { running = false; cancelAnimationFrame(raf); raf = 0; };
  const onVis = () => (document.hidden ? stop() : reduced ? frame() : start());
  document.addEventListener('visibilitychange', onVis);
  // reduced motion: no idle loop, just redraw on scroll/resize
  const onScroll = () => { if (reduced && !raf) raf = requestAnimationFrame(frame); };
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);

  if (reduced) frame(); else start();

  return () => {
    stop();
    document.removeEventListener('visibilitychange', onVis);
    window.removeEventListener('pointermove', onMove);
    window.removeEventListener('resize', resize);
    window.removeEventListener('scroll', onScroll);
    window.removeEventListener('resize', onScroll);
    geo.dispose(); inner.dispose(); ringGeo.dispose(); env.dispose(); gold.dispose();
    renderer.dispose();
  };
}
