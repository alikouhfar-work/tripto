'use client';

import type { FC, PropsWithChildren } from 'react';
import { QueryProvider } from './QueryProvider';

export const AppProviders: FC<PropsWithChildren> = ({ children }) => {
  return <QueryProvider>{children}</QueryProvider>;
};
