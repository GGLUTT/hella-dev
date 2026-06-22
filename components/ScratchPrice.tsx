"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useLang } from "@/context/LangContext";

interface ScratchPriceProps {
  price: string;
  fromLabel: string;
}

export default function ScratchPrice({ price, fromLabel }: ScratchPriceProps) {
  const { lang } = useLang();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);

  // Set canvas resolution based on container size
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Use fixed dimensions that fit the layout
    const width = 230;
    const height = 64;
    canvas.width = width;
    canvas.height = height;

    // Background gradient: dark cyber style
    const grad = ctx.createLinearGradient(0, 0, width, height);
    grad.addColorStop(0, "#090d16"); // dark deep blue-gray
    grad.addColorStop(0.5, "#065f46"); // emerald
    grad.addColorStop(1, "#022c22"); // darker emerald
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    // Decorative grid/tech lines
    ctx.strokeStyle = "rgba(52, 211, 153, 0.15)";
    ctx.lineWidth = 1;
    for (let i = 0; i < width; i += 24) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i + 10, height);
      ctx.stroke();
    }

    // Border line inside
    ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
    ctx.lineWidth = 2;
    ctx.strokeRect(3, 3, width - 6, height - 6);

    // Draw the "Scratch me" text
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 10px monospace";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    
    // Check if letterSpacing is supported in canvas (standard in modern browsers)
    if ("letterSpacing" in ctx) {
      (ctx as any).letterSpacing = "2px";
    }

    const text = lang === "ua" ? "ЗІТРИ ЩОБ ПОБАЧИТИ" : "SCRATCH TO REVEAL";
    ctx.fillText(text, width / 2, height / 2);
  }, [lang]);

  // Helper to get coordinates
  const getCoordinates = (e: any) => {
    const canvas = canvasRef.current;
    if (!canvas) return null;

    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    return {
      x: ((clientX - rect.left) / rect.width) * canvas.width,
      y: ((clientY - rect.top) / rect.height) * canvas.height,
    };
  };

  // Erase circle
  const scratch = (x: number, y: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, 18, 0, Math.PI * 2);
    ctx.fill();

    checkProgress();
  };

  // Check cleared percentage
  const checkProgress = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Read pixels
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;
    let clearCount = 0;

    for (let i = 3; i < pixels.length; i += 4) {
      if (pixels[i] === 0) {
        clearCount++;
      }
    }

    const totalPixels = pixels.length / 4;
    const ratio = clearCount / totalPixels;

    if (ratio > 0.4) {
      setIsRevealed(true);
    }
  };

  // Handlers
  const handleStart = (e: any) => {
    if (isRevealed) return;
    setIsDrawing(true);
    const coords = getCoordinates(e);
    if (coords) scratch(coords.x, coords.y);
  };

  const handleMove = (e: any) => {
    if (!isDrawing || isRevealed) return;
    // Prevent scrolling on touch screens when scratching
    if (e.cancelable) e.preventDefault();
    const coords = getCoordinates(e);
    if (coords) scratch(coords.x, coords.y);
  };

  const handleEnd = () => {
    setIsDrawing(false);
  };

  return (
    <div
      ref={containerRef}
      className="relative select-none"
      style={{ width: 230, height: 64 }}
    >
      {/* Target Price (revealed underneath) */}
      <motion.div
        animate={
          isRevealed
            ? { filter: "blur(0px)", opacity: 1, scale: 1 }
            : { filter: "blur(4px)", opacity: 0.25, scale: 0.98 }
        }
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="absolute inset-0 flex items-end gap-2"
      >
        <span className="text-5xl font-semibold tracking-tight text-black">
          {price}
        </span>
        <span className="pb-1.5 text-[10px] uppercase tracking-[0.25em] text-black/50">
          {fromLabel}
        </span>
      </motion.div>

      {/* Scratch Canvas Overlay */}
      <motion.canvas
        ref={canvasRef}
        animate={
          isRevealed
            ? { opacity: 0, scale: 0.95, pointerEvents: "none" }
            : { opacity: 1, scale: 1 }
        }
        transition={{ duration: 0.4, ease: "easeInOut" }}
        onMouseDown={handleStart}
        onMouseMove={handleMove}
        onMouseUp={handleEnd}
        onMouseLeave={handleEnd}
        onTouchStart={handleStart}
        onTouchMove={handleMove}
        onTouchEnd={handleEnd}
        className="absolute inset-0 z-10 cursor-pointer rounded-2xl touch-none shadow-[0_4px_12px_rgba(0,0,0,0.15)] ring-1 ring-emerald-500/20"
      />
    </div>
  );
}
