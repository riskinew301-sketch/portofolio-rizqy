"use client";

import React, { useRef, useEffect, useState } from "react";

/**
 * ElectricGaze — Canvas2D "dither" renderer reimplementing the
 * 21st.dev community ASCII "Electric Gaze" effect.
 *
 * Pipeline:
 *  1. Load source image → object-fit cover into canvas
 *  2. Divide into cellSize-px grid, sample avg color/luminance per cell
 *  3. Ordered dither (3×3 Bayer) per cell — each sub-cell drawn/skipped
 *  4. Contrast 158 → push tones to extremes
 *  5. Cyan-400 accent tint blended into bright areas
 *  6. Shimmer animation: diagonal sine waves modulating luminance
 */

// Bayer ordered-dither threshold matrix (3×3), values 0-8
const BAYER: number[][] = [
  [0, 7, 3],
  [6, 5, 2],
  [4, 1, 8],
];
const BAYER_LEVELS = 9;

interface CellData {
  r: number;
  g: number;
  b: number;
  lum: number;
}

interface ElectricGazeProps {
  /** Path to the source portrait image */
  imageSrc: string;
  /** Extra Tailwind / CSS classes */
  className?: string;
}

export const ElectricGaze: React.FC<ElectricGazeProps> = ({
  imageSrc,
  className = "",
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    /* ── Config from spec JSON ────────────────────────────── */
    const CELL = 9;                          // cellSize
    const CONTRAST = (158 + 100) / 100;      // 2.58×
    const DENSITY = 20;                      // density
    const SUB = 3;                           // 3×3 sub-grid per cell
    const SUB_PX = CELL / SUB;              // 3 px
    const DOT_RATIO = 0.4 + (DENSITY / 100) * 0.55; // 0.51 for density=20
    const DOT_PX = SUB_PX * DOT_RATIO;      // ~1.53 px dot mark
    const DOT_OFFSET = (SUB_PX - DOT_PX) / 2;

    // Neon Green accent (#00FF00)
    const CY_R = 0, CY_G = 255, CY_B = 0;

    /* ── Mutable state ────────────────────────────────────── */
    let animId = 0;
    let grid: CellData[][] = [];
    let cols = 0;
    let rows = 0;
    let cw = 0;       // canvas CSS-pixel width
    let ch = 0;       // canvas CSS-pixel height

    const img = new Image();
    img.crossOrigin = "anonymous";

    /* ── Helpers ──────────────────────────────────────────── */
    const clamp01 = (v: number): number => (v < 0 ? 0 : v > 1 ? 1 : v);

    /** Resize canvas to fill container (DPR-aware). */
    const resize = (): void => {
      const rect = container.getBoundingClientRect();
      cw = rect.width;
      ch = rect.height;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.round(cw * dpr);
      canvas.height = Math.round(ch * dpr);
      canvas.style.width = `${cw}px`;
      canvas.style.height = `${ch}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      sampleImage();
    };

    /** Draw image to offscreen canvas & build per-cell sample grid. */
    const sampleImage = (): void => {
      const off = document.createElement("canvas");
      off.width = Math.round(cw);
      off.height = Math.round(ch);
      const oc = off.getContext("2d");
      if (!oc) return;

      // Object-fit: cover
      const ir = img.naturalWidth / img.naturalHeight;
      const cr = cw / ch;
      let sx = 0, sy = 0, sw = img.naturalWidth, sh = img.naturalHeight;
      if (ir > cr) {
        sw = sh * cr;
        sx = (img.naturalWidth - sw) / 2;
      } else {
        sh = sw / cr;
        sy = (img.naturalHeight - sh) / 2;
      }
      oc.drawImage(img, sx, sy, sw, sh, 0, 0, cw, ch);

      const imgData = oc.getImageData(0, 0, Math.round(cw), Math.round(ch));
      const px = imgData.data;
      const w = Math.round(cw);

      cols = Math.ceil(cw / CELL);
      rows = Math.ceil(ch / CELL);
      grid = new Array(rows);

      for (let row = 0; row < rows; row++) {
        grid[row] = new Array(cols);
        for (let col = 0; col < cols; col++) {
          let tr = 0, tg = 0, tb = 0, n = 0;
          const x0 = col * CELL;
          const y0 = row * CELL;
          const x1 = Math.min(x0 + CELL, w);
          const y1 = Math.min(y0 + CELL, Math.round(ch));
          for (let y = y0; y < y1; y++) {
            for (let x = x0; x < x1; x++) {
              const i = (y * w + x) * 4;
              tr += px[i];
              tg += px[i + 1];
              tb += px[i + 2];
              n++;
            }
          }
          if (n === 0) n = 1;
          const r = tr / n;
          const g = tg / n;
          const b = tb / n;
          const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
          grid[row][col] = { r, g, b, lum };
        }
      }
    };

    /* ── Render loop ──────────────────────────────────────── */
    const render = (t: number): void => {
      if (cols === 0 || rows === 0) {
        animId = requestAnimationFrame(render);
        return;
      }

      // Clear with zinc-950
      ctx.fillStyle = "#09090b";
      ctx.fillRect(0, 0, cw, ch);

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const cell = grid[row][col];

          /* ── 1. Contrast-adjusted luminance ────── */
          let lum = clamp01((cell.lum - 0.5) * CONTRAST + 0.5);

          /* ── 2. Shimmer animation (two diagonal sine waves) ── */
          const shimmer =
            Math.sin(col * 0.10 + row * 0.07 + t * 0.002) * 0.12 +
            Math.sin(col * 0.05 - row * 0.04 + t * 0.0035) * 0.06;
          lum = clamp01(lum + shimmer);

          /* ── 3. Dither threshold level (0-9) ── */
          const level = Math.floor(lum * BAYER_LEVELS);
          if (level === 0) continue; // fully dark cell, skip entirely

          /* ── 4. Contrast-adjusted color + cyan blend ── */
          const cR = clamp01((cell.r / 255 - 0.5) * CONTRAST + 0.5) * 255;
          const cG = clamp01((cell.g / 255 - 0.5) * CONTRAST + 0.5) * 255;
          const cB = clamp01((cell.b / 255 - 0.5) * CONTRAST + 0.5) * 255;

          // Mix toward cyan-400 proportional to luminance
          const mix = lum * 0.45;
          const fR = Math.round(cR * (1 - mix) + CY_R * mix);
          const fG = Math.round(cG * (1 - mix) + CY_G * mix);
          const fB = Math.round(cB * (1 - mix) + CY_B * mix);

          ctx.fillStyle = `rgb(${fR},${fG},${fB})`;

          const cx = col * CELL;
          const cy = row * CELL;

          /* ── 5. Ordered dither: draw sub-cells whose threshold < level ── */
          for (let sy = 0; sy < SUB; sy++) {
            for (let sx = 0; sx < SUB; sx++) {
              if (level > BAYER[sy][sx]) {
                ctx.fillRect(
                  cx + sx * SUB_PX + DOT_OFFSET,
                  cy + sy * SUB_PX + DOT_OFFSET,
                  DOT_PX,
                  DOT_PX,
                );
              }
            }
          }
        }
      }

      animId = requestAnimationFrame(render);
    };

    /* ── Lifecycle ────────────────────────────────────────── */
    img.onload = () => {
      setLoaded(true);
      resize();
      animId = requestAnimationFrame(render);
    };
    img.onerror = () => {
      console.error("[ElectricGaze] Failed to load image:", imageSrc);
    };
    img.src = imageSrc;

    const onResize = (): void => {
      if (img.complete && img.naturalWidth > 0) resize();
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
    };
  }, [imageSrc]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full overflow-hidden bg-zinc-950 ${className}`}
    >
      <canvas
        ref={canvasRef}
        className={`absolute inset-0 w-full h-full block transition-opacity duration-1000 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
      />
      {/* Cinematic radial vignette — keeps edges dark, focuses face */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_55%_45%,transparent_20%,rgba(9,9,11,0.55)_55%,rgba(9,9,11,0.92)_85%)] pointer-events-none" />
    </div>
  );
};
