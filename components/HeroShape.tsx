"use client";

import { useEffect, useRef } from "react";

/**
 * Lightweight dark liquid shape — a raymarched obsidian ring with drips
 * falling from its rim, lit by a faint green kicker. A single fragment
 * shader on raw WebGL (no three.js, ~0 KB of deps).
 *
 * Perf budget:
 *  - Renders at reduced internal resolution (0.5x on phones, ≤1x on desktop)
 *    and lets the browser upscale the canvas.
 *  - Pauses when the hero is off-screen or the tab is hidden.
 *  - Draws a single still frame for prefers-reduced-motion.
 *  - Falls back to a CSS glow if WebGL is unavailable.
 */

const VERT = `
attribute vec2 p;
void main(){ gl_Position = vec4(p, 0.0, 1.0); }
`;

const FRAG = `
precision mediump float;
uniform vec2  uRes;
uniform float uTime;
uniform vec2  uMouse;
uniform vec2  uOffset;   // shape center in uv-space
uniform float uScale;
uniform float uIntro;    // 0 -> 1 entrance
uniform int   uSteps;

mat2 rot(float a){ float c=cos(a), s=sin(a); return mat2(c,-s,s,c); }

float sdRoundBox2(vec2 p, vec2 b, float r){
  vec2 q = abs(p) - b + r;
  return length(max(q,0.0)) + min(max(q.x,q.y),0.0) - r;
}
float sdCapsule(vec3 p, vec3 a, vec3 b, float r){
  vec3 pa = p-a, ba = b-a;
  float h = clamp(dot(pa,ba)/dot(ba,ba), 0.0, 1.0);
  return length(pa - ba*h) - r;
}
float smin(float a, float b, float k){
  float h = clamp(0.5 + 0.5*(b-a)/k, 0.0, 1.0);
  return mix(b, a, h) - k*h*(1.0-h);
}

const float TILT = 0.95;
const float RING = 1.05;

float map(vec3 p){
  // ---- the ring (object space) ----
  vec3 q3 = p;
  q3.yz *= rot(TILT + uMouse.y*0.12);
  q3.xz *= rot(uTime*0.15 + uMouse.x*0.3 + (1.0-uIntro)*3.0);
  float R = mix(0.25, RING, uIntro);
  float phi = atan(q3.z, q3.x);
  vec2 q = vec2(length(q3.xz) - R, q3.y);
  q *= rot(phi*0.5 + uTime*0.45);
  float th = 0.34*uIntro + 0.02;
  float breathe = 0.035*sin(uTime*1.1 + phi*3.0);
  float d = sdRoundBox2(q, vec2(th + breathe, th - breathe), 0.13*uIntro + 0.01);
  d += 0.018*sin(q3.x*5.0 + uTime*1.4)*sin(q3.y*4.0 - uTime*0.9);
  d *= 0.7;

  // ---- drips (world space, hanging from the ring's lower rim) ----
  float drip = 1e3;
  float on = smoothstep(0.85, 1.0, uIntro);
  for(int i=0;i<3;i++){
    float fi = float(i);
    float x = (fi-1.0)*0.48 + 0.06*sin(fi*7.3);
    float attach = -(sin(TILT)*sqrt(max(RING*RING - x*x, 0.0)) + 0.24);
    float ph = fract(uTime*0.11 + fi*0.37);
    vec3 top = vec3(x, attach + 0.12, 0.0);
    if(ph < 0.6){
      float g = smoothstep(0.0, 0.6, ph);
      float r = 0.105*g*on;
      vec3 c = vec3(x, attach - 0.04 - g*0.16, 0.0);
      float blob = length(p - c) - r;
      blob = min(blob, sdCapsule(p, top, c, r*0.45));
      drip = min(drip, blob);
    } else {
      float f = (ph - 0.6)/0.4;
      float r = 0.095*(1.0 - f*0.5)*on;
      vec3 c = vec3(x, attach - 0.24 - f*f*3.4, 0.0);
      vec3 dp = p - c;
      dp.y /= 1.0 + f*0.7;            // stretch while falling
      drip = min(drip, (length(dp) - r)*0.8);
      // thin retracting thread
      float tr = 0.03*(1.0 - smoothstep(0.0, 0.35, f))*on;
      drip = min(drip, sdCapsule(p, top, mix(top, c, 0.5*(1.0-f)), tr));
    }
  }
  return smin(d, drip, 0.16);
}

vec3 calcNormal(vec3 p){
  const vec2 k = vec2(1.0,-1.0);
  const float h = 0.002;
  return normalize(k.xyy*map(p+k.xyy*h) + k.yyx*map(p+k.yyx*h) +
                   k.yxy*map(p+k.yxy*h) + k.xxx*map(p+k.xxx*h));
}

const vec3 GREEN = vec3(0.12, 0.95, 0.55);

// dark studio: two white softboxes + one faint green kicker
vec3 env(vec3 d){
  vec3 c = vec3(0.012) + vec3(0.03)*smoothstep(-0.2, 1.0, d.y);
  c += vec3(1.0) * smoothstep(0.90, 0.99, dot(d, normalize(vec3(-0.6,0.75,0.35)))) * 2.2;
  c += vec3(0.8) * smoothstep(0.96, 1.0,  dot(d, normalize(vec3(0.7,0.35,0.6)))) * 1.2;
  c += GREEN     * smoothstep(0.75, 1.0,  dot(d, normalize(vec3(0.9,-0.35,-0.2)))) * 0.35;
  // horizon strip for that liquid-metal streak
  c += vec3(0.6) * smoothstep(0.08, 0.0, abs(d.y - 0.05)) * 0.45;
  return c;
}

void main(){
  vec2 uv = (gl_FragCoord.xy - 0.5*uRes) / uRes.y;
  uv -= uOffset;
  uv /= uScale;

  vec3 ro = vec3(0.0, 0.25, 6.0);
  vec3 rd = normalize(vec3(uv, -1.6));

  float t = 0.0;
  float glow = 0.0;
  bool hit = false;
  for(int i=0;i<90;i++){
    if(i >= uSteps) break;
    vec3 p = ro + rd*t;
    float d = map(p);
    glow += 0.01 / (0.03 + d*d*8.0);
    if(d < 0.0015){ hit = true; break; }
    t += d;
    if(t > 10.0) break;
  }

  vec3 col = vec3(0.0);
  float alpha = 0.0;

  if(hit){
    vec3 p = ro + rd*t;
    vec3 n = calcNormal(p);
    float ndv = clamp(dot(n, -rd), 0.0, 1.0);
    float fres = 0.04 + 0.96*pow(1.0 - ndv, 5.0);
    vec3 r = reflect(rd, n);

    vec3 base = vec3(0.010, 0.012, 0.013);           // obsidian
    col = base + env(r) * (0.22 + 0.78*fres);
    // faint green rim light from behind-right
    vec3 gl = normalize(vec3(0.9, -0.2, -0.5));
    float rim = pow(1.0 - ndv, 2.2) * (0.5 + 0.5*dot(n, gl));
    col += GREEN * rim * 0.28;
    col += GREEN * max(dot(n, normalize(vec3(1.0,0.1,0.4))), 0.0) * 0.025;
    // crisp key highlight
    col += vec3(1.0) * pow(max(dot(r, normalize(vec3(-0.5,0.8,0.5))), 0.0), 90.0) * 1.4;
    alpha = 1.0;
  }

  // soft green halo around the silhouette
  float g = clamp(glow*0.012, 0.0, 0.35) * (1.0 - alpha) * uIntro;
  col += GREEN * g * 0.6;
  alpha = max(alpha, g * 0.6);

  col = col / (1.0 + col*0.4);
  col *= smoothstep(0.0, 0.35, uIntro);
  alpha *= smoothstep(0.0, 0.35, uIntro);
  gl_FragColor = vec4(col*alpha, alpha);
}
`;

type Props = { className?: string };

export default function HeroShape({ className }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fallbackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", {
      premultipliedAlpha: true,
      alpha: true,
      antialias: false,
      depth: false,
      stencil: false,
      powerPreference: "low-power",
    });
    if (!gl) {
      fallbackRef.current?.classList.remove("hidden");
      return;
    }

    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    };
    const prog = gl.createProgram()!;
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      fallbackRef.current?.classList.remove("hidden");
      return;
    }
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "p");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const u = (n: string) => gl.getUniformLocation(prog, n);
    const uRes = u("uRes"), uTime = u("uTime"), uMouse = u("uMouse"),
      uOffset = u("uOffset"), uScale = u("uScale"), uIntro = u("uIntro"), uSteps = u("uSteps");

    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const lowEnd = (navigator.hardwareConcurrency || 4) <= 4;
    const renderScale = isMobile ? 0.5 : lowEnd ? 0.6 : Math.min(window.devicePixelRatio, 1.5) * 0.65;
    gl.uniform1i(uSteps, isMobile || lowEnd ? 56 : 80);

    let w = 0, h = 0;
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = Math.max(1, Math.round(rect.width * renderScale));
      h = Math.max(1, Math.round(rect.height * renderScale));
      canvas.width = w;
      canvas.height = h;
      gl.viewport(0, 0, w, h);
      gl.uniform2f(uRes, w, h);
      const aspect = rect.width / Math.max(rect.height, 1);
      // layout mode follows the viewport (matches the CSS aspect-ratio query)
      if (window.innerWidth / window.innerHeight > 1.4) {
        // desktop: shape sits to the right of the copy
        gl.uniform2f(uOffset, aspect * 0.27, 0.0);
        gl.uniform1f(uScale, aspect > 1.5 ? 0.95 : 0.8);
      } else {
        // mobile / portrait: shape floats above the headline
        // keep the shape in the first screen, ~24% from the top
        gl.uniform2f(uOffset, 0.0, 0.5 - (window.innerHeight * 0.25) / Math.max(rect.height, 1));
        gl.uniform1f(uScale, Math.min(0.85, aspect * 1.2));
      }
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    // mouse tilt (desktop only), eased
    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
    const onMove = (e: PointerEvent) => {
      mouse.tx = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.ty = (e.clientY / window.innerHeight) * 2 - 1;
    };
    if (!isMobile) window.addEventListener("pointermove", onMove, { passive: true });

    let raf = 0;
    let visible = true;
    let t0 = performance.now();
    let elapsed = 0;
    const mountedAt = performance.now();

    const draw = (now: number) => {
      elapsed += Math.min((now - t0) / 1000, 0.05);
      t0 = now;
      mouse.x += (mouse.tx - mouse.x) * 0.05;
      mouse.y += (mouse.ty - mouse.y) * 0.05;
      gl.uniform1f(uTime, elapsed + 4.0);
      gl.uniform2f(uMouse, mouse.x, mouse.y);
      // entrance: ease-out-expo over 2.4s after a short delay
      const k = reduced ? 1 : Math.min(Math.max((now - mountedAt) / 1000 - 0.35, 0) / 2.4, 1);
      gl.uniform1f(uIntro, k === 1 ? 1 : 1 - Math.pow(2, -10 * k));
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    const loop = (now: number) => {
      draw(now);
      raf = requestAnimationFrame(loop);
    };
    const start = () => {
      if (reduced || raf || !visible || document.hidden) return;
      t0 = performance.now();
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };

    draw(performance.now());
    start();

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      visible ? start() : stop();
    });
    io.observe(canvas);
    const onVis = () => (document.hidden ? stop() : start());
    document.addEventListener("visibilitychange", onVis);

    return () => {
      stop();
      io.disconnect();
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("pointermove", onMove);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, []);

  return (
    <div aria-hidden className={className}>
      <canvas ref={canvasRef} className="h-full w-full" />
      <div
        ref={fallbackRef}
        className="hidden absolute right-[10%] top-1/2 h-[42vmin] w-[42vmin] -translate-y-1/2 rounded-full blur-2xl"
        style={{
          background:
            "radial-gradient(circle, rgba(16,185,129,0.25), transparent 70%)",
        }}
      />
    </div>
  );
}
