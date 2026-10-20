import { FC } from 'react';
import { destinationSeasonalListFilters } from '../lib/destinationSeasonalListFilters';
import { DestinationSeasonalListFiltersProps } from '@/features/destination/destination-seasonal/types/destinationSeasonalListFilters';

export const DestinationSeasonalListFilters: FC<DestinationSeasonalListFiltersProps> = ({
  selectedSeason,
  onSeasonChange,
}) => {
  return (
    <div className="flex scrollbar-none items-center space-x-1.5 overflow-x-auto pb-1">
      {destinationSeasonalListFilters.map((season) => (
        <button
          key={season.id}
          onClick={() => onSeasonChange(season.id as any)}
          className={`flex shrink-0 items-center space-x-1.5 rounded-full border px-3.5 py-1.5 text-xs font-bold tracking-wide transition-all focus:outline-none ${
            selectedSeason === season.id
              ? 'border-amber-200 bg-amber-100 text-amber-900 shadow-xs'
              : 'border-slate-200/60 bg-white text-slate-500 hover:bg-slate-50'
          }`}
        >
          <span className="text-sm">{season.icon}</span>
          <span>{season.label}</span>
        </button>
      ))}
    </div>
  );
};
