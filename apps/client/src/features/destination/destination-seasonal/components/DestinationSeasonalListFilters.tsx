import { clsx } from 'clsx';
import { FC } from 'react';
import { destinationSeasonalListFilters } from '../lib/destinationSeasonalListFilters';
import { DestinationSeasonalListFiltersProps } from '@/features/destination/destination-seasonal/types/destinationSeasonalListFilters';

export const DestinationSeasonalListFilters: FC<DestinationSeasonalListFiltersProps> = ({
  season,
  onSeasonChange,
}) => {
  return (
    <ul className="flex flex-wrap items-center gap-1.5 sm:gap-3">
      {destinationSeasonalListFilters.map((filterOption) => {
        const { Icon, title, value } = filterOption;
        const isActive = filterOption.value === season;

        return (
          <li
            key={value}
            onClick={() => onSeasonChange(value)}
            className={clsx(
              'flex w-fit cursor-pointer items-center gap-2 rounded-3xl border border-zinc-900 px-3 py-2 font-semibold transition-all duration-300 sm:px-4 sm:py-3',
              isActive ? 'bg-zinc-900 text-white' : 'hover:bg-zinc-50',
            )}
          >
            <Icon className="size-4 sm:size-5" />
            <p className="text-sm sm:text-base">{title}</p>
          </li>
        );
      })}
    </ul>
  );
};
