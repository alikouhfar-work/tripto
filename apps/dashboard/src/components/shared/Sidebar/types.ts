import { FC, SVGProps } from 'react';

export type SidebarProps = {
  isOpen: boolean;
  onToggleSidebar: () => void;
};

export type SidebarItemProps = {
  icon: FC<SVGProps<SVGSVGElement>>;
  label: string;
  href: string;
  disabled?: boolean;
};
