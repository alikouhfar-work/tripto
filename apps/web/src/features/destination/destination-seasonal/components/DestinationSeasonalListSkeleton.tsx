import { FC } from 'react';
import { DestinationSeasonalItemSkeleton } from '@/features/destination/destination-seasonal/components/DestinationSeasonalItemSkeleton';

export const DestinationSeasonalListSkeleton: FC = () => {
  const destinations = Array.from({ length: 4 });

  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {destinations.map((_, index) => (
        <DestinationSeasonalItemSkeleton key={index} />
      ))}
    </ul>
  );
};
