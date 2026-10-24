"use client";

import React, { useState } from "react";
import { siteContent } from "@/data/content";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { FolderGit2, Terminal, ShieldCheck } from "lucide-react";

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");

  const allProjects = siteContent.projects;
  const categories = [
    "ALL",
    ...Array.from(new Set(allProjects.map((p) => p.category))),
  ];

  const filteredProjects =
    selectedCategory === "ALL"
      ? allProjects
      : allProjects.filter((p) => p.category === selectedCategory);

  return (
    <div className="w-full min-h-screen py-24 px-6 bg-zinc-950 border-b border-zinc-800">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* ── Page Header ── */}
        <div className="space-y-6 border-b border-zinc-800 pb-10">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-neon">
              <span className="w-2 h-2 bg-neon" />
              <span>04 // SOFTWARE ARCHIVE</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 border border-zinc-800 bg-zinc-900/60 font-mono text-xs text-zinc-400">
              <Terminal className="w-3.5 h-3.5 text-neon" />
              <span>TOTAL ARTIFACTS: {allProjects.length} PROJECTS</span>
            </div>
          </div>

          <div className="space-y-4">
            <h1 className="font-mono text-4xl sm:text-5xl md:text-6xl font-black text-zinc-100 tracking-tight">
              Projects <span className="text-zinc-600">&amp;</span> Case Studies
            </h1>
            <p className="max-w-3xl text-base sm:text-lg text-zinc-300 font-sans leading-relaxed">
              Koleksi proyek rekayasa perangkat lunak terpilih dari masa eksplorasi jaringan (SMK TKJ) hingga pengembangan sistem web berkinerja tinggi, Super-App EdTech, dan integrasi Generative AI (Informatika UMBY).
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-zinc-500">
            <ShieldCheck className="w-4 h-4 text-neon" />
            <span>VERIFIED ARCHIVES // FULLSTACK &amp; ARCHITECTURAL EXPLORATION</span>
          </div>
        </div>

        {/* ── Category Filter Tabs ── */}
        <div className="flex flex-wrap items-center gap-2 pb-4">
          {categories.map((category) => {
            const count =
              category === "ALL"
                ? allProjects.length
                : allProjects.filter((p) => p.category === category).length;
            const isSelected = selectedCategory === category;

            return (
              <button
                key={category}
                type="button"
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2.5 font-mono text-xs uppercase tracking-wider transition-all sharp-card border flex items-center gap-2 ${
                  isSelected
                    ? "border-neon bg-neon/10 text-neon font-bold shadow-[0_0_15px_rgba(0,255,0,0.15)]"
                    : "border-zinc-800 bg-zinc-900/40 text-zinc-400 hover:border-zinc-700 hover:text-zinc-100"
                }`}
              >
                <span>{category}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 border ${
                    isSelected
                      ? "border-neon/50 bg-neon/10 text-neon"
                      : "border-zinc-800 bg-zinc-950 text-zinc-500"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* ── Projects Gallery Grid (CSS Grid) ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>

        {/* ── Bottom Info Banner ── */}
        <div className="p-6 border border-zinc-800 bg-zinc-900/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-xs text-zinc-400">
          <div>
            <span className="text-zinc-200 font-bold">NEED A CUSTOM WEB SOLUTION?</span>
            <p className="text-zinc-500 mt-0.5">
              Siap berkolaborasi dalam pembangunan antarmuka atau arsitektur web berskala besar.
            </p>
          </div>
          <a
            href="/contact"
            className="px-5 py-2.5 bg-neon text-zinc-950 font-bold uppercase tracking-widest hover:bg-neon/80 transition-colors sharp-card text-center shrink-0"
          >
            Start a Conversation →
          </a>
        </div>
      </div>
    </div>
  );
}
