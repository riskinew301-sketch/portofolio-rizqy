"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowRight, Tag } from "lucide-react";
import { cn } from "@/lib/utils";

// Define the type for a single offer/project card item
export interface Offer {
  id: string | number;
  imageSrc: string;
  imageAlt: string;
  tag: string;
  title: string;
  description: string;
  brandLogoSrc?: string;
  brandName: string;
  promoCode?: string;
  href: string;
}

// Props for the OfferCard component
interface OfferCardProps {
  offer: Offer;
}

// Individual card — styled to match zinc/neon dark portfolio palette
const OfferCard = React.forwardRef<HTMLAnchorElement, OfferCardProps>(
  ({ offer }, ref) => (
    <motion.a
      ref={ref}
      href={offer.href}
      className="relative flex-shrink-0 w-[300px] h-[400px] overflow-hidden group snap-start border border-zinc-800 bg-zinc-900 hover:border-neon transition-colors duration-300"
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
    >
      {/* Background Image — top half */}
      <div className="relative w-full h-1/2 overflow-hidden bg-zinc-800">
        {offer.imageSrc ? (
          <img
            src={offer.imageSrc}
            alt={offer.imageAlt}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 filter grayscale group-hover:grayscale-0"
          />
        ) : (
          /* Fallback: neon dot-grid pattern */
          <div className="absolute inset-0 bg-grainy bg-zinc-900 flex items-center justify-center">
            <span className="font-mono text-xs text-zinc-600 uppercase tracking-widest">
              {offer.tag}
            </span>
          </div>
        )}
        {/* Scanline overlay for analog feel */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-zinc-900/60 pointer-events-none" />
      </div>

      {/* Card Content — bottom half */}
      <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-zinc-900 px-5 py-4 flex flex-col justify-between border-t border-zinc-800">
        <div className="space-y-1.5">
          {/* Tag */}
          <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest text-neon">
            <Tag className="w-3 h-3" />
            <span>{offer.tag}</span>
          </div>
          {/* Title */}
          <h3 className="font-mono text-base font-bold text-zinc-100 leading-snug group-hover:text-neon transition-colors line-clamp-2">
            {offer.title}
          </h3>
          {/* Description */}
          <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
            {offer.description}
          </p>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-zinc-800">
          <div className="flex items-center gap-2">
            {offer.brandLogoSrc ? (
              <img
                src={offer.brandLogoSrc}
                alt={`${offer.brandName} logo`}
                className="w-7 h-7 object-contain bg-zinc-800 p-1"
              />
            ) : (
              <span className="w-7 h-7 flex items-center justify-center bg-zinc-800 border border-zinc-700">
                <Tag className="w-3 h-3 text-neon" />
              </span>
            )}
            <div>
              <p className="text-[11px] font-mono font-semibold text-zinc-200">
                {offer.brandName}
              </p>
              {offer.promoCode && (
                <p className="text-[10px] font-mono text-zinc-500">
                  {offer.promoCode}
                </p>
              )}
            </div>
          </div>

          {/* Arrow button */}
          <div className="w-7 h-7 border border-zinc-700 flex items-center justify-center text-zinc-400 transition-all duration-300 group-hover:border-neon group-hover:text-neon group-hover:rotate-[-45deg]">
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>
    </motion.a>
  )
);
OfferCard.displayName = "OfferCard";

// Props for the OfferCarousel component
export interface OfferCarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  offers: Offer[];
}

// Main carousel with scroll buttons
const OfferCarousel = React.forwardRef<HTMLDivElement, OfferCarouselProps>(
  ({ offers, className, ...props }, ref) => {
    const scrollContainerRef = React.useRef<HTMLDivElement>(null);

    const scroll = (direction: "left" | "right") => {
      if (scrollContainerRef.current) {
        const { current } = scrollContainerRef;
        const scrollAmount = current.clientWidth * 0.75;
        current.scrollBy({
          left: direction === "left" ? -scrollAmount : scrollAmount,
          behavior: "smooth",
        });
      }
    };

    return (
      <div
        ref={ref}
        className={cn("relative w-full group/carousel", className)}
        {...props}
      >
        {/* Left Scroll Button */}
        <button
          onClick={() => scroll("left")}
          className="absolute top-1/2 -translate-y-1/2 -left-4 z-10 w-9 h-9 border border-zinc-700 bg-zinc-950/80 backdrop-blur-sm flex items-center justify-center text-zinc-400 opacity-0 group-hover/carousel:opacity-100 transition-all duration-300 hover:border-neon hover:text-neon"
          aria-label="Scroll Left"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Scrollable Container */}
        <div
          ref={scrollContainerRef}
          className="flex gap-5 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {offers.map((offer) => (
            <OfferCard key={offer.id} offer={offer} />
          ))}
        </div>

        {/* Right Scroll Button */}
        <button
          onClick={() => scroll("right")}
          className="absolute top-1/2 -translate-y-1/2 -right-4 z-10 w-9 h-9 border border-zinc-700 bg-zinc-950/80 backdrop-blur-sm flex items-center justify-center text-zinc-400 opacity-0 group-hover/carousel:opacity-100 transition-all duration-300 hover:border-neon hover:text-neon"
          aria-label="Scroll Right"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    );
  }
);
OfferCarousel.displayName = "OfferCarousel";

export { OfferCarousel, OfferCard };

