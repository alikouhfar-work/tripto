import { useTheme } from '@/contexts/ThemeContext';
import { IconMoon, IconSun } from '@tabler/icons-react';
import { clsx } from 'clsx';
import { useEffect, useState } from 'react';

export const ToggleThemeButton = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- mounted flag keeps SSR HTML stable until hydration completes
    setMounted(true);
  }, []);

  const handleToggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

  // Render stable light-theme markup until mounted so server HTML and the
  // first client render match exactly (theme syncs post-hydration).
  const effectiveTheme = mounted ? theme : 'light';

  return (
    <button
      type="button"
      onClick={handleToggleTheme}
      title={effectiveTheme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
      aria-label={effectiveTheme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
      aria-pressed={effectiveTheme === 'dark'}
      suppressHydrationWarning
      className="relative size-6 cursor-pointer overflow-hidden text-zinc-700 dark:text-zinc-300"
    >
      <IconSun
        size={20}
        className={clsx(
          'absolute left-1/2 -translate-x-1/2 transition-all duration-300',
          effectiveTheme === 'light' ? 'top-1/2 -translate-y-1/2' : 'top-8',
        )}
      />
      <IconMoon
        size={20}
        className={clsx(
          'absolute left-1/2 -translate-x-1/2 transition-all duration-300',
          effectiveTheme === 'dark' ? 'bottom-1/2 translate-y-1/2' : 'bottom-8',
        )}
      />
    </button>
  );
};
