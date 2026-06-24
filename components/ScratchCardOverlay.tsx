"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useLang } from "@/context/LangContext";

interface ScratchCardOverlayProps {
  isRevealed: boolean;
  onReveal: () => void;
}

export default function ScratchCardOverlay({ isRevealed, onReveal }: ScratchCardOverlayProps) {
  const { lang } = useLang();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const isDrawingRef = useRef(false);
  const lastCheckRef = useRef<number>(0);
  const [shouldRender, setShouldRender] = useState(true);

  // Unmount canvas completely after card is revealed to save memory and GPU
  useEffect(() => {
    if (isRevealed) {
      const timer = setTimeout(() => {
        setShouldRender(false);
      }, 600);
      return () => clearTimeout(timer);
    } else {
      setShouldRender(true);
    }
  }, [isRevealed]);

  // Monitor size of the parent card to fit canvas perfectly
  useEffect(() => {
    const parent = containerRef.current?.parentElement;
    if (!parent) return;

    const handleResize = () => {
      setDimensions({
        width: parent.clientWidth,
        height: parent.clientHeight,
      });
    };

    handleResize();

    const observer = new ResizeObserver(handleResize);
    observer.observe(parent);

    return () => observer.disconnect();
  }, []);

  // Initialize and draw canvas background and texts
  useEffect(() => {
    if (dimensions.width === 0 || dimensions.height === 0) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Adjust resolution for Retina displays
    const dpr = window.devicePixelRatio || 1;
    canvas.width = dimensions.width * dpr;
    canvas.height = dimensions.height * dpr;
    ctx.scale(dpr, dpr);

    canvas.style.width = `${dimensions.width}px`;
    canvas.style.height = `${dimensions.height}px`;

    // Fill with premium deep cyber gradient
    const grad = ctx.createLinearGradient(0, 0, dimensions.width, dimensions.height);
    grad.addColorStop(0, "#080b11"); // deep dark gray-blue
    grad.addColorStop(0.4, "#064e3b"); // dark emerald
    grad.addColorStop(0.7, "#022c22"); // deeper teal-dark
    grad.addColorStop(1, "#030712"); // black-blue
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, dimensions.width, dimensions.height);

    // Techy grid lines
    ctx.strokeStyle = "rgba(16, 185, 129, 0.1)";
    ctx.lineWidth = 1;
    for (let i = 0; i < dimensions.width; i += 28) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i + 10, dimensions.height);
      ctx.stroke();
    }
    for (let j = 0; j < dimensions.height; j += 28) {
      ctx.beginPath();
      ctx.moveTo(0, j);
      ctx.lineTo(dimensions.width, j + 10);
      ctx.stroke();
    }

    // Glowing border frame inside
    ctx.strokeStyle = "rgba(16, 185, 129, 0.25)";
    ctx.lineWidth = 1.5;
    ctx.strokeRect(8, 8, dimensions.width - 16, dimensions.height - 16);

    // Inner subtle guidelines
    ctx.strokeStyle = "rgba(255, 255, 255, 0.04)";
    ctx.lineWidth = 1;
    ctx.strokeRect(14, 14, dimensions.width - 28, dimensions.height - 28);

    // Tech Corner marks
    const drawCorner = (x: number, y: number, w: number, h: number) => {
      ctx.strokeStyle = "#10b981";
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(x + w, y);
      ctx.lineTo(x, y);
      ctx.lineTo(x, y + h);
      ctx.stroke();
    };

    const cSize = 12;
    drawCorner(10, 10, cSize, cSize); // top left
    drawCorner(dimensions.width - 10 - cSize, 10, cSize, -cSize); // top right (mirrored or adjust coordinate drawing)
    
    // Top right corners adjust manually
    ctx.beginPath();
    ctx.moveTo(dimensions.width - 10 - cSize, 10);
    ctx.lineTo(dimensions.width - 10, 10);
    ctx.lineTo(dimensions.width - 10, 10 + cSize);
    ctx.stroke();

    // Bottom left corners adjust manually
    ctx.beginPath();
    ctx.moveTo(10, dimensions.height - 10 - cSize);
    ctx.lineTo(10, dimensions.height - 10);
    ctx.lineTo(10 + cSize, dimensions.height - 10);
    ctx.stroke();

    // Bottom right corners adjust manually
    ctx.beginPath();
    ctx.moveTo(dimensions.width - 10 - cSize, dimensions.height - 10);
    ctx.lineTo(dimensions.width - 10, dimensions.height - 10);
    ctx.lineTo(dimensions.width - 10, dimensions.height - 10 - cSize);
    ctx.stroke();

    // Text details
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 13px monospace";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    if ("letterSpacing" in ctx) {
      (ctx as any).letterSpacing = "2px";
    }

    const titleText = lang === "ua" ? "НАЙПОПУЛЯРНІШИЙ ТАРИФ" : "MOST POPULAR TIER";
    const subText1 = lang === "ua" ? "ЗІТРИ КАРТКУ ПОВНІСТЮ" : "SCRATCH CARD ENTIRELY";
    const subText2 = lang === "ua" ? "ЩОБ ВІДКРИТИ ДЕТАЛІ" : "TO REVEAL DETAILS";
    const subText3 = lang === "ua" ? "ТА ЦІНУ ПРОДУКТУ" : "AND FIXED PRICING";

    // Header badge
    ctx.fillStyle = "rgba(16, 185, 129, 0.15)";
    ctx.beginPath();
    ctx.roundRect(dimensions.width / 2 - 80, dimensions.height / 2 - 62, 160, 24, 6);
    ctx.fill();
    ctx.strokeStyle = "rgba(16, 185, 129, 0.4)";
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.fillStyle = "#10b981";
    ctx.font = "bold 9px monospace";
    ctx.fillText(titleText, dimensions.width / 2, dimensions.height / 2 - 50);

    // Primary Callout text
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 13px monospace";
    ctx.fillText(subText1, dimensions.width / 2, dimensions.height / 2 + 10);
    ctx.fillText(subText2, dimensions.width / 2, dimensions.height / 2 + 30);
    ctx.fillText(subText3, dimensions.width / 2, dimensions.height / 2 + 50);

    // Draw scratch helper icon (pointing finger or abstract cursor) in the middle
    ctx.fillStyle = "rgba(255, 255, 255, 0.1)";
    ctx.beginPath();
    ctx.arc(dimensions.width / 2, dimensions.height / 2 - 12, 18, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "rgba(255, 255, 255, 0.25)";
    ctx.lineWidth = 1.5;
    ctx.stroke();
    
    ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
    ctx.font = "12px monospace";
    ctx.fillText("👋", dimensions.width / 2, dimensions.height / 2 - 11);
  }, [dimensions, lang]);

  // Read coords
  const getCoordinates = (e: any) => {
    const canvas = canvasRef.current;
    if (!canvas) return null;

    const rect = canvas.getBoundingClientRect();
    
    let clientX = e.clientX;
    let clientY = e.clientY;

    if (e.touches && e.touches.length > 0) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else if (e.changedTouches && e.changedTouches.length > 0) {
      clientX = e.changedTouches[0].clientX;
      clientY = e.changedTouches[0].clientY;
    }

    if (clientX === undefined || clientY === undefined) return null;

    return {
      x: clientX - rect.left,
      y: clientY - rect.top,
    };
  };

  // Erase stroke
  const scratch = (x: number, y: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, 34, 0, Math.PI * 2); 
    ctx.fill();

    const now = Date.now();
    if (now - lastCheckRef.current > 200) {
      checkProgress();
      lastCheckRef.current = now;
    }
  };

  // Check progress
  const checkProgress = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    
    // Sampling pixels to optimize performance (every 4th pixel index)
    const imageData = ctx.getImageData(0, 0, width, height);
    const pixels = imageData.data;
    let clearCount = 0;
    
    const step = 8; // skip pixels to calculate extremely fast
    let totalSamples = 0;

    for (let i = 3; i < pixels.length; i += 4 * step) {
      totalSamples++;
      if (pixels[i] === 0) {
        clearCount++;
      }
    }

    const ratio = clearCount / totalSamples;

    if (ratio > 0.35) { // 35% is enough to reveal the card details completely
      onReveal();
    }
  };

  // Touch handlers with passive: false to prevent mobile scrolling
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleTouchStart = (e: TouchEvent) => {
      if (isRevealed) return;
      isDrawingRef.current = true;
      const coords = getCoordinates(e);
      if (coords) scratch(coords.x, coords.y);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDrawingRef.current || isRevealed) return;
      if (e.cancelable) e.preventDefault(); // absolutely blocks mobile screen scroll
      const coords = getCoordinates(e);
      if (coords) scratch(coords.x, coords.y);
    };

    const handleTouchEnd = () => {
      isDrawingRef.current = false;
      checkProgress();
    };

    canvas.addEventListener("touchstart", handleTouchStart, { passive: true });
    canvas.addEventListener("touchmove", handleTouchMove, { passive: false });
    canvas.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      canvas.removeEventListener("touchstart", handleTouchStart);
      canvas.removeEventListener("touchmove", handleTouchMove);
      canvas.removeEventListener("touchend", handleTouchEnd);
    };
  }, [dimensions, isRevealed]);

  // Desktop Mouse Listeners
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (isRevealed) return;
    isDrawingRef.current = true;
    const coords = getCoordinates(e);
    if (coords) scratch(coords.x, coords.y);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawingRef.current || isRevealed) return;
    const coords = getCoordinates(e);
    if (coords) scratch(coords.x, coords.y);
  };

  const handleMouseUp = () => {
    isDrawingRef.current = false;
    checkProgress();
  };

  if (!shouldRender) return null;

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-40 select-none overflow-hidden rounded-3xl touch-none"
      style={{ pointerEvents: isRevealed ? "none" : "auto" }}
    >
      <motion.canvas
        ref={canvasRef}
        animate={
          isRevealed
            ? { opacity: 0, scale: 0.96, filter: "blur(5px)" }
            : { opacity: 1, scale: 1 }
        }
        transition={{ duration: 0.55, ease: "easeInOut" }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        className="absolute inset-0 touch-none cursor-pointer"
      />
    </div>
  );
}
