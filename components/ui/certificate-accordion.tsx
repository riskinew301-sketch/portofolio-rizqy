"use client";

import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/Accordion";
import { Button } from "@/components/ui/button";
import { siteContent } from "@/data/content";
import { ShieldCheck, ExternalLink, Award } from "lucide-react";

/**
 * CertificateAccordion — adapted from 21st.dev accordion-03
 * Displays professional certifications with split-panel layout:
 *  Left → description, issuer badge, credential link
 *  Right → stylized certificate preview card
 *
 * Themed for zinc-950 dark mode with cyan-400 accents, sharp corners, no shadow.
 */
export function CertificateAccordion() {
  const certs = siteContent.certifications;

  return (
    <div className="w-full border border-zinc-800 bg-zinc-950/80">
      <Accordion
        type="single"
        defaultValue={certs[0]?.id}
        collapsible
        className="w-full"
      >
        {certs.map((cert) => (
          <AccordionItem
            key={cert.id}
            value={cert.id}
            className="relative border-b border-zinc-800 last:border-b-0"
          >
            {/* ── Trigger Row ── */}
            <AccordionTrigger className="px-6 hover:no-underline group [&>svg]:hidden cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="w-9 h-9 flex items-center justify-center border border-zinc-800 bg-zinc-900 text-zinc-400 group-data-[state=open]:border-neon group-data-[state=open]:text-neon group-hover:border-zinc-700 transition-colors shrink-0">
                  <Award className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <h4 className="font-mono text-sm font-semibold text-zinc-100 group-hover:text-neon transition-colors leading-snug">
                    {cert.title}
                  </h4>
                  <div className="flex flex-wrap items-center gap-2 mt-1 text-xs text-zinc-400 font-mono">
                    <span>{cert.issuer}</span>
                    <span className="text-zinc-600">•</span>
                    <span className="text-zinc-500">{cert.year}</span>
                    <span className="px-1.5 py-0.5 bg-zinc-900 border border-zinc-800 text-[10px] text-zinc-300 uppercase tracking-wider">
                      {cert.category}
                    </span>
                  </div>
                </div>
              </div>
            </AccordionTrigger>

            {/* ── Expandable Content (split-panel) ── */}
            <AccordionContent className="text-zinc-300 w-full h-full md:h-full grid md:grid-cols-2">
              {/* Left Panel: Description + CTA */}
              <div className="px-6 space-y-5 pb-6">
                <p className="text-sm leading-relaxed">
                  Sertifikasi resmi kompetensi teknis dari{" "}
                  <span className="text-zinc-100 font-semibold">
                    {cert.issuer}
                  </span>{" "}
                  ({cert.year}). Memvalidasi keahlian praktis di bidang{" "}
                  <span className="text-neon font-mono text-xs px-1 py-0.5 bg-zinc-900 border border-zinc-800 inline-block">
                    {cert.category.toUpperCase()}
                  </span>
                  .
                </p>

                <div className="flex items-center gap-2 text-xs font-mono text-neon">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Verified Credential</span>
                </div>

                <Button
                  variant="outline"
                  className="border-zinc-700 bg-zinc-900 text-zinc-200 hover:border-neon hover:text-neon rounded-none text-xs font-mono uppercase tracking-wider"
                  asChild
                >
                  <a
                    href={cert.credentialUrl || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="w-3.5 h-3.5 mr-2" />
                    View Credential
                  </a>
                </Button>
              </div>

              {/* Right Panel: Certificate Preview Card */}
              <div className="border-t md:border-t-0 md:border-l border-zinc-800 md:absolute md:w-1/2 md:right-0 md:top-0 h-full bg-zinc-900/30 flex items-center justify-center p-6">
                <div className="w-full max-w-[220px] aspect-[4/3] bg-zinc-950 border border-zinc-800 flex flex-col items-center justify-center p-5 relative overflow-hidden group/cert">
                  {/* Decorative top bar */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-neon/60 via-neon to-neon/60" />

                  <Award className="w-8 h-8 text-neon/40 mb-3" />
                  <span className="font-mono text-[9px] uppercase tracking-widest text-zinc-500">
                    CERTIFICATE ID
                  </span>
                  <span className="font-mono text-base font-bold text-neon mt-1.5 tracking-wide">
                    {cert.id.replace("cert-", "").toUpperCase()}
                  </span>
                  <span className="font-mono text-[10px] text-zinc-400 mt-1">
                    ISSUED {cert.year}
                  </span>

                  {/* Subtle hover glow */}
                  <div className="absolute inset-0 bg-neon/[0.03] opacity-0 group-hover/cert:opacity-100 transition-opacity duration-300" />
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
