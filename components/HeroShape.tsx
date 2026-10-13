"use client";

import { useEffect, useRef } from "react";

/**
 * Lightweight iridescent glass shape — a raymarched twisted torus rendered
 * with a single fragment shader (raw WebGL, no three.js, ~0 KB of deps).
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
uniform float uLight;    // 1.0 = light theme
uniform int   uSteps;

mat2 rot(float a){ float c=cos(a), s=sin(a); return mat2(c,-s,s,c); }

float sdRoundBox2(vec2 p, vec2 b, float r){
  vec2 q = abs(p) - b + r;
  return length(max(q,0.0)) + min(max(q.x,q.y),0.0) - r;
}

float map(vec3 p){
  p.yz *= rot(0.9 + uMouse.y*0.25);
  p.xz *= rot(uTime*0.18 + uMouse.x*0.4);
  p.xy *= rot(0.35 + sin(uTime*0.3)*0.15);

  float phi = atan(p.z, p.x);
  vec2 q = vec2(length(p.xz) - 1.05, p.y);
  // twisted rounded-rect cross section (half turn keeps it seamless)
  q *= rot(phi*0.5 + uTime*0.6);
  float breathe = 0.04*sin(uTime*1.3 + phi*3.0);
  float d = sdRoundBox2(q, vec2(0.36 + breathe, 0.36 - breathe), 0.12);
  // soft liquid ripple
  d += 0.025*sin(p.x*6.0 + uTime*1.7)*sin(p.y*5.0 - uTime*1.1);
  return d*0.7;
}

vec3 calcNormal(vec3 p){
  const vec2 k = vec2(1.0,-1.0);
  const float h = 0.002;
  return normalize(k.xyy*map(p+k.xyy*h) + k.yyx*map(p+k.yyx*h) +
                   k.yxy*map(p+k.yxy*h) + k.xxx*map(p+k.xxx*h));
}

vec3 env(vec3 d){
  float t = d.y*0.5 + 0.5;
  vec3 base = mix(vec3(0.02,0.03,0.05), vec3(0.10,0.12,0.16), t);
  // studio softboxes
  base += vec3(1.0,0.95,0.9) * smoothstep(0.92,1.0, dot(d, normalize(vec3(-0.6,0.7,0.4)))) * 1.6;
  base += vec3(0.4,0.9,1.0)  * smoothstep(0.85,1.0, dot(d, normalize(vec3(0.8,-0.2,0.5)))) * 0.9;
  base += vec3(0.2,1.0,0.6)  * smoothstep(0.7,1.0,  dot(d, normalize(vec3(0.0,-0.9,-0.3)))) * 0.5;
  return base;
}

vec3 iridescence(float t){
  // thin-film style palette, cool-leaning (emerald / cyan / violet / amber)
  return 0.5 + 0.5*cos(6.28318*(t + vec3(0.0, 0.18, 0.42)));
}

void main(){
  vec2 uv = (gl_FragCoord.xy - 0.5*uRes) / uRes.y;
  uv -= uOffset;
  uv /= uScale;

  vec3 ro = vec3(0.0, 0.0, 6.0);
  vec3 rd = normalize(vec3(uv, -1.6));

  float t = 0.0;
  float glow = 0.0;
  bool hit = false;
  for(int i=0;i<90;i++){
    if(i >= uSteps) break;
    vec3 p = ro + rd*t;
    float d = map(p);
    glow += 0.012 / (0.02 + d*d*6.0);
    if(d < 0.0015){ hit = true; break; }
    t += d;
    if(t > 9.0) break;
  }

  vec3 col = vec3(0.0);
  float alpha = 0.0;

  if(hit){
    vec3 p = ro + rd*t;
    vec3 n = calcNormal(p);
    float ndv = clamp(dot(n, -rd), 0.0, 1.0);
    float fres = pow(1.0 - ndv, 3.0);

    float film = ndv*1.4 + p.y*0.35 + uTime*0.06;
    vec3 irid = iridescence(film);

    vec3 refl = env(reflect(rd, n));
    vec3 refr = env(refract(rd, n, 0.72));

    col = refr * mix(vec3(1.0), irid, 0.85) * 1.25;
    col = mix(col, refl + irid*0.6, fres);
    col += irid * pow(1.0 - ndv, 1.5) * 0.55;
    // sharp spec
    vec3 l = normalize(vec3(-0.5,0.8,0.6));
    col += pow(max(dot(reflect(rd,n), l), 0.0), 60.0) * 1.2;

    alpha = 0.92 + fres*0.08;
  }

  vec3 glowCol = mix(vec3(0.06,0.73,0.51), vec3(0.22,0.74,0.97), uv.y*0.5+0.5);
  float g = clamp(glow*0.018, 0.0, 0.6) * (1.0 - alpha);
  col += glowCol * g;
  alpha = max(alpha, g * (uLight > 0.5 ? 0.55 : 0.8));

  if(uLight > 0.5) col *= 0.92;
  col = col / (1.0 + col*0.35); // soft tonemap
  gl_FragColor = vec4(col*alpha, alpha); // premultiplied
}
`;

type Props = { theme: "light" | "dark"; className?: string };

export default function HeroShape({ theme, className }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fallbackRef = useRef<HTMLDivElement>(null);
  const themeRef = useRef(theme);
  themeRef.current = theme;

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
      uOffset = u("uOffset"), uScale = u("uScale"), uLight = u("uLight"), uSteps = u("uSteps");

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
      if (aspect > 1.15) {
        // desktop: shape sits to the right of the copy
        gl.uniform2f(uOffset, aspect * 0.27, 0.0);
        gl.uniform1f(uScale, aspect > 1.5 ? 0.95 : 0.8);
      } else {
        // mobile / portrait: shape floats above the headline
        gl.uniform2f(uOffset, 0.0, 0.27);
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

    const draw = (now: number) => {
      elapsed += Math.min((now - t0) / 1000, 0.05);
      t0 = now;
      mouse.x += (mouse.tx - mouse.x) * 0.05;
      mouse.y += (mouse.ty - mouse.y) * 0.05;
      gl.uniform1f(uTime, elapsed + 3.0);
      gl.uniform2f(uMouse, mouse.x, mouse.y);
      gl.uniform1f(uLight, themeRef.current === "light" ? 1 : 0);
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
            "conic-gradient(from 90deg, #10b981, #38bdf8, #a78bfa, #f59e0b, #10b981)",
          opacity: 0.45,
        }}
      />
    </div>
  );
}
