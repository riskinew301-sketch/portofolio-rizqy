'use client';

import { ReactLenis } from 'lenis/react';
import React from 'react';

interface SmoothScrollProviderProps {
  children: React.ReactNode;
}

export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  return (
    <ReactLenis root>
      {children}
    </ReactLenis>
  );
}
