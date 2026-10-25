"use client";

import React from "react";
import { Globe, ShieldCheck, ExternalLink } from "lucide-react";
import { siteContent } from "@/data/content";
import { CertificateAccordion } from "@/components/ui/certificate-accordion";

export const MilestonesSection: React.FC = () => {
  return (
    <section className="w-full border-b border-zinc-800 bg-zinc-950 py-24 px-6">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* ── Section Header ── */}
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-neon mb-3">
            <span className="w-2 h-2 bg-neon" />
            <span>02 // LEADERSHIP & RECOGNITION</span>
          </div>
          <h2 className="font-mono text-3xl sm:text-4xl font-bold text-zinc-100">
            Milestones & Verified Credentials
          </h2>
        </div>

        {/* ── Major Milestones Grid (GSA 2026 & KPN 2026) ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {siteContent.milestones.map((milestone) => (
            <div
              key={milestone.id}
              className="group relative border border-zinc-800 bg-zinc-900/40 p-8 flex flex-col justify-between hover:border-neon hover:bg-zinc-900/80 transition-all sharp-card"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs font-bold uppercase tracking-widest text-neon">
                    {milestone.highlight}
                  </span>
                  <span className="font-mono text-xs px-2.5 py-1 border border-neon/40 bg-neon/10 text-neon font-bold">
                    {milestone.year}
                  </span>
                </div>

                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 border border-zinc-700 bg-zinc-950 flex items-center justify-center text-neon group-hover:border-neon transition-colors">
                    <Globe className="w-5 h-5" />
                  </div>
                  <div>
                    {milestone.credentialUrl ? (
                      <a
                        href={milestone.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 group/link"
                      >
                        <h3 className="font-mono text-xl font-bold text-zinc-100 group-hover/link:text-neon transition-colors">
                          {milestone.title}
                        </h3>
                        <ExternalLink className="w-4 h-4 text-zinc-500 group-hover/link:text-neon transition-colors" />
                      </a>
                    ) : (
                      <h3 className="font-mono text-xl font-bold text-zinc-100 group-hover:text-neon transition-colors">
                        {milestone.title}
                      </h3>
                    )}
                    <p className="font-mono text-xs text-zinc-400">
                      {milestone.organization}
                    </p>
                  </div>
                </div>

                <p className="text-sm text-zinc-300 leading-relaxed mt-4">
                  {milestone.description}
                </p>
              </div>

              {milestone.badge && (
                <div className="mt-6 pt-4 border-t border-zinc-800/80 flex items-center justify-between">
                  <span className="font-mono text-xs text-zinc-400 uppercase tracking-wider">
                    Achievement Badge
                  </span>
                  {milestone.credentialUrl ? (
                    <a
                      href={milestone.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-xs font-bold text-neon hover:underline inline-flex items-center gap-1.5"
                      title="Lihat Sertifikat Google Drive"
                    >
                      <span>{milestone.badge}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  ) : (
                    <span className="font-mono text-xs font-bold text-neon">
                      {milestone.badge}
                    </span>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* ── Skills & Certifications Accordion ── */}
        <div className="space-y-6 pt-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h3 className="font-mono text-xl font-bold text-zinc-100">
                Professional Certifications
              </h3>
              <p className="text-sm text-zinc-400 mt-1">
                Expandable credential archive spanning networking infrastructure and frontend engineering.
              </p>
            </div>
            <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-zinc-400 bg-zinc-900 px-3 py-1.5 border border-zinc-800">
              <ShieldCheck className="w-4 h-4 text-neon" />
              <span>{siteContent.certifications.length} Verified Records</span>
            </div>
          </div>

          {/* shadcn/radix Accordion with split-panel cert viewer */}
          <CertificateAccordion />
        </div>
      </div>
    </section>
  );
};
