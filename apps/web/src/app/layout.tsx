import './globals.css';
import { ReactNode } from 'react';
import { Metadata } from 'next';
import { cn } from '@/lib/utils';
import { AppProviders } from '@/providers';
import { Navbar } from '@/components/shared/Navbar';
import { Footer } from '@/components/shared/Footer';
import { Inter, JetBrains_Mono, Outfit } from 'next/font/google';

const inter = Inter({
  weight: ['300', '400', '500', '600', '700'],
});

const outfit = Outfit({
  weight: ['400', '500', '600', '700', '800', '900'],
});

const jetBrainsMono = JetBrains_Mono({
  weight: ['400', '500', '600', '700'],
  display: 'swap'
});

export const metadata: Metadata = {
  title: {
    template: '%s - Tripto',
    default: 'Tripto - Hotel & Apartment Booking',
  },
  description:
    'The core frontend experience for Tripto, built with Next.js. This repository houses the complete UI—including components, pages, and state management—that powers our streamlined accommodation booking platform. It transforms the complex process of search and comparison into a simple, fast, and delightful end-to-end user journey.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" className={cn('h-full', 'font-sans')}>
      <body
        className={`${inter.className} ${outfit.className} ${jetBrainsMono.className} flex min-h-full flex-col bg-slate-50 text-slate-800 antialiased`}
      >
        <Navbar />
        <AppProviders>{children}</AppProviders>
        <Footer />
      </body>
    </html>
  );
}
