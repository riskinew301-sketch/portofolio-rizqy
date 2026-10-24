"use client";

import React from "react";
import { Network, Code2, Server, Cpu, ArrowRight } from "lucide-react";

export const AboutSection: React.FC = () => {
  return (
    <section className="w-full border-b border-zinc-800 bg-zinc-950 py-24 px-6 relative overflow-hidden">
      {/* Background Subtle Grain & Geometric Lines */}
      <div className="absolute inset-0 bg-grainy opacity-30 pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="mb-12">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-neon mb-3">
            <span className="w-2 h-2 bg-neon" />
            <span>01 // ARCHITECTURE & EVOLUTION</span>
          </div>
          <h2 className="font-mono text-3xl sm:text-4xl font-bold text-zinc-100">
            From Routing Tables to Component Trees
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Main Narrative Column */}
          <div className="lg:col-span-7 space-y-6 text-zinc-300 leading-relaxed font-sans text-base sm:text-lg">
            <p>
              Banyak pengembang antarmuka (frontend developer) memulai perjalanan mereka langsung dari jendela browser. Namun, fondasi teknis saya dibangun dari lapisan fisik dan jaringan: kabel UTP, konfigurasi routing, dan manajemen bandwidth di masa sekolah menengah kejuruan (
              <span className="text-zinc-100 font-semibold">SMK TKJ - Teknik Komputer & Jaringan</span>).
            </p>
            <p>
              Menangani infrastruktur nyata menggunakan{" "}
              <span className="text-neon font-mono text-sm px-1.5 py-0.5 bg-zinc-900 border border-zinc-800">
                MikroTik RouterOS
              </span>{" "}
              dan protokol jaringan memberi saya keuntungan intuitif saat melangkah ke jenjang pendidikan tinggi di{" "}
              <span className="text-zinc-100 font-semibold">
                Informatika UMBY (Universitas Mercu Buana Yogyakarta)
              </span>
              . Di mana sebagian orang melihat UI sebagai sekadar elemen visual, saya melihatnya sebagai titik akhir dari arsitektur data berskala besar.
            </p>
            <p>
              Kini, keahlian tersebut bertransformasi ke pemrograman rekayasa perangkat lunak modern. Dari manipulasi basis data relasional{" "}
              <span className="text-zinc-100 font-mono text-sm">Oracle PL/SQL</span>, pemrograman berorientasi objek dengan{" "}
              <span className="text-zinc-100 font-mono text-sm">Java</span>, hingga membangun antarmuka super-cepat berbasis{" "}
              <span className="text-neon font-mono text-sm px-1.5 py-0.5 bg-zinc-900 border border-zinc-800">
                React & Next.js
              </span>
              . Setiap komponen yang saya bangun dirancang dengan keandalan layaknya router jaringan backbone.
            </p>
          </div>

          {/* Tech Evolution Bridge Timeline Cards */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-6 border border-zinc-800 bg-zinc-900/50 sharp-card hover:border-zinc-700 transition-colors">
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-xs font-bold uppercase text-zinc-400">
                  PHASE 1 // INFRASTRUCTURE
                </span>
                <Network className="w-5 h-5 text-zinc-400" />
              </div>
              <h3 className="font-mono text-lg font-bold text-zinc-100 mb-2">
                SMK TKJ — Networking & Hardware
              </h3>
              <p className="text-sm text-zinc-400 mb-4">
                Routing, Subnetting, Bandwidth Management, VLAN, & Server Administration.
              </p>
              <div className="flex flex-wrap gap-1.5">
                {["MikroTik RouterOS", "Cisco CCNA", "Linux Server", "OSI Layer", "TCP/IP"].map((tag, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 bg-zinc-950 border border-zinc-800 text-[10px] font-mono text-zinc-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex justify-center my-1 text-neon">
              <ArrowRight className="w-5 h-5 rotate-90 lg:rotate-0" />
            </div>

            <div className="p-6 border border-neon/50 bg-zinc-900/80 sharp-card">
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-xs font-bold uppercase text-neon">
                  PHASE 2 // SOFTWARE ENGINEERING
                </span>
                <Code2 className="w-5 h-5 text-neon" />
              </div>
              <h3 className="font-mono text-lg font-bold text-zinc-100 mb-2">
                Informatika UMBY — Fullstack & AI
              </h3>
              <p className="text-sm text-zinc-400 mb-4">
                Modern App Development, Relational Databases, & High-Performance Web Interfaces.
              </p>
              <div className="flex flex-wrap gap-1.5">
                {["Next.js 16", "TypeScript", "React", "Tailwind CSS v4", "Oracle PL/SQL", "Java", "PostgreSQL"].map((tag, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 bg-zinc-950 border border-neon/30 text-[10px] font-mono text-neon"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
