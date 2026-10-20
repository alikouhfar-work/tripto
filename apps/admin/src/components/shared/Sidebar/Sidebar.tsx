'use client';

import { AnimatePresence, motion } from 'motion/react';
import clsx from 'clsx';
import { FC, useEffect, useState } from 'react';
import { IconX } from '@tabler/icons-react';
import { SidebarContent } from './SidebarContent';
import { SidebarProps } from './types';

export const Sidebar: FC<SidebarProps> = (props) => {
  const { isOpen, onCloseSidebar, onToggleSidebar } = props;
  const handleClose = onCloseSidebar ?? onToggleSidebar;
  // The mobile drawer/backdrop render only after mount so SSR HTML matches
  // the first client render (no drawer on either). Desktop paints open.
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- mounted flag keeps SSR HTML stable until hydration completes
    setMounted(true);
  }, []);

  // Close the drawer when a nav link is tapped (mobile overlay only).
  const handleNavigate = () => {
    if (window.matchMedia('(max-width: 1023px)').matches) handleClose();
  };

  // Close on Escape + lock body scroll while the mobile drawer is open.
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') handleClose();
    };
    document.addEventListener('keydown', onKeyDown);

    const media = window.matchMedia('(max-width: 1023px)');
    const applyLock = () => {
      document.body.style.overflow = media.matches ? 'hidden' : '';
    };
    applyLock();
    media.addEventListener('change', applyLock);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      media.removeEventListener('change', applyLock);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleClose]);

  return (
    <>
      {/* Desktop: always mounted on lg, slides via CSS (no unmount flash). */}
      <aside
        className={clsx(
          'fixed inset-y-0 left-0 z-50 hidden w-64 flex-col border-r border-border bg-card transition-transform duration-300 lg:flex',
          isOpen ? 'lg:translate-x-0' : 'lg:-translate-x-full',
        )}
        aria-hidden={!isOpen}
      >
        <SidebarContent onNavigate={handleNavigate} />
      </aside>

      {/* Mobile drawer + backdrop (mounted-gated: absent in SSR HTML). */}
      <AnimatePresence>
        {mounted && isOpen && (
          <>
            <motion.div
              key="sidebar-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={handleClose}
              aria-hidden="true"
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-[2px] lg:hidden"
            />
            <motion.aside
              key="sidebar-drawer"
              role="dialog"
              aria-modal="true"
              aria-label="Navigation"
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: 'tween', duration: 0.25, ease: 'easeOut' }}
              className="fixed inset-y-0 left-0 z-50 flex w-64 max-w-[85vw] flex-col border-r border-border bg-card lg:hidden"
            >
              <button
                type="button"
                onClick={handleClose}
                aria-label="Close sidebar"
                className="absolute top-4 right-4 rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <IconX size={18} />
              </button>
              <SidebarContent onNavigate={handleNavigate} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
