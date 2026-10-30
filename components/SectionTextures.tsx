/**
 * Decorative section backdrops drawn in code (no image downloads).
 * Both are theme-aware: they use the text colour token, so they read as faint
 * light on the dark theme and as soft shadow on the light theme.
 */

/* ------------------------------------------------------------------ */
/* Spiral highway — an Archimedean spiral drawn as a road: two edges   */
/* plus a dashed centre line with a slow "traffic" glow running on it. */
/* ------------------------------------------------------------------ */

function spiralPath(turns: number, a: number, b: number, offset: number) {
  const pts: string[] = [];
  const steps = turns * 90;
  for (let i = 0; i <= steps; i++) {
    const t = (i / steps) * turns * Math.PI * 2;
    const r = a + b * t + offset;
    const x = 500 + r * Math.cos(t);
    const y = 500 + r * Math.sin(t);
    pts.push(`${i ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`);
  }
  return pts.join("");
}

// Computed once at module load — identical on server and client.
const ROAD_IN = spiralPath(3.2, 40, 22, -9);
const ROAD_OUT = spiralPath(3.2, 40, 22, 9);
const ROAD_MID = spiralPath(3.2, 40, 22, 0);

export function SpiralRoads({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute ${className}`}
      style={{
        maskImage: "radial-gradient(circle at center, black 30%, transparent 72%)",
        WebkitMaskImage: "radial-gradient(circle at center, black 30%, transparent 72%)",
      }}
    >
      <svg viewBox="0 0 1000 1000" className="h-full w-full [animation:spiral-drift_60s_linear_infinite]">
        <g fill="none" strokeLinecap="round">
          <path d={ROAD_IN} stroke="rgb(var(--color-text-white) / 0.2)" strokeWidth="1.4" />
          <path d={ROAD_OUT} stroke="rgb(var(--color-text-white) / 0.2)" strokeWidth="1.4" />
          <path d={ROAD_MID} stroke="rgb(var(--color-text-white) / 0.16)" strokeWidth="1.1" strokeDasharray="6 10" />
          {/* traffic: short bright dashes sliding along the lane */}
          <path
            d={ROAD_MID}
            stroke="rgba(52, 211, 153, 0.9)"
            strokeWidth="2.2"
            strokeDasharray="22 520"
            className="[animation:spiral-traffic_14s_linear_infinite]"
          />
        </g>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Window-blind shadow — soft slanted light bars, like sun through a  */
/* blind falling across a dark room, swaying very slowly.            */
/* ------------------------------------------------------------------ */

export function BlindsShadow({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden className={`pointer-events-none absolute overflow-hidden ${className}`}>
      <div
        className="absolute -inset-[20%] [animation:blinds-sway_22s_ease-in-out_infinite]"
        style={{
          background:
            "repeating-linear-gradient(118deg, transparent 0px, transparent 34px, rgb(var(--color-text-white) / 0.075) 52px, rgb(var(--color-text-white) / 0.075) 78px, transparent 96px)",
          maskImage: "radial-gradient(ellipse 55% 60% at 70% 35%, black 10%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(ellipse 55% 60% at 70% 35%, black 10%, transparent 75%)",
        }}
      />
      {/* window-frame cross, a touch sharper */}
      <div
        className="absolute -inset-[20%] [animation:blinds-sway_22s_ease-in-out_infinite]"
        style={{
          background:
            "linear-gradient(118deg, transparent 49.6%, rgb(var(--color-text-white) / 0.08) 50%, transparent 50.4%), linear-gradient(28deg, transparent 49.7%, rgb(var(--color-text-white) / 0.06) 50%, transparent 50.3%)",
          maskImage: "radial-gradient(ellipse 50% 55% at 70% 35%, black 10%, transparent 70%)",
          WebkitMaskImage: "radial-gradient(ellipse 50% 55% at 70% 35%, black 10%, transparent 70%)",
        }}
      />
      {/* faint emerald warmth where the "sun" lands */}
      <div className="absolute right-[10%] top-[15%] h-[45vmin] w-[45vmin] rounded-full bg-[radial-gradient(circle,rgba(16,185,129,0.08),transparent_65%)]" />
    </div>
  );
}
