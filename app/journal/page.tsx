"use client";

import React, { useState } from "react";
import { siteContent } from "@/data/content";
import {
  Terminal,
  Camera,
  Radio,
  Clock,
  ArrowUpRight,
  Eye,
  FileText,
  X,
  Calendar,
} from "lucide-react";
import { JournalArticle } from "@/types";

/**
 * JournalPage — Streetwear & Analog Photography Zine Aesthetic
 * Aggressive typography, sharp zero-radius cards, CSS filters (grayscale + contrast),
 * style tag filter selector, and an interactive drawer/modal reader.
 */
export default function JournalPage() {
  const [selectedStyle, setSelectedStyle] = useState<string>("ALL");
  const [activeArticle, setActiveArticle] = useState<JournalArticle | null>(
    null
  );

  const articles = siteContent.journalArticles;
  const styleTags = [
    "ALL",
    ...Array.from(new Set(articles.map((a) => (a.styleTag || "analog").toUpperCase()))),
  ];

  const filteredArticles =
    selectedStyle === "ALL"
      ? articles
      : articles.filter(
          (a) => (a.styleTag || "analog").toUpperCase() === selectedStyle
        );

  // Helper for CSS filter class based on style tag
  const getFilterClass = (tag?: string): string => {
    switch (tag) {
      case "cctv":
        return "filter-cctv";
      case "analog":
        return "filter-analog";
      case "grainy":
      default:
        return "grayscale-[100%] contrast-[120%] brightness-[90%]";
    }
  };

  // High-contrast streetwear stock photos as analog/cctv visual fallback
  const getFallbackImage = (idx: number): string => {
    const images = [
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80", // tech hardware / wiring
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80", // matrix / code
      "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&w=1200&q=80", // analog cctv street
    ];
    return images[idx % images.length];
  };

  return (
    <div className="w-full min-h-screen py-24 px-6 bg-zinc-950 text-zinc-100 bg-grainy">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* ── STREETWEAR / ANALOG ZINE HEADER ── */}
        <div className="border-b-2 border-zinc-800 pb-12 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.3em] text-neon font-bold">
              <Radio className="w-4 h-4 text-neon animate-pulse" />
              <span>SYS.LOG // ANALOG_ARCHIVE // VOL.26</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1 bg-zinc-900 border border-zinc-800 font-mono text-xs text-zinc-400 uppercase tracking-widest">
              <Camera className="w-3.5 h-3.5 text-neon" />
              <span>STREETWEAR_ZINE_EDITION</span>
            </div>
          </div>

          <div className="space-y-4">
            <h1 className="font-mono text-5xl sm:text-6xl md:text-7xl font-black uppercase tracking-tighter text-zinc-100 leading-none">
              TECHNICAL <span className="text-neon">LOGS</span> &amp; THOUGHTS
            </h1>
            <p className="max-w-2xl font-mono text-xs sm:text-sm text-zinc-400 uppercase tracking-wider leading-relaxed">
              [RAW TECHNICAL ESSAYS &amp; ARCHITECTURAL PERSPECTIVES] — DOKUMENTASI PERJALANAN DARI INFRASTRUKTUR JARINGAN MIKROTIK (SMK TKJ) HINGGA REKAYASA PERANGKAT LUNAK MODERN (UMBY INFORMATICS) &amp; SELEKSI GLOBAL GOOGLE STUDENT AMBASSADOR 2026.
            </p>
          </div>

          {/* Style Tag Filter Bar */}
          <div className="flex flex-wrap items-center gap-2 pt-4">
            <span className="font-mono text-xs uppercase tracking-widest text-zinc-500 mr-2">
              FILTER AESTHETIC //
            </span>
            {styleTags.map((tag) => {
              const isSelected = selectedStyle === tag;
              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() => setSelectedStyle(tag)}
                  className={`px-4 py-2 font-mono text-xs uppercase tracking-widest transition-all sharp-card border ${
                    isSelected
                      ? "border-neon bg-neon/10 text-neon font-bold shadow-[0_0_15px_rgba(0,255,0,0.15)]"
                      : "border-zinc-800 bg-zinc-900/40 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200"
                  }`}
                >
                  [{tag}]
                </button>
              );
            })}
          </div>
        </div>

        {/* ── ARTICLE ARCHIVE LIST (Streetwear Editorial Layout) ── */}
        <div className="space-y-12">
          {filteredArticles.map((article, idx) => {
            const filterClass = getFilterClass(article.styleTag);
            const fallbackSrc = getFallbackImage(idx);

            return (
              <article
                key={article.slug}
                onClick={() => setActiveArticle(article)}
                className="group relative border border-zinc-800 bg-zinc-900/30 hover:border-neon hover:bg-zinc-900/70 transition-all duration-300 sharp-card cursor-pointer overflow-hidden grid grid-cols-1 md:grid-cols-12 gap-0"
              >
                {/* Left Panel: Analog / CCTV Stylized Image Thumbnail */}
                <div className="md:col-span-5 relative min-h-[240px] md:min-h-full overflow-hidden border-b md:border-b-0 md:border-r border-zinc-800 bg-zinc-950">
                  <img
                    src={article.thumbnail || fallbackSrc}
                    alt={article.title}
                    className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 ${filterClass}`}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = fallbackSrc;
                    }}
                  />
                  {/* Streetwear Timecode Overlay */}
                  <div className="absolute top-3 left-3 bg-zinc-950/90 border border-zinc-800 px-2.5 py-1 font-mono text-[10px] text-neon uppercase tracking-widest">
                    REC // {article.styleTag?.toUpperCase() || "ANALOG"}-CAM
                  </div>
                  <div className="absolute bottom-3 right-3 bg-zinc-950/90 border border-zinc-800 px-2.5 py-1 font-mono text-[10px] text-zinc-400">
                    {article.date}
                  </div>
                </div>

                {/* Right Panel: Aggressive Typography Content */}
                <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="font-mono text-xs font-bold uppercase tracking-widest text-neon px-2 py-0.5 bg-neon/10 border border-neon/30">
                        {article.category}
                      </span>
                      <span className="font-mono text-xs text-zinc-500 flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-zinc-400" />
                        <span>{article.readTime}</span>
                      </span>
                    </div>

                    <h2 className="font-mono text-2xl sm:text-3xl font-black text-zinc-100 uppercase tracking-tight group-hover:text-neon transition-colors leading-tight">
                      {article.title}
                    </h2>

                    <p className="text-sm sm:text-base text-zinc-300 font-sans leading-relaxed line-clamp-3">
                      {article.excerpt}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-zinc-800 flex items-center justify-between">
                    <span className="font-mono text-xs uppercase tracking-widest text-zinc-500">
                      REF // LOG-{idx + 101}
                    </span>
                    <div className="inline-flex items-center gap-1.5 font-mono text-xs font-bold uppercase tracking-wider text-neon group-hover:translate-x-1 transition-transform">
                      <span>OPEN LOG READER</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* ── BOTTOM STREETWEAR ZINE SIGNATURE ── */}
        <div className="p-8 border border-zinc-800 bg-zinc-950 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="font-mono text-xs uppercase tracking-widest text-neon font-bold">
              RIZQY NAUFAL PRADANA // TECHNICAL WRITING
            </div>
            <p className="font-mono text-xs text-zinc-500 uppercase tracking-wider">
              ALL ESSAYS ARCHIVED IN LOCAL FILE SYSTEM // PRINT EDITION VOL.26
            </p>
          </div>
          <div className="font-mono text-2xl font-black text-zinc-700 tracking-tighter">
            EST. 2026 // UMBY
          </div>
        </div>
      </div>

      {/* ── MODAL / DRAWER READER (Appears when clicking an article) ── */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-zinc-950/90 backdrop-blur-md">
          <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto border-2 border-neon bg-zinc-950 p-6 sm:p-10 space-y-8 sharp-card shadow-[0_0_40px_rgba(0,255,0,0.15)]">
            {/* Top Bar */}
            <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
              <div className="flex items-center gap-2 font-mono text-xs text-neon uppercase tracking-widest">
                <FileText className="w-4 h-4" />
                <span>READER // {activeArticle.category}</span>
              </div>
              <button
                type="button"
                onClick={() => setActiveArticle(null)}
                className="p-2 border border-zinc-800 bg-zinc-900 text-zinc-400 hover:border-neon hover:text-neon transition-colors sharp-card"
                aria-label="Close reader"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Article Content */}
            <div className="space-y-6">
              <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-zinc-500">
                <span className="flex items-center gap-1.5 text-zinc-400">
                  <Calendar className="w-3.5 h-3.5 text-neon" />
                  {activeArticle.date}
                </span>
                <span>•</span>
                <span>{activeArticle.readTime}</span>
              </div>

              <h2 className="font-mono text-2xl sm:text-4xl font-black uppercase tracking-tight text-zinc-100 leading-tight">
                {activeArticle.title}
              </h2>

              <div className="p-4 border-l-2 border-neon bg-zinc-900/40 text-base font-sans italic text-zinc-300">
                {activeArticle.excerpt}
              </div>

              <div className="font-sans text-base sm:text-lg text-zinc-300 leading-relaxed space-y-4 pt-2">
                <p>{activeArticle.content}</p>
                <p>
                  Dalam praktiknya, kemampuan merancang arsitektur perangkat lunak tidak hanya membutuhkan pemahaman sintaks pemrograman, tetapi juga intuisi mendalam mengenai alur data fisik dan perilaku jaringan. Itulah alasan mengapa perpaduan latar belakang teknik jaringan (SMK TKJ) dan ilmu informatika formal (UMBY) memberikan keunggulan kompetitif dalam setiap proyek sistem yang saya rancang.
                </p>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="pt-6 border-t border-zinc-800 flex justify-end">
              <button
                type="button"
                onClick={() => setActiveArticle(null)}
                className="px-6 py-2.5 bg-neon text-zinc-950 font-mono text-xs font-bold uppercase tracking-widest hover:bg-neon/80 transition-colors sharp-card"
              >
                Tutup Catatan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
