import { SidebarItem } from './SidebarItem';

export const SidebarSection = ({
  title,
  items,
  className,
  onNavigate,
}: {
  title: string;
  items: any[];
  className?: string;
  onNavigate?: () => void;
}) => (
  <div className={className}>
    <div className="px-4 py-2 text-[10px] font-bold tracking-widest text-zinc-400 uppercase">
      {title}
    </div>
    <div className='flex flex-col gap-0.5'>
      {items.map((item) => (
        <SidebarItem key={item.id} {...item} onNavigate={onNavigate} />
      ))}
    </div>
  </div>
);
