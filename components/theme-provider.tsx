'use client';

import * as React from 'react';
import { ThemeProvider as NextThemesProvider, ThemeProviderProps } from 'next-themes';
import dynamic from 'next/dynamic';

const TopProgressBar = dynamic(
  () => {
    return import('@/components/global/top-progress-bar');
  },
  { ssr: false },
);

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider {...props}>
      <TopProgressBar />
      {children}
    </NextThemesProvider>
  );
}
