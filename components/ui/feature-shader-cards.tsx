"use client";

import React from "react";
import Link from "next/link";
import { Warp } from "@paper-design/shaders-react";
import {
  School,
  Compass,
  Calculator,
  BrainCircuit,
  ArrowUpRight,
  ExternalLink,
  GitBranch,
} from "lucide-react";
import { siteContent } from "@/data/content";

/* ─── Per-project shader color palettes (neon green / dark theme) ─── */
const shaderConfigs: Record<
  string,
  {
    colors: string[];
    icon: React.ReactNode;
    speed: number;
    distortion: number;
    swirl: number;
    shape: "checks" | "stripes" | "edge";
  }
> = {
  esl: {
    colors: ["#030a01", "#00FF00", "#0a1f04", "#00cc00"],
    icon: <School className="w-6 h-6" />,
    speed: 1.2,
    distortion: 0.2,
    swirl: 0.75,
    shape: "checks",
  },
  "pariwisata-diy": {
    colors: ["#050d02", "#33ff33", "#071a03", "#00e600"],
    icon: <Compass className="w-6 h-6" />,
    speed: 2.0,
    distortion: 0.3,
    swirl: 0.9,
    shape: "edge",
  },
  "laba-pintar": {
    colors: ["#020800", "#66ff66", "#0d2608", "#00b300"],
    icon: <Calculator className="w-6 h-6" />,
    speed: 1.5,
    distortion: 0.15,
    swirl: 0.6,
    shape: "stripes",
  },
  "bk-service-web": {
    colors: ["#040e01", "#00FF00", "#0f2e0a", "#00dd00"],
    icon: <BrainCircuit className="w-6 h-6" />,
    speed: 1.8,
    distortion: 0.25,
    swirl: 0.85,
    shape: "checks",
  },
};

const defaultConfig = {
  colors: ["#030a01", "#00FF00", "#0a1f04", "#00cc00"],
  icon: <School className="w-6 h-6" />,
  speed: 1.2,
  distortion: 0.2,
  swirl: 0.75,
  shape: "checks" as const,
};

export const FeaturesCards: React.FC = () => {
  const projects = siteContent.projects;

  return (
    <section className="w-full border-b border-zinc-800 bg-zinc-950 py-24 px-6">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* ── Section Header ── */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-neon mb-3">
              <span className="w-2 h-2 bg-neon" />
              <span>03 // CORE WORK &amp; SYSTEMS</span>
            </div>
            <h2 className="font-mono text-3xl sm:text-4xl font-bold text-zinc-100">
              Featured Case Studies
            </h2>
          </div>

          <Link
            href="/projects"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-neon hover:underline"
          >
            <span>View Complete Archive →</span>
          </Link>
        </div>

        {/* ── Shader Cards Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project) => {
            const cfg = shaderConfigs[project.slug] ?? defaultConfig;

            return (
              <div
                key={project.slug}
                className="group relative flex flex-col overflow-hidden border border-zinc-800 hover:border-neon/60 transition-colors duration-500 bg-zinc-950"
              >
                {/* ── Shader Background ── */}
                <div className="relative h-56 overflow-hidden">
                  <Warp
                    colors={cfg.colors}
                    speed={cfg.speed}
                    distortion={cfg.distortion}
                    swirl={cfg.swirl}
                    swirlIterations={8}
                    shape={cfg.shape}
                    shapeScale={0.3}
                    proportion={0.5}
                    softness={1.2}
                    scale={1.5}
                    style={{
                      position: "absolute",
                      inset: 0,
                      width: "100%",
                      height: "100%",
                    }}
                  />

                  {/* Gradient overlay for readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-transparent" />

                  {/* Icon badge */}
                  <div className="absolute top-4 left-4 z-10 flex items-center justify-center w-12 h-12 border border-neon/40 bg-zinc-950/80 backdrop-blur-sm text-neon">
                    {cfg.icon}
                  </div>

                  {/* Category tag */}
                  <div className="absolute top-4 right-4 z-10 px-3 py-1 border border-zinc-700/50 bg-zinc-950/70 backdrop-blur-sm font-mono text-[10px] uppercase tracking-widest text-zinc-400">
                    {project.category}
                  </div>
                </div>

                {/* ── Card Content ── */}
                <div className="flex flex-col flex-1 p-6 space-y-4">
                  {/* Title */}
                  <h3 className="font-mono text-xl font-bold text-neon group-hover:text-zinc-100 transition-colors duration-300">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-zinc-400 leading-relaxed flex-1">
                    {project.description}
                  </p>

                  {/* Tech Stack Pills */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {project.techStack.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 bg-zinc-900 border border-zinc-800 font-mono text-[10px] uppercase tracking-wider text-zinc-500"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.techStack.length > 4 && (
                      <span className="px-2 py-0.5 bg-zinc-900 border border-zinc-800 font-mono text-[10px] uppercase tracking-wider text-zinc-500">
                        +{project.techStack.length - 4}
                      </span>
                    )}
                  </div>

                  {/* Action Links */}
                  <div className="flex items-center gap-4 pt-3 border-t border-zinc-800/60">
                    {project.liveUrl && (
                      <Link
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-widest text-neon hover:text-zinc-100 transition-colors"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Live Demo</span>
                      </Link>
                    )}
                    {project.githubUrl && (
                      <Link
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-widest text-zinc-500 hover:text-zinc-100 transition-colors"
                      >
                        <GitBranch className="w-3.5 h-3.5" />
                        <span>Source</span>
                      </Link>
                    )}
                    <Link
                      href={`/projects/${project.slug}`}
                      className="ml-auto inline-flex items-center gap-1 font-mono text-xs uppercase tracking-widest text-zinc-500 hover:text-neon transition-colors"
                    >
                      <span>Case Study</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
