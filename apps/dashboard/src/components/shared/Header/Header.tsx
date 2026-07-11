'use client';

import { AvatarDropdownSkeleton } from '@/features/authentication';
import { AvatarDropdown } from '@/features/authentication/components/AvatarDropdown';
import { IconMenu } from '@tabler/icons-react';
import { useSession } from 'next-auth/react';
import { FC } from 'react';
import { HeaderProps } from './types';
import { ToggleThemeButton } from '@/components/shared/Header/ToggleThemeButton';

export const Header: FC<HeaderProps> = ({ onToggleSidebar }) => {
  const { status, data } = useSession();

  return (
    <header className="sticky top-0 z-30 flex min-h-16 items-center justify-between border-b border-zinc-200 bg-white px-8 backdrop-blur-md dark:border-zinc-700 dark:bg-zinc-900">
      <div className="flex items-center gap-4">
        <button onClick={onToggleSidebar} className="text-zinc-700 dark:text-zinc-300">
          <IconMenu size={20} />
        </button>
      </div>

      <div className="flex items-center gap-1">
        {status === 'loading' ? (
          <AvatarDropdownSkeleton />
        ) : status === 'authenticated' ? (
          <AvatarDropdown
            name={data.user?.name}
            email={data.user?.email}
            image={data.user?.image}
          />
        ) : null}
        <ToggleThemeButton />
      </div>
    </header>
  );
};
