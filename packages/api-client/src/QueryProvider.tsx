'use client';

import { QueryClientProvider } from '@tanstack/react-query';
import { useState, type FC, type PropsWithChildren } from 'react';
import { queryClient as defaultQueryClient } from './query-client';

export const QueryProvider: FC<PropsWithChildren> = ({ children }) => {
  const [queryClient] = useState(defaultQueryClient);

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};
