import { FC, SVGProps } from 'react';

export type SidebarProps = {
  isOpen: boolean;
  onToggleSidebar: () => void;
  /** Explicit close (backdrop, Escape, nav). Falls back to toggle when omitted. */
  onCloseSidebar?: () => void;
};

export type SidebarItemProps = {
  icon: FC<SVGProps<SVGSVGElement>>;
  label: string;
  href: string;
  disabled?: boolean;
  /** Fired when the nav link is clicked (used to close the mobile drawer). */
  onNavigate?: () => void;
};
