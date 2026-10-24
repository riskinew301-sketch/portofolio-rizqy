"use client";

import React, { useState } from "react";
import { siteContent } from "@/data/content";
import {
  Mail,
  Send,
  CheckCircle2,
  AlertCircle,
  MapPin,
  Terminal,
  Clock,
  ShieldCheck,
} from "lucide-react";
import { GithubIcon, LinkedinIcon, InstagramIcon } from "@/components/ui/BrandIcons";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const accessKey =
    process.env.NEXT_PUBLIC_WEB3FORMS_KEY ||
    process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ||
    "YOUR_WEB3FORMS_ACCESS_KEY_HERE";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: accessKey,
          name,
          email,
          message,
          subject: `Portfolio Contact from ${name} // GSA '26 Portfolio`,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setStatus("success");
        setName("");
        setEmail("");
        setMessage("");
      } else {
        setStatus("error");
        setErrorMessage(
          result.message || "Gagal mengirim pesan. Silakan coba lagi."
        );
      }
    } catch (err) {
      setStatus("error");
      setErrorMessage("Koneksi gagal. Silakan periksa jaringanmu dan coba kembali.");
    }
  };

  return (
    <div className="w-full min-h-screen py-24 px-6 bg-zinc-950 text-zinc-100 border-b border-zinc-800">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* ── Page Header ── */}
        <div className="border-b border-zinc-800 pb-10 space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-neon">
            <span className="w-2 h-2 bg-neon" />
            <span>05 // COMMUNICATION CHANNEL</span>
          </div>

          <h1 className="font-mono text-4xl sm:text-5xl md:text-6xl font-black text-zinc-100 tracking-tight">
            Initiate <span className="text-neon">Connection</span>
          </h1>

          <p className="max-w-2xl text-base sm:text-lg text-zinc-300 font-sans leading-relaxed">
            Terbuka untuk kolaborasi pengembangan antarmuka web, rekayasa fullstack, konsultasi infrastruktur jaringan, serta undangan pembicara / kegiatan Google Student Ambassador 2026.
          </p>
        </div>

        {/* ── Grid: Left Info & Right Form (Responsive on mobile) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Panel: Direct Contact & Location Info */}
          <div className="lg:col-span-5 space-y-8">
            <div className="p-8 border border-zinc-800 bg-zinc-900/40 space-y-6 sharp-card">
              <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-neon">
                <Terminal className="w-4 h-4 text-neon" />
                <span>DIRECT ACCESS // INFO</span>
              </div>

              <div className="space-y-4">
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">
                    PRIMARY EMAIL
                  </span>
                  <a
                    href={`mailto:${siteContent.profile.email}`}
                    className="block font-mono text-base sm:text-lg text-zinc-100 hover:text-neon transition-colors mt-0.5"
                  >
                    {siteContent.profile.email}
                  </a>
                </div>

                <div className="pt-3 border-t border-zinc-800/80">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">
                    BASE LOCATION
                  </span>
                  <div className="flex items-center gap-2 text-sm font-mono text-zinc-200 mt-0.5">
                    <MapPin className="w-4 h-4 text-neon" />
                    <span>{siteContent.profile.location}</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-zinc-800/80">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">
                    RESPONSE WINDOW
                  </span>
                  <div className="flex items-center gap-2 text-sm font-mono text-zinc-300 mt-0.5">
                    <Clock className="w-4 h-4 text-neon" />
                    <span>&lt; 24 Jam (Hari Kerja / GMT+7)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Network Grid */}
            <div className="space-y-3">
              <span className="font-mono text-xs uppercase tracking-widest text-zinc-400">
                VERIFIED SOCIAL PROFILES
              </span>
              <div className="grid grid-cols-3 gap-3">
                <a
                  href={siteContent.profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 border border-zinc-800 bg-zinc-900/40 hover:border-neon hover:text-neon transition-all sharp-card flex items-center justify-center gap-2 font-mono text-xs"
                >
                  <GithubIcon className="w-4 h-4" />
                  <span>GitHub</span>
                </a>
                <a
                  href={siteContent.profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 border border-zinc-800 bg-zinc-900/40 hover:border-neon hover:text-neon transition-all sharp-card flex items-center justify-center gap-2 font-mono text-xs"
                >
                  <LinkedinIcon className="w-4 h-4" />
                  <span>LinkedIn</span>
                </a>
                <a
                  href={siteContent.profile.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 border border-zinc-800 bg-zinc-900/40 hover:border-neon hover:text-neon transition-all sharp-card flex items-center justify-center gap-2 font-mono text-xs"
                >
                  <InstagramIcon className="w-4 h-4" />
                  <span>Instagram</span>
                </a>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 bg-zinc-900/30 p-3 border border-zinc-800/60">
              <ShieldCheck className="w-4 h-4 text-neon" />
              <span>END-TO-END NO-BACKEND DELIVERY VIA WEB3FORMS</span>
            </div>
          </div>

          {/* Right Panel: Minimalist Sharp Contact Form */}
          <div className="lg:col-span-7">
            <div className="border border-zinc-800 bg-zinc-900/20 p-8 sm:p-10 sharp-card">
              <div className="mb-8 space-y-1">
                <h2 className="font-mono text-xl font-bold text-zinc-100 uppercase tracking-wide">
                  Transmit Message
                </h2>
                <p className="text-sm text-zinc-400 font-sans">
                  Isi formulir minimalis di bawah untuk mengirim pesan langsung ke kotak masuk utama saya.
                </p>
              </div>

              {status === "success" ? (
                <div className="p-8 border border-neon/40 bg-neon/20 space-y-4 text-center sharp-card">
                  <CheckCircle2 className="w-12 h-12 text-neon mx-auto" />
                  <h3 className="font-mono text-xl font-bold text-zinc-100">
                    PESAN TERKIRIM // TRANSMISSION SUCCESS
                  </h3>
                  <p className="text-sm text-zinc-300">
                    Terima kasih telah menghubungi. Pesanmu sudah masuk ke sistem dan akan segera saya balas.
                  </p>
                  <button
                    type="button"
                    onClick={() => setStatus("idle")}
                    className="px-6 py-2.5 bg-neon text-zinc-950 font-mono text-xs font-bold uppercase tracking-widest hover:bg-neon/80 transition-colors sharp-card mt-4"
                  >
                    Kirim Pesan Lain
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  method="POST"
                  action="https://api.web3forms.com/submit"
                  className="space-y-6"
                >
                  {/* Hidden access_key for Web3Forms integration */}
                  <input
                    type="hidden"
                    name="access_key"
                    value={accessKey}
                  />

                  {/* Name Input */}
                  <div className="space-y-2">
                    <label
                      htmlFor="name"
                      className="block font-mono text-xs uppercase tracking-widest text-zinc-300 font-semibold"
                    >
                      Nama Lengkap / Instansi <span className="text-neon">*</span>
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Budi Santoso (Google Student Community)"
                      className="w-full px-4 py-3 bg-transparent border border-zinc-800 text-zinc-100 font-mono text-sm placeholder:text-zinc-600 focus:outline-none focus:border-neon transition-colors sharp-card"
                    />
                  </div>

                  {/* Email Input */}
                  <div className="space-y-2">
                    <label
                      htmlFor="email"
                      className="block font-mono text-xs uppercase tracking-widest text-zinc-300 font-semibold"
                    >
                      Alamat Email <span className="text-neon">*</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. budi.santoso@example.com"
                      className="w-full px-4 py-3 bg-transparent border border-zinc-800 text-zinc-100 font-mono text-sm placeholder:text-zinc-600 focus:outline-none focus:border-neon transition-colors sharp-card"
                    />
                  </div>

                  {/* Message Textarea */}
                  <div className="space-y-2">
                    <label
                      htmlFor="message"
                      className="block font-mono text-xs uppercase tracking-widest text-zinc-300 font-semibold"
                    >
                      Pesan / Detail Kolaborasi <span className="text-neon">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Tulis pesanmu di sini..."
                      className="w-full px-4 py-3 bg-transparent border border-zinc-800 text-zinc-100 font-mono text-sm placeholder:text-zinc-600 focus:outline-none focus:border-neon transition-colors sharp-card resize-y"
                    />
                  </div>

                  {/* Error Notification */}
                  {status === "error" && (
                    <div className="p-4 border border-red-500/40 bg-red-950/20 text-red-400 font-mono text-xs flex items-center gap-2 sharp-card">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="w-full py-4 bg-neon text-zinc-950 font-mono text-xs font-bold uppercase tracking-widest hover:bg-neon/80 transition-colors disabled:opacity-50 sharp-card flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,255,0,0.15)]"
                  >
                    {status === "submitting" ? (
                      <>
                        <span className="w-4 h-4 border-2 border-zinc-950 border-t-transparent rounded-full animate-spin" />
                        <span>TRANSMITTING...</span>
                      </>
                    ) : (
                      <>
                        <span>SEND MESSAGE // KIRIM PESAN</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
