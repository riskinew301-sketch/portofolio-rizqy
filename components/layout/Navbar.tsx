"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { siteContent } from "@/data/content";
import { Avatar } from "@/components/ui/Avatar";
import { SlideTabs } from "@/components/ui/slide-tabs";

const navLinks = [
  { name: "HOME", href: "/" },
  { name: "PROJECTS", href: "/projects" },
  { name: "JOURNAL", href: "/journal" },
  { name: "CONTACT", href: "/contact" },
];

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-800 bg-zinc-950/90 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Brand Logo with Dynamic Avatar */}
        <Link
          href="/"
          className="flex items-center gap-3 group focus:outline-none"
        >
          <Avatar
            src={siteContent.profile.avatarUrl}
            name={siteContent.profile.name}
            role="GSA '26"
            size="sm"
          />
          <div className="flex flex-col">
            <span className="font-mono text-xs font-bold text-zinc-100 group-hover:text-neon transition-colors">
              {siteContent.profile.name.toUpperCase()}
            </span>
            <span className="font-mono text-[10px] text-zinc-400 tracking-wider">
              DEV // GSA &apos;26
            </span>
          </div>
        </Link>

        {/* Desktop Navigation — SlideTabs */}
        <nav className="hidden md:flex items-center">
          <SlideTabs tabs={navLinks} />
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-zinc-400 hover:text-neon focus:outline-none"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Navigation Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-zinc-800 bg-zinc-950 px-6 py-4 space-y-3">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block font-mono text-sm uppercase tracking-widest py-2 border-l-2 pl-3 transition-colors ${
                  isActive
                    ? "border-neon text-neon font-bold bg-zinc-900/50"
                    : "border-transparent text-zinc-400 hover:text-zinc-100"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
};
