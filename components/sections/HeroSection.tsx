"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Terminal, MapPin, ExternalLink } from "lucide-react";
import { siteContent } from "@/data/content";
import { Avatar } from "@/components/ui/Avatar";
import { ElectricGaze } from "@/components/ui/ElectricGaze";

export const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden border-b border-zinc-800 bg-zinc-950">
      {/* ── Electric Gaze dithered portrait — pinned to right side ── */}
      <div className="absolute top-0 right-0 h-full w-[70%] md:w-[65%] lg:w-[55%] pointer-events-none">
        <ElectricGaze imageSrc="/profile.png" />
      </div>

      {/* ── Gradient overlay: solid left → transparent right for text readability ── */}
      <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/90 to-transparent pointer-events-none" />

      {/* ── Hero Content ── */}
      <div className="relative z-10 max-w-6xl mx-auto w-full px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-2xl space-y-8"
        >
          {/* Status & Dynamic Avatar Badge */}
          <div className="flex flex-wrap items-center gap-4">
            <Avatar
              src={siteContent.profile.avatarUrl}
              name={siteContent.profile.name}
              role="Google Student Ambassador '26"
              size="lg"
              showRoleBadge={true}
            />
            <a
              href="https://drive.google.com/file/d/14xItd_OMgkwSYiAZdcqYdzjmniMKWy8h/view"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-1.5 border border-neon/40 bg-zinc-950/80 backdrop-blur-sm hover:border-neon transition-colors group cursor-pointer"
              title="Lihat Sertifikat Google Student Ambassador"
            >
              <span className="w-2 h-2 bg-neon rounded-full animate-ping" />
              <span className="font-mono text-xs text-neon font-bold uppercase tracking-wider flex items-center gap-1.5">
                GSA &apos;26 // SELECTED 1 OF 81,000+
                <ExternalLink className="w-3.5 h-3.5 opacity-70 group-hover:opacity-100 transition-opacity" />
              </span>
            </a>
          </div>

          {/* Location Tag */}
          <div className="flex items-center gap-1.5 text-xs font-mono text-zinc-400 bg-zinc-900/80 backdrop-blur-sm px-3 py-1.5 border border-zinc-800 w-fit">
            <MapPin className="w-3.5 h-3.5 text-neon" />
            <span>{siteContent.profile.location}</span>
          </div>

          {/* Main Headline */}
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 border border-zinc-800 bg-zinc-900/60 backdrop-blur-sm font-mono text-xs text-zinc-300">
              <Terminal className="w-3.5 h-3.5 text-neon" />
              <span>{siteContent.profile.fullNameWithTitle}</span>
            </div>
            <h1 className="font-mono text-4xl sm:text-5xl md:text-6xl font-black text-zinc-100 tracking-tight leading-tight">
              Frontend Developer <span className="text-zinc-500">|</span>{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon via-neon to-zinc-200">
                Google Student Ambassador &apos;26
              </span>
            </h1>
          </div>

          {/* Bio Summary */}
          <p className="text-base sm:text-lg text-zinc-300 font-sans leading-relaxed">
            {siteContent.profile.bio}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-4">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-neon text-zinc-950 font-mono text-xs font-bold uppercase tracking-widest hover:bg-neon/80 transition-colors sharp-card"
            >
              <span>Explore Projects</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>

            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3.5 border border-zinc-700 bg-zinc-900/80 backdrop-blur-sm text-zinc-200 font-mono text-xs font-bold uppercase tracking-widest hover:border-neon hover:text-neon transition-colors sharp-card"
            >
              <span>Get In Touch</span>
            </Link>

            <Link
              href="/journal"
              className="inline-flex items-center gap-2 px-5 py-3.5 text-zinc-400 font-mono text-xs uppercase tracking-widest hover:text-zinc-100 transition-colors"
            >
              <span>Read Technical Journal →</span>
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Streetwear / Cyber Aesthetic Corner Grid Indicator */}
      <div className="absolute bottom-6 right-6 hidden md:flex items-center gap-4 font-mono text-[10px] text-zinc-500 uppercase tracking-widest pointer-events-none z-10">
        <span>EST. 2026 // UMBY INFORMATICS</span>
        <span>•</span>
        <span>NETWORKING TO SOFTWARE</span>
      </div>
    </section>
  );
};
