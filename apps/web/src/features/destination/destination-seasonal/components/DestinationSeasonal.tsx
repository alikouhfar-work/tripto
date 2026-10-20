'use client';

import { FC, useState } from 'react';
import { SeasonEnum } from '@/enums/season';
import { DestinationSeasonalListFilters } from '@/features/destination/destination-seasonal/components/DestinationSeasonalListFilters';
import { DestinationSeasonalList } from '@/features/destination/destination-seasonal/components/DestinationSeasonalList';
import { IconFlame } from '@tabler/icons-react';

export const DestinationSeasonal: FC = () => {
  const [selectedSeason, setSelectedSeason] = useState<SeasonEnum>(SeasonEnum.SUMMER);

  const handleSeasonChange = (season: SeasonEnum) => setSelectedSeason(season);

  return (
    <section id="trending-destinations" className="space-y-8 py-24">
      <div className="flex flex-col gap-4 border-b border-gray-100 pb-5 lg:flex-row lg:items-end lg:justify-between">
        <div className="space-y-2">
          <span className="inline-flex items-center space-x-1.5 rounded-md bg-amber-50 px-3 py-1 font-mono text-[11px] font-extrabold tracking-wider text-amber-800 uppercase">
            <IconFlame className="h-4 w-4 animate-bounce fill-orange-500 text-orange-500" />
            <span>Hot Spots</span>
          </span>
          <h2 className="font-display text-2xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Trending Destinations
          </h2>
        </div>
        <DestinationSeasonalListFilters
          selectedSeason={selectedSeason}
          onSeasonChange={handleSeasonChange}
        />
      </div>

      <DestinationSeasonalList selectedSeason={selectedSeason} />
    </section>
  );
};
