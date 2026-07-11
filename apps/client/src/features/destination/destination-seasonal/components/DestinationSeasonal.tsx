'use client';

import { FC, useState } from 'react';
import { DestinationSeasonalListFilters } from './DestinationSeasonalListFilters';
import { DestinationSeasonalList } from './DestinationSeasonalList';
import { SeasonEnum } from '@/enums/season';

export const DestinationSeasonal: FC = () => {
  const [season, setSeason] = useState<SeasonEnum>(SeasonEnum.SPRING);

  const handleSeasonChange = (season: SeasonEnum) => setSeason(season);

  return (
    <section className="flex w-full justify-center">
      <div className="w-full max-w-7xl space-y-6 px-4 sm:space-y-8 2xl:px-0">
        <h3 className="text-3xl font-extrabold sm:text-4xl md:text-5xl">Trending Destinations</h3>
        <DestinationSeasonalListFilters season={season} onSeasonChange={handleSeasonChange} />
        <DestinationSeasonalList season={season} />
      </div>
    </section>
  );
};
