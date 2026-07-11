'use client';

import { TooltipProvider } from '@/components/ui/tooltip';
import { SessionProvider } from 'next-auth/react';
import type { FC, PropsWithChildren } from 'react';
import { Toaster } from 'react-hot-toast';
import { QueryProvider } from './QueryProvider';
import { ThemeProvider } from '@/providers/ThemeProvider';

export const AppProviders: FC<PropsWithChildren> = ({ children }) => {
  return (
    <SessionProvider>
      <QueryProvider>
        <ThemeProvider>
          <TooltipProvider>{children}</TooltipProvider>
          <Toaster />
        </ThemeProvider>
      </QueryProvider>
    </SessionProvider>
  );
};
