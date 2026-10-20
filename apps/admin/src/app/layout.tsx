import { cn } from '@/lib/utils';
import { AppProviders } from '@/providers';
import type { Metadata } from 'next';
import { figtree } from './fonts';
import './globals.css';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: {
    template: '%s - Tripto Admin',
    default: 'Tripto Admin',
  },
  description:
    'The core frontend experience for Tripto, built with Next.js. This repository houses the complete UI—including components, pages, and state management—that powers our streamlined accommodation booking platform. It transforms the complex process of search and comparison into a simple, fast, and delightful end-to-end user journey.',
};

const RootLayout = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  return (
    <html lang="en" className={cn('h-full', 'font-sans')} suppressHydrationWarning>
      <body
        className={`${figtree.className} flex min-h-full flex-col bg-background text-foreground antialiased`}
      >
        {/* Pre-paint theme: parser-blocking script applies .dark before first render. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('tripto-theme');if(t!=='light'&&t!=='dark'){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}if(t==='dark'){document.documentElement.classList.add('dark');}document.documentElement.style.colorScheme=t;}catch(e){}})();`,
          }}
        />
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
};

export default RootLayout;
