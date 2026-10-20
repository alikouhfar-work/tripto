import { clsx } from 'clsx';
import Link from 'next/link';

export type AccommodationTypeTab = 'house' | 'hotel';

const TABS: ReadonlyArray<{ label: string; value: AccommodationTypeTab }> = [
  { label: 'House', value: 'house' },
  { label: 'Hotel', value: 'hotel' },
];

type AccommodationTypeTabsProps = {
  activeType: AccommodationTypeTab;
};

/** House/Hotel switcher for the accommodation create page. */
export const AccommodationTypeTabs = ({ activeType }: AccommodationTypeTabsProps) => {
  return (
    <div
      className={clsx(
        'mb-4 inline-flex gap-1 rounded-lg! border border-zinc-200! bg-zinc-100 p-1',
        'dark:border-zinc-700! dark:bg-zinc-950/70',
      )}
    >
      {TABS.map((tab) => (
        <Link
          key={tab.value}
          href={`/accommodations/new?type=${tab.value}`}
          aria-current={activeType === tab.value ? 'page' : undefined}
          className={clsx(
            'rounded-md px-5 py-1.5 text-sm font-medium',
            activeType === tab.value
              ? 'bg-white text-zinc-900 shadow-none dark:bg-zinc-800 dark:text-zinc-100 dark:shadow'
              : 'text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100',
          )}
        >
          {tab.label}
        </Link>
      ))}
    </div>
  );
};
