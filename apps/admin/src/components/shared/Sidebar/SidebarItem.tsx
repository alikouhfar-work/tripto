import clsx from 'clsx';
import { motion } from 'motion/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FC } from 'react';
import { SidebarItemProps } from './types';

export const SidebarItem: FC<SidebarItemProps> = (props) => {
  const { href, label, disabled, onNavigate, icon: Icon } = props;
  const pathname = usePathname();

  const isActive = pathname === href || pathname.startsWith(`${href}/`);

  const commonClasses = clsx(
    'w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group',
    disabled && 'opacity-20 cursor-not-allowed pointer-events-none',
    !disabled &&
      (isActive
        ? 'bg-blue-600 text-white shadow-none shadow-blue-200 dark:shadow-lg dark:shadow-blue-900'
        : 'text-zinc-500 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-100'),
  );

  const content = (
    <>
      <Icon className='size-5' />
      <span className="text-sm font-medium">{label}</span>

      <motion.div
        layoutId="active-pill"
        className="ml-auto h-1.5 w-1.5 rounded-full bg-white"
        initial={{ opacity: 0, scale: 0 }}
        animate={{
          opacity: isActive && !disabled ? 1 : 0,
          scale: isActive && !disabled ? 1 : 0,
        }}
        transition={{ duration: 0.2 }}
      />
    </>
  );

  if (disabled) {
    return <div className={commonClasses}>{content}</div>;
  }

  return (
    <Link href={href} className={commonClasses} onClick={onNavigate}>
      {content}
    </Link>
  );
};
