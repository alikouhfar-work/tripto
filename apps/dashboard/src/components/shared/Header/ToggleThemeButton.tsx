import { useTheme } from '@/contexts/ThemeContext';
import { IconMoon, IconSun } from '@tabler/icons-react';
import { clsx } from 'clsx';

export const ToggleThemeButton = () => {
  const { theme, setTheme } = useTheme();

  const handleToggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

  return (
    <button
      onClick={handleToggleTheme}
      className="relative size-6 cursor-pointer overflow-hidden text-zinc-700 dark:text-zinc-300"
    >
      <IconSun
        size={20}
        className={clsx(
          'absolute left-1/2 -translate-x-1/2 transition-all duration-300',
          theme === 'light' ? 'top-1/2 -translate-y-1/2' : 'top-8',
        )}
      />
      <IconMoon
        size={20}
        className={clsx(
          'absolute left-1/2 -translate-x-1/2 transition-all duration-300',
          theme === 'dark' ? 'bottom-1/2 translate-y-1/2' : 'bottom-8',
        )}
      />
    </button>
  );
};
