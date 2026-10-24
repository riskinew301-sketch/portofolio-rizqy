"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface TabItem {
  name: string;
  href: string;
}

interface SlideTabsProps {
  tabs: TabItem[];
}

export const SlideTabs = ({ tabs }: SlideTabsProps) => {
  const pathname = usePathname();

  const [position, setPosition] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });

  const tabsRef = useRef<(HTMLLIElement | null)[]>([]);

  // Function to move the cursor to the active page's tab
  const resetToActive = useCallback(() => {
    const activeIdx = tabs.findIndex(
      (t) => pathname === t.href || (t.href !== "/" && pathname.startsWith(t.href))
    );
    const targetIdx = activeIdx >= 0 ? activeIdx : 0;
    const activeTab = tabsRef.current[targetIdx];

    if (activeTab) {
      const { width } = activeTab.getBoundingClientRect();
      setPosition({
        left: activeTab.offsetLeft,
        width,
        opacity: 1,
      });
    }
  }, [pathname, tabs]);

  // Position cursor on active tab on mount, route change, or window resize
  useEffect(() => {
    resetToActive();
    const timer = setTimeout(resetToActive, 50);

    window.addEventListener("resize", resetToActive);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", resetToActive);
    };
  }, [resetToActive]);

  return (
    <ul
      onMouseLeave={resetToActive}
      className="relative mx-auto flex w-fit rounded-full border-2 border-zinc-700 bg-zinc-900 p-1 dark:border-zinc-600 dark:bg-zinc-900"
    >
      {tabs.map((tab, i) => (
        <Tab
          key={tab.href}
          ref={(el) => {
            tabsRef.current[i] = el;
          }}
          setPosition={setPosition}
          href={tab.href}
        >
          {tab.name}
        </Tab>
      ))}

      <Cursor position={position} />
    </ul>
  );
};

interface TabProps {
  children: React.ReactNode;
  setPosition: React.Dispatch<
    React.SetStateAction<{ left: number; width: number; opacity: number }>
  >;
  href: string;
}

const Tab = React.forwardRef<HTMLLIElement, TabProps>(
  ({ children, setPosition, href }, ref) => {
    return (
      <li
        ref={ref}
        onMouseEnter={(e) => {
          const el = e.currentTarget;
          if (!el) return;
          const { width } = el.getBoundingClientRect();
          setPosition({
            left: el.offsetLeft,
            width,
            opacity: 1,
          });
        }}
        className="relative z-10 block cursor-pointer px-3 py-1.5 text-xs uppercase text-white mix-blend-difference md:px-5 md:py-2 md:text-sm font-mono tracking-widest"
      >
        <Link href={href} className="block w-full h-full">
          {children}
        </Link>
      </li>
    );
  }
);

Tab.displayName = "Tab";

interface CursorProps {
  position: { left: number; width: number; opacity: number };
}

const Cursor = ({ position }: CursorProps) => {
  return (
    <motion.li
      initial={false}
      animate={{ ...position }}
      transition={{
        type: "spring",
        stiffness: 350,
        damping: 30,
      }}
      className="absolute z-0 h-7 rounded-full bg-neon md:h-9"
    />
  );
};

