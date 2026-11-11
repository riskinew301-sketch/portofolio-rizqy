"use client";

import React from "react";
import { Network, Code2, ArrowRight } from "lucide-react";

export const AboutSection: React.FC = () => {
  return (
    <section className="w-full border-b border-zinc-800 bg-zinc-950 py-24 px-6 relative overflow-hidden">
      {/* Background Subtle Grain & Geometric Lines */}
      <div className="absolute inset-0 bg-grainy opacity-30 pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="mb-12">
          <h2 className="font-mono text-3xl sm:text-4xl font-bold text-zinc-100">
            From Routing Tables to Component Trees
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Main Narrative Column */}
          <div className="lg:col-span-7 space-y-6 text-zinc-300 leading-relaxed font-sans text-base sm:text-lg">
            <p>
              Perjalanan teknis saya berawal dari pendidikan kejuruan{" "}
              <span className="text-zinc-100 font-semibold">Teknik Komputer dan Jaringan (SMK TKJ)</span>,
              yang diperkuat melalui pengalaman magang di{" "}
              <span className="text-zinc-100 font-semibold">Instalasi IT RSUD Wonosari</span>{" "}
              dalam menangani infrastruktur jaringan lokal (LAN) dan pemeliharaan sistem rumah sakit secara langsung.
            </p>
            <p>
              Fondasi infrastruktur tersebut kini saya kembangkan sebagai mahasiswa{" "}
              <span className="text-zinc-100 font-semibold">
                penerima beasiswa Informatika di Universitas Mercu Buana Yogyakarta (UMBY)
              </span>{" "}
              dan{" "}
              <span className="text-neon font-mono text-sm px-1.5 py-0.5 bg-zinc-900 border border-zinc-800">
                Asisten Praktikum Jaringan Komputer
              </span>
              , mendalami simulasi routing{" "}
              <span className="text-zinc-100 font-mono text-sm">MikroTik</span> dan{" "}
              <span className="text-zinc-100 font-mono text-sm">Cisco Packet Tracer</span>{" "}
              hingga melakukan riset model{" "}
              <span className="text-zinc-100 font-semibold">AIoT berbasis MobileNetV3</span>.
            </p>
            <p>
              Sebagai seorang <em>builder</em> yang memadukan pengembangan perangkat lunak dan{" "}
              <span className="text-neon font-mono text-sm px-1.5 py-0.5 bg-zinc-900 border border-zinc-800">
                AI-Assisted Engineering
              </span>
              , saya juga mengekspresikan sisi kreatif di luar baris kode melalui{" "}
              <span className="text-zinc-100 font-semibold">penulisan lirik</span> dan{" "}
              <span className="text-zinc-100 font-semibold">fotografi jalanan berestetika retro</span>—menggabungkan
              ketelitian logika komputasi dan kepekaan rasa untuk menciptakan solusi digital yang tangguh dan estetik.
            </p>
          </div>

          {/* Tech Evolution Bridge Timeline Cards */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-6 border border-zinc-800 bg-zinc-900/50 sharp-card hover:border-zinc-700 transition-colors">
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-xs font-bold uppercase text-zinc-400">
                  PHASE 1 // NETWORK &amp; INFRASTRUCTURE
                </span>
                <Network className="w-5 h-5 text-zinc-400" />
              </div>
              <h3 className="font-mono text-lg font-bold text-zinc-100 mb-2">
                SMK TKJ, RSUD Wonosari &amp; Aslab UMBY
              </h3>
              <p className="text-sm text-zinc-400 mb-4">
                Instalasi IT &amp; Pemeliharaan Sistem RS, Routing Simulation (MikroTik &amp; Packet Tracer), LAN, &amp; Server Administration.
              </p>
              <div className="flex flex-wrap gap-1.5">
                {["MikroTik RouterOS", "Packet Tracer", "Hospital LAN", "Cisco CCNA", "Linux Server"].map((tag, i) => (
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
                  PHASE 2 // SOFTWARE &amp; AI ENGINEERING
                </span>
                <Code2 className="w-5 h-5 text-neon" />
              </div>
              <h3 className="font-mono text-lg font-bold text-zinc-100 mb-2">
                Informatika UMBY — Fullstack &amp; AIoT
              </h3>
              <p className="text-sm text-zinc-400 mb-4">
                SaaS Web Development, AI-Assisted Engineering, MobileNetV3 AIoT Research, &amp; High-Performance Interfaces.
              </p>
              <div className="flex flex-wrap gap-1.5">
                {["Next.js & React", "Laravel 12", "TypeScript", "AI-Assisted Eng", "MobileNetV3 AIoT", "PostgreSQL / MySQL"].map((tag, i) => (
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
