import Image from "next/image";

/**
 * Static section backdrops — pre-rendered, transparent WebP textures
 * (generated once, no animation, nothing computed while scrolling).
 * Light lines on transparent: on the light theme they are inverted into soft
 * dark lines so the same file works for both themes.
 */

/** Topographic contour lines with a few emerald routes — a "terrain map" feel.
 *  Tiled at natural size so tall sections (phones) keep fine, crisp lines. */
export function TopoTexture({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute opacity-70 [html.light_&]:opacity-45 [html.light_&]:invert ${className}`}
      style={{
        backgroundImage: "url(/texture-topo.webp)",
        backgroundSize: "min(1400px, 170vw) auto",
        backgroundRepeat: "repeat",
        backgroundPosition: "center top",
        maskImage: "linear-gradient(to bottom, transparent, black 12%, black 82%, transparent)",
        WebkitMaskImage: "linear-gradient(to bottom, transparent, black 12%, black 82%, transparent)",
      }}
    />
  );
}

/** Soft light from a four-pane window falling across a dark room. */
export function WindowLight({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden className={`pointer-events-none absolute ${className}`}>
      <Image
        src="/texture-window.webp"
        alt=""
        fill
        sizes="(min-width: 1024px) 70vw, 140vw"
        quality={75}
        className="object-contain object-right-top [html.light_&]:opacity-60 [html.light_&]:invert"
      />
    </div>
  );
}
