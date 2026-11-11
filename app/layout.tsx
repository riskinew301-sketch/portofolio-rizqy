import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SmoothScrollProvider } from "@/components/SmoothScrollProvider";

export const metadata: Metadata = {
  title: "Rizqy Naufal Pradana — Software & Network Engineer | Google Student Ambassador '26",
  description:
    "Interactive Personal Portfolio of Rizqy Naufal Pradana — Informatics Scholar at UMBY specializing in Computer Networking, Software Engineering, AIoT, and AI-Assisted Engineering.",
  keywords: [
    "Rizqy Naufal Pradana",
    "Software Engineer",
    "Network Engineer",
    "AI-Assisted Engineering",
    "Google Student Ambassador",
    "Next.js",
    "Laravel",
    "TypeScript",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="dark">
      <body className="min-h-screen flex flex-col bg-zinc-950 text-zinc-100 antialiased selection:bg-neon selection:text-zinc-950">
        <SmoothScrollProvider>
          <Navbar />
          <main className="flex-1 w-full">{children}</main>
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}

