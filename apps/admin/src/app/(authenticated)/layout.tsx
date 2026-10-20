'use client';

import { Header } from '@/components/shared/Header';
import { Sidebar } from '@/components/shared/Sidebar';
import clsx from 'clsx';
import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';

const MainLayout = ({ children }: { children: ReactNode }) => {
  // Open by default so desktop paints with the sidebar in place (no
  // closed -> open flash). The mobile drawer stays hidden until mounted
  // (see Sidebar), then this syncs closed on small viewports.
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    const media = window.matchMedia('(min-width: 1024px)');
    const sync = () => setIsSidebarOpen(media.matches);
    sync();
    media.addEventListener('change', sync);
    return () => media.removeEventListener('change', sync);
  }, []);

  return (
    <div className="flex min-h-screen bg-background font-sans text-foreground">
      <Sidebar
        isOpen={isSidebarOpen}
        onToggleSidebar={() => setIsSidebarOpen((v) => !v)}
        onCloseSidebar={() => setIsSidebarOpen(false)}
      />

      <main
        className={clsx(
          'flex min-w-0 flex-1 flex-col transition-all duration-300',
          isSidebarOpen ? 'lg:pl-64' : 'lg:pl-0',
        )}
      >
        <Header onToggleSidebar={() => setIsSidebarOpen((v) => !v)} />
        <div className="flex-1 p-4 lg:p-8">{children}</div>
      </main>
    </div>
  );
};

export default MainLayout;
