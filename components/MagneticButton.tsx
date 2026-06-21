"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef, type ReactNode, type MouseEvent } from "react";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  strength?: number;
  as?: "a" | "button";
  href?: string;
  onClick?: () => void;
  glowBorder?: boolean;
  [key: string]: unknown;
}

export default function MagneticButton({
  children,
  className = "",
  strength = 0.35,
  as: Tag = "a",
  href,
  onClick,
  glowBorder = false,
  ...rest
}: MagneticButtonProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ref = useRef<any>(null);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  // Smooth springs for buttery pull
  const x = useSpring(rawX, { stiffness: 150, damping: 20, mass: 0.3 });
  const y = useSpring(rawY, { stiffness: 150, damping: 20, mass: 0.3 });

  const handleMouseMove = (e: MouseEvent<HTMLElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    // Center of the container
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    
    rawX.set((e.clientX - cx) * strength);
    rawY.set((e.clientY - cy) * strength);
  };

  const handleMouseLeave = () => {
    rawX.set(0);
    rawY.set(0);
  };

  const hasLink = (typeof Tag !== "string" || Tag === "a") && href;
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Component = Tag as any;

  return (
    <Component
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`group/magnetic flex items-center justify-center select-none outline-none ${
        glowBorder ? "p-8" : "p-3"
      }`}
      onClick={onClick}
      {...(hasLink ? { href } : {})}
      {...rest}
    >
      <motion.div
        style={{ x, y }}
        className="relative flex items-center justify-center pointer-events-none"
      >
        {/* Glow border ring */}
        {glowBorder && (
          <motion.div
            className="absolute -inset-[1.5px] rounded-full bg-gradient-to-r from-cyan-400 via-emerald-400 to-cyan-400 opacity-80 blur-[2px]"
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          />
        )}
        
        {/* Inner Content Container */}
        <div className={`pointer-events-auto ${className}`}>
          {children}
        </div>
      </motion.div>
    </Component>
  );
}
