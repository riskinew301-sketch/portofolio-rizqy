import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN;

const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";
const NOW_PLAYING_ENDPOINT =
  "https://api.spotify.com/v1/me/player/currently-playing";
const RECENTLY_PLAYED_ENDPOINT =
  "https://api.spotify.com/v1/me/player/recently-played?limit=1";

// ── SHOWCASE TRACKS (Rotated automatically when Spotify Free blocks 403) ──
const SHOWCASE_TRACKS = [
  {
    title: "Orang-Orang di Kerumunan",
    artist: "FSTVLST",
    album: "Hits Kitsch",
    albumImageUrl:
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=300&q=80",
    songUrl: "https://open.spotify.com/artist/4X9BvVd6g6Z2pY2e7G3b6L",
  },
  {
    title: "Konservatif",
    artist: "The Adams",
    album: "The Adams",
    albumImageUrl:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=300&q=80",
    songUrl: "https://open.spotify.com/artist/3t5xRXz8G19e5qV83s0t2q",
  },
  {
    title: "Malar",
    artist: "The Milo",
    album: "Photograph",
    albumImageUrl:
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=300&q=80",
    songUrl: "https://open.spotify.com/artist/5L1c7L4e2M6s8g9b6Z4v2a",
  },
  {
    title: "Evaluasi",
    artist: "Hindia",
    album: "Menari Dengan Bayangan",
    albumImageUrl:
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=300&q=80",
    songUrl: "https://open.spotify.com/artist/1G22m6rN8Q1Z2L4y1b6Z0m",
  },
];

// Helper to return rotating showcase track
const getShowcaseTrack = (reason: string) => {
  const index = Math.floor(Date.now() / 30000) % SHOWCASE_TRACKS.length;
  const track = SHOWCASE_TRACKS[index];
  return NextResponse.json(
    {
      isPlaying: true,
      is_playing: true,
      title: track.title,
      artist: track.artist,
      album: track.album,
      albumImageUrl: track.albumImageUrl,
      songUrl: track.songUrl,
      mode: "showcase",
      debug: `Showcase mode active (${reason})`,
    },
    { status: 200 }
  );
};

const getAccessToken = async () => {
  const missing: string[] = [];
  if (!client_id) missing.push("SPOTIFY_CLIENT_ID");
  if (!client_secret) missing.push("SPOTIFY_CLIENT_SECRET");
  if (!refresh_token) missing.push("SPOTIFY_REFRESH_TOKEN");

  if (missing.length > 0) {
    return {
      error: true,
      reason: `Missing variable(s) in .env.local: ${missing.join(", ")}`,
    };
  }

  const basic = Buffer.from(`${client_id}:${client_secret}`).toString("base64");
  const response = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refresh_token!,
    }),
    cache: "no-store",
  });

  if (!response.ok) {
    const errorText = await response.text();
    return {
      error: true,
      reason: `Failed to refresh token: status ${response.status} (${errorText})`,
    };
  }

  return response.json();
};

export async function GET(req: Request) {
  try {
    const tokenResponse = await getAccessToken();

    if (tokenResponse?.error) {
      // Fallback to showcase if token/env fails
      return getShowcaseTrack(tokenResponse.reason);
    }

    if (!tokenResponse || !tokenResponse.access_token) {
      return getShowcaseTrack("No access_token returned from Spotify accounts endpoint");
    }

    const { access_token } = tokenResponse;

    // 1. Coba fetch 'Currently Playing'
    const nowPlayingRes = await fetch(NOW_PLAYING_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      cache: "no-store",
    });

    if (
      nowPlayingRes.status === 200 &&
      nowPlayingRes.headers.get("content-type")?.includes("application/json")
    ) {
      const song = await nowPlayingRes.json();
      if (song && song.item && song.is_playing) {
        return NextResponse.json(
          {
            isPlaying: true,
            is_playing: true,
            title: song.item.name,
            artist: song.item.artists
              .map((_artist: { name: string }) => _artist.name)
              .join(", "),
            album: song.item.album.name,
            albumImageUrl: song.item.album.images[0]?.url,
            songUrl: song.item.external_urls.spotify,
          },
          { status: 200 }
        );
      }
    }

    // 2. JIKA GAGAL / 403 PREMIUM REQUIRED -> AKALI VIA 'RECENTLY PLAYED'
    const recentRes = await fetch(RECENTLY_PLAYED_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      cache: "no-store",
    });

    if (
      recentRes.status === 200 &&
      recentRes.headers.get("content-type")?.includes("application/json")
    ) {
      const recentData = await recentRes.json();
      const track = recentData?.items?.[0]?.track;

      if (track) {
        return NextResponse.json(
          {
            isPlaying: true,
            is_playing: true,
            title: track.name,
            artist: track.artists
              .map((_artist: { name: string }) => _artist.name)
              .join(", "),
            album: track.album.name,
            albumImageUrl: track.album.images[0]?.url,
            songUrl: track.external_urls.spotify,
            mode: "recently-played",
            debug: "Showing Recently Played track",
          },
          { status: 200 }
        );
      }
    }

    // 3. Jika Spotify API menolak 403 (karena akun Free) atau Offline -> OTOMATIS AKTIFKAN SHOWCASE MODE
    const errReason =
      nowPlayingRes.status === 403
        ? "Spotify Free 403 Premium Restriction -> Showcase Active"
        : `Spotify API status ${nowPlayingRes.status} -> Showcase Active`;

    return getShowcaseTrack(errReason);
  } catch (error) {
    return getShowcaseTrack(
      `Unhandled error: ${error instanceof Error ? error.message : String(error)}`
    );
  }
}
