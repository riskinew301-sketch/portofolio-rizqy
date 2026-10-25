"use client";

import React, { useEffect, useState, useCallback } from "react";
import { Radio, Terminal, Music2, Mail } from "lucide-react";
import {
  GithubIcon,
  LinkedinIcon,
  InstagramIcon,
} from "@/components/ui/BrandIcons";
import { siteContent } from "@/data/content";

/* ─── Lanyard API Response Types ─── */
interface LanyardSpotify {
  track_id: string;
  song: string;
  artist: string;
  album: string;
  album_art_url: string;
  timestamps: {
    start: number;
    end: number;
  };
}

interface LanyardResponse {
  success: boolean;
  data: {
    spotify: LanyardSpotify | null;
    discord_status: string;
    // ... other fields we don't need
  };
}

interface SpotifyApiTrack {
  isPlaying?: boolean;
  title?: string;
  artist?: string;
  album?: string;
  albumImageUrl?: string;
  songUrl?: string;
}

/* ─── Equalizer bar keyframes as inline style ─── */
const equalizerKeyframes = `
@keyframes eq-bar-1 {
  0%, 100% { height: 4px; }
  50% { height: 14px; }
}
@keyframes eq-bar-2 {
  0%, 100% { height: 12px; }
  30% { height: 4px; }
  70% { height: 16px; }
}
@keyframes eq-bar-3 {
  0%, 100% { height: 8px; }
  40% { height: 16px; }
  80% { height: 4px; }
}
@keyframes eq-bar-4 {
  0%, 100% { height: 14px; }
  25% { height: 6px; }
  75% { height: 10px; }
}
@keyframes terminal-blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}
`;

const DISCORD_ID = process.env.NEXT_PUBLIC_DISCORD_ID;

/**
 * Footer — Streetwear / Industrial Aesthetic
 * Includes Spotify Mini Player widget powered by Lanyard API (Discord):
 *  - Currently playing track + album art + mini cyan equalizer when active
 *  - Hacker/terminal static text "> STATUS: OFFLINE | LAST PLAYED: MASA MASA - THE ADAMS" when offline
 */
export const Footer: React.FC = () => {
  const [spotifyData, setSpotifyData] = useState<LanyardSpotify | null>(null);
  const [recentTrack, setRecentTrack] = useState<SpotifyApiTrack | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchLanyard = useCallback(async () => {
    try {
      let isLanyardPlaying = false;
      if (DISCORD_ID) {
        const res = await fetch(
          `https://api.lanyard.rest/v1/users/${DISCORD_ID}`,
          { cache: "no-store" }
        );
        if (res.ok) {
          const json: LanyardResponse = await res.json();
          if (json.success && json.data.spotify) {
            setSpotifyData(json.data.spotify);
            isLanyardPlaying = true;

            // Simpan lagu yang sedang diputar ke localStorage browser (Client Cache)
            try {
              localStorage.setItem(
                "portfolio_last_played_track",
                JSON.stringify({
                  title: json.data.spotify.song,
                  artist: json.data.spotify.artist,
                  album: json.data.spotify.album,
                  albumImageUrl: json.data.spotify.album_art_url,
                  songUrl: `https://open.spotify.com/track/${json.data.spotify.track_id}`,
                })
              );
            } catch {}
          } else {
            setSpotifyData(null);
          }
        }
      }

      // Jika Lanyard offline (tidak sedang putar lagu):
      // 1. Prioritaskan cek dari localStorage (langsung rekam seketika tanpa delay dari server Spotify)
      // 2. Jika localStorage kosong, baru fallback ke endpoint /api/spotify
      if (!isLanyardPlaying) {
        let hasLocalCache = false;
        try {
          const cached = localStorage.getItem("portfolio_last_played_track");
          if (cached) {
            setRecentTrack(JSON.parse(cached));
            hasLocalCache = true;
          }
        } catch {}

        if (!hasLocalCache) {
          const recentRes = await fetch("/api/spotify", { cache: "no-store" });
          if (recentRes.ok) {
            const recentJson = await recentRes.json();
            setRecentTrack(recentJson);
          }
        }
      }
    } catch {
      // Fail silently — offline state will render
      setSpotifyData(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLanyard();
    const interval = setInterval(fetchLanyard, 15000); // Poll every 15s
    return () => clearInterval(interval);
  }, [fetchLanyard]);

  const isPlaying = spotifyData !== null;

  return (
    <footer className="w-full border-t-2 border-zinc-800 bg-zinc-950 text-zinc-400 py-12 px-6 bg-grainy">
      {/* Inject equalizer keyframes */}
      <style>{equalizerKeyframes}</style>

      <div className="max-w-6xl mx-auto space-y-10">
        {/* ── TOP FOOTER ROW: Identity & Spotify Mini Player ── */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-10 border-b border-zinc-800">
          {/* Identity */}
          <div className="space-y-1">
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-neon font-bold">
              <Terminal className="w-4 h-4" />
              <span>SYSTEM ARCHIVE // RIZQY NAUFAL PRADANA</span>
            </div>
            <p className="font-mono text-xs text-zinc-500 uppercase tracking-wider">
              FRONTEND DEVELOPER &amp; GOOGLE STUDENT AMBASSADOR &apos;26 // UMBY INFORMATICS
            </p>
          </div>

          {/* Spotify Mini Player Widget (Streetwear Industrial — Lanyard) */}
          <div className="w-full lg:w-auto min-w-[320px] max-w-md border border-zinc-800 bg-zinc-900/80 p-4 shadow-[0_0_20px_rgba(0,0,0,0.5)]" style={{ borderRadius: 0 }}>
            {/* Header Bar */}
            <div className="flex items-center justify-between gap-2 border-b border-zinc-800 pb-2 mb-3 font-mono text-[10px] uppercase tracking-widest">
              <div className="flex items-center gap-1.5 text-neon font-bold">
                <Radio className="w-3.5 h-3.5" style={isPlaying ? { animation: "terminal-blink 1.5s ease-in-out infinite" } : undefined} />
                <span>SPOTIFY AUDIO LOG</span>
              </div>
              <span
                className="text-zinc-500"
                style={isPlaying ? { color: "rgb(0 255 0)" /* neon */, textShadow: "0 0 6px rgba(0,255,0,0.4)" } : undefined}
              >
                {loading ? "SYNCING..." : isPlaying ? " - THE DEVELOPER IS PLAYING MUSIC" : "IDLE // OFFLINE"}
              </span>
            </div>

            {isPlaying && spotifyData ? (
              /* ── ONLINE / CURRENTLY PLAYING STATE ── */
              <div className="flex items-center gap-3">
                {/* Album Art */}
                <div className="relative w-12 h-12 border border-zinc-700 shrink-0 overflow-hidden bg-zinc-950" style={{ borderRadius: 0 }}>
                  <img
                    src={spotifyData.album_art_url}
                    alt={spotifyData.album || "Album Art"}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{ border: "1px solid rgba(0,255,0,0.3)" }}
                  />
                </div>

                {/* Song Title & Artist */}
                <div className="flex-1 min-w-0">
                  <a
                    href={`https://open.spotify.com/track/${spotifyData.track_id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block truncate font-mono text-xs text-zinc-100 hover:text-neon font-bold transition-colors"
                  >
                    {spotifyData.song}
                  </a>
                  <p className="truncate font-mono text-[11px] text-zinc-400 mt-0.5">
                    {spotifyData.artist}
                  </p>
                </div>

                {/* Mini Neon Equalizer (4 animated bars) */}
                <div
                  className="flex items-end gap-[3px] h-5 px-2 py-0.5 border border-zinc-800 bg-zinc-950"
                  title="Now Playing"
                  style={{ borderRadius: 0 }}
                >
                  <span
                    className="block w-[3px] bg-neon"
                    style={{
                      animation: "eq-bar-1 0.6s ease-in-out infinite",
                      boxShadow: "0 0 4px rgba(0,255,0,0.5)",
                    }}
                  />
                  <span
                    className="block w-[3px] bg-neon"
                    style={{
                      animation: "eq-bar-2 0.5s ease-in-out infinite",
                      boxShadow: "0 0 4px rgba(0,255,0,0.5)",
                    }}
                  />
                  <span
                    className="block w-[3px] bg-neon"
                    style={{
                      animation: "eq-bar-3 0.7s ease-in-out infinite",
                      boxShadow: "0 0 4px rgba(0,255,0,0.5)",
                    }}
                  />
                  <span
                    className="block w-[3px] bg-neon"
                    style={{
                      animation: "eq-bar-4 0.55s ease-in-out infinite",
                      boxShadow: "0 0 4px rgba(0,255,0,0.5)",
                    }}
                  />
                </div>
              </div>
            ) : (
              /* ── OFFLINE / LAST PLAYED ARCHIVE STATE (WITH COVER ART) ── */
              <div className="flex items-center gap-3">
                {/* Album Art (Offline Grayscale Aesthetic, Hover to Full Color) */}
                <div
                  className="relative w-12 h-12 border border-zinc-800 shrink-0 overflow-hidden bg-zinc-950 group"
                  style={{ borderRadius: 0 }}
                >
                  <img
                    src={
                      recentTrack?.albumImageUrl ||
                      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=300&q=80"
                    }
                    alt={recentTrack?.album || "Offline Album Art"}
                    className="w-full h-full object-cover grayscale opacity-75 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
                    loading="lazy"
                  />
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{ border: "1px solid rgba(255,255,255,0.08)" }}
                  />
                </div>

                {/* Last Played Song Title & Artist */}
                <div className="flex-1 min-w-0">
                  {recentTrack?.songUrl ? (
                    <a
                      href={recentTrack.songUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block truncate font-mono text-xs text-zinc-300 hover:text-neon font-bold transition-colors uppercase"
                    >
                      {recentTrack.title || "MASA MASA"}
                    </a>
                  ) : (
                    <span className="block truncate font-mono text-xs text-zinc-300 font-bold uppercase">
                      {recentTrack?.title || "MASA MASA"}
                    </span>
                  )}
                  <p className="truncate font-mono text-[11px] text-zinc-500 uppercase mt-0.5">
                    {recentTrack?.artist || "THE ADAMS"}
                  </p>
                </div>

                {/* Offline / Last Played Badge */}
                <div
                  className="flex items-center gap-1.5 px-2 py-1 border border-zinc-800 bg-zinc-950 text-zinc-500 font-mono text-[10px] uppercase tracking-wider shrink-0"
                  title="Terakhir Diputar // Offline Archive"
                >
                  <span className="w-1.5 h-1.5 bg-zinc-600 inline-block" />
                  <span>LAST PLAYED</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ── BOTTOM FOOTER ROW: Social Links & Copyright ── */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs">
          <div className="flex items-center gap-3">
            <a
              href={`mailto:${siteContent.profile.email}`}
              className="p-2.5 border border-zinc-800 bg-zinc-900 text-zinc-400 hover:border-neon hover:text-neon transition-colors sharp-card"
              aria-label="Email"
              title={`Email: ${siteContent.profile.email}`}
            >
              <Mail className="w-4 h-4" />
            </a>
            <a
              href={siteContent.profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 border border-zinc-800 bg-zinc-900 text-zinc-400 hover:border-neon hover:text-neon transition-colors sharp-card"
              aria-label="GitHub Repository"
              title="GitHub"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
            <a
              href={siteContent.profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 border border-zinc-800 bg-zinc-900 text-zinc-400 hover:border-neon hover:text-neon transition-colors sharp-card"
              aria-label="LinkedIn Profile"
              title="LinkedIn"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>
            <a
              href={siteContent.profile.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 border border-zinc-800 bg-zinc-900 text-zinc-400 hover:border-neon hover:text-neon transition-colors sharp-card"
              aria-label="Instagram Profile"
              title="Instagram"
            >
              <InstagramIcon className="w-4 h-4" />
            </a>
          </div>

          <div className="text-center sm:text-right text-zinc-500">
            <span>&copy; {new Date().getFullYear()} RIZQY NAUFAL PRADANA. </span>
            <span className="text-zinc-600">
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
