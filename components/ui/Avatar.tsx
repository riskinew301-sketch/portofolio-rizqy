"use client";

import React, { useState } from "react";
import Image from "next/image";

interface AvatarProps {
  src?: string;
  name: string;
  role?: string;
  size?: "sm" | "md" | "lg" | "xl";
  showRoleBadge?: boolean;
  className?: string;
}

const sizeClasses = {
  sm: "w-8 h-8 text-xs",
  md: "w-10 h-10 text-sm",
  lg: "w-16 h-16 text-base",
  xl: "w-28 h-28 text-xl",
};

export const Avatar: React.FC<AvatarProps> = ({
  src,
  name,
  role,
  size = "md",
  showRoleBadge = false,
  className = "",
}) => {
  const [imageError, setImageError] = useState(false);

  // Dynamic visual avatar badge renderer when image fails or as decorative indicator
  const getDynamicBadgeColor = () => {
    if (role?.toLowerCase().includes("google")) return "border-neon bg-neon/10 text-neon";
    if (role?.toLowerCase().includes("frontend")) return "border-zinc-700 bg-zinc-900 text-zinc-200";
    return "border-neon/50 bg-zinc-900 text-neon";
  };

  return (
    <div className={`relative inline-flex items-center gap-3 ${className}`}>
      <div
        className={`relative overflow-hidden border border-zinc-800 bg-zinc-900 flex items-center justify-center transition-all duration-300 group-hover:border-neon ${sizeClasses[size]}`}
      >
        {src && !imageError ? (
          <Image
            src={src}
            alt={name}
            fill
            sizes="128px"
            className="object-cover contrast-125 brightness-95"
            onError={() => setImageError(true)}
          />
        ) : (
          /* Dynamic generative visual icon instead of hardcoded static initials */
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-zinc-900 via-zinc-950 to-neon/10 p-1">
            <svg
              className="w-3/5 h-3/5 text-neon opacity-80"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path
                strokeLinecap="square"
                strokeLinejoin="miter"
                d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
              />
            </svg>
          </div>
        )}
      </div>

      {showRoleBadge && role && (
        <div className="flex flex-col">
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-zinc-100">
            {name}
          </span>
          <span
            className={`inline-block text-[10px] font-mono uppercase tracking-widest px-1.5 py-0.5 mt-0.5 border ${getDynamicBadgeColor()}`}
          >
            {role}
          </span>
        </div>
      )}
    </div>
  );
};
