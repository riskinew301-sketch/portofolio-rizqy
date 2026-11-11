"use client";

import React from "react";
import Link from "next/link";
import { siteContent } from "@/data/content";
import { OfferCarousel, type Offer } from "@/components/ui/offer-carousel";

// Map portfolio Project data to the Offer shape expected by the carousel
const projectsAsOffers: Offer[] = siteContent.projects.map((project) => ({
  id: project.slug,
  // Use coverImage if it exists, otherwise fall back to a reliable Unsplash stock image
  imageSrc: project.coverImage.startsWith("/projects/")
    ? `https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&q=80` // code/dev fallback
    : project.coverImage,
  imageAlt: project.tagline,
  tag: project.category,
  title: project.title,
  description: project.tagline,
  brandName: project.techStack[0] ?? "Next.js",
  promoCode: project.techStack.slice(1, 3).join(" · "),
  href: `/projects/${project.slug}`,
}));

// Per-project cover images so each card looks distinct
const COVER_IMAGES: Record<string, string> = {
  "pariwisata-diy": "/projects/pariwisata-diy-cover.jpg",
  "laba-pintar": "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&q=80",
  "bk-service-web": "/projects/bk-service-cover.jpg",
  "gudang-meme": "/projects/gudang-meme-icon.png",
};

const offers: Offer[] = siteContent.projects.map((project) => ({
  id: project.slug,
  imageSrc: COVER_IMAGES[project.slug] ?? projectsAsOffers.find((o) => o.id === project.slug)?.imageSrc ?? "",
  imageAlt: project.tagline,
  imageContain: project.slug === "gudang-meme",
  tag: project.category,
  title: project.title,
  description: project.tagline,
  brandName: project.techStack[0] ?? "Next.js",
  promoCode: project.techStack.slice(1, 3).join(" · "),
  href: `/projects/${project.slug}`,
}));

export const FeaturedProjectsSection: React.FC = () => {
  return (
    <section className="w-full border-b border-zinc-800 bg-zinc-950 py-24 px-6">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div>
            <h2 className="font-mono text-3xl sm:text-4xl font-bold text-zinc-100">
              Featured Case Studies
            </h2>
          </div>

          <Link
            href="/projects"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-neon hover:underline"
          >
            <span>View Complete Archive →</span>
          </Link>
        </div>

        {/* Offer Carousel */}
        <OfferCarousel offers={offers} />
      </div>
    </section>
  );
};
