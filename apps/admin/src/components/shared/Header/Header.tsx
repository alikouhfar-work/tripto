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
    <header className="sticky top-0 z-30 flex min-h-16 items-center justify-between border-b border-border bg-card/95 px-8 backdrop-blur-md">
      <div className="flex items-center gap-4">
        <button
          onClick={onToggleSidebar}
          aria-label="Toggle sidebar"
          className="rounded-md p-1 text-muted-foreground transition-colors hover:text-foreground"
        >
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
